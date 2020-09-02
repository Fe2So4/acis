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
            v-for="item in navs"
            :key="item.parentTempleteCode"
            :index="item.icon"
          >
            <template slot="title">
              <i :class="item.icon" />
              <span>{{ item.parentTempleteName }}</span>
            </template>
            <el-menu-item
              v-for="_item in item.list"
              :key="_item.templeteCode"
              :index="_item.pagePath + `?code=${_item.templeteCode}`"
            >
              <div :class="{'menuActive':activeIndex === _item.pagePath}" />
              {{ _item.templeteName }}
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
    <export-config
      v-if="exportVisible"
      :export-visible="exportVisible"
      @handleCloseExport="handleCloseExport"
    />
  </div>
</template>
<script>
import LockScreen from '../../LockScreen/index'
import ExportConfig from '@/components/ExportConfig/exportConfig'
import { getStatisticsMenu } from '@/api/statistics'
import request from '@/utils/requestForMock'
import { mapGetters } from 'vuex'
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
          name: '综合信息查询',
          index: '1',
          icon: 'el-icon-location'
        },
        {
          name: '工作量查询',
          index: '2',
          icon: 'el-icon-s-data'
        },
        {
          name: '分析决策',
          index: '3',
          icon: 'el-icon-monitor'
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
    ...mapGetters('Statistics', ['exportVisible'])
  },
  methods: {
    getStatisticsMenu () {
      request({
        url: getStatisticsMenu,
        method: 'post',
        params: {
          systemCode: 'acis'
        }
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          this.navList.forEach(_item => {
            if (_item.name === item.parentTempleteName) {
              item.icon = _item.icon
            }
          })
        })
        this.navs = data
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      // this.$router.push(key)
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
      // this.$router.push({ path })
    },
    handleLock () {
      this.lockVisible = false
    },
    handleDialogClose () {
      this.showDialog = false
      this.activeIndex = false
    },
    handleShowExport (param) {
      this.exportVisible = true
    },
    handleCloseExport (param) {
      this.exportVisible = false
    }
  },
  mounted () {
    this.getStatisticsMenu()
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
