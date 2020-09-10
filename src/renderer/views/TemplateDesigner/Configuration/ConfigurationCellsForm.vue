<template>
  <div>
    <el-form-item>
      <el-button
        size="mini"
        @click="$emit('merge-cells')"
      >
        合并
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        size="mini"
        @click="$emit('split-cells')"
      >
        拆分
      </el-button>
    </el-form-item>
    <el-form-item label="行数">
      <el-input-number
        :value="rows"
        size="mini"
        @change="(newRows, oldRows) => {$emit('change-rows',{newRows, oldRows})}"
        step-strictly
        :min="1"
      />
    </el-form-item>
    <el-form-item label="列数">
      <el-input-number
        :value="cols"
        size="mini"
        @change="(newCols, oldCols) => {$emit('change-cols',{newCols, oldCols})}"
        step-strictly
        :min="1"
      />
    </el-form-item>
    <el-form-item label="单元格内容">
      <el-input
        :value="cellConfiguration('value')"
        size="mini"
        @input="(val) => {
          $emit('change-cell','value',val)
        }"
        clearable
      />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select
        clearable
        :value="cellConfiguration('textAlign')"
        @change="(val) => $emit('change-cell','textAlign',val)"
        placeholder="请选择"
      >
        <el-option
          v-for="item in [
            {value: 'left', label:'左对齐'},
            {value: 'center', label:'居中对齐'},
            {value: 'right', label:'右对齐'},
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="缩进">
      <el-input-number
        clearable
        :value="cellConfiguration('textIndent')"
        size="mini"
        @change="(val) => $emit('change-cell','textIndent',val)"
        step-strictly
        :min="0"
      />
    </el-form-item>
    <el-form-item label="字号">
      <el-input-number
        clearable
        :value="cellConfiguration('fontSize')"
        size="mini"
        @change="(val) => $emit('change-cell','fontSize',val)"
        step-strictly
        :min="0"
      />
    </el-form-item>
    <el-form-item label="文字加粗">
      <el-select
        clearable
        :value="cellConfiguration('fontWeight')"
        @change="(val) => $emit('change-cell','fontWeight',val)"
        placeholder="请选择"
      >
        <el-option
          v-for="item in [
            {value: 'normal', label:'正常'},
            {value: 'bold', label:'加粗'},
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="单元格宽">
      <el-input-number
        :value="cellConfiguration('width')"
        size="mini"
        @change="(val) => $emit('change-cell','width',val)"
        step-strictly
        :min="0"
      />
    </el-form-item>
    <el-form-item label="单元格高">
      <el-input-number
        :value="cellConfiguration('height')"
        size="mini"
        @change="(val) => $emit('change-cell','height',val)"
        step-strictly
        :min="0"
      />
    </el-form-item>
    <el-form-item label="单元格行高">
      <el-input-number
        :value="cellConfiguration('lineHeight')"
        size="mini"
        @change="(val) => $emit('change-cell','lineHeight',val)"
        step-strictly
        :min="0"
      />
    </el-form-item>
    <el-form-item label="文字颜色">
      <el-color-picker
        clearable
        :value="cellConfiguration('color')"
        @change="(val) => $emit('change-cell','color',val)"
      />
    </el-form-item>
    <el-form-item label="单元格边框颜色">
      <el-color-picker
        clearable
        :value="cellConfiguration('borderColor')"
        @change="(val) => $emit('change-cell','borderColor',val)"
      />
    </el-form-item>
    <el-form-item label="源数据表名">
      <el-select
        :value="cellConfiguration('tableName')"
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
        :value="cellConfiguration('className')"
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
    <el-form-item label="开启编辑">
      <el-switch
        :value="editable"
        @change="$emit('switch-editable')"
      />
    </el-form-item>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { dataSource } from '@/api/medicalDocument'
export default {
  name: 'ConfigurationCellsForm',
  components: {
  },
  props: {
    rows: {
      required: true,
      type: Number
    },
    cols: {
      required: true,
      type: Number
    },
    cellActiveConfiguration: {
      required: true,
      type: Object
    },
    editable: {
      required: true,
      type: Boolean
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
    cellConfiguration () {
      return (name) => {
        return this.cellActiveConfiguration[name].length === 0
          ? ''
          : this.cellActiveConfiguration[name][0]
      }
    },
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
    if (this.cellConfiguration('tableName')) {
      const table = this.tables.find(
        item => item.name === this.cellConfiguration('className')
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
      this.$emit('change-cell', 'tableName', currentValue)
      this.$emit('change-cell', 'className', '')
    },
    onChangeClassName (currentValue, oldValue) {
      this.classFilterText = ''
      this.$emit('change-cell', 'className', currentValue)
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
