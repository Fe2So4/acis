<template>
  <div
    class="widgetTextArea"
    :style="[noTableNameStyle, dataSourceAlertStyle]"
  >
    <textarea
      class="textarea"
      :style="widgetStyle"
      :value="configuration.value"
      :placeholder="configuration.placeholder"
      :readonly="configuration.readonly"
      @input="onInut"
    />
  </div>
</template>
<script>
import { validateDataSourceMixin } from './mixin'
export default {
  name: 'WidgetTextarea',
  mixins: [validateDataSourceMixin],
  props: {
    configuration: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    }
  },
  data () {
    return {
      widgetStyle: {}
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let styleObj = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        color: font.color,
        textAlign: font.textAlign,
        textIndent: font.textIndent + 'pt'
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
    },
    onInut (e) {
      this.configuration.dirty = true
      this.configuration.value = e.target.value
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetTextArea {
  width: 100%;
  height: 100%;
  .textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
    resize: none;
  }
}
</style>
