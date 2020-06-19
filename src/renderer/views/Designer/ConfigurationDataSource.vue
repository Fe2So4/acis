<template>
  <div>
    <el-form-item label="源数据表名">
      <el-select
        :value="value.tableName"
        placeholder="请选择"
        @change="onChangeTableName"
      >
        <el-option
          v-for="item in tables"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
          <span>
            {{ item.name }}
            <strong>（{{ item.chinaName }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="源数据字段名">
      <el-select
        :value="value.className"
        placeholder="请选择"
        @change="onChangeClassName"
      >
        <el-option
          v-for="item in classes"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
          <span>
            {{ item.name }}
            <strong>（{{ item.chinaName }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
export default {
  name: 'ConfigurationDataSource',
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
      tables: [],
      classes: []
    }
  },
  created () {
    this.getDataSource()
  },
  methods: {
    onChangeTableName (currentValue, oldValue) {
      this.classes = this.tables.filter(
        item => item.name === currentValue
      )[0].children
      const configuration = Object.assign({}, this.value, {
        tableName: currentValue,
        className: ''
      })
      this.$emit('change', {
        dataSource: configuration
      })
    },
    onChangeClassName (currentValue, oldValue) {
      const configuration = Object.assign({}, this.value, {
        className: currentValue
      })
      this.$emit('change', {
        dataSource: configuration
      })
    },
    getDataSource () {
      request('/api/dataSource')
        .then(res => {
          this.tables = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
