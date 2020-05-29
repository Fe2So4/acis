<template>
    <div class="operation-info">
        <div class="title">手术信息</div>
        <div class="content">
            <el-row :gutter="22">
                <el-col :span="5"><span>主要诊断：</span>{{1}}</el-col>
            </el-row>
            <el-row :gutter="22">
                <el-col><span>病情：</span>{{1}}</el-col>
            </el-row>
            <el-row :gutter="22">
                <el-col :span="6"><span>手术名称：</span>{{1}}</el-col>
                <el-col :span="6"><span>急诊择期：</span>{{1}}</el-col>
            </el-row>
            <el-row :gutter="22">
                <el-col :span="6"><span>手术时间：</span>{{1}}</el-col>
                <el-col :span="6"><span>台次：</span>{{1}}</el-col>
                <el-col :span="6"><span>手术间：</span>{{1}}</el-col>
            </el-row>
            <el-row :gutter="22">
                <el-col :span="6"><span>隔离：</span>{{1}}</el-col>
                <el-col :span="6"><span>手术等级：</span>{{1}}</el-col>
                <el-col :span="6"><span>麻醉方法：</span>{{1}}</el-col>
            </el-row>
            <el-row :gutter="22">
                <el-col :span="6"><span>切口等级：</span>{{1}}</el-col>
                <el-col :span="6"><span>切口个数：</span>{{1}}</el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Operation-Info',
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
        .title{
            font-size:14px;
            line-height:26px;
            color:#15428b;
            background:#f8f9fa;
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
