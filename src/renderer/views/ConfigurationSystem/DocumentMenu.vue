<template>
  <div class="documentMenu">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>超级配置</el-breadcrumb-item>
      <el-breadcrumb-item>文书菜单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      main
    </div>
  </div>
</template>
<script>
export default {
  name: 'DocumentMenu',
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
.documentMenu {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
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
