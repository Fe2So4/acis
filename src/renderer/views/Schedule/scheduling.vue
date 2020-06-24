<template>
  <div class="schedule">
    <div class="schedule-left">
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
              @change="changeData"
            />
          </el-col>
          <el-col :span="11">
            <el-select
              v-model="type"
              placeholder="楼层"
              style="width:100%"
            >
              <el-option value="6" />
              <el-option value="7" />
              <el-option value="8" />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn="24">
            <el-input
              placeholder="请输入内容"
              v-model="searchContent"
              class="input-with-select"
              style="100%"
            >
              <el-select
                v-model="select"
                slot="prepend"
                placeholder="选择"
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
          v-model="defaultCollapse"
        >
          <el-collapse-item name="A">
            <template slot="title">
              手术({{ list.length }})
            </template>
            <div class="collapse-height">
              <Unallocated
                @handleShowDetail="handleShowDetail"
                @handleDistributeRoom="handleDistributeRoom"
                :list="list"
              />
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
    <div class="schedule-right">
      <div
        class="right-content"
        @contextmenu="showMenu7"
      >
        <div
          class="switch-detail"
          v-show="!showSwitch"
        >
          <div class="current-room">
            <div class="floor-number">
              <div ref="title">
                手术间{{ currentId }}
              </div>
            </div>
            <div class="current-table">
              <Allacate
                :data="allocatedList"
                @handleDetailVisible="handleDetailVisible"
                @handleSimpleApply="handleSimpleApply"
                @distribute="distribute"
                @cancelSingle="cancelSingle"
                @submitRoomAll="submitRoomAll"
                @handleClear="clearRoomDocOrNurse"
                @roomConfig="roomConfig"
              />
            </div>
          </div>
          <div
            class="detail"
            ref="detail"
            @contextmenu.prevent="clearContextMenu"
          >
            <Detail :detail="detail" />
          </div>
          <div class="all-room">
            <Room
              :room-list="roomList"
              @changeRoom="changeRoom"
            />
          </div>
          <div class="submit">
            <el-button
              type="primary"
              @click="preview"
              size="mini"
            >
              提交前预览
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="submitAll"
            >
              提交
            </el-button>
            <!-- <el-button type="primary" @click="getCurrentTime">重置</el-button> -->
          </div>
        </div>
        <div
          class="switch-all"
          v-show="showSwitch"
        >
          <switch-list :switch-list="switchList" />
        </div>
        <vue-context-menu
          :context-menu-data="contextMenuData7"
          @handleShowSwitch="handleShowSwitch"
          @submitSimple="submitSimple"
          @handleChangeRoom="handleChangeRoom(1)"
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
      <!-- 撤回区域-->
      <div class="withdraw">
        <with-draw
          :records-list="recordsList"
          @handleWithdraw="handleWithdraw"
        />
      </div>
    </div>
    <operation-doc
      :doctor-visible="doctorVisible"
      :doctor-list="doctorList"
    />
    <allocated-detail :detail-visible="detailVisible" />
    <doc-config
      :config-visible="configVisible"
      :config-title="configTitle"
    />
    <change-dialog
      :change-title="changeTitle"
      :change-visible="changeVisible"
    />
    <Preview
      :time-data="timeData"
      :preview-visible="previewVisible"
    />
    <room-config :room-visible="roomVisible" />
  </div>
