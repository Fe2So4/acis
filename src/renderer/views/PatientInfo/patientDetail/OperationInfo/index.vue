<template>
  <div class="operation-info">
    <div class="title">
      <i />手术信息
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="24">
          <span>主要诊断</span>
          {{ opeInfo.diagnoseBefore }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="24">
          <span>病情</span>
          {{ opeInfo.memo }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="10">
          <span>手术名称</span>
          {{ opeInfo.opeNameBefore }}
        </el-col>
        <el-col :span="5">
          <span>急诊择期</span>
          {{ opeInfo.isEmergency }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="5">
          <span>手术时间</span>
          {{ opeInfo.opeScheduleTime }}
        </el-col>
        <el-col :span="5">
          <span>台次</span>
          {{ opeInfo.sequence }}
        </el-col>
        <el-col :span="5">
          <span>手术间</span>
          {{ opeInfo.opeRoom }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="5">
          <span>隔离</span>
          {{ opeInfo.isQuarantine }}
        </el-col>
        <el-col :span="5">
          <span>手术等级</span>
          {{ opeInfo.opeGrade }}
        </el-col>
        <el-col :span="5">
          <span>麻醉方法</span>
          {{ opeInfo.anesMethod }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="5">
          <span>切口等级</span>
          {{ opeInfo.notchLevel }}
        </el-col>
        <el-col :span="5">
          <span>切口个数</span>
          {{ opeInfo.notchNum }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationInfo',
  data () {
    return {}
  },
  props: {
    opeInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.operation-info {
  height: 100%;
  flex: 1;
  font-size: 14px;
  @include theme-property("border", $border-info);
  margin: 20px 0;
  border-radius: 10px;
  .title {
    font-size: 14px;
    padding-top: 10px;
    line-height: 26px;
    @include theme-property('color', $color-text-info-title);
    text-indent: 10px;
    i {
      width: 2px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
      background: linear-gradient(
        0deg,
        rgba(12, 133, 226, 1),
        rgba(236, 33, 88, 1)
      );
    }
  }
  span {
    display: inline-block;
    font-size: 14px;
    line-height: 26px;
    width: 56px;
    margin-right: 10px;
    text-align: right;
    @include theme-property("color", $color-text-regular);
  }
  .content {
    padding: 0 15px 15px;
    @include theme-property("color", $color-text-secondary);
  }
}
</style>
