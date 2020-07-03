<template>
  <div class="operation-info">
    <div class="title">
      <i />手术信息
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="5">
          <span>主要诊断：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col><span>病情：</span>{{ 1 }}</el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>手术名称：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>急诊择期：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>手术时间：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>台次：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>手术间：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>隔离：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>手术等级：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>麻醉方法：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>切口等级：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>切口个数：</span>{{ 1 }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationInfo',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
    .operation-info{
        height: 100%;
        flex:1;
        color:#808080;
        font-size:14px;
        border:2px solid rgba(53,62,86,1);
        margin:20px 0;
        border-radius:10px;
        .title{
            font-size:14px;
            line-height:26px;
            color:#FEFEFF;
            text-indent: 10px;
             i{
              width:2px;
              height:20px;
              display: inline-block;
              vertical-align: middle;
              margin-right:8px;
              background:linear-gradient(0deg,rgba(12,133,226,1),rgba(236,33,88,1));
            }
        }
        span{
            font-size:14px;
            line-height: 26px;
            color:#9BA3D5;
        }
        .content{
            padding: 15px;
            padding-top:0;
            color: #D0DAE5;
        }
    }
</style>
