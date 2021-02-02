<template>
  <div>
    <el-form-item label="列配置">
      <el-button @click="onClick">
        配置
      </el-button>
    </el-form-item>
    <dialog-collection-editor
      v-if="dialogCollectionEditorConfig.visible"
      :configuration="dialogCollectionEditorConfig"
      :value="value.list"
      @change="onChangeList"
      append-to-body
    />
  </div>
</template>

<script>
import DialogCollectionEditor from './DialogCollectionEditor'
export default {
  name: 'ConfigurationColumns',
  components: {
    DialogCollectionEditor
  },
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
      dialogCollectionEditorConfig: {
        visible: false,
        title: '表格列配置',
        field: [
          {
            name: 'label',
            default: '表头',
            description: '表头文字',
            config: null
          },
          {
            name: 'width',
            default: 80,
            description: '列宽',
            config: null
          },
          {
            name: 'field',
            default: '',
            description: '字段',
            config: null
          }
        ]
      }
    }
  },
  methods: {
    onChangeList (currentValue) {
      const configuration = Object.assign({}, this.value, {
        list: currentValue
      })
      this.$emit('change', {
        columns: configuration
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
