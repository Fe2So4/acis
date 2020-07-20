<template>
  <div class="widgetDatePicker">
    <input
      class="input"
      type="text"
      :style="widgetStyle"
      :placeholder="configuration.placeholder"
      :readonly="configuration.readonly"
      :value="configuration.value"
      @input="onInput"
      @click="showPciker"
    >
    <el-date-picker
      ref="picker"
      class="picker"
      :type="configuration.datePickerType"
      :value-format="format"
      v-model="configuration.value"
      @change="onChange"
      placeholder="选择时间"
      popper-class="dateTimePicker"
    />
  </div>
</template>
<script>
export default {
  name: 'WidgetDatePicker',
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
      showSelectEvent: 'click',
      selectVisible: false,
      options: []
    }
  },
  computed: {
    format () {
      switch (this.configuration.datePickerType) {
        case 'year':
          return 'yyyy'
        case 'month':
          return 'yyyy-MM'
        case 'day':
          return 'yyyy-MM-dd'
        default:
          return 'yyyy-MM-dd HH:mm:ss'
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
    showPciker (e) {
      if (this.editMode) {
        return
      }
      this.selectVisible = true
      setTimeout(() => {
        this.$refs.picker.focus()
      })
    },
    onOptionVisibleChange (visible) {
      if (!visible) {
        this.selectVisible = false
      }
    },
    onChange (val) {
      console.log(val)
      // 标志已被修改过
      this.configuration.dirty = true
      this.configuration.value = val
    },
    onInput (e) {
      // 标志已被修改过
      this.configuration.dirty = true
      this.configuration.value = e.target.value
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetDatePicker {
  width: 100%;
  height: 100%;
  position: relative;
  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
  }
  .picker {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .picker ::v-deep .el-input {
    height: 100%;
  }
  .picker ::v-deep .el-input__inner {
    height: 100%;
    background: transparent;
    opacity: 0;
  }
  .picker ::v-deep .el-select__tags {
    display: none;
  }
  .picker ::v-deep .el-input__prefix {
    display: none;
  }

}
</style>
