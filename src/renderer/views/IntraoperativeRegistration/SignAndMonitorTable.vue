<template>
  <div class="signAndMonitorTable">
    <div class="buttons">
      <el-button-group>
        <el-button
          :type="state === 'sign' ? 'primary': ''"
          size="mini"
          @click="onSelectSign"
        >
          体征数据
        </el-button>
        <el-button
          :type="state === 'monitor' ? 'primary': ''"
          size="mini"
          @click="onSelectMonitor"
        >
          监测数据
        </el-button>
      </el-button-group>
      <el-button-group size="mini">
        <el-button
          size="mini"
          :disabled="pageIndex<=0"
          @click="onPageUp"
        >
          上一页
        </el-button>
        <el-button
          size="mini"
          :disabled="pageIndex + 1>=totalPage"
          @click="onPageDown"
        >
          下一页
        </el-button>
      </el-button-group>
    </div>
    <div class="table">
      <vxe-table
        border="inner"
        ref="table"
        resizable
        highlight-hover-row
        height="300px"
        :data="tableData"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        class="scroll"
        size="mini"
        :checkbox-config="{labelField: 'itemName'}"
      >
        <vxe-table-column
          type="checkbox"
          title="名称"
          width="100"
          fixed="left"
        />
        <vxe-table-column
          v-for="timePoint in timePointArr"
          :key="timePoint"
          :field="timePoint"
          :title="timePoint.slice(11, 16)"
          width="80"
          :edit-render="{name: '$input', props: {type: 'float', digits: 2}, events:{change: onInputChange}}"
        />
      </vxe-table>
      <div class="bottomButtons">
        <el-button
          @click="onSave"
          size="mini"
          type="primary"
        >
          保存
        </el-button>
        <el-button
          @click="onRefresh"
          size="mini"
        >
          刷新
        </el-button>
        <el-popover
          placement="top"
          width="160"
          trigger="click"
        >
          <div>
            <el-scrollbar
              style="height: 100px"
              :wrap-style="wrapStyles"
            >
              <el-button
                v-for="button in signList"
                :key="button.itemCode"
                size="mini"
                type="text"
                @click="onAddItem(button)"
                style="display:block;margin: 4px 0"
              >
                {{ button.itemName }}
              </el-button>
            </el-scrollbar>
          </div>
          <el-button
            slot="reference"
            size="mini"
          >
            增加项目
          </el-button>
        </el-popover>
        <el-button
          @click="onDeleteItem"
          size="mini"
        >
          删除项目
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { getTemplateInfo, getSignData } from '@/api/medicalDocument'
import {
  getMonitorData,
  addSignOrMonitorItem,
  deleteSignOrMonitorItem,
  saveSignOrMonitorData
} from '@/api/intraoperative'
import { getSignList } from '@/api/generalConfig'
import request from '@/utils/requestForMock'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('Base')
export default {
  name: 'SignAndMonitorTable',
  props: {
    operationState: {
      default: 2,
      type: [String, Number]
    }
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      totalPage: 1,
      pageIndex: 0,
      state: 'sign',
      tableData: [],
      defaultTimePointSet: new Set(),
      timePointArr: [],
      wrapStyles: [
        {
          'overflow-x': 'hidden'
        }
      ],
      signList: []
    }
  },
  computed: {
    ...mapGetters(['validateHours']),
    ...mapState(['operationId'])
  },
  async created () {
    await this.getIntraoperativeData(0)
    this.getData()
    this.getSignList()
  },
  methods: {
    onSelectSign () {
      this.state = 'sign'
      this.getData()
    },
    onSelectMonitor () {
      this.state = 'monitor'
      this.getData()
    },
    async onPageUp () {
      await this.getIntraoperativeData(this.pageIndex - 1)
      this.getData()
    },
    async onPageDown () {
      await this.getIntraoperativeData(this.pageIndex + 1)
      this.getData()
    },
    onInputChange (data) {
    },
    onSave () {
      if (!this.validate72Hours()) return
      const list = this.tableData.reduce((acc, item) => {
        const { itemName, itemCode, itemUnit, disColor, drawIcon, _XID, ...points } = item
        const timePoints = Object.keys(points)
        const items = timePoints.map(timePoint => {
          return {
            timePoint,
            itemName,
            itemCode,
            itemUnit,
            itemValue: points[timePoint]
          }
        })
        return [...acc, ...items]
      }, [])
      this.saveSignOrMonitorData(list)
    },
    onRefresh () {
      this.getData()
    },
    onAddItem (event, scope) {
      this.addSignOrMonitorItem(event)
    },
    onDeleteItem () {
      const selectedArr = this.$refs.table.getCheckboxRecords()
      if (selectedArr.length) {
        selectedArr.forEach((row) => {
          this.deleteSignOrMonitorItem(row)
        })
      }
    },
    // 获取术中文书相关信息
    getIntraoperativeData (pageIndex) {
      return request({
        method: 'POST',
        url: getTemplateInfo,
        data: {
          operationId: this.operationId,
          intervalTime: 5,
          pageIndex,
          pageTimeInterval: 4,
          operState: this.operationState
        }
      }).then((res) => {
        const { startTime, endTime, totalPage, pageIndex } = res.data.data
        this.startTime = startTime
        this.endTime = endTime
        this.totalPage = totalPage
        this.pageIndex = pageIndex
        this.initDefaultTimePointSet()
        return res.data.data
      })
    },
    getData () {
      if (this.state === 'sign') {
        this.getSignData()
      } else {
        this.getMonitorData()
      }
    },
    getSignData () {
      return request({
        method: 'post',
        url: getSignData,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          dataMode: 5, // 5-正常模式 1-抢救模式
          operationId: this.operationId,
          modeCode: 'N033'
        }
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.tableData = this.convertTableData(res.data.data)
          }
        })
        .catch((e) => {})
    },
    getMonitorData () {
      return request({
        method: 'post',
        url: getMonitorData,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          operationId: this.operationId
        }
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.tableData = this.convertTableData(res.data.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getSignList () {
      return request({
        method: 'get',
        url: getSignList
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.signList = res.data.data
          }
        }
      )
    },
    addSignOrMonitorItem ({ itemCode, itemName }) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        url: addSignOrMonitorItem,
        method: 'post',
        data: {
          itemCode,
          itemName,
          mode
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.onRefresh()
          }
        }
      )
    },
    deleteSignOrMonitorItem ({ itemCode, itemName }) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        url: deleteSignOrMonitorItem,
        method: 'post',
        data: {
          itemCode,
          itemName,
          mode
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.onRefresh()
          }
        }
      )
    },
    initDefaultTimePointSet () {
      this.defaultTimePointSet = new Set()
      const start = +moment(this.startTime)
      const end = +moment(this.endTime)
      for (let i = start; i <= end;) {
        this.defaultTimePointSet.add(moment(i).format('YYYY-MM-DD HH:mm:ss'))
        i += 5 * 60 * 1000
      }
    },
    convertTableData (responseData) {
      const timePointSet = new Set(this.defaultTimePointSet)
      responseData.forEach((item) => {
        item.list.forEach((data) => {
          timePointSet.add(data.timePoint)
        })
      })
      const timePointArr = Array.from(timePointSet)
      timePointArr.sort((a, b) => {
        return +moment(a) - +moment(b)
      })
      this.timePointArr = [...timePointArr]
      const arr = responseData.map((item) => {
        const obj = {};
        ({
          itemCode: obj.itemCode,
          itemName: obj.itemName,
          itemUnit: obj.itemUnit,
          disColor: obj.disColor,
          drawIcon: obj.drawIcon
        } = item)
        timePointArr.forEach((timePoint) => {
          let itemValue = item.list.find((i) => i.timePoint === timePoint)
          itemValue = itemValue ? itemValue.itemValue : ''
          obj[timePoint] = itemValue
        })
        return obj
      })
      return arr
    },
    saveSignOrMonitorData (list) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        method: 'post',
        url: saveSignOrMonitorData,
        data: {
          list,
          mode,
          operationId: this.operationId
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        }
      )
    },
    validate72Hours () {
      const result = this.validateHours(72)
      if (!result) {
        this.$message({
          type: 'warning',
          message: '距离手术结束已经超过72小时！不可进行操作'
        })
      }
      return result
    }
  }
}
</script>
<style lang='scss' scoped>
.signAndMonitorTable {
  height: 100%;
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .table {
    border: 1px solid #39425c;
    border-radius: 5px;
    height: calc(100% - 40px);
    .bottomButtons {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>
