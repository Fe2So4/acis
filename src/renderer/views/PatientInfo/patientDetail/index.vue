<template>
  <div class="patient-detail">
    <div class="title">
      <i
        class="el-icon-document"
        style="color:orange;margin-right:5px"
      />患者详情
    </div>
    <div class="content">
       <el-scrollbar style="height:100%;" class="scrollbar">
        <basic-info></basic-info>
        <operation-info></operation-info>
        <operation-personnel></operation-personnel>
       </el-scrollbar>
      <!-- <el-table
        :data="tableData"
        style="width: 100%;height:200px;"
      >
        <el-table-column
          prop="date"
          label="日期"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table> -->
    </div>
  </div>
</template>
<script>
import BasicInfo from './BasicInfo/index'
import OperationInfo from './OperationInfo/index'
import OperationPersonnel from './OperationPersonnel/index'
export default {
  name: 'PatientDetail',
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    tableData: {
      handler (newVal, old) {
        return newVal
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    BasicInfo, OperationInfo, OperationPersonnel
  },
  mounted () {
    // this.tableData = [{
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // }, {
    //   date: '2016-05-04',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1517 弄'
    // }, {
    //   date: '2016-05-01',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1519 弄'
    // }, {
    //   date: '2016-05-03',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1516 弄'
    // }]
  }
}
</script>
<style lang="scss" scoped>
    .patient-detail{
        height: 100%;
        flex: 1;
        background:#f8f9fa;
        .title{
            color:#15428b;
            font-size:14px;
            line-height:30px;
            // line-height: 30px;
            padding-left:10px;
        }
        .content{
          height:calc(100% - 30px);
        }
    }
</style>
<style lang="scss">
  .patient-detail .scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
  }
</style>
