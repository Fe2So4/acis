<template>
  <div class="notice">
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
          @change="getPtData"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="search"
          clearable
          placeholder="请输入患者手术申请单号"
          @clear="getPtData"
        />
      </el-form-item>
      <!-- <el-form-item>
        <el-button>搜索</el-button>
      </el-form-item>-->
      <el-form-item>
        <el-button @click="handleSearch">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="print">
          打印
        </el-button>
      </el-form-item>
    </el-form>
    <div class="notice-content">
      <div class="nc-left">
        <vxe-table
          border
          round
          auto-resize
          keep-source
          export-config
          ref="xTable"
          height="100%"
          width="100%"
          :data="ptList"
          align="center"
          size="mini"
          highlight-current-row
          @cell-click="handleClick"
          :edit-config="{ trigger: 'dblclick', mode: 'cell', showStatus: true }"
          :header-cell-class-name="cellClassName"
        >
          <vxe-table-column
            field="operationId"
            title="手术申请单号"
          />
          <vxe-table-column
            field="ptName"
            title="患者"
          />
        </vxe-table>
      </div>
      <div class="nc-right">
        <notice-print
          :notice-data="noticeData"
          id="print-notice"
        />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import NoticePrint from '../print-notice'
import { getNoticeData, getNoticePtList } from '@/api/schedule'
import request from '@/utils/requestForMock'
import { ipcRenderer } from 'electron'
export default {
  name: 'Notice',
  data () {
    return {
      value: '',
      search: '',
      time: moment(new Date()).format('yyyy-MM-DD'),
      noticeData: {
        opeRoom: '',
        sequence: '',
        opeScheduleTime: '',
        ptName: '',
        gender: '',
        age: '',
        diagnoseBefore: '',
        deptName: '',
        bedId: '',
        visitId: '',
        operationName: '',
        surgeon: '',
        surgeonAssist1: '',
        surgeonAssist2: '',
        surgeonAssist3: '',
        anesMethod: '',
        anesDoc: '',
        memo: ''
      },
      ptList: []
    }
  },
  components: { NoticePrint },
  computed: {},
  methods: {
    handleClick ({ row }) {
      this.value = row.operationId
      this.getData()
    },
    handleSearch () {
      this.getPtData()
    },
    cellClassName () {},
    print () {
      if (this.noticeData.ptName !== '') {
        const printHtml = document.querySelector('#print-notice').outerHTML
        ipcRenderer.send('printChannel', printHtml)
      } else {
        this.$message({ type: 'warning', message: '请先选择患者' })
      }
    },
    getData () {
      if (this.value === '') {
        this.noticeData.opeRoom = ''
        this.noticeData.sequence = ''
        this.noticeData.opeScheduleTime = ''
        this.noticeData.ptName = ''
        this.noticeData.gender = ''
        this.noticeData.age = ''
        this.noticeData.diagnoseBefore = ''
        this.noticeData.deptName = ''
        this.noticeData.bedId = ''
        this.noticeData.visitId = ''
        this.noticeData.operationName = ''
        this.noticeData.surgeon = ''
        this.noticeData.surgeonAssist1 = ''
        this.noticeData.surgeonAssist2 = ''
        this.noticeData.surgeonAssist3 = ''
        this.noticeData.anesMethod = ''
        this.noticeData.anesDoc = ''
        this.noticeData.memo = ''
      } else {
        request({
          url: getNoticeData + '/' + this.value,
          method: 'GET'
        }).then((res) => {
          this.noticeData = res.data.data
        })
      }
    },
    getPtData () {
      const obj = {}
      obj.opeScheduleTime = this.time
      if (this.search !== '') {
        obj.operationId = this.search
      }
      request({
        url: getNoticePtList,
        params: obj
      }).then((res) => {
        this.ptList = res.data.data
      })
    }
  },
  mounted () {
    // this.getData()
    this.getPtData()
  }
}
</script>
<style lang="scss" scoped>
.notice {
  height: 100%;
}
.notice /deep/ .el-select .el-select-dropdown,
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
.notice-content {
  height: calc(100% - 48px);
  display: flex;
  .nc-left {
    margin-right: 20px;
    width: 30%;
  }
  .nc-right {
    flex: 1;
  }
}
.notice /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item {
  padding: 0;
  width: 400px;
}
.notice /deep/ .el-select .el-select-dropdown,
.notice .el-select-dropdown__item.is-disabled {
  background: #f3f6f9;
  cursor: auto;
  color: #000;
}
</style>
