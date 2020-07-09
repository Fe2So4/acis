<template>
  <div class="templateDesignerPage">
    <content-widget-list />
    <content-designer />
    <content-configuration />
  </div>
</template>
<script>
import ContentWidgetList from './ContentWidgetList'
import ContentDesigner from './ContentDesigner'
import ContentConfiguration from './ContentConfiguration'
export default {
  name: 'PageTemplateDesigner',
  components: {
    ContentWidgetList,
    ContentDesigner,
    ContentConfiguration
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.templateDesignerPage {
  display: flex;
  // height: 100%;
  width:90vw;
  height:80vh;
}
</style>
