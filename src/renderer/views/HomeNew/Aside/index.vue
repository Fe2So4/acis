<template>
  <div class="aside">
    <div
      class="img"
      @click="jumpLogin"
    >
      <img
        :src="logoSource"
        alt
      >
    </div>
    <div class="nav-list">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <el-collapse
          accordion
          :value="activesNames"
          @change="handleChange"
        >
          <el-collapse-item
            v-for="item in navs"
            :key="item.mainNav"
            :name="item.mainNav"
          >
            <template slot="title">
              <i
                class="header-icon"
                :class="item.icon"
              />
              {{ item.name }}
              <div
                class="active"
                v-show="item.mainNav === activesNames"
              />
            </template>
            <div class="menu">
              <span
                v-for="(_item, index) in item.subNav"
                :key="_item.id"
                :class="{
                  rightActive: activeIndex === index && oddEven(index),
                  leftActive: activeIndex === index && !oddEven(index)
                }"
                @click="handleChangeButton(_item, index)"
              >{{ _item.perName }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <div class="nav-list-portrait">
      <!-- :default-active="activeIndex" -->
      <!-- <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      > -->
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        unique-opened
        :background-color="menuBackground"
        :text-color="menuTextColor"
        :active-text-color="menuActiveTextColor"
        @select="handleSelect"
        @open="handleChange"
      >
        <el-submenu
          v-for="item in navs"
          :index="item.mainNav"
          :key="item.mainNav"
        >
          <template slot="title">
            <i
              class="header-icon"
              :class="item.icon"
            />
            {{ item.name }}
            <div
              class="active"
              v-show="item.mainNav === activesNames"
            />
          </template>
          <el-menu-item
            v-for="(_item, index) in item.subNav"
            :key="_item.id"
            :index="_item.perCode"
            @click="handleChangeButton(_item, index)"
          >
            {{ _item.perName }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- </el-scrollbar> -->
    </div>
    <div style="position: absolute;bottom: 9px;left: 9px; color: #707B91">
      <div style="margin-bottom:10px">
        <span>{{ userInfo.userName }} </span>
        <span> ({{ userInfo.loginName }})</span>
        <span> {{ userInfo.roleName }}</span>
      </div>
      <div>
        <span>{{ nowDay }} {{ time }} </span>
      </div>
    </div>
    <Dialog
      @close="handleDialogClose"
      :title="dialogTitle"
      :component-name="componentName"
      v-if="showDialog"
    />
    <lock-screen
      v-if="lockVisible"
      :lock-visible="lockVisible"
      @handleLock="handleLock"
    />
    <el-dialog
      title="跳转电子病历,请输入患者ID"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="请输入患者ID">
          <el-input v-model="binglipatientId" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleClickBingli"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Dialog from '@/components/DialogNav/index'
import LockScreen from '../../LockScreen/index'
import { getNavs } from '@/api/nav'
import { mapActions, mapGetters, mapState } from 'vuex'
import request from '@/utils/requestForMock'
import { exec } from 'child_process'
// import { ipcRenderer } from 'electron'
const { shell } = require('electron')

// import Overview from '../../../components/OperationOverview/index'
export default {
  name: 'Aside',
  data () {
    return {
      time: '',
      nowDay: '',
      interval: null,
      binglipatientId: '',
      dialogVisible: false,
      dialogTitle: '标题',
      activesNames: 'M001',
      isCollapse: false,
      showOverflow: false,
      showDialog: false, // 开启弹窗
      componentName: '',
      navList: [
        {
          name: '大事件',
          index: 'M001',
          icon: 'el-icon-star-on'
        },
        {
          name: '系统集成',
          index: 'M002',
          icon: 'el-icon-location'
        },
        {
          name: '患者操作',
          index: 'M003',
          icon: 'el-icon-s-data'
        },
        {
          name: '常用功能',
          index: 'M004',
          icon: 'el-icon-monitor'
        },
        {
          name: '其他',
          index: 'M005',
          icon: 'el-icon-s-tools'
        }
      ],
      subNavList: [
        // necessary 字段代表是否需要先选中患者
        { name: '麻药', componentName: 'Event', necessary: true },
        { name: '用药', componentName: 'Event', necessary: true },
        { name: '事件', componentName: 'Event', necessary: true },
        { name: '输液', componentName: 'Event', necessary: true },
        { name: '出量', componentName: 'Event', necessary: true },
        { name: '插管', componentName: 'Event', necessary: true },
        { name: '拔管', componentName: 'Event', necessary: true },
        { name: '输血', componentName: 'Event', necessary: true },
        { name: '输氧', componentName: 'Event', necessary: true },
        { name: '呼吸', componentName: 'Event', necessary: true },
        { name: '其他', componentName: 'Event', necessary: true },
        { name: '肌肉松弛药', componentName: 'Event', necessary: true },
        { name: '镇静药', componentName: 'Event', necessary: true },
        { name: '吸入麻醉药', componentName: 'Event', necessary: true },
        { name: '局麻药', componentName: 'Event', necessary: true },
        { name: '血管活性药', componentName: 'Event', necessary: true },
        { name: '激素类药物', componentName: 'Event', necessary: true },
        { name: '拮抗药', componentName: 'Event', necessary: true },
        { name: '止吐药', componentName: 'Event', necessary: true },
        { name: '利尿剂', componentName: 'Event', necessary: true },
        { name: '补液', componentName: 'Event', necessary: true },
        { name: '其它用药', componentName: 'Event', necessary: true },
        { name: '常用药', componentName: 'Event', necessary: true },
        {
          name: '系统配置',
          componentName: 'ConfigurationSystem',
          necessary: false
        },
        {
          name: '模板设计器',
          componentName: 'TemplateDesigner',
          necessary: false
        },
        {
          name: '模板展示',
          componentName: 'TemplateDisplayer',
          necessary: false
        },
        { name: '修改密码', componentName: 'ChangePass', necessary: false },
        { name: '关于', componentName: 'About', necessary: false },
        { name: '血流动力', componentName: 'Hemodynamics', necessary: false },
        {
          name: '模板管理',
          componentName: 'ManagementEventTemplate',
          necessary: false
        },
        {
          name: '手术交班',
          componentName: 'OperationHandover',
          necessary: true
        },
        { name: 'PACU状态', componentName: 'PacuStatus', necessary: false },
        { name: '设备采集', componentName: 'DeviceGather', necessary: true },
        { name: '字典', componentName: 'Dictionary', necessary: false },
        { name: '患者预警', componentName: 'PatientWarning', necessary: false },
        {
          name: '手术概览',
          componentName: 'OperationOverview',
          necessary: false
        },
        {
          name: '术中患者列表',
          componentName: 'IntraoperativePatients',
          necessary: false
        },
        {
          name: '术中登记',
          componentName: 'IntraoperativeRegistration',
          necessary: true
        },
        { name: '患者详情', componentName: 'PatientDetail', necessary: true },
        {
          name: '取消手术',
          componentName: 'OperationCancel',
          necessary: true
        },
        {
          name: '复苏进程',
          componentName: 'OperationCancel',
          necessary: true
        },
        {
          name: '复苏床位',
          componentName: 'ResuscitationBed',
          necessary: false
        },
        { name: '实时状态', componentName: 'RealtimeStatus', necessary: false },
        { name: '麻醉评分', componentName: 'AnaesScore', necessary: false },
        {
          name: '检验信息',
          componentName: 'InspectionInformation',
          necessary: true
        },
        {
          name: '医嘱信息',
          componentName: 'MedicalOrderInformation',
          necessary: false
        },
        {
          name: '检查结果',
          componentName: 'InspectionResult',
          necessary: false
        },
        {
          name: '病历病程',
          componentName: 'MedicalRecordCourse',
          necessary: false
        },
        { name: '状态维护', componentName: 'StateMaintain', necessary: false },
        {
          name: '手术等级',
          componentName: 'OperationLevel',
          necessary: false
        },
        {
          name: '术后登记',
          componentName: 'PostoperativeRegistration',
          necessary: true
        },
        {
          name: '手术信息',
          componentName: 'OperationInfo',
          necessary: true
        },
        {
          name: '手术登记',
          componentName: 'OperationRegisteration',
          necessary: true
        },
        {
          name: '镇痛评分',
          componentName: 'AnalgesicScore',
          necessary: false
        },
        {
          name: '复苏登记',
          componentName: 'RecoveryRegistration',
          necessary: true
        },
        {
          name: '锁定系统',
          componentName: 'LockScreen',
          necessary: false
        },
        {
          name: '血气分析',
          componentName: 'BloodGasAnalysis',
          necessary: true
        }
      ],
      overviewList: [],
      activeIndex: null,
      path: '',
      navs: [],
      lockVisible: false
    }
  },
  components: {
    // Overview
    Dialog,
    LockScreen
    // ChangePass
    // Hemodynamics
  },
  watch: {
    patientId (val) {
      this.binglipatientId = val
    }
  },
  computed: {
    ...mapState('Base', ['theme', 'patientId', 'userInfo']),
    ...mapGetters('Base', ['operationId']),
    oddEven (index) {
      return function (index) {
        if ((index + 1) % 2 === 0) {
          return true
        } else {
          return false
        }
      }
    },
    logoSource () {
      // return require(`@/assets/lan_${this.theme}.png`)
      // return require(`@/assets/fj_${this.theme}.png`)
      return require(`@/assets/dl_${this.theme}.png`)
    },
    menuBackground () {
      switch (this.theme) {
        case 'dark-gray':
          return '#353537'
        case 'light-white':
          return '#F8F8F8'
        case 'dark-blue':
        default:
          return '#121421'
      }
    },
    menuTextColor () {
      switch (this.theme) {
        case 'dark-gray':
          return '#BABABA'
        case 'light-white':
          return '#707C91'
        case 'dark-blue':
        default:
          return '#9BA4D5'
      }
    },
    menuActiveTextColor () {
      switch (this.theme) {
        case 'dark-gray':
          return '#EDF1F9'
        case 'light-white':
          return '#1A1A1A'
        case 'dark-blue':
        default:
          return '#FFFFFF'
      }
    }
  },
  methods: {
    ...mapActions('Anaes', ['setEventType']),
    jumpLogin () {
      //  ----login页测试
      this.$router.push('/login')
    },
    // 获取日期
    getNewDay () {
      var date_ = new Date()
      var year = date_.getFullYear()
      var month = date_.getMonth() + 1
      var day = date_.getDate()
      this.nowDay = year + '-' + month + '-' + day
    },
    // 每秒更新时间
    updateTime () {
      var cd = new Date()
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2)
    },
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    handleSelect () {},
    handleLock () {
      this.lockVisible = false
      this.activeIndex = false
    },
    handleDialogClose () {
      this.showDialog = false
      this.activeIndex = false
    },
    handleClose (done) {
      done()
    },
    handleClickBingli () {
      const url = `http://168.2.5.28:7070/viewhip-etyy/view/commView/layout.jsp?patientId=${this.patientId}&patientSystemCode=HIS`
      shell.openExternal(url)
    },
    handleChangeButton (item, index) {
      console.log(item, '点击麻药用药')
      if (item.temType === '1') {
      } else if (this.operationId === '' && item.necessary) {
        this.$confirm('当前操作需先选择患者', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          customClass: 'messageBox'
        })
          .then(() => {})
          .catch(() => {})
        return
      }
      this.activeIndex = index
      if (item.componentName === 'InspectionResult') {
        const path = `D:/SOFT/HIS/PACS/PacsView.exe ${this.operationId}`
        // const path = 'F:/PACS/LJPACS/PacsView.exe 00479520'
        exec(path)
        return
      } else if (item.componentName === 'MedicalRecordCourse') {
        // this.showWebview = true
        // ipcRenderer.send('WEB-EMR', this.operationId)
        // console.log(this.patientId)
        this.dialogVisible = true
        return
      } else if (item.componentName === 'LockScreen') {
        this.lockVisible = true
        return
      }
      // shell.openExternal
      this.setEventType(item)
      this.dialogTitle = item.perName
      this.componentName = item.componentName
      this.showDialog = true
    },
    handleShowOverview () {
      if (this.isCollapse === true) {
        this.showOverflow = !this.showOverflow
      }
    },
    handleChange (active) {
      this.activeIndex = null
      this.activesNames = active
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCloseMenu () {
      if (this.showOverflow === false) {
        this.isCollapse = !this.isCollapse
      }
    },
    getNavList () {
      request({
        url: getNavs + '/' + 3
      }).then(res => {
        const data = res.data.data
        const empty = []
        for (var item in data) {
          if (item === 'notUse') {
          } else {
            empty.push({
              mainNav: item,
              subNav: data[item]
            })
          }
        }
        empty.forEach(_item => {
          this.navList.forEach(item => {
            if (item.index === _item.mainNav) {
              _item.name = item.name
              _item.icon = item.icon
              _item.subNav.forEach(value2 => {
                this.subNavList.forEach(value1 => {
                  if (value2.perName === value1.name) {
                    value2.componentName = value1.componentName
                    value2.necessary = value1.necessary
                  }
                })
              })
            }
          })
        })
        this.navs = empty
      })
    }
  },
  mounted () {
    this.getNewDay()
    this.updateTime()
    this.interval = setInterval(this.updateTime, 1000)
    this.$eventHub.$on('show-dialog', item => {
      // 激活弹窗
      this.handleChangeButton(item)
    })
    this.$eventHub.$on('close-dialog', () => {
      // 关闭弹窗
      this.handleDialogClose()
    })
    this.getNavList()
  },
  destroyed () {
    this.interval = null
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme';
.aside {
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  @include theme-property('background', $color-background-aside);
  .img {
    height: 48px;
    // margin: 14px 0;
    margin: 14px; // 皮肤病
    display: flex;
    align-items: center;
    // background:#fff;
    img {
      display: block;
      // width:100%;
      // margin-left:20px;
      margin: 0 auto;
      height: auto;
    }
  }

  .menu {
    display: grid;
    grid-template-columns: repeat(2, 50%);

    span {
      text-align: center;
      margin-bottom: 26px;
      line-height: 30px;
      @include theme-property('color', $color-text-regular);
      font-size: 14px;
      cursor: pointer;

      &:hover {
        @include theme-property('color', $color-text-primary);
      }
    }

    span.rightActive {
      background: linear-gradient(
        90deg,
        rgba(89, 247, 199, 1),
        rgba(42, 131, 247, 1)
      );
      font-weight: bold;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
      border-radius: 15px 0px 0px 15px;
      color: #edf1f9;
    }

    span.leftActive {
      background: linear-gradient(
        90deg,
        rgba(42, 131, 247, 1),
        rgba(89, 247, 199, 1)
      );
      font-weight: bold;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
      border-radius: 0 15px 15px 0;
      color: #edf1f9;
    }
  }

  .nav-list {
    height: calc(100% - 30px);
  }
  .nav-list-portrait {
    display: none;
  }

  .el-collapse {
    border: unset;
    @include theme-property('background', $color-background-aside);
  }

  .active {
    width: 2px;
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    @include theme-property('background', $background-menu-active);
  }
}

.aside /deep/ .el-collapse-item__header {
  height: 40px;
  border: unset;
  @include theme-property('background', $color-background-aside);
  @include theme-property('color', $color-text-regular);
  font-size: 14px;
  padding-left: 20px;
  position: relative;

  .header-icon {
    font-size: 20px;
    margin-right: 16px;
  }
}

.aside /deep/ .el-collapse-item__wrap {
  @include theme-property('background', $color-background-aside);
  border: unset;
}

.aside /deep/ .el-collapse-item__content {
  @include theme-property('background', $color-background-aside);
  border: unset;
  padding: 30px 0 4px 0;
}

.aside /deep/ .el-collapse-item__header.is-active {
  @include theme-property('background', $color-background-aside-active);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
  color: #edf1f9;
  font-size: 16px;
}
@media all and (orientation: portrait) {
  .nav-list {
    display: none;
  }
  .nav-list-portrait {
    display: block !important;
    flex: 1;
    .el-menu {
      // @include theme-property("background-color", $color-background-aside);
      /deep/ .el-submenu__title {
        height: 50px !important;
        line-height: 50px !important;
        border: unset !important;
      }
      /deep/ .is-opened {
        .el-submenu__title {
          color: #fff !important;
          i {
            color: #fff !important;
          }
        }
      }
    }
  }
  .aside {
    display: flex !important;
    justify-content: space-between;
    margin: 0 0 20px 0;
    // box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.4);
    .img {
      padding: 0 20px 0 18px;
      margin: unset !important;
      width: 220px;
    }
    .active {
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
      @include theme-property('background', $background-menu-active-portrait);
    }
  }
}
</style>
<style>
.aside .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
