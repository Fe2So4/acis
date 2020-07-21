<template>
  <div class="scoreTextarea">
    <div class="label">
      {{ label }}
    </div>
    <el-input
      type="textarea"
      :rows="2"
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
.scoreTextarea {
  display: flex;
  .label {
    color: #9ba3d5;
    flex: 0 0 200px;
    padding-right: 10px;
    box-sizing: border-box;
    text-align: right;
    line-height: 28px;
  }
}
</style>
