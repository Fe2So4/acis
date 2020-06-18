<template>
  <div>
    <!-- <el-form-item label="时间标题文字">
      <el-input
        :value="value.text"
        controls-position="right"
        placeholder="请输入时间标题"
        @input="onChangeText"
      />
    </el-form-item> -->
    <el-form-item label="出量行数">
      <el-input-number
        :value="value.num"
        :min="0"
        controls-position="right"
        @change="onChange"
      />
    </el-form-item>
    <!-- <el-form-item label="时间标题行高">
      <el-input-number
        :value="value.lineHeight"
        :min="0"
        controls-position="right"
        @change="onChangeLineHeight"
      />
    </el-form-item> -->
  </div>
</template>

<script>
export default {
  name: 'ConfigurationEventTitle',
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
    // onChangeText (currentValue, oldValue) {
    //   const configuration = Object.assign({}, this.value, {
    //     text: currentValue
    //   })
    //   this.$emit('change', {
    //     timeTitle: configuration
    //   })
    // },
    onChange (currentValue, oldValue) {
      const configuration = Object.assign({}, this.value, {
        num: currentValue
      })
      this.$emit('change', {
        outPut: configuration
      })
    }
    // onChangeLineHeight (currentValue, oldValue) {
    //   const configuration = Object.assign({}, this.value, {
    //     lineHeight: currentValue
    //   })
    //   this.$emit('change', {
    //     timeTitle: configuration
    //   })
    // }
  }
}
</script>
<style lang='scss' scoped>
</style>
