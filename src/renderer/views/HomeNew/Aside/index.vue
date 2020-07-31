<template>
  <div class="aside">
    <div class="title">
      Dandelion 智慧手术中心<i />麻醉
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
      showDialog: true, // 开启弹窗
      componentName: '',
      navList: [
        {
          name: '大事件',
          index: 'M001',
          subNav: [
            { name: '麻药', index: '1-1', componentName: 'Event' },
            { name: '用药', index: '1-2', componentName: 'Event' },
            { name: '事件', index: '1-3', componentName: 'Event' },
            { name: '输液', index: '1-4', componentName: 'Event' },
            { name: '出量', index: '1-5', componentName: 'Event' },
            { name: '插管', index: '1-6', componentName: 'Event' },
            { name: '拔管', index: '1-7', componentName: 'Event' },
            { name: '输血', index: '1-8', componentName: 'Event' },
            { name: '输氧', index: '1-9', componentName: 'Event' },
            { name: '呼吸', index: '1-10', componentName: 'Event' },
            { name: '其他', index: '1-11', componentName: 'Event' }
          ],
          icon: 'el-icon-star-on'
        },
        {
          name: '系统集成',
          index: 'M002',
          subNav: [],
          icon: 'el-icon-location'
        },
        {
          name: '患者操作',
          index: 'M003',
          subNav: [
            {
              name: '手术概览',
              index: '3-1',
              componentName: 'OperationOverview'
            },
            {
              name: '术中患者列表',
              index: '3-2',
              componentName: 'IntraoperativePatients'
            },
            {
              name: '术中登记',
              index: '3-3',
              componentName: 'IntraoperativeRegistration'
            },
            { name: '患者详情', index: '3-4', componentName: 'PatientDetail' },
            {
              name: '手术取消',
              index: '3-5',
              componentName: 'OperationCancel'
            },
            {
              name: '复苏进程',
              index: '3-6',
              componentName: 'OperationCancel'
            },
            {
              name: '复苏床位',
              index: '3-7',
              componentName: 'ResuscitationBed'
            },
            { name: '实时状态', index: '3-8', componentName: 'RealtimeStatus' },
            { name: '麻醉评分', index: '3-9', componentName: 'AnaesScore' },
            {
              name: '检验信息',
              index: '3-10',
              componentName: 'InspectionInformation'
            },
            {
              name: '医嘱信息',
              index: '3-11',
              componentName: 'MedicalOrderInformation'
            },
            {
              name: '检查结果',
              index: '3-12',
              componentName: 'InspectionResult'
            },
            {
              name: '病历病程',
              index: '3-13',
              componentName: 'MedicalRecordCourse'
            },
            { name: '状态维护', index: '3-14', componentName: 'StateMaintain' },
            {
              name: '手术等级',
              index: '3-15',
              componentName: 'OperationLevel'
            },
            {
              name: '术后登记',
              index: '3-16',
              componentName: 'PostoperativeRegistration'
            },
            {
              name: '手术信息',
              index: '3-17',
              componentName: 'OperationInfo'
            },
            {
              name: '手术登记',
              index: '3-18',
              componentName: 'OperationRegisteration'
            }
          ],
          icon: 'el-icon-s-data'
        },
        {
          name: '常用功能',
          index: 'M004',
          subNav: [
            { name: '血流动力', index: '4-1', componentName: 'Hemodynamics' },
            {
              name: '模板管理',
              index: '4-2',
              componentName: 'TemplateManagement'
            },
            {
              name: '手术交班',
              componentName: 'OperationHandover',
              index: '4-3'
            },
            { name: 'PACU状态', componentName: 'PacuStatus', index: '4-4' },
            { name: '设备采集', componentName: 'DeviceGather', index: '4-5' },
            { name: '字典', componentName: 'Dictionary', index: '4-6' },
            { name: '患者预警', componentName: 'PatientWarning', index: '4-7' }
          ],
          icon: 'el-icon-monitor'
        },
        // {
        //   name: "护理管理",
        //   index: "M005",
        //   subNav: [
        //     {
        //       name: "床位管理",
        //       index: "5-1",
        //       componentName: "ConfigurationSystem",
        //     },
        //     {
        //       name: "护理评估",
        //       index: "5-2",
        //       componentName: "TemplateDesigner",
        //     },
        //     {
        //       name: "医嘱处理",
        //       index: "5-3",
        //       componentName: "TemplateDisplayer",
        //     },
        //     { name: "整体护理", index: "5-4", componentName: "ChangePass" },
        //     { name: "护理文书", index: "5-5", componentName: "About" },
        //   ],
        //   icon: "el-icon-s-management",
        // },
        {
          name: '其他',
          index: 'M005',
          subNav: [
            {
              name: '系统配置',
              index: '6-1',
              componentName: 'ConfigurationSystem'
            },
            {
              name: '模板设计器',
              index: '6-2',
              componentName: 'TemplateDesigner'
            },
            {
              name: '模板展示',
              index: '6-3',
              componentName: 'TemplateDisplayer'
            },
            { name: '修改密码', index: '6-4', componentName: 'ChangePass' },
            { name: '关于', index: '6-5', componentName: 'About' }
          ],
          icon: 'el-icon-s-tools'
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
    ...mapGetters('Anaes', ['eventType']),
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
      console.log(index)
      this.activeIndex = index
      if (item.componentName === 'Event') {
        console.log('触发')
        this.setEventType(item.index)
      }
      this.showDialog = true
      this.dialogTitle = item.name
      this.componentName = item.componentName
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
                item.subNav.forEach((value1) => {
                  if (value2.perName === value1.name) {
                    value2.componentName = value1.componentName
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
    i{
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #388FF7;
      margin:0 4px;
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
