<template lang="pug">
    div.image(:style="widgetStyle")
     img(:src="configuration.value")
</template>
<script>
export default {
  name: 'WidgetImage',
  data () {
    return {
      widgetStyle: {}
    //   imgUrl: 'http://47.103.105.200/htmlFile/056a0b71-b085-4947-a71f-6df7d0529e50_100000000.jpg'
    }
  },
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
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    url () {
      return this.configuration.imgUrl
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      const { border } = this.configuration
      let styleObj = {}
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
<style lang="stylus" scoped>
    .image
        width:100%
        height:100%
        img
          width:100%
          height:100%
</style>
