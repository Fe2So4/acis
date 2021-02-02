<template>
  <div>
    <el-form-item label="行高">
      <el-input-number
        :value="value.height"
        :min="1"
        controls-position="right"
        @change="(val) => onChange('height', val)"
      />
    </el-form-item>
    <el-form-item label="行数">
      <el-input-number
        :value="value.length"
        :min="1"
        controls-position="right"
        @change="(val) => onChange('length', val)"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationRow',
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
    onChange (key, value) {
      const data = Object.assign({}, this.value, {
        [key]: value
      })
      this.$emit('change', {
        row: data
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
