<template>
  <div>
    <el-form-item label="字典表名">
      <el-select
        :value="value.dictTableName"
        placeholder="请选择"
        @change="onChangeTableName"
        clearable
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
        clearable
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
import { dataSource } from '@/api/medicalDocument'
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
  async created () {
    await this.getDataSource()
    if (this.value.dictTableName) {
      this.classes = this.tables.filter(
        item => item.name === this.value.dictTableName
      )[0].children
    }
  },
  methods: {
    onChangeTableName (currentValue, oldValue) {
      const classes = this.tables.filter(
        item => item.name === currentValue
      )
      if (classes.length) {
        this.classes = classes[0].children
      } else {
        this.classes = []
      }
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
      return request(dataSource)
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
