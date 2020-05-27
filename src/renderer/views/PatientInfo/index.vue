<template>
    <div class="patient-info">
        <patient-list></patient-list>
        <patient-detail></patient-detail>
    </div>
</template>
<script>
import PatientList from './patientList/index'
import PatientDetail from './patientDetail/index'
export default {
  name: 'PatientInfo',
  data () {
    return {
    }
  },
  components: {
    PatientList,
    PatientDetail
  }
}
</script>
<style lang="scss" scoped>
    .patient-info{
        height: 100%;
    }
</style>
