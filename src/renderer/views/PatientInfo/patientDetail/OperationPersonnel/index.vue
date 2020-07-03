<template>
  <div class="operation-personnel">
    <div class="title">
      <i />手术人员
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
        margin-bottom:20px;
        font-size:14px;
        border:2px solid rgba(53,62,86,1);
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
          padding-top:0;
        }
        .content{
          padding: 15px;
          padding-top: 0;
          color: #D0DAE5;
        }
    }
</style>
