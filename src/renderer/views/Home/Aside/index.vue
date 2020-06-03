<template>
  <div class="aside">
    <div
      class="title"
      @click="handleCloseMenu"
    >
      导航栏
    </div>
    <div class="nav-list">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <el-menu
          default-active="2"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          active-text-color="#409EFF"
          :default-openeds="['1','2','3','4']"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu
            :index="item.index"
            v-for="(item,index) in navList"
            :key="index"
          >
            <template slot="title">
              <i
                :class="item.icon"
                style="color:#144177;"
              />
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(_item,i) in item.subNav"
              :key="i"
              :index="_item.index"
              @click="openConfiguration(_item.route,_item.name)"
            >
              {{ _item.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div
          class="title"
          @click="handleShowOverview"
        >
          概览
        </div>
      </el-scrollbar>
    </div>
    <div :class="{'ope-overview':true,'show':showOverflow === true}">
      <div
        class="title"
        :style="{'display':showOverflow === true?'block':'none'}"
      >
        手术概览
      </div>
      <div class="overview-content">
        <el-scrollbar
          style="height:100%;"
          class="scrollbar"
        >
          <Overview :list="overviewList" />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import Overview from '../../../components/OperationOverview/index'
export default {
  name: 'Aside',
  data () {
    return {
      activesNames: '',
      isCollapse: false,
      showOverflow: false,
      navList: [{
        name: '大事件',
        index: '1',
        subNav: [{ name: '麻药', index: '1-1', route: 'Event' },
          { name: '用药', index: '1-2', route: 'Event' }],
        icon: 'el-icon-star-on'
      },
      { name: '系统集成', index: '2', subNav: [], icon: 'el-icon-location' },
      { name: '患者操作', index: '3', subNav: [], icon: 'el-icon-s-data' },
      { name: '其他', index: '4', subNav: [{ name: '系统配置', index: '4-1', route: 'ConfigurationSystem' }], icon: 'el-icon-s-tools' }
      ],
      overviewList: []
    }
  },
  components: {
    Overview
  },
  methods: {
    handleShowOverview () {
      if (this.isCollapse === true) {
        this.showOverflow = !this.showOverflow
      }
    },
    handleChange () {},
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCloseMenu () {
      if (this.showOverflow === false) {
        this.isCollapse = !this.isCollapse
      }
    },
    openConfiguration (route, name) {
      console.log(route, name, '执行')
      this.$electron.ipcRenderer.send('open-new-window', route, name)
    },
    getOverviewList () {
      this.$http({
        url: 'http://localhost:3334/mock/overview'
      }).then(res => {
        const data = res.data
        this.overviewList = data.data
      })
    }
  },
  mounted () {
    this.getOverviewList()
  }
}
</script>
<style lang="scss" scoped>
.aside {
  height: 100%;
  // position: relative;
  .title {
    color: #000;
    line-height: 30px;
    // background: #f8f9fa;
    text-indent: 10px;
    font-size:14px;
    cursor: pointer;
  }
  .nav-list {
    height: calc(100% - 30px);
  }
  .el-menu {
    border: 0;
    // background:#144177;
    // color:#fff;
    .is-active {
      // background:#409EFF;
    }
  }
  .el-submenu .el-menu-item {
    line-height: 30px;
    height: 30px;
    text-indent: 1.5em;
    min-width: 182px;
  }
  .ope-overview{
  height: 100%;
  position: absolute;
  background: #fff;
  // background:#f8f9fa;
  left: 64px;
  top:0;
  z-index: 999;
  width: 0;
  // padding:10px 10px;
  // box-sizing: border-box;
  transition: all .3s;
  // opacity: 0;
  .overview-content{
    height:calc(100% - 30px);
  }
}
.ope-overview.show{
  width: 220px;
  opacity: 1;
}
}
.aside /deep/ .el-submenu__title {
  line-height: 30px;
  height: 30px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 182px;
  // min-height: 400px;
}
</style>
<style>
.aside .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
