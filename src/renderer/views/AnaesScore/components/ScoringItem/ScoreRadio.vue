<template>
  <div class="scoreRadio">
    <div
      class="label"
      v-if="label"
    >
      {{ label }}
    </div>
    <el-radio-group
      v-model="radio"
      v-if="options.length"
    >
      <el-radio
        v-for="option in options"
        :key="option.score"
        :label="option.label"
      >
        {{ option.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'ScoreRadio',
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
      required: false,
      type: [String, Number],
      default: ''
    },
    options: {
      required: true,
      type: Array
    }
  },
  computed: {
    radio: {
      set (val) {
        this.$emit('change', val)
      },
      get () {
        return this.value
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.scoreRadio {
  display: flex;
  line-height: 28px;
  width: 100%;
  & ::v-deep .el-radio {
    line-height: 28px;
  }
  .label {
    color: #9ba3d5;
    flex: 0 0 130px;
    padding-right: 10px;
    text-align: right;
  }
  .el-radio-group {
    flex: auto;
  }
}
</style>
