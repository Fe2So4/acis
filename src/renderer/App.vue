<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/mock/mockData'
export default {
  name: 'Acis',
  mounted () {
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

<style>
  /* CSS */
</style>
