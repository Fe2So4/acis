<template>
  <div class="patient-detail">
    <div class="title">
      <i class="el-icon-document" />患者详情
    </div>
    <div class="content">
      <basic-info />
      <operation-info />
      <operation-personnel />
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
    }
  },
  components: {
    BasicInfo, OperationInfo, OperationPersonnel
  }
}
</script>
<style lang="scss" scoped>
    .patient-detail{
        height: 100%;
        flex: 1;
        .title{
            color:#15428b;
            // font: 14px;
            line-height: 30px;
        }
    }
</style>
