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
import { mapState } from 'vuex'
export default {
  name: 'PatientInfo',
  components: {
    OperationStatus,
    TabNav,
    SignsData
  },
  computed: {
    ...mapState('Base', [
      'operationId'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.operationId === '') {
        // vm.$router.push('/home/patientList')
        vm.$message({
          type: 'warning',
          message: '当前未选择患者，请回到病人列表重新选择'
        })
      }
    })
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  }
}
</script>
<style lang="scss" scoped>
 @media all and (orientation: portrait) {
     .patient-info{
       .left{
         float: unset !important;
         width: 100% !important;
         padding-right: 20px;
         height: calc(100% - 100px) !important;
       }
       .right{
         position: relative;
         left: -20px;
         right: -20px;
         float: unset !important;
         height: 100px !important;
         width: calc(100% + 20px) !important;
         margin-left: unset !important;
       }
     }
  }
.patient-info {
  height: 100%;
  padding-left:20px;
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
