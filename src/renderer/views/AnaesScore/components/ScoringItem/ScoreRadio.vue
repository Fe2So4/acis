<template>
  <div>
    <el-radio-group
      v-model="radio"
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
</style>
