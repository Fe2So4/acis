<template>
  <div class="templateDesignerPage">
    <content-displayer />
  </div>
</template>
<script>
import ContentDisplayer from './ContentDisplayer'

export default {
  name: 'PageTemplateDesigner',
  components: {
    ContentDisplayer
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.templateDesignerPage {
  display: flex;
  height: calc(100vh - 30px);
}
</style>
