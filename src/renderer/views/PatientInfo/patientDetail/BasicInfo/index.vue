<template>
  <div class="basic-info">
    <div class="title">
      基本信息
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="5">
          <span>患者：</span>{{ 1 }}
        </el-col>
        <el-col :span="5">
          <span>住院号：</span>{{ 2 }}
        </el-col>
        <el-col :span="5">
          <span>姓名：</span>{{ 2 }}
        </el-col>
        <el-col :span="5">
          <span>年龄：</span>{{ 1 }}
        </el-col>
        <el-col :span="4">
          <span>性别：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col><span>床号：</span>{{ 1 }}</el-col>
        <el-col><span>所在科室：</span>{{ 1 }}</el-col>
        <el-col><span>付费方式：</span>{{ 1 }}</el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="24">
          <span>住址：</span>{{ 2 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>身份证号：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>联系电话：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>联系人：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="24">
          <span>职业：{{ 2 }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
    .basic-info{
        height: 100%;
        flex:1;
        color:#808080;
        font-size:14px;
        .title{
            font-size:14px;
            background:#f8f9fa;
            line-height:26px;
            box-sizing: border-box;
            color:#15428b;
            // border-bottom:1px solid #144177;
            // border-top:1px solid #144177;
            text-indent: 10px;
        }
        span{
            font-size:14px;
            line-height: 26px;
            color:#000;
        }
        .content{
            padding: 15px;
        }
    }
</style>
