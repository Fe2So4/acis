<template>
  <div>
    <el-checkbox
      size="mini"
      :value="value"
      @change="$emit('change', $event)"
    >
      {{ label }}
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'ScoreCheckbox',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true,
      type: Boolean
    },
    label: {
      required: true,
      type: [String, Number]
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
