<template>
  <div class="schedule clearfix">
    <div class="left">
      <div class="option">
        <el-row>
          <el-col :span="13">
            <el-date-picker
              v-model="timeDate"
              type="date"
              placeholder="选择日期"
              style="width:95%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              popper-class="dateTimePicker"
              @change="changeData"
              size="mini"
            />
          </el-col>
          <el-col :span="11">
            <el-select
              v-model="type"
              placeholder="楼层"
              style="width:100%"
              size="mini"
            >
              <el-option value="6" />
              <el-option value="7" />
              <el-option value="8" />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input
              size="mini"
              placeholder="请输入内容"
              v-model="searchContent"
              class="input-with-select"
              style="100%"
            >
              <el-select
                v-model="select"
                slot="prepend"
                placeholder="选择"
                width="80px"
              >
                <el-option
                  label="病区"
                  value="1"
                />
                <el-option
                  label="医师"
                  value="2"
                />
                <el-option
                  label="手术"
                  value="3"
                />
                <el-option
                  label="病人"
                  value="4"
                />
              </el-select>
              <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div
        class="unallocated"
        ref="unallocated"
      >
        <el-collapse
          accordion
          size="mini"
          v-model="defaultCollapse"
        >
          <el-collapse-item name="A">
            <template slot="title">
              手术({{ list.length }})
            </template>
            <div class="collapse-height">
              <Unallocated
                :time="timeDate"
                :select="select"
                @changePatientDetail="changePatientDetail"
              />
              <!-- :list="list" -->
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="主麻医生"
            name="B"
          >
            <div class="collapse-height">
              <List
                :context-menu-data="contextMenuData3"
                :data-list="doctorList"
                @handleDistribute="handleDistributeDoctor"
                @selectCurrent="selectCurrentPerson"
                @handleDocConfig="handleDocConfig"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="副麻医生"
            name="C"
          >
            <div class="collapse-height">
              <List
                :context-menu-data="contextMenuData4"
                :data-list="doctorList"
                @handleDistribute="handleDistributeDoctor"
                @selectCurrent="selectCurrentPerson"
                @handleDocConfig="handleDocConfig"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="洗手护士"
            name="D"
          >
            <div class="collapse-height">
              <List
                :context-menu-data="contextMenuData5"
                :data-list="nurseList"
                @handleDistribute="handleDistributeDoctor"
                @selectCurrent="selectCurrentPerson"
                @handleDocConfig="handleDocConfig"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item
            title="巡回护士"
            name="E"
          >
            <div class="collapse-height">
              <List
                :context-menu-data="contextMenuData6"
                :data-list="nurseList"
                @handleDistribute="handleDistributeDoctor"
                @selectCurrent="selectCurrentPerson"
                @handleDocConfig="handleDocConfig"
              />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="right">
      <div
        class="content"
        @contextmenu="showMenu7"
      >
        <div
          v-show="!showSwitch"
          class="content-info"
        >
          <div class="allocated">
            <Allacate
              :data="allacatedList"
              @handleSimpleApply="handleSimpleApply"
            />
          </div>
          <div class="patient-detail">
            申请时间：
            <span>{{ patientBasBasicInfo.opeScheduleTime }}</span> 病区：
            <span>{{ patientBasBasicInfo.inpatientWard }}</span> 床位:
            <span>{{ patientBasBasicInfo.bedId }}</span> 住院号：
            <span>{{ patientBasBasicInfo.visitId }}</span> 医师：
            <span>{{ patientBasBasicInfo.surgeon }}</span>
            手术：
            <span>{{ patientBasBasicInfo.operation }}</span> 病人姓名：
            <span>{{ patientBasBasicInfo.ptName }}</span> 诊断：
            <span>{{ patientBasBasicInfo.diagnose }}</span> 备注：
            <span>{{ patientBasBasicInfo.diagnose }}</span>
          </div>
          <div class="room">
            <Room
              :time="this.timeDate"
              @handleClear="handleClear"
              @submitRoomAll="submitRoomAll"
              @handleChangeRoom="handleChangeRoom('2')"
              @roomConfig="roomConfig"
            />
            <Option @showPreview="showPreview" />
          </div>
        </div>
        <div
          v-show="showSwitch"
          class="switch"
        >
          <switch-list v-if="showSwitch" />
        </div>
        <vue-context-menu
          :context-menu-data="contextMenuData7"
          @handleShowSwitch="handleShowSwitch"
          @submitSimple="submitRoomAll"
          @handleChangeRoom="handleChangeRoom('1')"
          @handleClear1="handleClear(1)"
          @handleClear2="handleClear(2)"
          @handleClear3="handleClear(3)"
          @handleClear4="handleClear(4)"
          @handleClear5="handleClear(5)"
          @handleClear6="handleClear(6)"
          @handleClear7="handleClear(7)"
          @handleClear8="handleClear(8)"
          @handleClear9="handleClear(9)"
        />
      </div>
      <div class="records">
        <with-draw @handleWithdraw="handleWithdraw" />
      </div>
    </div>
    <operation-doc
      :doctor-visible="doctorVisible"
      :doctor-list="doctorList"
    />
    <doc-config
      v-if="configVisible"
      :config-visible="configVisible"
      :config-title="configTitle"
      :config-form="configForm"
      @handleClose="handleClose"
    />
    <change-dialog
      v-if="changeVisible"
      :change-title="changeTitle"
      :change-type="changeType"
      :select-allocated="selectAllocated"
      :change-visible="changeVisible"
      :allacated-list="allacatedList"
      @handleClose="handleClose"
      @clearSelectAllocation="clearSelectAllocation"
    />
    <Preview
      v-if="previewVisible"
      :time-data="timeDate"
      :preview-visible="previewVisible"
      @handleClose="handleClose"
    />
    <room-config
      v-if="roomVisible"
      :room-visible="roomVisible"
      @handleClose="handleClose"
    />
  </div>
