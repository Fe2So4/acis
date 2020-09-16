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
      activeName: 'second'
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
  padding:0 20px;
  // background:#121421;
  .el-tabs{
    height:100%;
    /deep/ .el-tabs__content{
      height:calc(100% - 55px);
      .el-tab-pane{
        height 100%
      }
    }
  }
  /deep/ .el-tabs__item{
    color:#9AA3D4;
    &.is-active{
      color:#409EFF !important;
    }
  }
  /deep/ .el-tabs__nav-wrap::after{
    background-color:#121421;
  }
}
</style>
