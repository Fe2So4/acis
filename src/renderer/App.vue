<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Aims',
  mounted () {
    this.$electron.ipcRenderer.on('route', (e, locationName) => {
      if (locationName) {
        this.$router.push({
          name: locationName
        })
      }
    })
  }
}
</script>

<style>
  /* CSS */
</style>
