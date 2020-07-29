<template>
  <div class="operation-overview">
    <RoomList
      :list="roomList"
      :show-room="true"
    />
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { getOpeView } from '@/api/superConfig'
import RoomList from './RoomList'
export default {
  data () {
    return {
      overviewList: [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        }
      ],
      roomList: []
    }
  },
  components: {
    RoomList
  },
  created () {
    this.getOpeView()
  },
  methods: {
    getOpeView () {
      return request({
        url: getOpeView,
        method: 'get'
      }).then((res) => {
        if (res.data && res.data.success) {
          this.roomList = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.operation-overview {
  width: 68vw;
  height: 60vh;
}
</style>
