<template>
  <div>
    <el-form-item label="接口地址">
      <el-input
        :value="value.api"
        placeholder=""
        @input="(val) => onChange('api', val)"
      />
    </el-form-item>
    <el-form-item label="请求方式">
      <el-select
        :value="value.method"
        placeholder=""
        @change="(val) => onChange('method', val)"
      >
        <el-option
          v-for="m in methods"
          :key="m"
          :value="m"
          :label="m"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationRequest',
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
  data () {
    return {
      methods: [
        'get',
        'post',
        'put',
        'delete'
      ]
    }
  },
  methods: {
    onChange (key, value) {
      const data = Object.assign({}, this.value, {
        [key]: value
      })
      this.$emit('change', {
        request: data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
