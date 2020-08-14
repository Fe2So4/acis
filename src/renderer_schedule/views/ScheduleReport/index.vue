<template lang="pug">
.report
  el-tabs(v-model="activeName", @tab-click="handleClick")
    el-tab-pane(label="手术排班表", name="first")
      Document
    el-tab-pane(label="手术通知单", name="second")
      Notice
</template>
<script>
import Notice from './components/notice'
import Document from './components/document'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: { Notice, Document },
  methods: {
    handleClick () {}
  }
}
</script>
<style lang="stylus" scoped>
.report {
  color:#fff;
  height:100%;
  background:#121421;
  .el-tabs{
    height:100%;
    /deep/ .el-tabs__content{
      height:calc(100% - 55px);
      .el-tab-pane{
        height 100%
      }
    }
  }
}
</style>
