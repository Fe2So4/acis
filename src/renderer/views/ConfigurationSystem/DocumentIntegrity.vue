<template>
  <div class="documentIntegrity">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>医疗文书完整性检查</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'DocumentIntegrity',
  data () {
    return {}
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.documentIntegrity {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }
}
</style>
