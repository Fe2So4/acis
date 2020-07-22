<template>
  <div
    class="widgetTextArea"
    :class="{'alert':editMode && dataSourceAlert}"
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
export default {
  name: 'WidgetTextarea',
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
  computed: {
    dataSourceAlert () {
      const { tableName, className } = this.configuration.dataSource
      if (!tableName && !className) {
        return false
      } else if (tableName && className) {
        return false
      } else {
        return true
      }
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
.alert {
  outline: 4px solid red;
  outline-offset: 2px;
}
</style>
