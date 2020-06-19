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
    <el-form-item label="输血行数">
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
  name: 'ConfigurationBloodTransfusion',
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
        bloodTransfusion: configuration
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
