<template>
  <div
    class="widgetInput"
  >
    <input
      class="input"
      type="text"
      :style="widgetStyle"
      :placeholder="configuration.placeholder"
    >
  </div>
</template>
<script>
export default {
  name: 'WidgetInput',
  props: {
    configuration: {
      type: Object,
      required: true
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
        textAlign: font.textAlign
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetInput {
  width: 100%;
  height: 100%;
  .input {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
  }
}
</style>
