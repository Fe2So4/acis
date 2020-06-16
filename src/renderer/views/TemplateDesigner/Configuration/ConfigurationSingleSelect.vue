<template>
  <div>
    <el-form-item label="勾选类型">
      <el-select
        :value="value"
        placeholder=""
        @change="onChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationSingleSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: [
        { label: '单选', value: '1' }, { label: '多选', value: '2' }
      ]
    }
  },
  methods: {
    onChange (currentValue, oldValue) {
      this.$emit('change', {
        singleSelect: currentValue
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
