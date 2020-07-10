<template>
  <div>
    <el-form-item label="行集合">
      <el-button @click="onClick">
        集合
      </el-button>
    </el-form-item>
    <dialog-collection-editor
      v-if="dialogCollectionEditorConfig.visible"
      :configuration="dialogCollectionEditorConfig"
      :value="value"
      @change="onChangeList"
      append-to-body
    />
  </div>
</template>

<script>
import DialogCollectionEditor from './DialogCollectionEditor'
export default {
  name: 'ConfigurationRowList',
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      dialogCollectionEditorConfig: {}
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  components: {
    DialogCollectionEditor
  },
  created () {
    this.dialogCollectionEditorConfig = {
      visible: false,
      title: '行集合配置',
      field: [
        {
          name: 'label',
          default: '',
          description: '行名',
          config: null
        },
        {
          name: 'text',
          default: '',
          description: '药品名称',
          config: null
        },
        {
          name: 'colNum',
          default: 1,
          description: '单元格合并',
          config: null
        },
        {
          name: 'signCode',
          default: '',
          description: '体征编码',
          config: null
        },
        {
          name: 'signItem',
          default: '',
          description: '体征项目',
          config: null
        }
      ]
    }
  },
  methods: {
    onChangeList (currentValue) {
      const configuration = [...currentValue, this.value]
      this.$emit('change', {
        rowList: configuration
      })
    },
    onClick () {
      this.dialogCollectionEditorConfig.visible = true
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
