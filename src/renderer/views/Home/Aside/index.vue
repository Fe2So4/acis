<template>
  <div class="aside">
    <div class="title" @click="handleCloseMenu">导航栏</div>
    <div class="nav-list">
      <el-scrollbar style="height:100%;" class="scrollbar">
        <el-menu
          default-active="2"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
          active-text-color="#144177"
          :default-openeds="['1','2','3','4']"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-on" style="color:orange;"></i>
              <span>大事件</span>
            </template>
            <el-menu-item index="1-1">选项再加四个字</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location" style="color:#4eb9cf;"></i>
              <span>系统集成</span>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-marketing" style="color:#9ab5d4;"></i>
              <span>患者操作</span>
            </template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document" style="color:#96bc3d;"></i>
              <span>其他</span>
            </template>
            <el-menu-item index="4-1">选项1</el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
            <el-menu-item index="4-3" @click="openConfiguration">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Aside',
  data () {
    return {
      activesNames: '',
      isCollapse: false
    }
  },
  methods: {
    handleChange () {},
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCloseMenu () {
      this.isCollapse = !this.isCollapse
    },
    openConfiguration () {
      this.$electron.ipcRenderer.send('open-new-window', 'ConfigurationSystem', '系统配置')
    }
  }
}
</script>
<style lang="scss" scoped>
.aside {
  height: 100%;
  .title {
    color: #000;
    line-height: 30px;
    background: #f8f9fa;
    text-indent: 10px;
  }
  .nav-list {
    height: calc(100% - 30px);
  }
  .el-menu {
    border: 0;
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
