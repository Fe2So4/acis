<template>
  <div>
    <el-form-item label="宽(mm)">
      <el-input-number
        :value="value.width"
        :min="0"
        controls-position="right"
        @change="onChangeWidth"
      />
    </el-form-item>
    <el-form-item label="高(mm)">
      <el-input-number
        :value="value.height"
        :min="0"
        controls-position="right"
        @change="onChangeHeight"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationPaper',
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    onChangeWidth (currentValue, oldValue) {
      const value = Object.assign({}, this.value, {
        width: currentValue
      })
      this.$emit('change', value)
    },
    onChangeHeight (currentValue, oldValue) {
      const value = Object.assign({}, this.value, {
        height: currentValue
      })
      this.$emit('change', value)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
