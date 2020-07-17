<template>
  <div>
    <el-form-item label="字典表名">
      <el-select
        :value="value.dictTableName"
        placeholder="请选择"
        @change="onChangeTableName"
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'tableFilterText')"
      >
        <el-option
          v-for="item in filteredTables"
          :key="item.tableName"
          :label="item.tableName"
          :value="item.tableName"
        >
          <span>
            {{ item.tableName }}
            <strong>（{{ item.tableExplain }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字典字段名">
      <el-select
        :value="value.dictClassName"
        placeholder="请选择"
        @change="onChangeClassName"
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'classFilterText')"
      >
        <el-option
          v-for="item in filteredClasses"
          :key="item.showClassName"
          :label="item.showClassName"
          :value="item.showClassName"
        >
          <span>
            {{ item.showClassName }}
            <strong>（{{ item.showClassNameExplain }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字典筛选条件">
      <el-select
        :value="value.dictRelationName"
        placeholder="请选择"
        @change="onChangeRelationName"
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'relationFilterText')"
      >
        <el-option
          v-for="item in filteredRelations"
          :key="item.dictId"
          :label="item.dictId"
          :value="item.dictId"
        >
          <span>
            {{ item.dictId }}
            <strong>（{{ item.dictName }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { getDictionaryTableData } from '@/api/medicalDocument'
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
      classes: [],
      relations: [],
      tableFilterText: '',
      classFilterText: '',
      relationFilterText: ''
    }
  },
  computed: {
    filteredTables () {
      return this.tables.filter(
        item => item.tableExplain.indexOf(this.tableFilterText) !== -1
      )
    },
    filteredClasses () {
      return this.classes.filter(
        item => item.showClassNameExplain.indexOf(this.classFilterText) !== -1
      )
    },
    filteredRelations () {
      return this.relations.filter(
        item => item.dictName.indexOf(this.relationFilterText) !== -1
      )
    }
  },
  async created () {
    await this.getDictionaryTableData()
    if (this.value.dictTableName) {
      const table = this.tables.find(
        item => item.tableName === this.value.dictTableName
      )
      if (table) {
        this.classes = table.tableInfos
      }
      if (this.value.dictClassName) {
        const dictClass = this.classes.find(
          item => item.showClassName === this.value.dictClassName
        )
        if (dictClass) {
          this.relations = dictClass.classNameValue
        }
      }
    }
  },
  methods: {
    onChangeTableName (currentValue, oldValue) {
      this.tableFilterText = ''
      const table = this.tables.find(item => item.tableName === currentValue)
      if (table) {
        this.classes = table.tableInfos
      } else {
        this.classes = []
      }
      this.relations = []
      const configuration = Object.assign({}, this.value, {
        dictTableName: currentValue,
        conditionClassNameId: table ? table.conditionClassNameId : '',
        dictClassName: '',
        dictRelationName: ''
      })
      this.$emit('change', {
        dictionarySource: configuration
      })
    },
    onChangeClassName (currentValue, oldValue) {
      this.classFilterText = ''
      const dictClass = this.classes.find(
        item => item.showClassName === currentValue
      )
      if (dictClass) {
        this.relations = dictClass.classNameValue
      } else {
        this.relations = []
      }
      const configuration = Object.assign({}, this.value, {
        dictClassName: currentValue,
        dictRelationName: ''
      })
      this.$emit('change', {
        dictionarySource: configuration
      })
    },
    onChangeRelationName (currentValue, oldValue) {
      this.relationFilterText = ''
      const configuration = Object.assign({}, this.value, {
        dictRelationName: currentValue
      })
      this.$emit('change', {
        dictionarySource: configuration
      })
    },
    getDictionaryTableData () {
      return request(getDictionaryTableData)
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
