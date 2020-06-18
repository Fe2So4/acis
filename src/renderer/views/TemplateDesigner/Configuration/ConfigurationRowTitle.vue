<template>
  <div>
    <el-form-item label="行标题宽度">
      <el-input-number
        :value="value.width"
        :min="0"
        controls-position="right"
        @change="onChange"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationColumn',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    onChange (currentValue, oldValue) {
      const configuration = Object.assign({}, this.value, {
        width: currentValue
      })
      this.$emit('change', {
        rowTitle: configuration
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
