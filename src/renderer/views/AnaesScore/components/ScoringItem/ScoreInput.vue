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
  @import "@/styles/theme";

  .scoreInput {
    display: flex;
    line-height: 28px;

    .label {
      @include theme-property('color', $color-text-regular);
      flex: 0 0 130px;
      padding-right: 10px;
      text-align: right;
    }
  }
</style>
