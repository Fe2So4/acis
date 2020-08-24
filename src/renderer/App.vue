<template>
  <div
    id="app"
  >
    <router-view />
  </div>
</template>

<script>
// import '@/mock/mockData'
import { mapState } from 'vuex'
export default {
  name: 'Acis',
  computed: {
    ...mapState('Base', ['theme'])
  },
  watch: {
    theme: {
      handler: function (val) {
        document.body.classList.add(val)
      },
      immediate: true
    }
  },
  created () {
    this.$electron.ipcRenderer.on('route', (e, locationName) => {
      if (locationName) {
        this.$router.push({
          name: locationName
        })
      }
    })
    this.$electron.ipcRenderer.on('printRoute', (e, printRoute) => {
      if (printRoute) {
        this.$router.push(printRoute)
      }
    })
  }
}
</script>

<style lang="scss">

</style>
