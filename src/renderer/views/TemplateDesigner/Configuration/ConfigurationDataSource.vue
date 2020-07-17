<template>
  <div>
    <el-form-item label="源数据表名">
      <el-select
        :value="value.tableName"
        placeholder="请选择"
        @change="onChangeTableName"
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'tableFilterText')"
      >
        <el-option
          v-for="item in filteredTables"
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
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'classFilterText')"
      >
        <el-option
          v-for="item in filteredClasses"
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
import { dataSource } from '@/api/medicalDocument'
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
      classes: [],
      tableFilterText: '',
      classFilterText: ''
    }
  },
  computed: {
    filteredTables () {
      return this.tables.filter(
        item => item.chinaName.indexOf(this.tableFilterText) !== -1
      )
    },
    filteredClasses () {
      return this.classes.filter(
        item => item.chinaName.indexOf(this.classFilterText) !== -1
      )
    }
  },
  async created () {
    await this.getDataSource()
    if (this.value.tableName) {
      const table = this.tables.find(
        item => item.name === this.value.tableName
      )
      if (table) {
        this.classes = table.children
      }
    }
  },
  methods: {
    onChangeTableName (currentValue, oldValue) {
      this.tableFilterText = ''
      const table = this.tables.find(item => item.name === currentValue)
      if (table) {
        this.classes = table.children
      } else {
        this.classes = []
      }
      const configuration = Object.assign({}, this.value, {
        tableName: currentValue,
        className: ''
      })
      this.$emit('change', {
        dataSource: configuration
      })
    },
    onChangeClassName (currentValue, oldValue) {
      this.classFilterText = ''
      const configuration = Object.assign({}, this.value, {
        className: currentValue
      })
      this.$emit('change', {
        dataSource: configuration
      })
    },
    getDataSource () {
      return request(dataSource)
        .then(res => {
          this.tables = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    filterMethod (val, fieldName) {
      this[fieldName] = val
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
