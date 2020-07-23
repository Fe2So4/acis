<template>
  <div class="resuscitationBed">
    <bed-list :list="bedList" />
  </div>
</template>
<script>
import BedList from './BedList'
import request from '@/utils/requestForMock'
import { getResuscitationBedList } from '@/api/resuscitation'
export default {
  name: 'ResuscitationBed',
  data () {
    return {
      bedList: []
    }
  },
  components: {
    BedList
  },
  created () {
    this.getResuscitationBedList()
  },
  methods: {
    getResuscitationBedList () {
      return request({
        url: getResuscitationBedList,
        method: 'post'
      }).then(res => {
        if (res.data && res.data.success) {
          if (Array.isArray(res.data.data)) {
            this.bedList = res.data.data
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.resuscitationBed {
  width: 66vw;
  height: 80vh;
}
</style>
