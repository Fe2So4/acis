<template>
  <div
    class="widgetNews"
    :style="widgetStyle"
  >
    <div
      v-for="(col,index) in (configuration.column-1)"
      class="col"
      :style="colStyle"
      :key="index"
    />
    <div
      class="col"
      :style="lastColStyle"
    />
  </div>
</template>
<script>
export default {
  name: 'WidgetText',
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
      widgetStyle: {},
      colStyle: {},
      lastColStyle: {}
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let widgetStyle = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        textAlign: font.textAlign
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      widgetStyle = { ...widgetStyle, ...borderObj }
      this.widgetStyle = widgetStyle

      const colWidth = (100 / this.configuration.column) + '%'
      this.colStyle = {
        width: colWidth,
        'border-right': border.width + 'px solid' + border.color
      }
      this.lastColStyle = {
        width: colWidth
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetNews {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  .col {
    border-right: 1px solid black;
    width: 33%;
  }
  .col:last-child {
    border-right: none;
  }
}
</style>
