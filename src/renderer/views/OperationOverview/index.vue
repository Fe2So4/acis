<template>
  <div class="operation-overview">
    <!-- <RoomList
      :list="roomList"
    /> -->
    <RoomTable :list="roomList" />
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { getOpeView } from '@/api/superConfig'
// import RoomList from './RoomList'
import RoomTable from './RoomTable'
export default {
  data () {
    return {
      roomList: []
    }
  },
  components: {
    RoomTable
    // RoomList
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
