<template>
  <div class="templateDesignerPage">
    <content-widget-list @show-template-data="onShowTemplateData" />
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
  props: {
    templateId: {
      required: false,
      type: [String, Number],
      default: null
    }
  },
  created () {
    this.getTemplateData().then(
      res => {
        this.initStore(res.data.data.list)
      }
    )
  },
  methods: {
    ...mapActions([
      'initStore',
      'setTemplateId'
    ]),
    getTemplateData () {
      const requestData = {}
      if (this.templateId) {
        this.setTemplateId(this.templateId)
        requestData.templateCode = this.templateId
      }
      return request({
        method: 'POST',
        params: requestData,
        url: getTemplateData
      })
    },
    onShowTemplateData (dataStr) {
      this.$emit('show-template-data', dataStr)
    }
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
