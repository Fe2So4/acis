<template lang="pug">
.intraoperative-patient
  PatientList(:list="patientList" @touch-bottom="onTouchBottom")
</template>
<script>
import PatientList from './PatientList'
import request from '@/utils/requestForMock'
import { getPatientList } from '@/api/superConfig'
export default {
  name: 'IntraoperativePatients',
  data () {
    return {
      patientList: [],
      pageNo: 1,
      pageSize: 10,
      pages: 1
    }
  },
  components: {
    PatientList
  },
  created () {
    this.getPatientList()
  },
  methods: {
    getPatientList () {
      return request({
        method: 'get',
        url: getPatientList,
        params: {
          opeState: 2,
          start: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            const { pages, list, pageNum } = res.data.data
            this.pages = pages
            this.pageNo = pageNum
            this.patientList.push(...list)
          }
        }
      )
    },
    onTouchBottom () {
      if (this.pages > this.pageNo) {
        this.pageNo++
        this.getPatientList()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.intraoperative-patient {
  height: 80vh;
  // padding 0 12px
}
</style>
