<template>
  <div class="aside">
    <div class="title">
      Dandelion 智慧手术中心<i />临床麻醉
    </div>
    <div
      class="img"
      @click="jumpLogin"
    >
      <img
        src="../../../assets/tq.png"
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
                v-for="(_item,index) in item.subNav"
                :key="_item.id"
                :class="{'rightActive':activeIndex === index && oddEven(index),
                         'leftActive':activeIndex === index && !oddEven(index)}"
                @click="handleChangeButton(_item,index)"
              >{{ _item.perName }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <Dialog
      @close="handleDialogClose"
      :title="dialogTitle"
      :component-name="componentName"
      v-if="showDialog"
    />
  </div>
</template>
<script>
import Dialog from '@/components/DialogNav/index'
import { getNavs } from '@/api/nav'
import { mapActions, mapGetters } from 'vuex'
import request from '@/utils/requestForMock'
// import Overview from '../../../components/OperationOverview/index'
export default {
  name: 'Aside',
  data () {
    return {
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
          necessary: false
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
        }
      ],
      overviewList: [],
      activeIndex: null,
      path: '',
      navs: []
    }
  },
  components: {
    // Overview
    Dialog
    // ChangePass
    // Hemodynamics
  },
  computed: {
    ...mapGetters('Base', ['operationId']),
    oddEven (index) {
      return function (index) {
        if ((index + 1) % 2 === 0) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    ...mapActions('Anaes', ['setEventType']),
    jumpLogin () {
      this.$router.push('/login')
    },
    handleDialogClose () {
      this.showDialog = false
      this.activeIndex = false
    },
    handleClose (done) {
      done()
    },
    handleChangeButton (item, index) {
      if (this.operationId === '' && item.necessary) {
        this.$confirm('当前操作需先选择患者', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          customClass: 'messageBox'
        }).then(() => {})
        return
      }
      this.activeIndex = index
      if (item.componentName === 'Event') {
        this.setEventType(item)
      }
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
    openConfiguration (route, name) {
      this.$electron.ipcRenderer.send('open-new-window', route, name)
    },
    getNavList () {
      request({
        url: getNavs + '/' + 3
      }).then((res) => {
        const data = res.data.data
        console.log(data)
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
        console.log(empty, 'empty')
        empty.forEach((_item) => {
          this.navList.forEach((item) => {
            if (item.index === _item.mainNav) {
              _item.name = item.name
              _item.icon = item.icon
              _item.subNav.forEach((value2) => {
                this.subNavList.forEach((value1) => {
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
    this.$eventHub.$on('show-dialog', (item) => {
      // 激活弹窗
      this.handleChangeButton(item)
    })
    this.$eventHub.$on('close-dialog', () => {
      // 关闭弹窗
      this.handleDialogClose()
    })
    this.getNavList()
  }
}
</script>
<style lang="scss" scoped>
.aside {
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  // position: relative;
  .title {
    color: #0094ff;
    line-height: 30px;
    text-align: center;
    // background: #f8f9fa;
    text-indent: 2px;
    font-size: 12px;
    cursor: pointer;
    i {
      display: inline-block;
      width: 5px;
      vertical-align: middle;
      height: 5px;
      border-radius: 50%;
      background: #388ff7;
      margin: 0 4px;
    }
  }
  .img {
    // height:34px;
    margin: 14px 0;
    // background:#fff;
    img {
      display: block;
      // width:100%;
      // margin-left:20px;
      margin: 0 auto;
      height: 100%;
    }
  }
  .menu {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    span {
      text-align: center;
      line-height: 30px;
      color: #9ba3d5;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #e3e7fc;
      }
    }
    span.rightActive {
      background: linear-gradient(
        90deg,
        rgba(89, 247, 199, 1),
        rgba(42, 131, 247, 1)
      );
      border-radius: 15px 0px 0px 15px;
      color: #edf1f9;
    }
    span.leftActive {
      background: linear-gradient(
        90deg,
        rgba(42, 131, 247, 1),
        rgba(89, 247, 199, 1)
      );
      border-radius: 0 15px 15px 0;
      color: #edf1f9;
    }
  }
  .nav-list {
    height: calc(100% - 30px);
  }
  .el-collapse {
    border: unset;
    background: #121421;
  }
  .active {
    width: 2px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(
      0deg,
      rgba(236, 33, 88, 1),
      rgba(12, 133, 226, 1)
    );
  }
}
.aside /deep/ .el-collapse-item__header {
  height: 40px;
  border: unset;
  background: #121421;
  color: #9ba3d5;
  font-size: 14px;
  padding-left: 20px;
  position: relative;
  .header-icon {
    font-size: 20px;
    margin-right: 16px;
  }
}
.aside /deep/ .el-collapse-item__wrap {
  background: #121421;
  border: unset;
}
.aside /deep/ .el-collapse-item__content {
  background: #121421;
  border: unset;
  padding: 30px 0;
}
.aside /deep/ .el-collapse-item__header.is-active {
  background: rgba(28, 31, 50, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.05);
  color: #edf1f9;
  font-size: 16px;
}
</style>
<style>
.aside .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
