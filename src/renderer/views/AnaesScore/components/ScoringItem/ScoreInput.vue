<template>
  <div class="scoreInput">
    <div class="label">
      {{ label }}
    </div>
    <el-input
      size="mini"
      :value="value"
      @input="$emit('change', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'ScoreInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    label: {
      required: true,
      type: [String, Number]
    }
  }
}
</script>
<style lang='scss' scoped>
.scoreInput {
  display: flex;
  .label {
    color: #9ba3d5;
    flex: 0 0 200px;
    padding-right: 10px;
    text-align: right;
    line-height: 28px;
  }
}
</style>
