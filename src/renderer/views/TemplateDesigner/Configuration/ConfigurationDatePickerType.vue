<template>
  <div>
    <el-form-item label="日期选择类型">
      <el-select
        :value="value"
        placeholder="显示类型"
        @change="onChange"
      >
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <!-- <span>
            {{ item.tagName }}
            <strong>（{{ item.name }}）</strong>
          </span> -->
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationTagName',
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
      list: [
        {
          label: '年',
          value: 'year'
        }, {
          label: '月份',
          value: 'month'
        }, {
          label: '日期',
          value: 'date'
        }, {
          label: '星期',
          value: 'week'
        }, {
          label: '日期时间',
          value: 'datetime'
        }
      ]
    }
  },
  methods: {
    onChange (currentValue, oldValue) {
      this.$emit('change', {
        datePickerType: currentValue
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
