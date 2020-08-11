<template>
  <div class="physicalAlarm">
    <vxe-table
      border="inner"
      ref="table"
      resizable
      highlight-hover-row
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      height="600px"
      class="scroll"
      size="mini"
    >
      <vxe-table-column
        type="checkbox"
        width="80"
      />
      <vxe-table-column
        field="alarmCode"
        title="体征代码"
        width="100"
      />
      <vxe-table-column
        field="alarmName"
        title="体征名称"
        width="100"
      />
      <vxe-table-column
        field="lower"
        title="预警阀值下限（含）"
        :edit-render="{
          name: '$input',
          events:{change: onInputChange}
        }"
      />
      <vxe-table-column
        field="upper"
        title="预警阀值上限（含）"
        :edit-render="{
          name: '$input',
          events:{change: onInputChange}
        }"
      />
    </vxe-table>
    <div class="buttons">
      <el-select
        placeholder="新增"
        size="mini"
        @change="onSelectChange"
        :value="sign"
        style="width: 74px;margin-right:10px"
      >
        <el-option
          v-for="item in signList"
          :key="item.itemCode"
          :label="item.itemName"
          :value="item"
        >
          <span style="float: left">{{ item.itemName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.itemCode }}</span>
        </el-option>
      </el-select>
      <el-button
        size="mini"
        @click="onDelete"
      >
        删除
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  getAlarmConfig,
  getSignList,
  addAlarmConfig,
  updateAlarmConfig,
  deleteAlarmConfig
} from '@/api/generalConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'PhysicalAlarm',
  data () {
    return {
      tableData: [],
      signList: [],
      sign: '',
      modifiedMap: {},
      addedMap: {},
      deletedMap: {}
    }
  },
  created () {
    this.getAlarmConfig()
    this.getSignList()
  },
  methods: {
    onInputChange ({ row }) {
      // 判断当前修改的是否为新增项
      if (Object.hasOwnProperty.call(this.addedMap, row.alarmCode)) {
        this.addedMap[row.alarmCode] = row
      } else {
        this.modifiedMap[row.alarmCode] = row
      }
    },
    onSelectChange ({ itemCode, itemName }) {
      const exist = this.tableData.some((item) => item.alarmCode === itemCode)
      if (!exist) {
        const item = {
          alarmCode: itemCode,
          alarmName: itemName,
          upper: '',
          lower: ''
        }
        this.tableData.push(item)
        this.addedMap[item.alarmCode] = item
      }
    },
    onDelete () {
      const selectedArr = this.$refs.table.getCheckboxRecords()
      if (selectedArr.length) {
        selectedArr.forEach((row) => {
          // 删除修改缓存
          if (Object.hasOwnProperty.call(this.modifiedMap, row.alarmCode)) {
            delete this.modifiedMap[row.alarmCode]
          }
          // 判断是否为新增
          if (Object.hasOwnProperty.call(this.addedMap, row.alarmCode)) {
            // 删除新增缓存
            delete this.addedMap[row.alarmCode]
          } else {
            // 如果不是新增的，需要存入待删除缓存
            this.deletedMap[row.alarmCode] = row
          }
          const index = this.tableData.findIndex(
            (item) => item.alarmCode === row.alarmCode
          )
          this.tableData.splice(index, 1)
        })
      }
    },
    onSave () {
      const requestArr = []
      const modifiedList = Object.values(this.modifiedMap).map(
        ({ alarmCode, alarmName, upper, lower }) => {
          return {
            alarmCode,
            alarmName,
            upper,
            lower
          }
        }
      )
      if (modifiedList.length) {
        requestArr.push(this.updateAlarmConfig(modifiedList))
      }
      const addedList = Object.values(this.addedMap).map(
        ({ alarmCode, alarmName, upper, lower }) => {
          return {
            alarmCode,
            alarmName,
            upper,
            lower
          }
        }
      )
      if (addedList.length) {
        requestArr.push(this.addAlarmConfig(addedList))
      }
      const deletedList = Object.values(this.deletedMap).map(
        ({ alarmCode, alarmName, upper, lower }) => {
          return alarmCode
        }
      )
      if (deletedList.length) {
        requestArr.push(this.deleteAlarmConfig(deletedList))
      }
      if (!requestArr.length) {
        this.$message({
          type: 'info',
          message: '无待保存项'
        })
        return
      }
      return Promise.all(requestArr)
        .then((responses) => {
          const success = responses.every(
            (res) => res.data && res.data.success
          )
          if (success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 重置缓存
            this.modifiedMap = {}
            this.addedMap = {}
            this.deletedMap = {}
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    getAlarmConfig () {
      return request({
        method: 'get',
        url: getAlarmConfig
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.tableData = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    getSignList () {
      return request({
        method: 'get',
        url: getSignList
      }).then((res) => {
        if (res.data && res.data.success) {
          this.signList = res.data.data
        }
      })
    },
    addAlarmConfig (list) {
      return request({
        method: 'post',
        url: addAlarmConfig,
        data: list
      })
    },
    updateAlarmConfig (list) {
      return request({
        method: 'put',
        url: updateAlarmConfig,
        data: list
      })
    },
    deleteAlarmConfig (list) {
      return request({
        method: 'delete',
        url: deleteAlarmConfig,
        data: list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.physicalAlarm {
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
