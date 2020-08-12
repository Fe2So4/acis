<template>
  <div class="navigationMenu">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>超级配置</el-breadcrumb-item>
      <el-breadcrumb-item>导航菜单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      main
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavigationMenu',
  data () {
    return {

    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.navigationMenu {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #0094ff;
    padding-left: 10px;
  }

  .mainContent {
    padding: 20px 10px 10px;

    .settingTitle {
      font-size: 14px;
      line-height: 28px;
      margin: 0 0 20px;
      color: #606266;
    }
  }
}
</style>
