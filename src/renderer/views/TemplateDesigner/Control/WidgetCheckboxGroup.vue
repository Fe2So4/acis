<template>
  <div
    class="checkbox-group"
    :style="widgetStyle"
  >
    <el-checkbox-group
      v-model="checkedOptions"
      @change="onChange"
    >
      <el-checkbox
        v-for="option in configuration.collections"
        :label="option.label"
        :key="option.value"
        :style="checkboxStyle"
      >
        <span :style="fontStyle">{{ option.label }}</span>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'WidgetCheckboxGroup',
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
      fontStyle: {},
      checkboxStyle: {},
      checkedOptions: []
    }
  },
  created () {
    this.setStyle()
    if (!this.editMode) {
      if (Array.isArray(this.configuration.value)) {
        this.checkedOptions = [...this.configuration.value]
      } else {
        if (typeof this.configuration.value === 'undefined') {
          this.checkedOptions = []
        } else {
          this.checkedOptions = this.configuration.value.split(',')
        }
      }
    }
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let styleObj = {
        lineHeight: font.lineHeight + 'px',
        textAlign: font.textAlign
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
      this.fontStyle = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        color: font.color
      }
      this.checkboxStyle = {
        'margin-right': this.configuration.labelMargin + 'px'
      }
    },
    onChange (val) {
      if (this.configuration.singleSelect === '1' && val.length > 1) {
        this.checkedOptions.shift()
      }
      this.$emit('change', val.join(','))
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-group {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.checkbox-group /deep/ .el-checkbox {
  color: #000;
}
.checkbox-group /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: transparent;
  border-color: #000;
}
.checkbox-group /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
.checkbox-group /deep/ .el-checkbox.is-bordered.is-checked {
  border-color: #000;
}
.checkbox-group /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #000;
}
.checkbox-group /deep/ .el-checkbox__inner {
  border-color: #000;
  background-color: transparent;
  &::after {
    border-color: #000;
  }
}
</style>
