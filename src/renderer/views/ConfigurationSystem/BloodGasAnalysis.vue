<template>
  <div class="bloodGasAnalysis">
    <vxe-table
      border="inner"
      ref="table"
      resizable
      highlight-hover-row
      :data="showData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      height="600px"
      class="scroll"
      size="mini"
      row-id="inputCode"
      :checkbox-config="{
        checkStrictly: true,
        checkField:'checked'
      }"
      @checkbox-change="onCheckboxChange"
    >
      <vxe-table-column
        type="checkbox"
        width="100"
        title="是否显示"
      />
      <vxe-table-column
        field="bloodCode"
        title="血气分析项目"
        width="200"
      />
      <vxe-table-column
        field="bloodName"
        title="项目自定义名称"
        width="200"
        :edit-render="{
          name: '$input',
          events:{change: onInputChange}
        }"
      />
      <vxe-table-column
        field="unit"
        title="单位"
        :edit-render="{
          name: '$select',
          options: unitList,
          optionProps: {
            value: 'detail_code',
            label: 'detail_name'
          },
          events: {
            change: onUnitChange
          }
        }"
      />
    </vxe-table>
    <div class="buttons">
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
  getBloodInfo,
  updateBloodState,
  getUnitList
} from '@/api/generalConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'BloodGasAnalysis',
  data () {
    return {
      tableData: [],
      unitList: [],
      modifiedMap: {}
    }
  },
  computed: {
    defaultSelectRows () {
      return this.tableData
        .filter((item) => item.state === '1')
        .map((item) => item.inputCode)
    },
    showData () {
      return this.tableData.map((item) => {
        return {
          ...item,
          checked: item.state === '1'
        }
      })
    }
  },
  created () {
    this.getBloodInfo()
    this.getUnitList()
  },
  methods: {
    onCheckboxChange ({ row, checked }) {
      row.state = checked ? '1' : '0'
      this.modifiedMap[row.inputCode] = row
    },
    onInputChange ({ row }) {
      this.modifiedMap[row.inputCode] = row
    },
    onUnitChange ({ row }) {
      this.modifiedMap[row.inputCode] = row
    },
    onSave () {
      const list = Object.values(this.modifiedMap).map(
        ({ checked, ...item }) => item
      )
      if (!list.length) {
        this.$message({
          type: 'info',
          message: '未更改任何项目'
        })
        return
      }
      this.updateBloodState(list)
    },
    getBloodInfo () {
      return request({
        method: 'get',
        url: getBloodInfo
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
    updateBloodState (list) {
      return request({
        method: 'put',
        url: updateBloodState,
        data: list
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 重置缓存
            this.modifiedMap = {}
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
    getUnitList () {
      return request({
        method: 'get',
        url: getUnitList
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.unitList = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.bloodGasAnalysis {
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
