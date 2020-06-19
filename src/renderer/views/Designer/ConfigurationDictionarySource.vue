<template>
  <div>
    <el-form-item label="字典表名">
      <el-select
        :value="value.dictTableName"
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
    <el-form-item label="字典字段名">
      <el-select
        :value="value.dictClassName"
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
  name: 'ConfigurationDictionarySource',
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
        dictTableName: currentValue,
        dictClassName: ''
      })
      this.$emit('change', {
        dictionarySource: configuration
      })
    },
    onChangeClassName (currentValue, oldValue) {
      const configuration = Object.assign({}, this.value, {
        dictClassName: currentValue
      })
      this.$emit('change', {
        dictionarySource: configuration
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
