<template>
  <div class="hemodynamics">
    血流动力
  </div>
</template>
<script>
export default {
  name: 'Hemodynamics',
  data () {
    return {

    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
    .hemodynamics{

    }
</style>
