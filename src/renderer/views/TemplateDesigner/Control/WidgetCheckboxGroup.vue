<template>
  <div class="checkbox-group">
    <el-checkbox-group
      v-model="checkedOptions"
      @change="onChange"
    >
      <el-checkbox
        v-for="option in configuration.collections"
        :label="option.label"
        :key="option.value"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
    {{ checkedOptions }}
    configuration.value:{{ configuration.value }}
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

  data () {
    return {
      checkedOptions: []
    }
  },
  computed: {
    // checkedOptions: {
    //   get () {
    //     if (Array.isArray(this.configuration.value)) {
    //       return this.configuration.value
    //     } else {
    //       if (typeof this.configuration.value === 'undefined') {
    //         return []
    //       } else {
    //         return [this.configuration.value]
    //       }
    //     }
    //   },
    //   set (val) {
    //     console.log(val)

    //     this.configuration.value = ['男']
    //     console.log(this.configuration.value)
    //   }
    // }
    // checkedOptions () {
    //   if (Array.isArray(this.configuration.value)) {
    //     return this.configuration.value
    //   } else {
    //     if (typeof this.configuration.value === 'undefined') {
    //       return []
    //     } else {
    //       return [this.configuration.value]
    //     }
    //   }
    // }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        if (!this.editMode) {
          if (Array.isArray(this.configuration.value)) {
            this.checkedOptions = [...this.configuration.value]
          } else {
            if (typeof this.configuration.value === 'undefined') {
              this.checkedOptions = []
            } else {
              this.checkedOptions = [this.configuration.value]
            }
          }
        }
      }
    }
  },
  created () {
    // if (!this.editMode) {
    //   if (Array.isArray(this.configuration.value)) {
    //     this.checkedOptions = [...this.configuration.value]
    //   } else {
    //     if (typeof this.configuration.value === 'undefined') {
    //       this.checkedOptions = []
    //     } else {
    //       this.checkedOptions = [this.configuration.value]
    //     }
    //   }
    // }
  },
  methods: {
    onChange (val) {
      if (this.configuration.singleSelect === '1' && val.length > 1) {
        this.checkedOptions.shift()
      }
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-group {
  height: 100%;
  width: 100%;
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
