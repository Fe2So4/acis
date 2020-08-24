<template>
  <div class="basic-info">
    <div class="title">
      <i />基本信息
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="5">
          <span>患者ID</span>
          {{ basicInfo.patientId }}
        </el-col>
        <el-col :span="5">
          <span>住院号</span>
          {{ basicInfo.visitId }}
        </el-col>
        <el-col :span="5">
          <span>姓名</span>
          {{ basicInfo.patientName }}
        </el-col>
        <el-col :span="5">
          <span>年龄</span>
          {{ basicInfo.age }}
        </el-col>
        <el-col :span="4">
          <span>性别</span>
          {{ basicInfo.gender }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="5">
          <span>床号</span>
          {{ basicInfo.bedId }}
        </el-col>
        <el-col :span="5">
          <span>所在科室</span>
          {{ basicInfo.deptName }}
        </el-col>
        <el-col :span="5">
          <span>付费方式</span>
          {{ basicInfo.chargeType }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="10">
          <span>住址</span>
          {{ basicInfo.mailingAddr }}
        </el-col>
        <el-col :span="14">
          <span>身份证号</span>
          {{ basicInfo.idNo }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="5">
          <span>联系电话</span>
          {{ basicInfo.contractPhone }}
        </el-col>
        <el-col :span="5">
          <span>联系人</span>
          {{ basicInfo.contactName }}
        </el-col>
        <el-col :span="5">
          <span>职业</span>暂无
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BasicInfo',
  data () {
    return {}
  },
  props: {
    basicInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.basic-info {
  height: 100%;
  flex: 1;
  font-size: 14px;
  @include theme-property("border", $border-info);
  border-radius: 10px;
  .title {
    font-size: 14px;
    line-height: 26px;
    box-sizing: border-box;
    color: #ffffff;
    text-indent: 10px;
    padding-top: 10px;
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
