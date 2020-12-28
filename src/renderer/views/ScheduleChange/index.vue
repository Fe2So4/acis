<template lang="pug">
.report
  Document
//- el-tabs(v-model="activeName", @tab-click="handleClick")
//-   el-tab-pane(label="手术排班表", name="first")
  //- el-tab-pane(label="手术通知单", name="second")
  //-   Notice
</template>
<script>
// import Notice from "./components/notice";
import Document from "./components/document";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: { Document },
  methods: {
    handleClick() {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.report {
  color: #fff;
  height: 100%;
  padding: 0 20px;
  // background:#121421;
  .el-tabs {
    height: 100%;

    /deep/ .el-tabs__header {
      @include theme-property("background", $background-tabs);
      // $background-tabs
      padding-left: 15px;
      overflow: hidden;
      border-radius: 5px;
    }
    /deep/ .el-tabs__active-bar {
      bottom: 5px;
    }
    /deep/ .el-tabs__content {
      height: calc(100% - 55px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  /deep/ .el-tabs__item {
    // color:#9AA3D4;
    @include theme-property("color", $color-text-regular);
    &.is-active {
      // color:#409EFF !important;
      @include theme-property("color", $color-text-primary);
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
    @include theme-property("background", $background-tabs);
  }
}
</style>
