<template>
  <div class="document">
    <el-form
      :inline="true"
      size="mini"
    >
      <el-form-item>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          popper-class="dateTimePicker"
          @change="getData"
        />
      </el-form-item>
      <el-form-item label="楼层：">
        <el-radio-group
          v-model="floor"
          @change="handleChange"
        >
          <el-radio-button label="全部" />
          <el-radio-button label="6" />
          <el-radio-button label="7" />
          <el-radio-button label="8" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleShowPrint"
          :disabled="!reportVisible"
        >
          打印
        </el-button>
        <el-button @click="getData">
          刷新
        </el-button>
        <el-button @click="handleExport">
          导出
        </el-button>
        <el-button
          @click="handleEdit"
          v-show="!reportVisible"
        >
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <el-scrollbar
        style="height: 100%"
        class="scrollbar"
      >
        <div class="print-document">
          <Report
            :table-data="tableData"
            :time="time"
          />
        </div>
      </el-scrollbar>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      class="dialog-notice"
      title="打印预览"
      width="350mm"
      @opened="onOpened"
    >
      <div style="height: 600px">
        <el-scrollbar
          style="height: 100%"
          class="scrollbar"
        >
          <report-print
            id="print-report"
            :table-data="tableData"
            :time="time"
          />
        </el-scrollbar>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="printEvent"
        >打印</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import {
  getTableList,
  updateScheduledRoomPlatform,
  cancelScheduleSubmit,
  exportScheduleReport,
  getCurrentRoom
} from '@/api/schedule'
import { roomNoList } from '@/api/dictionary'
import request from '@/utils/requestForMock'
import Report from './report'
import ReportPrint from './report-print'
import { ipcRenderer } from 'electron'
import XEUtils from 'xe-utils'
export default {
  name: 'Document',
  data () {
    return {
      value: '',
      time: moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
      ptList: [],
      tableData: [],
      floor: 0,
      roomList: [],
      reportVisible: true,
      dialogVisible: false
    }
  },
  components: {
    Report,
    ReportPrint
  },
  computed: {},
  methods: {
    onOpened () {},
    // 获取默认楼层
    getDefaultRoom () {
      request({
        method: 'get',
        url: getCurrentRoom
      }).then((res) => {
        if (res.data.data === '0') {
          this.floor = '全部'
        } else {
          this.floor = res.data.data
        }
        this.getData()
        // this.roomFloor = res.data.data;
        // this.getOpeData();
      })
    },
    handleExport () {
      let floor = ''
      if (this.floor === '全部') {
        floor = '0'
      } else {
        floor = this.floor
      }
      const url = exportScheduleReport + `?date=${this.time}&&floor=${floor}`
      ipcRenderer.send(
        'download',
        JSON.stringify({
          downloadUrl: url
        })
      )
    },
    handleChange (val) {
      let value = '0'
      if (val === '全部') {
        value = '全部'
      } else {
        value = val
      }
      this.floor = value
      this.getData()
      // this.$emit('update:roomFloor', value)
      // this.clearCurrentRoom()
    },
    cancelSchedule (row) {
      request({
        url: cancelScheduleSubmit + '?operationId=' + row.operationId,
        method: 'put'
      }).then((res) => {
        this.$message({ type: 'success', message: '撤销成功' })
        this.getData()
      })
    },
    handleShowPrint () {
      this.dialogVisible = true
    },
    printEvent () {
      // this.$router.push('/print-notice')
      if (this.tableData.length > 0) {
        const printHtml = document.querySelector('#print-report').outerHTML
        const options = { silent: true }
        ipcRenderer.send(
          'printChannel',
          printHtml,
          'schedule-report.css',
          options
        )
        this.dialogVisible = false
      } else {
        this.$message({ type: 'warning', message: '请选择正确排班日期' })
      }
    },
    handleEdit () {
      // const updateRecords = this.$refs.xTable.getUpdateRecords()
      this.reportVisible = !this.reportVisible
    },
    getRoomList () {
      request({
        method: 'get',
        url: roomNoList
      }).then((res) => {
        this.roomList = res.data.data
      })
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, (item) => item === value)
      return item || null
    },
    cellClassName ({ row, column }) {
      if (column === 'title') {
        return 'header-title'
      }
    },
    handleSubmit () {
      const updateRecords = this.$refs.xTable.getUpdateRecords()
      const arr = []
      updateRecords.forEach((item) => {
        arr.push({
          operationId: item.operationId,
          opeRoom: item.opeRoom,
          sequence: item.sequence
        })
      })
      request({
        method: 'put',
        url: updateScheduledRoomPlatform,
        data: arr
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '修改成功' })
          this.getData()
        } else {
          this.$message({ type: 'success', message: res.data.msg })
        }
      })
    },
    getData () {
      let floor = ''
      if (this.floor === '全部') {
        floor = '0'
      } else {
        floor = this.floor
      }
      request({
        url: getTableList + '/' + this.time + '/' + floor,
        method: 'GET'
      }).then((res) => {
        this.tableData = res.data.data || []
      })
    }
  },
  created () {
    this.getDefaultRoom()
  },
  mounted () {
    // this.getData();
    this.getRoomList()
  }
}
</script>
<style lang="scss" scoped>
.document {
  height: 100%;
  .content {
    height: calc(100% - 46px);
    background: #e3e3e3;
    border-radius: 5px;
    padding-bottom: 20px;
  }
  .print-document {
    // box-shadow: 1px 20px 45px 5px rgba(0, 0, 0, 0.5);
    padding: 0 50px;
    height: 100%;
    h3 {
      text-align: center;
    }
    .el-row {
      margin-bottom: 10px;
      // padding: 0 0 5px 0;
      &:first-child {
        margin: unset;
      }
      .el-col {
        display: flex;
        margin-right: 20px;
        span {
          display: inline-block;
          padding: 2px;
          &:last-child {
            margin-left: 5px;
            border-bottom: 1px solid #fff;
            text-align: left;
            text-indent: 5px;
            flex: 1;
          }
        }
      }
    }
  }
}
.document /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .content {
  display: flex;
  border-left: 1px solid #1a2131;
  border-bottom: 1px solid #1a2131;
  span {
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid #1a2131;
    border-top: 1px solid #1a2131;
    // border-bottom: 1px solid #1A2131;
    box-sizing: border-box;
  }
}
.document /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item {
  // padding: 0;
  // width: 400px;
}
.document /deep/ .el-select .el-select-dropdown,
.document .el-select-dropdown__item.is-disabled {
  background: #f3f6f9;
  cursor: auto;
  color: #000;
}
.document /deep/ .el-scrollbar__view {
  height: 100%;
}
.table-report {
  @page {
    size: landscape;
  }
  background: #e3e3e3;
  color: #434343;
  font-size: 14px;
  /deep/ .vxe-table--header-wrapper {
    background: #e3e3e3;
  }
  /deep/ thead {
    tr {
      &:first-child {
        th {
          line-height: 50px;
          font-size: 30px;
          background-image: linear-gradient(
              rgba(227, 227, 227, 1),
              rgba(227, 227, 227, 1)
            ),
            linear-gradient(rgba(227, 227, 227, 1), rgba(227, 227, 227, 1));
        }
      }
      &:nth-child(2) {
        th {
          background-image: linear-gradient(
              rgba(227, 227, 227, 1),
              rgba(227, 227, 227, 1)
            ),
            linear-gradient(rgba(227, 227, 227, 1), rgba(227, 227, 227, 1));
          &:first-child {
            text-align: left;
            border-bottom: 1px solid rgba(97, 109, 143, 0.5);
          }
          &:last-child {
            border-bottom: 1px solid rgba(97, 109, 143, 0.5);
            text-align: right;
          }
        }
      }
    }
  }
}
.table-report.vxe-table .vxe-body--row.header-title {
  font-size: 30px;
  line-height: 50px;
  color: #fff;
}
.table-report.vxe-table .vxe-header--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
</style>
<style>
.scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
