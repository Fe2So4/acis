<template>
  <div class="patient-info clearfix">
    <div class="left">
      <operation-status />
      <tab-nav />
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
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
  // display: flex;
  .left{
    float:left;
    width:calc(100% - 220px);
    height: 100%;
  }
  .right{
    width:200px;
    float: right;
    height:100%;
    margin-left:20px;
  }
}
</style>
