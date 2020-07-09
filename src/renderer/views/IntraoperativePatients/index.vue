<template lang="pug">
  .intraoperative-patient
    List(:list="patientList")
</template>
<script>
import List from '@/components/OperationOverview/index'
export default {
  name: 'IntraoperativePatients',
  data () {
    return {
      patientList: [{
        room: '07',
        opeStatus: '出手术室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: '07',
        opeStatus: '出手术室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: '07',
        opeStatus: '出手术室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: '07',
        opeStatus: '出手术室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: '07',
        opeStatus: '出手术室',
        house: '01',
        name: '钱书明',
        opeId: '100000000',
        hospitalNo: '123456',
        opeName: '谁不听话割谁脑袋数',
        time: '2020-7-8 9:40',
        doctor: '李炎飞',
        anaesDoctor: '李炎飞'
      }, {
        room: '07',
        opeStatus: '出手术室',
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
    List
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  .intraoperative-patient
    height 80vh
    // padding 0 12px
</style>
