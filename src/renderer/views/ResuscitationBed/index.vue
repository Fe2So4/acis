<template lang="pug">
  .bed
    PatientList(:list="patientList")
</template>
<script>
import PatientList from '@/components/OperationOverview/index'
export default {
  name: 'ResuscitationBed',
  data () {
    return {
      patientList: [{
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: 'P1',
        opeStatus: '入复苏室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }]
    }
  },
  components: {
    PatientList
  }
}
</script>
<style lang="stylus" scoped>
  .bed
    width 66vw
    height 80vh
</style>
