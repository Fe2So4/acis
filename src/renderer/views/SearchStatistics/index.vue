<template>
  <div class="search-statistics">
    <div class="top">
      <el-form
        size="mini"
        :inline="true"
        :model="form"
      >
        <span>
          <el-form-item style="margin-right:21px;margin-left:68px;">
            <el-select
              v-model="form.operationBeforeState"
              placeholder="请选择"
              style="width:120px;margin-right:4px;"
            >
              <el-option
                v-for="item in beforeTimeType"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-model="form.beforeTime"
              type="date"
              popper-class="dateTimePicker"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:165px"
            />
          </el-form-item>
          <el-form-item style="margin-right:21px;">
            <el-select
              v-model="form.operationAfterState"
              placeholder="请选择"
              style="width:120px;margin-right:4px;"
            >
              <el-option
                v-for="item in afterTimeType"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-model="form.afterTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:165px"
              popper-class="dateTimePicker"
            />
          </el-form-item>
          <el-form-item style="margin-left:21px;">
            <el-checkbox-group
              v-model="form.operation_state_name"
              @change="handleChange"
            >
              <el-checkbox
                v-for="item in filterOptions"
                :label="item.value"
                :key="item.name"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="margin-left:21px;">
            <el-radio-group v-model="form.is_emergency">
              <el-radio
                v-for="item in radioOptions"
                :label="item.value"
                :key="item.value"
              >
                {{ item.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </span>
        <span>
          <el-form-item>
            <el-button
              type="primary"
              @click="getData"
            >
              查询
            </el-button>
            <el-button @click="showExport">导出配置</el-button>
            <el-button @click="handleExport">导出</el-button>
          </el-form-item>
        </span>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
        :model="form"
      >
        <el-form-item
          label="病人ID"
          label-width="68px"
        >
          <el-input
            v-model="value"
            style="width:178px;"
          />
        </el-form-item>
        <el-form-item label="病人姓名">
          <el-input
            v-model="value"
            style="width:178px;"
          />
        </el-form-item>
        <el-form-item
          label="性别"
          label-width="68px"
        >
          <el-select
            v-model="form.patient_gender"
            style="width:90px;"
          >
            <el-option
              value="男"
              label="男"
            />
            <el-option
              value="女"
              label="女"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="年龄"
          label-width="68px"
          style="margin-left:88px;"
        >
          <el-input
            v-model="form.ageFrom"
            style="width:60px;"
          />
          <span style="margin:0 3px;">至</span>
          <el-input
            v-model="form.ageTo"
            style="width:60px;"
          />
        </el-form-item>
        <el-form-item
          label="科室"
          label-width="68px"
          style="margin-left:30px;"
        >
          <el-select
            v-model="form.dept_code"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getDeptData"
            :loading="loading"
          >
            <el-option
              v-for="item in deptList"
              :key="item.deptCode"
              :label="item.deptName"
              :value="item.deptCode"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item label="手术医生">
          <el-select
            v-model="form.surgeon_no"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getOpeDocData"
            :loading="loading"
          >
            <el-option
              v-for="item in opeDocList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="麻醉医生">
          <el-select
            v-model="form.anes_doc_no"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getAnesDocData"
            :loading="loading"
          >
            <el-option
              v-for="item in anesDocList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="护士">
          <el-select
            v-model="form.nurseCode"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getNurseData"
            :loading="loading"
          >
            <el-option
              v-for="item in nurseList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="手术名称">
          <el-select
            v-model="form.ope_code_after"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getOpeMethodData"
            :loading="loading"
          >
            <el-option
              v-for="item in opeMethodList"
              :key="item.opeCode"
              :label="item.opeName"
              :value="item.opeCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="麻醉方法">
          <el-select
            v-model="form.anes_method_no"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="getAnesMethodData"
            :loading="loading"
          >
            <el-option
              v-for="item in anesMethodList"
              :key="item.anesCode"
              :label="item.anesName"
              :value="item.anesCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="病人去向">
          <el-select
            v-model="form.pt_next_locationlue"
          >
            <el-option
              v-for="item in ptGoList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
        :model="form"
      >
        <el-form-item
          label="手术体位"
        >
          <el-select
            v-model="form.operation_position"
          >
            <el-option
              v-for="item in opePositionList"
              :key="item.detailCode"
              :value="item.detailCode"
              :label="item.detailName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="手术间"
          label-width="68px"
        >
          <el-select
            v-model="form.ope_room"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roomList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="切口等级">
          <el-select
            v-model="form.notch_level"
            placeholder="请选择"
            style="width:90px"
          >
            <el-option
              v-for="item in notchLevelList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="麻醉效果"
          style="margin-left:88px;"
        >
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width:90px"
          >
            <el-option
              v-for="item in anesEffect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="ASA分级"
          style="margin-left:88px;"
        >
          <el-select
            v-model="form.asa_class"
            style="width:90px;"
          >
            <el-option
              v-for="item in asaLevelList"
              :key="item.detailCode"
              :value="item.detailCode"
              :label="item.detailName"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <vxe-table
        round
        border
        export-config
        size="mini"
        ref="xTable"
        class="xTable scroll"
        :data="tableData"
        keep-source
        align="center"
        auto-resize
        show-overflow
      >
        <vxe-table-column
          type="seq"
          title="序号"
          width="60"
        />
        <vxe-table-column
          field="patient_id"
          title="病人ID"
          width="120"
        />
        <vxe-table-column
          field="patient_name"
          width="120"
          title="病人姓名"
        />
        <vxe-table-column
          width="120"
          field="patient_gender"
          title="性别"
        />
        <vxe-table-column
          width="120"
          field="age"
          title="年龄"
        />
        <vxe-table-column
          width="120"
          field="visit_id"
          title="住院号"
        />
        <vxe-table-column
          width="120"
          field="bed_id"
          title="床号"
        />
        <vxe-table-column
          field="dept_name"
          width="120"
          title="住院科室"
        />
        <vxe-table-column
          width="120"
          title="术前诊断"
          field="diagnose_before"
        />
        <vxe-table-column
          width="120"
          field="dept_name"
          title="手术科室"
        />
        <vxe-table-column
          width="120"
          field="is_emergency_detail"
          title="急诊/择期"
        />
        <vxe-table-column
          field="ope_room"
          width="120"
          title="手术间"
        />
        <vxe-table-column
          field="ope_name_after"
          width="120"
          title="手术名称"
        />
        <vxe-table-column
          width="120"
          field="anes_name"
          title="麻醉方法"
        />
        <vxe-table-column
          width="120"
          field="diagnose_after"
          title="术后诊断"
        />
        <vxe-table-column
          width="120"
          field="asa_class"
          title="ASA分级"
        />
        <vxe-table-column
          width="120"
          field="surgeon"
          title="手术医师"
        />
        <vxe-table-column
          width="120"
          field="first_assist"
          title="手术助手1"
        />
        <vxe-table-column
          width="120"
          field="second_assist"
          title="手术助手2"
        />
        <vxe-table-column
          width="120"
          title="手术助手3"
          field="third_assist"
        />
        <vxe-table-column
          width="120"
          field="forth_assist"
          title="手术助手4"
        />
        <vxe-table-column
          width="120"
          field="anes_doc"
          title="麻醉医师"
        />
        <vxe-table-column
          width="120"
          field="sec_anes_doc"
          title="第二麻醉医师"
        />
        <vxe-table-column
          field="third_anes_doc"
          width="120"
          title="第三麻醉医师"
        />
        <vxe-table-column
          field="first_assist"
          width="120"
          title="麻醉助手1"
        />
        <vxe-table-column
          field="first_ope_nurse"
          width="120"
          title="洗手护士1"
        />
        <vxe-table-column
          field="third_ope_nurse"
          width="120"
          title="洗手护士3"
        />
        <vxe-table-column
          field="first_supply_nurse"
          width="120"
          title="巡回护士1"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="手术安排时间"
        />
        <vxe-table-column
          field="anes_start_time"
          width="120"
          title="麻醉开始时间"
        />
        <vxe-table-column
          field="anes_end_time"
          width="120"
          title="麻醉结束时间"
        />
        <vxe-table-column
          field="oper_start_time"
          width="120"
          title="手术开始时间"
        />
        <vxe-table-column
          field="oper_end_time"
          width="120"
          title="手术结束时间"
        />
        <vxe-table-column
          field="in_oper_time"
          width="120"
          title="入室时间"
        />
        <vxe-table-column
          field="out_oper_time"
          width="120"
          title="出室时间"
        />
        <vxe-table-column
          field="anes_all_time"
          width="120"
          title="麻醉时长"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="手术时长"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="出入手术室时长"
        />
        <vxe-table-column
          field="ope_grade"
          width="120"
          title="手术等级"
        />
        <vxe-table-column
          field="notch_level"
          width="120"
          title="切口等级"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="麻醉效果"
        />
        <vxe-table-column
          field="operation_position"
          width="120"
          title="体位"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="病人去向"
        />
        <!-- <vxe-table-column
          field="memo"
          width="120"
          title="病史"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="治疗药物"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="心电图"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="胸片/胸CT"
        />
        <vxe-table-column
          field="memo"
          width="120"
          title="喉罩"
          show-overflow
        /> -->
      </vxe-table>
      <bottom-buttons
        :page-size="pageSize"
        :current-page="currentPage"
        :total-size="totalSize"
        :total-pages="totalPages"
        @changePage="handleChangePage"
      />
    </div>
  </div>
</template>

<script>
import BottomButtons from '@/components/StatisticsBottomButtons/BottomButtons'
import { getOpeSearch, getSurgeonWorkName, exportExcel } from '@/api/statistics'
import { roomNoList, commonTermsDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
import { dept, anesDoc, anesMethod, opeMethod, nurse, opeDoc } from '@/mixin/statistics'
import { mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
import moment from 'moment'
export default {
  data () {
    return {
      loading: false,
      value: '',
      tableData: [],
      filterOptions: [
        { name: '全部', value: '1' },
        { name: '术前', value: '2' },
        { name: '术中', value: '3' },
        {
          name: '术后',
          value: '4'
        }
      ],
      radioOptions: [
        {
          name: '全部',
          value: 2
        },
        {
          name: '急诊',
          value: 0
        },
        {
          name: '择期',
          value: 1
        },
        {
          name: '未填',
          value: null
        }
      ],
      currentPage: 1,
      pageSize: 20,
      beforeTimeType: ['麻醉开始时间', '手术开始时间', '入手术室时间', '手术安排时间'],
      afterTimeType: ['麻醉结束时间', '手术结束时间', '出手术室时间', '手术安排时间'],
      roomList: [],
      form: {
        afterTime: moment(new Date()).format('YYYY-MM-DD'),
        ageFrom: '',
        ageTo: '',
        anes_doc_no: '',
        anes_method_no: '',
        asa_class: '',
        beforeTime: moment(new Date()).format('YYYY-MM-DD'),
        dept_code: '',
        is_emergency: 2,
        notch_level: '',
        ope_grade_code: '',
        ope_room: '',
        operationAfterState: '麻醉结束时间',
        operationBeforeState: '麻醉开始时间',
        operation_position: '',
        operation_state_name: ['1'],
        patient_gender: '',
        pt_next_location: '',
        surgeon_no: '',
        ope_code_after: ''
      },
      asaLevelList: [],
      opePositionList: [],
      anesEffect: [{ label: '完善', value: '1' }, { label: '不完善', value: '2' }, { label: '无效', value: '3' }],
      ptGoList: [{ label: '回病房', value: '病房' }, { label: '转重症监护室', value: 'ICU' }, { label: '转复苏室', value: '恢复室' }],
      notchLevelList: [1, 2, 3, 4, 5],
      totalSize: 0,
      totalPages: 1
    }
  },
  components: {
    BottomButtons
  },
  mixins: [dept, anesDoc, anesMethod, opeMethod, nurse, opeDoc],
  methods: {
    ...mapActions('Statistics', ['showExport']),
    getData () {
      request({
        method: 'post',
        url: getOpeSearch + `?pageSize=${this.pageSize}&index=${this.currentPage}`,
        data: {
          afterTime: this.form.afterTime,
          ageFrom: this.form.ageFrom,
          ageTo: this.form.ageTo,
          anes_doc_no: this.form.anes_doc_no,
          asa_class: this.form.asa_class,
          beforeTime: this.form.beforeTime,
          dept_code: this.form.dept_code,
          // is_emergency: this.form.is_emergency,
          is_emergency: '',
          notch_level: this.form.notch_level,
          ope_grade_code: this.form.ope_grade_code,
          ope_code_after: this.form.ope_code_after,
          ope_room: this.form.ope_room,
          operationAfterState: this.form.operationAfterState,
          operationBeforeState: this.form.operationBeforeState,
          operation_position: this.form.operation_position,
          operation_state_name: this.form.operation_state_name[0],
          patient_gender: this.form.patient_gender,
          pt_next_location: this.form.pt_next_location,
          surgeon_no: this.form.surgeon_no,
          anes_method_no: this.form.anes_method_no
        }
      }).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.list
          this.pageSize = res.data.data.pageSize
          this.totalSize = res.data.data.total
          this.totalPages = res.data.data.totalPage
        } else {
          this.tableData = []
        }
      })
    },
    getRoomList () {
      request({
        url: roomNoList
      }).then(res => {
        this.roomList = res.data.data
      })
    },
    handleChange (arr) {
      this.form.operation_state_name.length > 1 && this.form.operation_state_name.shift()
      this.$nextTick(() => {
        const val =
          this.form.operation_state_name.length > 0 ? this.form.operation_state_name[0] : ''
        console.log(val)
      })
    },
    handleChangePage (param) {
      switch (param) {
        case 1:
          if (this.currentPage < this.totalPages) {
            this.currentPage = this.currentPage + 1
          } else {
            this.currentPage = 1
          }
          break
        case -1:
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
          } else {
            this.currentPage = 1
          }
          break
        case 0:
          this.currentPage = 1
          break
        case 2:
          this.currentPage = this.totalPages
          break
      }
      this.getData()
    },
    getAsaData () {
      request({
        url: commonTermsDetail + '/D009'
      }).then(res => {
        this.asaLevelList = res.data.data
      })
    },
    getOpePositionData () {
      request({
        url: commonTermsDetail + '/D011'
      }).then(res => {
        this.opePositionList = res.data.data
      })
    },
    handleExport () {
      request(
        {
          method: 'post',
          url: getSurgeonWorkName + `?surgeonCode=${this.form.surgeonCode}`,
          data: {
            afterTime: this.form.afterTime,
            beforeTime: this.form.beforeTime,
            operationAfterState: this.form.operationAfterState,
            operationBeforeState: this.form.operationBeforeState
          }
        }
      ).then(res => {
        if (res.data.data) {
          this.exportExcel(res.data.data)
        }
      })
    },
    exportExcel (param) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: exportExcel + `/${param}`
          // saveUrl: result[0]
        }))
    }
  },
  mounted () {
    this.getData()
    this.getRoomList()
    this.getAsaData()
    this.getOpePositionData()
    // this.getDeptList()
  }
}
</script>

<style lang="scss" scoped>
.search-statistics {
  position: relative;
  color: #9ba3d5;
  font-size: 14px;
  height: 100%;
  .top {
    padding: 20px 0 0 20px;
    .el-form{
      &:first-child{
        display: flex;
        justify-content: space-between;
      }
    }
    .el-checkbox {
      margin-right: 10px;
      /deep/ .el-checkbox__label{
        padding-left: 6px;
      }
    }
    .el-radio{
      margin-right: 10px;
      /deep/ .el-radio__label{
        padding-left:6px;
      }
    }
    height: 220px;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    box-sizing: border-box;
  }
  .table {
    margin-top: 20px;
    padding: 20px 10px 0;
    padding-top: unset;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 5px;
    height: calc(100% - 240px);
    overflow: hidden;
    .xTable{
      margin-top: 20px;
      height: calc(100% - 76px);
      /deep/ .vxe-table--main-wrapper{
        height: 100%;
        /deep/ .vxe-table--body-wrapper{
          height: calc(100% - 36px);
        }
      }
    }
  }
}
</style>
