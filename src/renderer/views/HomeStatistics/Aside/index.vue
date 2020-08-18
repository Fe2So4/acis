<template>
  <div class="aside">
    <div class="title">
      Dandelion 智慧手术中心
      <i />数据统计
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
        <el-menu
          default-active="/statistics-home/default"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#121421"
          text-color="#9BA3D5"
          active-text-color="#FFFFFF"
          @select="handleSelectMenu"
        >
          <el-submenu
            v-for="item in navList"
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="_item in item.subNav"
              :key="_item.index"
              :index="_item.index"
            >
              <div :class="{'menuActive':activeIndex === _item.index}" />
              {{ _item.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="user-info">
      <span>MDSDSS(ADMIN)</span>
      <span>注销</span>
    </div>
    <lock-screen
      v-if="lockVisible"
      :lock-visible="lockVisible"
      @handleLock="handleLock"
    />
    <export-config />
  </div>
</template>
<script>
import LockScreen from '../../LockScreen/index'
import ExportConfig from '@/components/ExportConfig/exportConfig'
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
        // {
        //   name: '查询统计',
        //   index: '/statistics-home/search-statistics',
        //   icon: 'el-icon-star-on',
        //   subNav: []
        // },
        {
          name: '综合信息查询',
          index: '1',
          icon: 'el-icon-location',
          subNav: [
            { name: '手术查询', index: '/statistics-home/search-statistics', code: 'T001' },
            { name: '取消手术查询', index: '/statistics-home/cancel-statistics', code: 'T002' },
            { name: '恢复室病人统计', index: '/statistics-home/recover-statistics', code: 'T003' },
            { name: '麻醉方法统计', index: '/statistics-home/anes-method-statistics', code: 'T004' },
            { name: 'ASA分级统计', index: '/statistics-home/asa-statistics', code: 'T005' },
            { name: '输血统计', index: '/statistics-home/blood-statistics', code: 'T006' }
          ]
        },
        {
          name: '工作量查询',
          index: '2',
          icon: 'el-icon-s-data',
          subNav: [
            { name: '科室工作量', index: '/statistics-home/dept-statistics', code: 'T007' },
            { name: '麻醉医生工作量', index: '/statistics-home/anes-doc-statistics', code: 'T008' },
            { name: '手术医生工作量', index: '/statistics-home/ope-doc-statistics', code: 'T009' },
            { name: '护士工作量', index: '/statistics-home/nurse-statistics', code: 'T010' }
          ]
        },
        {
          name: '分析决策',
          index: '3',
          icon: 'el-icon-monitor',
          subNav: [
            { name: '动脉穿刺统计', index: '/statistics-home/arterial-statistics', code: 'T011' },
            { name: '质控数据统计', index: '/statistics-home/quantity-control-statistics', code: 'T012' },
            { name: '术后随访统计', index: '/statistics-home/followup-statistics', code: 'T013' },
            { name: '麻醉质控17项指标统计', index: '/statistics-home/anes-qc17-statistics', code: 'T014' }
          ]
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
    LockScreen, ExportConfig
  },
  computed: {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push(key)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    jumpLogin () {
      //  ----login页测试
      this.$router.push('/login')
    },
    handleSelectMenu (index, path) {
      this.activeIndex = index
      console.log(index, path, 'biubiubiu')
    },
    handleLock () {
      this.lockVisible = false
    },
    handleDialogClose () {
      this.showDialog = false
      this.activeIndex = false
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.aside {
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  position: relative;
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
    margin: 14px 0;
    img {
      display: block;
      margin: 0 auto;
      height: 100%;
    }
  }
  .menu {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    span {
      text-align: center;
      margin-bottom: 26px;
      line-height: 30px;
      color: #9ba3d5;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #e3e7fc;
      }
    }
  }
  .nav-list {
    height: calc(100% - 104px);
    .el-menu {
      border-right: unset;
      /deep/ .el-submenu__title{
        height: 40px;
        line-height: 40px;
      }
      .el-menu-item{
        height:30px;
        line-height: 30px;
        // text-indent: 14px;
        padding-left: 54px !important;
        .menuActive{
          width:2px;
          height:30px;
          background:linear-gradient(0deg,rgba(89,247,199,1),rgba(41,127,241,1));
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
  .user-info {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    font-size: 12px;
    line-height: 32px;
    color: #9ba3d5;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    span {
      display: block;
    }
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

</style>
<style>
.aside .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
