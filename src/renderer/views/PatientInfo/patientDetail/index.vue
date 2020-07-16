<template>
  <div class="patient-detail">
    <div class="content">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <basic-info />
        <operation-info />
        <operation-personnel />
      </el-scrollbar>
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
  }
}
</script>
<style lang="scss" scoped>
    .patient-detail{
      margin-top:20px;
      width: 100%;
      color:#9BA3D5;
      height: calc(100% - 192px);
      // display: flex;
      padding:20px;
      background:#181C27;
      box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
      border-radius:5px;
        .title{
            color:#15428b;
            font-size:14px;
            line-height:30px;
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
