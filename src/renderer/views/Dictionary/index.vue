<template lang="pug">
  .dictionary
    .title 字典维护
    .nav
      el-tabs(v-model="activeName" @tab-click="handleClick")
        el-tab-pane(label="常用术语" name="1")
          common-terms
        el-tab-pane(label="麻醉事件" name="2")
          AnaesEvent
        el-tab-pane(label="麻醉方法" name="3")
          AnaesMethods
        el-tab-pane(label="麻醉常用量" name="4")
          CommonQuantity
        el-tab-pane(label="采集仪器字典" name="5")
          GatherDevice
        el-tab-pane(label="手术间字典" name="6")
          OperationRoom
        el-tab-pane(label="医生字典" name="7")
          Doctor
        el-tab-pane(label="护士字典" name="8")
          Nurse
        el-tab-pane(label="诊断字典" name="9")
          Diagnose
        el-tab-pane(label="手术名称" name="10")
          OperationName
</template>
<script>
import CommonTerms from './CommonTerms/index'
import AnaesMethods from './AnaesMethods/index'
import OperationRoom from './OperationRoom/index'
import GatherDevice from './GatherDevice/index'
import AnaesEvent from './AnaesEvent/index'
import CommonQuantity from './CommonQuantity/index'
import Doctor from './Doctor/index'
import Nurse from './Nurse/index'
import OperationName from './OperationName/index'
import Diagnose from './Diagnose/index'
export default {
  name: 'Dictionary',
  data () {
    return {
      activeName: '1'
    }
  },
  components: {
    CommonTerms,
    AnaesMethods,
    OperationRoom,
    GatherDevice,
    AnaesEvent,
    CommonQuantity,
    Doctor,
    Nurse,
    OperationName,
    Diagnose
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/theme";
  .dictionary{
    height:80vh;
    width:70vw;
    .title{
      line-height:28px;
      font-size:14px;
      color:#9BA3D5;
    }
    .nav{
      height:calc(100% - 28px);
      .el-tabs{
        height:100%;
        /deep/ .el-tabs__content{
          height:calc(100% - 55px);
          .el-tab-pane{
            height:100%;
          }
        }
      }
    }
  }
  .dictionary /deep/ .el-tabs__nav-wrap::after{
    @include theme-property("background", $color-background-navigation)
  }
  .dictionary /deep/ .el-tabs__item{
    @include theme-property("color", $color-text-regular);
    &.is-active{
      @include theme-property("color", $color-text-primary);
    }
  }
</style>
