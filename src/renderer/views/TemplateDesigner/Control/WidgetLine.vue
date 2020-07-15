<template>
  <div
    class="widgetLine"
  >
    <div
      class="line"
      :style="lineStyle"
    />
  </div>
</template>
<script>
export default {
  name: 'WidgetLine',
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
      lineStyle: {}
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      if (this.configuration.direction === 'horizontal') {
        this.lineStyle = {
          height: 0,
          width: '100%',
          left: 0,
          top: '50%'
        }
      } else {
        this.lineStyle = {
          height: '100%',
          width: 0,
          left: '50%',
          top: 0
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetLine {
  -webkit-print-color-adjust: exact;
  width: 100%;
  height: 100%;
  position: relative;
  .line {
    position: absolute;
    width: 100%;
    height: 0;
    background: #000000;
    border: 0.5px solid black;
  }
}
</style>
