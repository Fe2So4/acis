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
          @change="getPtData"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="value"
          placeholder="请选择"
          clearable
          @change="getData"
        >
          <el-option
            v-for="item in ptList"
            :key="item.operationId"
            :label="item.ptName"
            :value="item.operationId"
          >
            <div class="content">
              <span>{{ item.operationId }}</span>
              <span>{{ item.ptName }}</span>
              <span>{{ item.inputCode }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button>搜索</el-button>
      </el-form-item>-->
      <el-form-item>
        <el-button @click="print">
          打印
        </el-button>
      </el-form-item>
    </el-form>
    <notice-print
      :notice-data="noticeData"
      id="print-notice"
    />
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
    print () {
      // this.$router.push('/print-notice')
      const printHtml = document.querySelector('#print-notice').outerHTML
      const options = { silent: false }
      ipcRenderer.send('printChannel', printHtml, options)
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
      request({
        url: getNoticePtList,
        params: {
          opeScheduleTime: this.time
        }
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
