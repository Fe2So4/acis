<template>
  <div class="record">
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { getRecord } from '@/api/schedule'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      recordList: []
    }
  },
  computed: {
    ...mapGetters('Schedule', ['time'])
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      request({
        url: getRecord + `/${this.time}`
      }).then(res => {
        this.recordList = res.data.data
      })
    }
  }
}
</script>

<style>

</style>
