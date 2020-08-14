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
      </el-form-item> -->
      <el-form-item>
        <el-button @click="print">
          打印
        </el-button>
      </el-form-item>
    </el-form>
    <div class="print-content">
      <el-row>
        <el-col
          :offset="10"
          :span="6"
        >
          <h3>手术通知单</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span>手术间</span>
          <span>{{ noticeData.opeRoom }}</span>
        </el-col>
        <el-col :span="4">
          <span>手术台次</span>
          <span>{{ noticeData.sequence }}</span>
        </el-col>
        <el-col :span="6">
          <span>手术时间</span>
          <span>{{ noticeData.opeScheduleTime }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span>姓名</span>
          <span>{{ noticeData.ptName }}</span>
        </el-col>
        <el-col :span="4">
          <span>性别</span>
          <span>{{ noticeData.gender }}</span>
        </el-col>
        <el-col :span="4">
          <span>年龄</span>
          <span>{{ noticeData.age }}</span>
        </el-col>
        <el-col :span="8">
          <span>诊断</span>
          <span>{{ noticeData.diagnoseBefore }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span>科室</span>
          <span>{{ noticeData.deptName }}</span>
        </el-col>
        <el-col :span="4">
          <span>床号</span>
          <span>{{ noticeData.bedId }}</span>
        </el-col>
        <el-col :span="4">
          <span>住院号</span>
          <span>{{ noticeData.visitId }}</span>
        </el-col>
        <el-col :span="8">
          <span>手术名称</span>
          <span>{{ noticeData.operationName }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <span>主刀医生</span>
          <span>{{ noticeData.surgeon }}</span>
        </el-col>
        <el-col :span="5">
          <span>第一助手</span>
          <span>{{ noticeData.surgeonAssist1 }}</span>
        </el-col>
        <el-col :span="5">
          <span>第二助手</span>
          <span>{{ noticeData.surgeonAssist1 }}</span>
        </el-col>
        <el-col :span="5">
          <span>第三助手</span>
          <span>{{ noticeData.surgeonAssist3 }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <span>麻醉方式</span>
          <span>{{ noticeData.anesMethod }}</span>
        </el-col>
        <el-col :span="5">
          <span>麻醉医师</span>
          <span>{{ noticeData.anesDoc }}</span>
        </el-col>
        <el-col :span="5">
          <span>高危</span>
          <span />
        </el-col>
        <el-col :span="5">
          <span>备注</span>
          <span>{{ noticeData.memo }}</span>
        </el-col>
      </el-row>
      <el-row />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {
  getNoticeData,
  getNoticePtList
} from '@/api/schedule'
import request from 'src/common/utils/requestForMock'
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
  computed: {},
  methods: {
    print () {
      const printHtml = document.querySelector('.print-content').outerHTML
      const options = { silent: false }
      ipcRenderer.send('printChannel', printHtml, 'notice.css', options)
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
        }).then(res => {
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
      }).then(res => {
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
  .print-content{
    width: calc(210mm + 100px);
    h3{
      text-align: center;
    }
    .el-row{
      margin-bottom:10px;
      // padding: 0 0 5px 0;
      &:first-child{
        margin:unset ;
      }
      .el-col{
        display: flex;
        margin-right: 20px;
        span{
          display: inline-block;
          padding: 2px;
          &:last-child{
            margin-left: 5px;
            border-bottom: 1px solid #fff;
            text-align: left;
            text-indent:5px;
            flex: 1;
          }
        }
      }
    }
  }
}
.notice /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .content {
  display: flex;
  border-left: 1px solid #1A2131;
  border-bottom: 1px solid #1A2131;
  span {
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid #1A2131;
    border-top: 1px solid #1A2131;
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
