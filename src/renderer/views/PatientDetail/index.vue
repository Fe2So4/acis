<template lang="pug">
  .patient-detail
    patient-info
</template>
<script>
import PatientInfo from '../PatientInfo/patientDetail/index'
export default {
  data () {
    return {

    }
  },
  components: {
    PatientInfo
  }
}
</script>
<style lang="stylus" scoped>
  .patient-detail
    width 600px
</style>
