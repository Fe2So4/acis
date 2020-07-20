<template>
  <div
    class="widgetPagination"
    :style="widgetStyle"
  >
    {{ text }}
  </div>
</template>
<script>
export default {
  name: 'WidgetPagination',
  props: {
    configuration: {
      type: Object,
      required: true
    },
    totalPage: {
      required: false,
      type: [Number, String],
      default: ''
    },
    pageIndex: {
      required: false,
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      widgetStyle: {}
    }
  },
  computed: {
    text () {
      if (this.editMode || this.totalPage === '' || this.pageIndex === '') {
        return '分页信息'
      } else {
        return `第${this.pageIndex + 1}页/共${this.totalPage}页`
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
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetPagination {
  width: 100%;
  height: 100%;
  word-break: break-all;
  overflow: hidden;
}
</style>
