<template>
  <div class="templateDesignerPage">
    <content-widget-list />
    <content-designer />
    <content-configuration />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import { getTemplateData } from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import ContentWidgetList from './ContentWidgetList'
import ContentDesigner from './ContentDesigner'
import ContentConfiguration from './ContentConfiguration'
const { mapActions } = createNamespacedHelpers('PageTemplateDesigner')
export default {
  name: 'PageTemplateDesigner',
  components: {
    ContentWidgetList,
    ContentDesigner,
    ContentConfiguration
  },
  created () {
    this.getTemplateData().then(
      res => {
        console.log(res)
        this.initStore(res.data.data.list)
      }
    )
  },
  methods: {
    ...mapActions([
      'initStore'
    ]),
    getTemplateData () {
      return request({
        method: 'POST',
        data: {},
        url: getTemplateData
      })
    }
  }
  // mounted () {
  // this.$electron.ipcRenderer.send('show-window')
  // }
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
