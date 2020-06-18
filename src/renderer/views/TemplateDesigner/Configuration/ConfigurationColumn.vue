<template>
  <div>
    <el-form-item label="表格列数">
      <el-input-number
        :value="value.num"
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
        num: currentValue
      })
      this.$emit('change', {
        column: configuration
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
