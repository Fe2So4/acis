<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import '@/mock/mockData'
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

<style lang="scss">
/*日期时间选择器*/
.dateTimePicker {
  .el-date-table th {
    border-bottom: 1px solid #006ab6;
  }
  .el-date-picker__time-header {
   border-bottom: 1px solid #353e56;
  }
  .el-picker-panel__footer {
    background-color: #252C40;
    border-top: 1px solid #353e56;
  }

}
</style>
