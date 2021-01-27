<template>
  <div class="dialogDesigner">
    <el-dialog
      title="模板设计器"
      :visible="visible"
      fullscreen
      destroy-on-close
      @close="onCancel"
    >
      <template-designer
        :template-id="templateId"
        @show-template-data="onShowTemplateData"
      />
      <div
        slot="footer"
        style="text-align:left"
      >
        <textarea
          style="max-height: 100px;width: 100%"
          :value="templateData"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>

import TemplateDesigner from '@/views/TemplateDesigner/index.vue'
export default {
  name: 'DialogDesigner',
  components: {
    TemplateDesigner
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    templateId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      templateData: ''
    }
  },
  methods: {
    onCancel () {
      this.$emit('update:visible', false)
      this.$destroy()
    },
    onShowTemplateData (templateData) {
      this.templateData = templateData
      // this.$emit('update:visible', false)
      // this.$emit('update-successfully')
    }
  }

}
</script>

<style lang="scss" scoped>
.dialogDesigner ::v-deep .templateDesignerPage {
  width: 100%;
}
.dialogDesigner{
  /deep/ .el-dialog__headerbtn{
    font-size: 26px;
  }
}
</style>
