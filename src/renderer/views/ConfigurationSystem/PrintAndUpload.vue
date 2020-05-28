<template>
  <div class="printAndUpload">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>文书打印及上传设置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'PrintAndUpload',
  data () {
    return {}
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.printAndUpload {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }
}
</style>
