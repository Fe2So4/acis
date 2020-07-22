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
  line-height: 28px;
  .label {
    color: #9ba3d5;
    flex: 0 0 130px;
    padding-right: 10px;
    text-align: right;
  }
}
</style>
