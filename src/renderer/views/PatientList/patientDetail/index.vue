<template>
  <div class="patient-detail">
    <div class="title">
      <i
        class="el-icon-document"
        style="color:#144177;margin-right:5px"
      />患者详情
    </div>
    <div class="content">
      <el-scrollbar
        style="height:100%;"
        :wrap-style="wrapStyle"
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
    const wrapStyle = Object.freeze([{
      'overflow-x': 'hidden'
    }])
    return {
      tableData: [],
      wrapStyle
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
    BasicInfo,
    OperationInfo,
    OperationPersonnel
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.patient-detail {
  height: 100%;
  flex: 1;
  // background:#f8f9fa;
  .title {
    color: #15428b;
    font-size: 14px;
    line-height: 30px;
    // line-height: 30px;
    padding-left: 10px;
  }
  .content {
    height: 100%;
  }
}
</style>