</template>
<script>
// import Document from './components/document.vue'
import List from './components/list'
import Room from './components/room'
import Allacate from './components/allacated'
import Detail from './components/detail'
import WithDraw from './components/withdraw'
import Unallocated from './components/unAllacated'
import Preview from './components/preview'
import SwitchList from './components/switch-list'
import RoomConfig from './components/roomConfig'
import ChangeDialog from './components/change-dialog'
import DocConfig from './components/doc-config'
import OperationDoc from './components/operation-doc'
import AllocatedDetail from './components/allocated-detail'
import {
  getUnallocatedList,
  getNurseList,
  getDoctorList,
  arrangeOpeRoom,
  arrangeOpeMainDoc,
  arrangeOpeSubDoc,
  arrangeWashNurse,
  arrangeHangNurse,
  withDraw,
  getRoomList,
  getAllocatedList,
  getRecordsList,
  getAnaesMethods,
  getSwitchList,
  submitRoomAll,
  submitSimple,
  clearDocOrNurse,
  configMaxDefalut,
  updateRoomContent,
  updateRoom,
  cancelSingle,
  submitRoomConfig,
  submitEditDetail,
  submitAll,
  distributeOpeDoc
} from '../../api/schedule'
import {
  // addOperationRoom,
  getDepartmentList
} from '../../api/system'
import XEUtils from 'xe-utils'
export default {
  name: 'Scheduling',
  data () {
    return {
      dept: '',
      roomVisible: false,
      changeTitle: '',
      checkAll: false,
      isIndeterminate: true,
      changeVisible: false,
      changeContent: [{
        label: '主麻',
        value: 'A'
      }, {
        label: '副麻1',
        value: 'B'
      },
      {
        label: '副麻2',
        value: 'C'
      }, {
        label: '副麻3',
        value: 'D'
      }, {
        label: '洗手1',
        value: 'E'
      }, {
        label: '洗手2',
        value: 'F'
      },
      {
        label: '巡回1',
        value: 'G'
      }, {
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
        room: ''
      },
      switchList: [], // 交换列表信息
      detail: {},
      select: '1',
      input3: '',
      showSwitch: false,
      labelPosition: 'left',
      defaultCollapse: 'A', // collapse默认展开项
      doctorVisible: false, // 分配医生弹窗
      transferIndex1: null,
      contextMenuData7: {
        menuName: 'demo7',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '切换',
          fnHandler: 'handleShowSwitch'
        },
        {
          btnName: '提交',
          fnHandler: 'submitSimple'
        },
        {
          btnName: '清空',
          children: [{
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
            btnName: '巡回护士1',
            fnHandler: 'handleClear8'
          },
          {
            btnName: '巡回护士2',
            fnHandler: 'handleClear9'
          }
          ]
        },
        {
          btnName: '更换手术间',
          fnHandler: 'handleChangeRoom'
        }
        ]
      },
      operationDocList: [],
      recordsList: [], // 分配操作记录列表
      currentId: null, // 当前手术间
      // detail: {},
      roomList: [], // 房态图列表数据
      activeIndex: 1,
      roomIndex: 0,
      activeName: 'first',
      form: {
        name: '',
        region: '',
        date: ''
      },
      date: '',
      value1: '',
      floor: '',
      type: '',
      showTable: true,
      h: 0,
      previewVisible: false, // 控制预览弹窗显示隐藏
      currentApplyDoc: '', // 当前待分配医生的手术申请,
      detailVisible: false, // 控制详情页显示隐藏
      selectValue: '', // 选择搜索类型
      doctorList: [], // 医生列表
      nurseList: [], // 护士列表
      anaesList: [], // 麻醉方法列表
      timeDate: '', // 时间
      allocatedList: [], // 当前手术间申请
      tableData: [],
      searchContent: '', // 待分配区搜索内容,
      detailForm: {},
      selectAnaesMethod: '',
      selectMainDoc: '',
      selectSubDoc1: '',
      selectSubDoc2: '',
      selectSubDoc3: '',
      selectWashNurse1: '',
      selectWashNurse2: '',
      selectHangNurse1: '',
      selectHangNurse2: '',
      remarks: '', // 备注
      currentDocOrNur: {}, // 单击选中当前医护
      contextMenuData3: {
        menuName: 'demo3',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '医生设置',
          fnHandler: 'handleDocConfig'
        }]
      },
      contextMenuData4: {
        menuName: 'demo4',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '医生设置',
          fnHandler: 'handleDocConfig'
        }]
      },
      contextMenuData5: {
        menuName: 'demo5',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '护士设置',
          fnHandler: 'handleDocConfig'
        }]
      },
      contextMenuData6: {
        menuName: 'demo6',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '护士设置',
          fnHandler: 'handleDocConfig'
        }]
      },
      selectAllocated: {},
      configTitle: '医生配置',
      roomNoList: [],
      userId: '',
      arrangeRoom: '',
      changeType: 1,
      // changeTitle: '更换手术间',
      currentPage: 1,
      maxCount: null, // 最大
      deptList: [],
      detailTime: '',
      unsubmitList: []
    }
  },
  components: {
    Unallocated,
    Detail,
    List,
    Room,
    Allacate,
    WithDraw,
    Preview,
    RoomConfig,
    SwitchList,
    ChangeDialog,
    DocConfig,
    OperationDoc,
    AllocatedDetail
  },
  computed: {
    list () {
      const filterName = XEUtils.toString(this.searchContent).trim().toLowerCase()
      let searchProps = []
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        if (this.select === 1) {
          searchProps = ['inpatientWard']
        } else if (this.select === 2) {
          searchProps = ['surgeon']
        } else if (this.select === 3) {
          searchProps = ['operationName']
        } else {
          searchProps = ['patientName']
        }
        // const searchProps = ['patientName', 'inpatientWard'];
        const rest = this.tableData.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase()
          .indexOf(filterName) > -1))
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match =>
              `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      }
      return this.tableData
    }
  },

  watch: {
    defaultCollapse: {
      handler (newValue, oldValue) {
        if (newValue !== 'A') {
          document.querySelector('.el-input-group__prepend').style.display = 'none'
        } else {
          document.querySelector('.el-input-group__prepend').style.display = 'table-cell'
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
    getDepartmentList () {
      const formData = new FormData()
      formData.append('start', this.currentPage)
      formData.append('pageSize', 10)
      getDepartmentList(formData).then(res => {
        this.deptList = res.deptDictList
        // this.allCount = res.count;
      })
    },
    handleCheckAllChange (val) {
      const arr = []
      this.changeContent.forEach(value => {
        arr.push(value.value)
      })
      this.checkedContent = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedContentChange (value) {
      console.log(value.length)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.changeContent.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.changeContent.length
    },
    // 初始化时间
    initDate () {
      const d = new Date()
      const y = d.getFullYear()
      let m = d.getMonth() + 1
      let dd = d.getDate()
      if (m > 0 && m <= 9) m = '0' + m
      if (dd > 0 && dd <= 9) dd = '0' + dd
      this.timeDate = y + '-' + m + '-' + dd
    },
    // 切换时间获取数据
    changeData () {
      this.getUnallocatedList()
      this.getRoomList()
      this.getAllocatedList()
      this.getNurseList()
      this.getDoctorList()
    },
    // 获取房态图
    async getRoomList () {
      const formData = new FormData()
      this.roomNoList = []
      formData.append('date', this.timeDate)
      await getRoomList(formData).then(res => {
        const arr = res
        arr.forEach(value => {
          value.percentage = (value.number / value.maxCount) * 100
          value.tip = value.number + '/' + value.maxCount
          this.roomNoList.push(value.roomNo)
        })
        this.roomList = arr
        // this.currentId = res[0].roomNo;
        // this.getWidth();
      })
    },
    // 获取护士列表
    getNurseList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      getNurseList(formData).then(res => {
        this.nurseList = res
      })
    },
    // 获取医生列表
    getDoctorList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      getDoctorList(formData).then(res => {
        this.doctorList = res
      })
    },
    // 获取待分配手术申请
    getUnallocatedList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      getUnallocatedList(formData).then(res => {
        this.tableData = res
      })
    },
    // 获取分配记录列表
    async getRecordsList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      const res = await getRecordsList(formData)
      this.recordsList = res
    },
    // 获取麻醉方法列表
    async getAnaesMethods () {
      const res = await getAnaesMethods()
      // let arr = [];
      res.forEach(value => {
        value.userName = value.anaesthesiaName
        value.userId = value.id
      })
      this.anaesList = res
    },
    // 双击显示详情页
    handleDetailVisible ({
      row
    }) {
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
    // 双击分配手术医生
    distributeOperationDoc ({
      row
    }) {
      const formData = new FormData()
      formData.append('ptId', this.detailForm.patientId)
      formData.append('scheduleId', this.detailForm.scheduleId)
      formData.append('visitId', this.detailForm.visitId)
      formData.append('surgeonId', row.userId)
      distributeOpeDoc(formData).then(res => {
        this.getRoomList()
        this.getAllocatedList()
        this.$message({
          message: '分配成功',
          type: 'success'
        })
      })
      this.doctorVisible = false
    },
    // 预览
    preview () {
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
    // 分配手术申请进入手术间
    async handleDistributeRoom ({
      row
    }) {
      const formData = new FormData()
      formData.append('ptId', row.patientId)
      formData.append('visitId', row.visitId)
      formData.append('scheduleId', row.scheduleId)
      formData.append('room', this.currentId)
      formData.append('scheduleDateTime', this.timeDate)
      await arrangeOpeRoom(formData).then(res => {
        this.getUnallocatedList()
        this.getAllocatedList()
        this.getRoomList()
        this.getRecordsList()
      })
    },
    // 实现补零操作
    addzero (time) {
      if (time >= 0 && time <= 9) {
        time = '0' + time
      }
      return time
    },
    getCurrentTime () {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const hour = d.getHours()
      const day = d.getDate()
      const minute = d.getMinutes()
      const second = d.getSeconds()
      const s = year + '/' + month + '/' + this.addzero(day) + ' ' + this.addzero(hour) + ':' + this.addzero(minute) +
          ':' + this.addzero(second)
      return s
    },
    // 双击分配护士，麻醉医生等信息
    handleDistributeDoctor (item, i) {
      switch (this.defaultCollapse) {
        case 'B':
          this.arrangeOpeMainDoc(item.userId, item.result)
          // this.getDoctorList();
          break
        case 'C':
          this.arrangeOpeSubDoc(item.userId, item.result)
          // this.getDoctorList();
          break
        case 'D':
          this.arrangeWashNurse(item.userId, item.result)
          // this.getNurseList();
          break
        case 'E':
          this.arrangeHangNurse(item.userId, item.result)
            // this.getNurseList();
      }
      // this.getRecordsList();
    },
    // 分配主麻医生
    arrangeOpeMainDoc (id, result) {
      const formData = new FormData()
      formData.append('docId', id)
      formData.append('result', result)
      formData.append('room', this.currentId)
      formData.append('date', this.timeDate)
      arrangeOpeMainDoc(formData).then(res => {
        this.getDoctorList()
        this.getAllocatedList()
        this.getRoomList()
        this.getRecordsList()
      })
    },
    // 分配副麻医生
    arrangeOpeSubDoc (id, result) {
      const formData = new FormData()
      formData.append('docId', id)
      formData.append('result', result)
      formData.append('room', this.currentId)
      formData.append('date', this.timeDate)
      arrangeOpeSubDoc(formData).then(res => {
        this.getDoctorList()
        this.getAllocatedList()
        this.getRoomList()
        this.getRecordsList()
      })
    },
    // 分配巡回护士
    arrangeHangNurse (id, result) {
      const formData = new FormData()
      formData.append('nurseId', id)
      formData.append('result', result)
      formData.append('room', this.currentId)
      formData.append('date', this.timeDate)
      arrangeHangNurse(formData).then(res => {
        this.getNurseList()
        this.getAllocatedList()
        this.getRoomList()
        this.getRecordsList()
      })
    },
    // 分配洗手护士
    arrangeWashNurse (id, result) {
      const formData = new FormData()
      formData.append('nurseId', id)
      formData.append('result', result)
      formData.append('room', this.currentId)
      formData.append('date', this.timeDate)
      arrangeWashNurse(formData).then(res => {
        this.getNurseList()
        this.getAllocatedList()
        this.getRoomList()
        this.getRecordsList()
      })
    },
    // 撤销操作
    async handleWithdraw (sysno) {
      const formData = new FormData()
      formData.append('sysno', sysno)
      await withDraw(formData)
      this.getRecordsList()
      this.getRoomList()
      this.getAllocatedList()
      this.getNurseList()
      this.getDoctorList()
      this.getUnallocatedList()
    },
    handleShowDetail ({
      row,
      column
    }) {
      console.log('单击')
      this.detail = JSON.parse(JSON.stringify(row))
    },

    selectAllEvent ({
      checked,
      records
    }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    },
    selectChangeEvent ({
      checked,
      records
    }) {
      console.log(checked ? '勾选事件' : '取消事件', records)
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xTable1.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },

    // 切换手术间
    changeRoom (item) {
      this.currentId = item.roomNo
      this.maxCount = item.maxCount
      this.getAllocatedList()
      // this.tableData2 = JSON.parse(JSON.stringify(item.tableData));
    },

    // 获取单个手术间手术申请
    async getAllocatedList () {
      this.unsubmitList = []
      const formData = new FormData()
      formData.append('date', this.timeDate)
      formData.append('roomNo', this.currentId)
      const data = await getAllocatedList(formData)
      const arr = []
      data.forEach(value => {
        value.subDoc = (value.firstDoctor + ',' + value.secondDoctor + ',' + value.thirdDoctor).replace(/^,+/,
          '').replace(/,+$/, '')
        value.washNurse = (value.washFirstNurse + ',' + value.washSecondNurse).replace(/^,+/, '').replace(/,+$/,
          '')
        value.hangNurse = (value.runFirstDoctor + ',' + value.runSecondDoctor).replace(/^,+/, '').replace(/,+$/,
          '')
        if (value.state === 1) {
          arr.push(value)
        }
      })
      this.unsubmitList = arr
      this.allocatedList = data
    },

    getCurrentDate () {
      const d = new Date()
      this.date = d.getTime()
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
          odiv[i].style.height = (h - 150) + 'px'
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
                odiv[i].style.height = (h - 150) + 'px'
                // odiv.height = (h - 150)  + 'px';
              }
            }
          })
        })()
      }
    },

    changeMainDoc (val) {
      this.selectMainDoc = val
    },
    changeSubDoc1 (val) {
      this.selectSubDoc1 = val
    },
    changeSubDoc2 (val) {
      this.selectSubDoc2 = val
    },
    changeSubDoc3 (val) {
      this.selectSubDoc3 = val
    },
    changeWashNurse1 (val) {
      this.selectWashNurse1 = val
    },
    changeWashNurse2 (val) {
      this.selectWashNurse2 = val
    },
    changeHangNurse1 (val) {
      this.selectHangNurse1 = val
    },
    changeHangNurse2 (val) {
      this.selectHangNurse2 = val
    },
    changeAnaesMethods (val) {
      this.selectAnaesMethod = val
    },
    selectOperaion1 (param) {
      this.detailForm.anaesthesiaCode = param
      // this.detailForm.surgeonCode = param;
    },
    selectOperaion2 (param) {
      this.detailForm.doctorCode = param
    },
    selectOperaion3 (param) {
      this.detailForm.firstDoctorCode = param
    },
    selectOperaion4 (param) {
      this.detailForm.secondDoctorCode = param
    },
    selectOperaion5 (param) {
      this.detailForm.thirdDoctorCode = param
    },
    selectOperaion6 (param) {
      this.detailForm.washFirstNurseCode = param
    },
    selectOperaion7 (param) {
      this.detailForm.washSecondNurseCode = param
    },
    selectOperaion8 (param) {
      this.detailForm.runFirstDoctorCode = param
    },
    selectOperaion9 (param) {
      this.detailForm.runSecondDoctorCode = param
    },
    // 确认修改手术申请详情
    handleChangeDetail () {
      const formData = new FormData()
      formData.append('patientId', this.detailForm.patientId)
      formData.append('scheduleId', this.detailForm.scheduleId)
      formData.append('visitId', this.detailForm.visitId)
      formData.append('sequence', this.detailForm.sequence)
      formData.append('scheduledDateTime', this.detailTime)
      formData.append('operationNameCode', this.detailForm.operationNameCode)
      formData.append('anaesthesiaCode', this.detailForm.anaesthesiaCode)
      formData.append('doctorCode', this.detailForm.doctorCode)
      formData.append('firstDoctorCode', this.detailForm.firstDoctorCode)
      formData.append('secondDoctorCode', this.detailForm.secondDoctorCode)
      formData.append('thirdDoctorCode', this.detailForm.thirdDoctorCode)
      formData.append('washFirstNurseCode', this.detailForm.washFirstNurseCode)
      formData.append('washSecondNurseCode', this.detailForm.washSecondNurseCode)
      formData.append('runFirstDoctorCode', this.detailForm.runFirstDoctorCode)
      formData.append('runSecondDoctorCode', this.detailForm.runSecondDoctorCode)
      formData.append('diagBeforeOperation', this.detailForm.diagBeforeOperation)
      submitEditDetail(formData).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.detailVisible = false
        this.getRoomList()
        this.getAllocatedList()
        this.getDoctorList()
        this.getNurseList()
      })
    },
    // 选择当前医护信息
    selectCurrentPerson (param) {
      this.currentDocOrNur = param
    },
    handleShowSwitch () {
      this.getSwitchList()
      this.showSwitch = !this.showSwitch
    },
    // 获取切换列表信息
    getSwitchList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      getSwitchList(formData).then(res => {
        this.switchList = res
      })
    },
    // 提交所有
    async submitAll () {
      // await this.getPreviewList()
      const arr = []
      this.previewList.forEach(value => {
        if (value.state === 1) {
          arr.push(value)
        }
      })
      if (arr.length > 0) {
        const formData = new FormData()
        formData.append('date', this.timeDate)
        submitAll(formData).then(res => {
          this.getRoomList()
          this.getAllocatedList()
          this.getNurseList()
          this.getDoctorList()
          this.previewList = []
        })
      } else {
        this.$message({
          message: '请选择正确提交内容',
          type: 'warning'
        })
      }
    },
    // 提交手术间所有
    submitRoomAll () {
      if (this.unsubmitList.length > 0) {
        const formData = new FormData()
        formData.append('roomNo', this.currentId)
        formData.append('date', this.timeDate)
        submitRoomAll(formData)
      } else {
        this.$message({
          message: '当前手术间未新分配手术',
          type: 'warning'
        })
      }
    },
    // 提交手术间单条手术申请
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
          submitSimple(formData).then(res => {
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
    handleSimpleApply ({
      row
    }) {
      this.selectAllocated = row
    },
    // 开启医生配置弹框
    handleDocConfig (param) {
      this.configVisible = true
      this.userId = param.userId
      this.configForm.name = param.result
      this.configForm.no = param.orderNumber
      this.configForm.room = param.defaultOperoomNo
      this.configForm.max = param.maxOperoomCount
    },
    // 清除部分区域右击事件
    clearContextMenu () {
      // console.log(this.$refs.detail)
      const detail = this.$refs.detail
      const title = this.$refs.title
      // let title = document.querySelector('.floor-number')
      // let detail = document.querySelector('.detail')
      detail.oncontextmenu = function (e) {
        return false
      }
      title.oncontextmenu = function (e) {
        return false
      }
    },
    // 清空手术间--医生--护士 1:清空全部 2：主麻 ~~~~ 9：巡回护士2
    clearRoomDocOrNurse (param) {
      const type = param
      // let formData = new FormData();
      const arr = []
      const obj = {}
      obj.type = type
      // formData.append('type',type);
      this.allocatedList.forEach(value => {
        arr.push({
          scheduleId: value.scheduleId,
          visitId: value.visitId,
          patientId: value.patientId
        })
      })
      obj.obj = arr
      clearDocOrNurse(obj).then(res => {
        this.getRoomList()
        this.getAllocatedList()
        this.getUnallocatedList()
        this.getNurseList()
        this.getDoctorList()
        this.getRecordsList()
      })
    },
    // 提交配置信息
    submitConfig () {
      const formData = new FormData()
      formData.append('userId', this.userId)
      formData.append('number', this.configForm.no)
      formData.append('maxOperatingRoom', this.configForm.max)
      formData.append('defaultOperatingRoom', this.configForm.room)
      configMaxDefalut(formData).then(res => {
        this.configVisible = false
        this.getDoctorList()
        this.getNurseList()
        this.$message({
          message: '配置成功',
          type: 'success'
        })
      })
    },

    // 手术间内容更换操作
    handleChangeRoom (param) {
      this.changeType = param
      if (param === 1) {
        this.changeTitle = '更换手术间'
      } else {
        this.changeTitle = '更换内容'
      }
      this.changeVisible = true
    },
    submitChangeRoom () {
      const obj = {}
      obj.oldRoom = this.currentId
      if (this.changeType === 1) {
        if (this.allocatedList.length > 0) {
          if (this.selectAllocated.patientId) {
            obj.scheduleId = this.selectAllocated.scheduleId
            obj.visitId = this.selectAllocated.visitId
            obj.patientId = this.selectAllocated.patientId
          } else {
            return
          }
        } else {
          this.$message({
            message: '当前手术间未安排手术',
            type: 'warning'
          })
          return
        }
      }
      if (this.arrangeRoom !== '') {
        obj.operatingRoomNo = this.arrangeRoom
      } else {
        this.$message({
          message: '请选择需要交换的手术间',
          type: 'warning'
        })
        return
      }
      obj.date = this.timeDate
      let secSupplyNurse = 0
      let firstSupplyNurse = 0
      let secOpeNurse = 0
      let firstOpeNurse = 0
      let firstAnesDoc = 0
      let secAnesDoc = 0
      let thirdAnesDoc = 0
      let anesDoc = 0
      const arr = this.checkedContent
      if (arr.indexOf('A') !== -1) {
        anesDoc = 1
      }
      if (arr.indexOf('B') !== -1) {
        firstAnesDoc = 1
      }
      if (arr.indexOf('C') !== -1) {
        secAnesDoc = 1
      }
      if (arr.indexOf('D') !== -1) {
        thirdAnesDoc = 1
      }
      if (arr.indexOf('E') !== -1) {
        firstOpeNurse = 1
      }
      if (arr.indexOf('F') !== -1) {
        secOpeNurse = 1
      }
      if (arr.indexOf('G') !== -1) {
        firstSupplyNurse = 1
      }
      if (arr.indexOf('H') !== -1) {
        secSupplyNurse = 1
      }
      obj.firstAnesDoc = firstAnesDoc.toString()
      obj.anesDoc = anesDoc.toString()
      obj.secAnesDoc = secAnesDoc.toString()
      obj.thirdAnesDoc = thirdAnesDoc.toString()
      obj.firstOpeNurse = firstOpeNurse.toString()
      obj.secOpeNurse = secOpeNurse.toString()
      obj.firstSupplyNurse = firstSupplyNurse.toString()
      obj.secSupplyNurse = secSupplyNurse.toString()
      if (this.changeType === 2) {
        updateRoomContent(obj).then(res => {
          this.changeVisible = false
          this.$message({
            message: '交换成功',
            type: 'success'
          })
          this.getRoomList()
          this.getAllocatedList()
        })
      } else {
        updateRoom(obj).then(res => {
          this.changeVisible = false
          this.$message({
            message: '交换成功',
            type: 'success'
          })
          this.getRoomList()
          this.getAllocatedList()
        })
      }
    },
    // 取消某台手术手术申请
    cancelSingle (row) {
      if (row.state === 2) {
        this.$message({
          message: '当前手术申请已提交',
          type: 'warning'
        })
        return
      }
      const formData = new FormData()
      formData.append('ptId', row.patientId)
      formData.append('scheduleId', row.scheduleId)
      formData.append('visitId', row.visitId)
      cancelSingle(formData).then(res => {
        this.getRoomList()
        this.getAllocatedList()
        this.getUnallocatedList()
        this.getRecordsList()
      })
    },
    roomConfig () {
      this.roomVisible = true
    },
    submitRoomConfig () {
      // submitRoomConfig()
      this.roomVisible = false
      const formData = new FormData()
      formData.append('deptCode', this.dept)
      formData.append('roomNo', this.currentId)
      formData.append('maxOperationNum', this.maxCount)
      submitRoomConfig(formData).then(res => {
        this.getRoomList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    }
  },

  created () {

  },
  async mounted () {
    this.initDate()
    // this.getAnaesMethods()
    // this.getUnallocatedList()
    // this.getNurseList()
    // this.getDoctorList()
    // this.getCurrentDate()
    // this.getDepartmentList()
    // await this.getRoomList()
    // this.currentId = this.roomList[0].roomNo
    // this.maxCount = this.roomList[0].maxCount
    // this.getAllocatedList()
    // this.getWidth();
    // window.getRightWidth = this.getWidth;
    this.getH()
  }
}
</script>
<style lang="scss" scoped>
  .schedule {
    width: 100%;
    height: 100%;
    display: flex;

    .schedule-left {
      width: 20%;
      border-left: 1px solid #f3f4f9;
      border-right: 1px solid #f3f4f9;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;

      .nav {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        // height:;
      }

      .option {
        width: 100%;
        overflow: hidden;
        padding: 0 5px;

        // /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
        //   width:180px;
        // }
        .el-row {
          margin: 12px 0;
        }

        .el-select {
          width: 90px;
        }

        /deep/ .input-with-select .el-input-group__prepend {
          background-color: #fff;
        }
      }

      .unallocated {
        // height:;
        flex: 1;
        width: 100%;
        overflow: hidden;
        height: 100%;
        box-sizing: border-box;

        .el-collapse {
          width: 100%;
        }

        .collapse-height {
          height: 100%;
        }
      }
    }

    .schedule-right {
      width: 80%;
      // flex:1;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .right-content {
        height: calc(100% - 100px);

        .switch-detail {
          height: 100%;

          .current-room {
            width: 100%;

            .floor-number {
              width: 100%;
              text-align: center;
              font: 16px/2 "";
              color: skyblue;
              border: 1px solid #f3f6f9;
              border-left: 0;
            }

            .current-table {
              width: 100%;
              height: 200px;
            }
          }

          .detail {
            height: 40px;
            background: #f3f6f9;
            font: 14px/40px "";
          }

          .all-room {
            height: calc(100% - 302px);
            background: white;
            width: 100%;
            // padding-bottom: 10px;
            box-sizing: border-box;

            .content {
              height: 100%;
              // position:relative;
              width: 100%;

              .allRoom {
                height: 100%;
                display: grid;
                grid-template-columns: repeat(auto-fill, 200px);
                // flex-wrap: wrap;
                justify-content: space-around;
                // flex-direction: row;
                overflow-y: auto;
                width: 100%;

                padding-bottom: 10px;
                // position: fixed;
                position: relative;

                .roomItem {
                  cursor: pointer;
                  width: 200px;
                  height: 100px;
                  margin-top: 10px;
                  display: flex;
                  border: 1px solid #f3f6f9;
                  border-radius: 6px;
                  box-sizing: border-box;
                  overflow: hidden;
                  position: relative;

                  .li-left {
                    height: 100%;
                    width: 6px;
                    background: #f3f6f9;
                  }

                  .room-id {
                    width: 80px;
                    font-size: 30px;
                    color: skyblue;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .circle {
                      height: 60px;
                      width: 60px;
                      border-radius: 50%;
                      border: 1px solid #f3f6f9;
                      line-height: 60px;
                    }
                  }

                  .room-info {
                    flex: 1;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;

                    .room-info-item {
                      width: 110px;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;

                      &:last-child {
                        line-height: 18px;
                        height: 18px;
                        display: flex;
                        flex-direction: column;
                        // align-items: center;
                        justify-content: center;

                        .el-progress {
                          width: 80%;
                        }
                      }
                    }
                  }

                  .roomIdActive {
                    color: #fff;
                  }
                }

                // .layout {
                //   visibility: hidden;
                // }

                .roomActive {
                  background: #1DAEF4;
                  color: #fff;
                }
              }
            }
          }

          .submit {
            display: flex;
            // background:#f3f6f9;
            border-top: 1px solid #f3f3f3;
            border-bottom: 1px solid #fff;
            // justify-content: space-evenly;
            flex-flow: row-reverse;
            margin-right: 50px;

            .el-button {
              &:first-child {
                // margin-left: 20px;
              }

              &:nth-child(2) {
                margin: 0 20px;
              }

              &:last-child {
                // margin:0 20px;
                // margin-right:20px;
              }
            }
          }
        }
      }

      .switch-all {
        height: 100%;
      }
    }
  }

  .schedule /deep/ .vxe-table td.vxe-body--column {

    padding: 0;
    height: 30px;

  .schedule /deep/ .vxe-table th.vxe-header--column {

    padding: 2px 0;
    height: 30px;

  }

  .schedule /deep/ .el-collapse-item__header {
    height: 30px;
    background: #f3f6f9;

    &:hover {
      background: #1DAEF4;
      color: #fff;
    }
  }

  .schedule /deep/ .el-collapse .is-active {
    background: #1DAEF4;
    color: #fff;
  }

  .schedule /deep/ .el-collapse {
    height: 100%;
  }

  .schedule /deep/ .el-collapse .el-collapse-item__content {
    //    overflow: auto;
    padding: 0;

  }

  .schedule /deep/ .no-child-btn {
    padding: 5px 10px;
    color: #000;
    width: 180px;
  }

  .schedule /deep/ .btn-wrapper-simple {
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    color: #354052;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;

    &:hover {
      background: #f3f6f9;
    }
  }

  .schedule /deep/ .context-menu-list .has-child {
    padding: 0;

    .btn-wrapper-simple {
      padding-left: 10px;

      .icon {
        top: 11px;
      }
    }
  }

  .schedule /deep/ .vxe-table .vxe-body--column {
    &:last-child {
      .el-button {
        color: #409EFF;
      }
    }
  }

  .schedule /deep/ .el-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .schedule .detail /deep/ .el-input__inner {
    width: 217px;
  }

  .schedule .detail /deep/ .el-textarea__inner {
    width: 217px;
  }

  .schedule .option-select /deep/ .el-select .el-select-dropdown {
    // width: 130px !important;
  }

  .schedule /deep/ .el-input-group__append,
  .el-input-group__prepend {
    height: 32px;
    // background:green;
  }

  .schedule .roomConfig /deep/ .el-form {
    .el-form-item {
      &:last-child {
        width: 100%;

        .el-form-item__content {
          margin-left: 0 !important;
          text-align: center;
        }
      }
    }
  }

  .schedule .config /deep/ .el-form {
    display: flex;

    // justify-content: space-between;
    .el-form-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  }
</style>
