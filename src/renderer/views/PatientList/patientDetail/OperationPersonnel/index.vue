<template>
  <div class="operation-personnel">
    <div class="title">
      手术人员
    </div>
    <div class="content">
      <el-row :gutter="22">
        <el-col :span="6">
          <span>麻醉医师：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>灌注医师：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>手术医师：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>手术助手：</span>{{ 1 }}
        </el-col>
      </el-row>
      <el-row :gutter="22">
        <el-col :span="6">
          <span>洗手护士：</span>{{ 1 }}
        </el-col>
        <el-col :span="6">
          <span>巡回护士：</span>{{ 1 }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OperationPersonnel',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
    .operation-personnel{
        height: 100%;
        flex:1;
        color:#808080;
        font-size:14px;
        .title{
            font-size:14px;
            line-height:26px;
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
