<template>
  <div class="operation-personnel">
    <div class="title">
      <i />手术人员
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="10">
          <span>麻醉医师</span>
          {{ docInfo.anesDoc }}
        </el-col>
        <el-col :span="10">
          <span>输血医师</span>
          {{ docInfo.infuseDoc }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="10">
          <span>手术医师</span>
          {{ docInfo.surgeon }}
        </el-col>
        <el-col :span="10">
          <span>手术助手</span>
          {{ docInfo.assist }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="10">
          <span>洗手护士</span>
          {{ docInfo.opeNurse }}
        </el-col>
        <el-col :span="10">
          <span>巡回护士</span>
          {{ docInfo.supplyNurse }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationPersonnel',
  data () {
    return {}
  },
  props: {
    docInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme';
.operation-personnel {
  height: 100%;
  flex: 1;
  margin-bottom: 20px;
  font-size: 14px;
  @include theme-property('border', $border-info);
  border-radius: 10px;
  .title {
    font-size: 14px;
    line-height: 26px;
    @include theme-property('color', $color-text-info-title);
    text-indent: 10px;
    padding-top: 10px;
    i {
      width: 2px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 8px;
      @include theme-property('background', $background-menu-active);
    }
  }
  span {
    display: inline-block;
    font-size: 14px;
    line-height: 26px;
    width: 56px;
    margin-right: 10px;
    text-align: right;
    @include theme-property('color', $color-text-regular);
  }
  .content {
    padding: 0 15px 15px;
    @include theme-property('color', $color-text-secondary);
  }
}
</style>