</template>
<script>
import {
  // getAnaesMethods,
  getSwitchList,
  submitSimpleApply,
  configMaxDefalut,
  // submitRoomConfig,
  getDocList,
  getNurseList,
  distributeMainAnaes,
  distributeSubAnaes,
  distributeHangNurse,
  distributeWashNurse,
  cancelClearDistribute,
  clearAllRoomData,
  getAllocatedList
} from '@/api/schedule'
import moment from 'moment'
import Unallocated from './components/unAllacated'
import Allacate from './components/allacated'
import List from './components/list'
import Room from './components/room'
import request from '@/utils/requestForMock'
import { mapActions, mapGetters } from 'vuex'
import RoomConfig from './components/roomConfig'
import ChangeDialog from './components/change-dialog'
import DocConfig from './components/doc-config'
import WithDraw from './components/withdraw'
import OperationDoc from './components/operation-doc'
import Option from './components/option'
import Preview from './components/preview'
import SwitchList from './components/switch-list'

import {
  // addOperationRoom,
  getDepartmentList
} from '../../api/system'
export default {
  name: 'Scheduling',
  data () {
    return {
      allacatedList: [],
      dept: '',
      roomVisible: false,
      changeTitle: '',
      checkAll: false,
      isIndeterminate: true,
      changeVisible: false,
      changeContent: [
        {
          label: '主麻',
          value: 'A'
        },
        {
          label: '副麻1',
          value: 'B'
        },
        {
          label: '副麻2',
          value: 'C'
        },
        {
          label: '副麻3',
          value: 'D'
        },
        {
          label: '洗手1',
          value: 'E'
        },
        {
          label: '洗手2',
          value: 'F'
        },
        {
          label: '巡回1',
          value: 'G'
        },
        {
          label: '巡回2',
          value: 'H'
        }
      ],
      checkedContent: [],
      configVisible: false,
      configForm: {
        name: '',
        max: '',
        no: '',
        room: '',
        userId: ''
      },
      switchList: [], // 交换列表信息
      detail: {},
      select: '1',
      showSwitch: false,
      defaultCollapse: 'A', // collapse默认展开项
      doctorVisible: false, // 分配医生弹窗
      contextMenuData7: {
        menuName: 'demo7',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '切换',
            fnHandler: 'handleShowSwitch'
          },
          {
            btnName: '提交',
            fnHandler: 'submitSimple'
          },
          {
            btnName: '清空',
            children: [
              {
                btnName: '清空全部',
                fnHandler: 'handleClear1'
              },
              {
                btnName: '主麻医师',
                fnHandler: 'handleClear2'
              },
              {
                btnName: '副麻医师1',
                fnHandler: 'handleClear3'
              },
              {
                btnName: '副麻医师2',
                fnHandler: 'handleClear4'
              },
              {
                btnName: '副麻医师3',
                fnHandler: 'handleClear5'
              },
              {
                btnName: '洗手护士1',
                fnHandler: 'handleClear6'
              },
              {
                btnName: '洗手护士2',
                fnHandler: 'handleClear7'
              },
              {
                btnName: '洗手护士3',
                fnHandler: 'handleClear8'
              },
              {
                btnName: '巡回护士1',
                fnHandler: 'handleClear9'
              },
              {
                btnName: '巡回护士2',
                fnHandler: 'handleClear10'
              },
              {
                btnName: '巡回护士3',
                fnHandler: 'handleClear11'
              }
            ]
          },
          {
            btnName: '更换手术间',
            fnHandler: 'handleChangeRoom'
          }
        ]
      },
      recordsList: [], // 分配操作记录列表
      currentId: null, // 当前手术间
      roomList: [], // 房态图列表数据
      form: {
        name: '',
        region: '',
        date: ''
      },
      date: '',
      type: '',
      h: 0,
      previewVisible: false, // 控制预览弹窗显示隐藏
      currentApplyDoc: '', // 当前待分配医生的手术申请,
      detailVisible: false, // 控制详情页显示隐藏
      selectValue: '', // 选择搜索类型
      doctorList: [], // 医生列表
      nurseList: [], // 护士列表
      anaesList: [], // 麻醉方法列表
      timeDate: moment(new Date()).format('yyyy-MM-DD'), // 时间
      allocatedList: [], // 当前手术间申请
      tableData: [],
      searchContent: '', // 待分配区搜索内容,
      detailForm: {},
      currentDocOrNur: {}, // 单击选中当前医护
      contextMenuData3: {
        menuName: 'demo3',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '医生设置',
            fnHandler: 'handleDocConfig'
          }
        ]
      },
      contextMenuData4: {
        menuName: 'demo4',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '医生设置',
            fnHandler: 'handleDocConfig'
          }
        ]
      },
      contextMenuData5: {
        menuName: 'demo5',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '护士设置',
            fnHandler: 'handleDocConfig'
          }
        ]
      },
      contextMenuData6: {
        menuName: 'demo6',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '护士设置',
            fnHandler: 'handleDocConfig'
          }
        ]
      },
      selectAllocated: {},
      configTitle: '医生配置',
      userId: '',
      changeType: '1',
      currentPage: 1,
      maxCount: null, // 最大
      deptList: [],
      detailTime: '',
      list: [],
      patientBasBasicInfo: {} // 患者基本信息--new
    }
  },
  components: {
    Unallocated,
    Allacate,
    List,
    Room,
    RoomConfig,
    SwitchList,
    ChangeDialog,
    DocConfig,
    OperationDoc,
    WithDraw,
    Option,
    Preview
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom'])
  },

  watch: {
    defaultCollapse: {
      handler (newValue, oldValue) {
        if (newValue !== 'A') {
          document.querySelector('.el-input-group__prepend').style.display =
            'none'
        } else {
          document.querySelector('.el-input-group__prepend').style.display =
            'table-cell'
        }
        if (newValue === 'B' || newValue === 'C') {
          this.configTitle = '医生配置'
        } else if (newValue === 'D' || newValue === 'E') {
          this.configTitle = '护士配置'
        }
      },
      deep: true
    }
    // immediate: true
  },
  methods: {
    ...mapActions('Schedule', ['setTime']),
    // 切换患者基本信息
    changePatientDetail (row) {
      this.patientBasBasicInfo = row
    },
    // 获取当前排班列表数据
    getData () {
      request({
        url: getAllocatedList + `/${this.currentRoom.roomNo}/${this.timeDate}`
      }).then((res) => {
        const data = res.data.data
        data.forEach((item) => {
          item.subDoc = (
            item.firstAnesDocName +
            ',' +
            item.secAnesDocName +
            ',' +
            item.thirdAnesDocName
          )
            .replace(/^,+/, '')
            .replace(/,+$/, '')
          item.washNurse = (
            item.firstOpeNurseName +
            ',' +
            item.secOpeNurseName +
            ',' +
            item.thirdOpeNurseName
          )
            .replace(/^,+/, '')
            .replace(/,+$/, '')
          item.hangNurse = (
            item.firstSupplyNurseName +
            ',' +
            item.secSupplyNurseName +
            ',' +
            item.thirdSupplyNurseName
          )
            .replace(/^,+/, '')
            .replace(/,+$/, '')
        })
        this.$eventHub.$emit('clearSelectAllocation')
        this.allacatedList = data
      })
    },
    getDepartmentList () {
      const formData = new FormData()
      formData.append('start', this.currentPage)
      formData.append('pageSize', 10)
      getDepartmentList(formData).then((res) => {
        this.deptList = res.deptDictList
        // this.allCount = res.count;
      })
    },
    handleCheckAllChange (val) {
      const arr = []
      this.changeContent.forEach((value) => {
        arr.push(value.value)
      })
      this.checkedContent = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedContentChange (value) {
      console.log(value.length)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.changeContent.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changeContent.length
    },
    // 切换时间获取数据
    changeData (val) {
      this.timeDate = val
      this.setTime(val)
      setTimeout(() => {
        this.$eventHub.$emit('get-unallocated')
        this.$eventHub.$emit('get-allocated')
        this.$eventHub.$emit('get-room')
        this.$eventHub.$emit('get-records')
        this.getNurseList()
        this.getDoctorList()
      })
    },
    // 获取护士列表
    getNurseList () {
      request({
        url: getNurseList + '/' + this.timeDate
      }).then((res) => {
        const data = res.data.data
        this.nurseList = data
      })
    },
    // 获取医生列表
    getDoctorList () {
      request({
        url: getDocList + '/' + this.timeDate
      }).then((res) => {
        const data = res.data.data
        this.doctorList = data
      })
    },
    // 获取麻醉方法列表
    // async getAnaesMethods () {
    //   const res = await getAnaesMethods()
    //   // let arr = [];
    //   res.forEach((value) => {
    //     value.userName = value.anaesthesiaName
    //     value.userId = value.id
    //   })
    //   this.anaesList = res
    // },
    // 双击显示详情页
    handleDetailVisible ({ row }) {
      if (row.state === 1) {
        this.detailVisible = true
      } else {
        this.$message({
          message: '当前手术申请已提交',
          type: 'warning'
        })
        return
      }
      this.detailForm = JSON.parse(JSON.stringify(row))
      this.detailTime = this.timeDate + ' ' + row.scheduledDateTime
      // this.detailForm.scheduledDateTime = this.timeDate + ' ' + row.scheduledDateTime;
    },
    distribute (row) {
      if (row.state === 2) {
        this.$message({
          message: '当前手术申请已提交',
          type: 'warning'
        })
        return
      }
      this.doctorVisible = true
      this.detailForm = JSON.parse(JSON.stringify(row))
      this.currentApplyDoc = row.id
    },
    // 预览
    showPreview () {
      this.previewVisible = true
      // this.getPreviewList()
    },
    handlerClearList () {
      this.recordsList = []
    },
    showMenu7 () {
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      this.contextMenuData7.axis = {
        x,
        y
      }
    },

    // 双击分配护士，麻醉医生等信息 --new
    handleDistributeDoctor (item, i) {
      switch (this.defaultCollapse) {
        case 'B':
          this.arrangeOpeMainDoc(item.userId, item.result)
          break
        case 'C':
          this.arrangeOpeSubDoc(item.userId, item.result)
          break
        case 'D':
          this.arrangeWashNurse(item.userId, item.result)
          break
        case 'E':
          this.arrangeHangNurse(item.userId, item.result)
      }
    },
    // 分配主麻医生--new
    arrangeOpeMainDoc (id, result) {
      request({
        method: 'PUT',
        url:
          distributeMainAnaes +
          `/${this.currentRoom.roomNo}/${id}/${result}/${this.timeDate}`
      }).then((res) => {
        if (res.data.code === 200) {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.getNurseList()
          this.getDoctorList()
          this.$message({ type: 'success', message: '分配成功' })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 分配副麻医生--new
    arrangeOpeSubDoc (id, result) {
      request({
        method: 'PUT',
        url:
          distributeSubAnaes +
          `/${this.currentRoom.roomNo}/${id}/${result}/${this.timeDate}`
      }).then((res) => {
        if (res.data.code === 200) {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.getNurseList()
          this.getDoctorList()
          this.$message({ type: 'success', message: '分配成功' })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 分配巡回护士--new
    arrangeHangNurse (id, result) {
      request({
        method: 'PUT',
        url:
          distributeHangNurse +
          `/${this.currentRoom.roomNo}/${id}/${result}/${this.timeDate}`
      }).then((res) => {
        if (res.data.code === 200) {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.getNurseList()
          this.getDoctorList()
          this.$message({ type: 'success', message: '分配成功' })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 分配洗手护士--new
    arrangeWashNurse (id, result) {
      request({
        method: 'PUT',
        url:
          distributeWashNurse +
          `/${this.currentRoom.roomNo}/${id}/${result}/${this.timeDate}`
      }).then((res) => {
        if (res.data.code === 200) {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.getNurseList()
          this.getDoctorList()
          this.$message({ type: 'success', message: '分配成功' })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 撤销操作--new
    async handleWithdraw (sysno) {
      request({ url: cancelClearDistribute + '/' + sysno, method: 'PUT' }).then(
        (res) => {
          if (res.data.code === 200) {
            this.$eventHub.$emit('get-unallocated')
            this.$eventHub.$emit('get-allocated')
            this.$eventHub.$emit('get-room')
            this.$eventHub.$emit('get-records')
            this.getNurseList()
            this.getDoctorList()
            this.$message({ type: 'success', message: '撤销成功' })
          } else {
            this.$message({ type: 'error', message: '撤销失败' })
          }
        }
      )
    },
    handleShowDetail ({ row, column }) {
      console.log('单击')
      this.detail = JSON.parse(JSON.stringify(row))
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xTable1.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    getCurrentDate () {
      const d = new Date()
      this.date = d.getTime()
    },
    // 选择当前医护信息
    selectCurrentPerson (param) {
      this.currentDocOrNur = param
    },
    handleShowSwitch () {
      // this.getSwitchList()
      this.showSwitch = !this.showSwitch
    },
    // 获取切换列表信息
    getSwitchList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      getSwitchList(formData).then((res) => {
        this.switchList = res
      })
    },
    // 提交手术间所有
    submitRoomAll () {
      this.$eventHub.$emit('submit-all')
    },
    // 提交手术间单条手术申请---new
    submitSimple () {
      if (this.allocatedList.length > 0) {
        if (this.selectAllocated.state === '2') {
          this.$message({
            message: '该手术申请已提交',
            type: 'warning'
          })
        } else if (this.selectAllocated.state === '1') {
          const formData = new FormData()
          formData.append('patientId', this.selectAllocated.patientId)
          formData.append('visitId', this.selectAllocated.visitId)
          formData.append('scheduleId', this.selectAllocated.scheduleId)
          submitSimpleApply(formData).then((res) => {
            this.getAllocatedList()
            this.getRoomList()
          })
        } else {
          this.$message({
            message: '请选择需要提交的手术',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请分配手术到手术间',
          type: 'warning'
        })
      }
    },

    // 选中单条手术申请
    handleSimpleApply (row) {
      this.selectAllocated = row
    },
    // 清空操作 1~2 --new
    handleClear (param) {
      const arr = []
      this.allacatedList.forEach((item) => {
        if (item.state === '1') {
          arr.push({
            opeScheduleTime: item.opeScheduleTime,
            opeRoom: item.opeRoom,
            operationId: item.operationId,
            patientId: item.patientId
          })
        }
      })
      if (arr.length > 0) {
        request({
          method: 'POST',
          url: clearAllRoomData + '/' + param,
          data: arr
        }).then((res) => {
          if (res.data.code === 200) {
            this.$eventHub.$emit('get-unallocated')
            this.$eventHub.$emit('get-allocated')
            this.$eventHub.$emit('get-room')
            this.$eventHub.$emit('get-records')
            this.getNurseList()
            this.getDoctorList()
            this.$message({ type: 'success', message: '清空成功' })
          } else {
            this.$message({ type: 'error', message: '清空失败' })
          }
        })
      } else {
        this.$message({ type: 'warning', message: '当前手术间无待提交申请' })
      }
    },
    // 开启医生配置弹框--new
    handleDocConfig (param) {
      this.configVisible = true
      this.configForm.userId = param.userId
      this.configForm.name = param.result
      if (param.defaultOperoomNo === '') {
        this.configForm.room = []
      } else {
        this.configForm.room = param.defaultOperoomNo.split(',')
      }
      this.configForm.max = param.maxOperoomCount
    },
    // 清除部分区域右击事件
    clearContextMenu () {
      const detail = this.$refs.detail
      const title = this.$refs.title
      detail.oncontextmenu = function (e) {
        return false
      }
      title.oncontextmenu = function (e) {
        return false
      }
    },
    // 提交配置信息
    submitConfig () {
      const formData = new FormData()
      formData.append('userId', this.userId)
      formData.append('number', this.configForm.no)
      formData.append('maxOperatingRoom', this.configForm.max)
      formData.append('defaultOperatingRoom', this.configForm.room)
      configMaxDefalut(formData).then((res) => {
        this.configVisible = false
        this.getDoctorList()
        this.getNurseList()
        this.$message({
          message: '配置成功',
          type: 'success'
        })
      })
    },
    // 清空当前选中手术列表
    clearSelectAllocation () {
      this.selectAllocated = {}
    },
    // 手术间内容更换操作
    handleChangeRoom (param) {
      this.changeType = param
      if (param === '1') {
        if (this.allacatedList.length > 0) {
          if (this.selectAllocated.operationId) {
            if (this.selectAllocated.state === '2') {
              this.$message({ type: 'warning', message: '该手术申请已提交' })
              return
            } else {
            }
          } else {
            this.$message({ type: 'warning', message: '请选择手术申请' })
            return
          }
        } else {
          this.$message({ type: 'warning', message: '当前手术间无申请信息' })
          return
        }
        this.changeTitle = '更换手术间'
      } else {
        this.changeTitle = '更换内容'
      }
      this.changeVisible = true
    },
    roomConfig () {
      this.roomVisible = true
    },
    // submitRoomConfig () {
    //   this.roomVisible = false
    //   const formData = new FormData()
    //   formData.append('deptCode', this.dept)
    //   formData.append('roomNo', this.currentId)
    //   formData.append('maxOperationNum', this.maxCount)
    //   submitRoomConfig(formData).then((res) => {
    //     this.getRoomList()
    //     this.$message({
    //       message: '修改成功',
    //       type: 'success'
    //     })
    //   })
    // },
    // 关闭弹窗
    handleClose () {
      this.previewVisible = false
      this.configVisible = false
      this.roomVisible = false
      this.changeVisible = false
    },
    // 左侧高度自适应
    getH () {
      this.$nextTick(() => {
        // 获取外层框
        const oH = this.$refs.unallocated
        // 获取其宽度
        const h = oH.getBoundingClientRect().height
        // let h = oH.style.height;
        const odiv = document.querySelectorAll('.collapse-height')
        // 设置其高度（以宽度的60%为例）
        for (let i = 0; i < odiv.length; i++) {
          odiv[i].style.height = h - 150 + 'px'
        }
      })
      // 2、挂载 reisze 事件 → 屏幕缩放时监听宽度变化
      window.onresize = () => {
        return (() => {
          this.$nextTick(() => {
            const oH = this.$refs.unallocated
            // 获取其宽度
            if (oH) {
              const h = oH.getBoundingClientRect().height
              // let h = oH.style.height;
              const odiv = document.querySelectorAll('.collapse-height')
              for (let i = 0; i < odiv.length; i++) {
                odiv[i].style.height = h - 150 + 'px'
                // odiv.height = (h - 150)  + 'px';
              }
            }
          })
        })()
      }
    }
  },

  created () {},
  async mounted () {
    this.getNurseList()
    this.getDoctorList()
    this.getData()
    this.$eventHub.$on('get-allocated', () => {
      this.getData()
    })
    this.$eventHub.$on('clearSelectAllocation', () => {
      this.clearSelectAllocation()
    })
    this.$eventHub.$on('get-DocNurse', () => {
      this.getNurseList()
      this.getDoctorList()
    })
    this.$eventHub.$on('handle-close', () => {
      this.handleClose()
    })
    this.getH()
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.schedule {
  width: 100%;
  height: 100%;
  .left {
    width: 500px;
    height: 100%;
    float: left;
    @include theme-property("background", $background-schedule);
    // @include theme-property("box-shadow", $box-shadow-card);
    // background: rgba(24, 28, 39, 1);
    // box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    overflow: hidden;
    .option {
      padding: 0 10px;
      .el-row {
        margin: 10px 0;
      }
    }
    .el-collapse {
      border: unset;
    }
    .unallocated {
      height: calc(100% - 86px);
    }
    /deep/ .el-input-group__prepend{
      width:80px;
      @include theme-property("color", $color-text-regular);
      @include theme-property("background", $background-schedule-list);
    }
    /deep/ .el-select .el-input__inner:focus{
      @include theme-property("border-color", $background-schedule-list);
    }
  }
  .right {
    width: calc(100% - 510px);
    float: right;
    padding: 10px;
    height: 100%;
    @include theme-property("background", $background-schedule);
    // box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    .content {
      height: calc(100% - 110px);
      .switch {
        height: 100%;
      }
      .content-info {
        height: 100%;
      }
    }
    .allocated {
      height: 220px;
      // @include theme-property("border", $border-event-left);
      // border: 1px solid rgba(57, 66, 92, 1);
      border-radius: 5px;
    }
    .patient-detail {
      padding-left: 10px;
      height: 60px;
      @include theme-property("border", $border-event-left);
      border-radius: 5px;
      font-size: 14px;
      margin: 10px 0;
      @include theme-property("color", $color-text-regular);
      line-height: 60px;
      span {
        color: #d0dae5;
      }
    }
    .room {
      height: calc(100% - 300px);
      @include theme-property("border", $border-event-left);
      border-radius: 5px;
      overflow: hidden;
    }
    .records {
      height: 100px;
      @include theme-property("border", $border-event-left);
      @include theme-property("color", $color-text-regular);
      border-radius: 5px;
      margin-top: 10px;
    }
  }
}
// .schedule /deep/ .el-input-group__prepend {
//   background: #252c40;
// }
.schedule /deep/ .el-collapse-item__header {
  height: 30px;
  // background: #252c40;
  @include theme-property("background", $background-schedule-list);
  @include theme-property("color", $color-text-regular);
  // color: #9ba3d5;
  // border-bottom: 1px solid #000;
  @include theme-property("border-color", $background-schedule);
  padding: 0 0 0 10px;
}
.schedule /deep/ .el-collapse-item__wrap {
  // background: #252c40;
  // $background-schedule-list-item
  @include theme-property("background", $background-schedule-list-item);
  @include theme-property("border-color", $background-schedule-list-item);
  // border-bottom: 1px solid #000;
  .el-collapse-item__content {
    padding-bottom: unset;
  }
}
.schedule /deep/ .vue-contextmenu-listWrapper {
  width: 180px;
  @include theme-property('background', $dateTimePicker-color-background);
  @include theme-property('border-color', $dateTimePicker-color-border);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding-left: 30px;
  .context-menu-list {
    // background: #39425c;
    @include theme-property('background', $background-dialog);
    line-height: 28px;
    @include theme-property('color', $color-text-regular);
    margin: unset;
    .btn-wrapper-simple {
      height: 28px;
      line-height: 28px;
      .nav-name-right {
        line-height: 28px;
        height: 28px;
      }
      .icon {
        top: 10px;
        border-left: 8px solid #9ba3d5;
      }
    }
    .no-child-btn {
      padding: unset;
      &:hover {
        @include theme-property('color', $color-text-primary);
      }
    }
    .has-child {
      padding: unset;
    }
  }
}
.schedule /deep/ .child-ul-wrapper {
  @include theme-property('background', $dateTimePicker-color-background);
  @include theme-property('border-color', $dateTimePicker-color-border);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  .child-li-wrapper {
    &:hover {
      background: unset;
    }
  }
}
</style>
