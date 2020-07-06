<template>
  <div class="patient-info">
    <div class="left">
      <operation-status />
      <tab-nav />
      <router-view />
    </div>
    <div class="right">
      <signs-data />
    </div>
  </div>
</template>
<script>
import OperationStatus from './operationStatus/index'
import SignsData from '@/components/SignsData/index'
import TabNav from './tabNav/index'
export default {
  name: 'PatientInfo',
  data () {
    return {}
  },
  components: {
    OperationStatus,
    TabNav,
    SignsData
  }
}
</script>
<style lang="scss" scoped>
.patient-info {
  height: 100%;
  padding-left:12px;
  display: flex;
  .left{
    flex: 1;
  }
  .right{
    width:200px;
    margin-left:20px;
  }
}
</style>
