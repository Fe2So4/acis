<template>
  <div class="operation-overview">
    <Overview
      :list="overviewList"
      :show-room="true"
    />
  </div>
</template>
<script>
import Overview from '@/components/OperationOverview/index'
export default {
  data () {
    return {
      overviewList: [{
        room: 'P1',
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
        room: 'P2',
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
        room: 'P3',
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
        room: 'P4',
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
        room: 'P5',
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
        room: 'P6',
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
        room: 'P4',
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
        room: 'P5',
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
        room: 'P6',
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
    Overview
  },
  methods: {

  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
    .operation-overview{
      width:68vw;
      height:60vh;
    }
</style>
