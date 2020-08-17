<template>
  <div class="aside">
    <div class="title">
      Dandelion 智慧手术中心
      <i />查询统计
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
          default-active="/statistics-home/search-statistics"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#121421"
          text-color="#9BA3D5"
          active-text-color="#FFFFFF"
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
  </div>
</template>
<script>
// import Dialog from '@/components/DialogNav/index'
import LockScreen from '../../LockScreen/index'
// import { getNavs } from '@/api/nav'
import { mapActions, mapGetters } from 'vuex'
// import request from '@/utils/requestForMock'
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
          name: '查询统计',
          index: '/statistics-home/search-statistics',
          icon: 'el-icon-star-on',
          subNav: []
        },
        {
          name: '综合信息查询',
          index: '/statistics-home/quantity-statistics',
          icon: 'el-icon-location',
          subNav: [
            { name: '手术查询', index: '/statistics-home/quantity-statistics' },
            { name: '取消手术查询', index: '2-2' },
            {
              name: '恢复室病人统计',
              index: '/statistics-home/recover-statistics'
            },
            { name: '麻醉方法统计', index: '2-4' },
            { name: 'ASA分级统计', index: '2-5' },
            { name: '输血统计', index: '2-6' }
          ]
        },
        {
          name: '工作量查询',
          index: '3',
          icon: 'el-icon-s-data',
          subNav: []
        },
        {
          name: '分析决策',
          index: '4',
          icon: 'el-icon-monitor',
          subNav: []
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
    LockScreen
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
    handleLock () {
      this.lockVisible = false
    },
    handleDialogClose () {
      this.showDialog = false
      this.activeIndex = false
    },
    handleChangeButton (item, index) {
      if (item.componentName === 'lockScreen') {
        this.lockVisible = true
        return
      }
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
    handleCloseMenu () {
      if (this.showOverflow === false) {
        this.isCollapse = !this.isCollapse
      }
    },
    openConfiguration (route, name) {
      this.$electron.ipcRenderer.send('open-new-window', route, name)
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
      margin-bottom: 26px;
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
    .el-menu {
      border-right: unset;
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
  padding: 30px 0 4px 0;
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
