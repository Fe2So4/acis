<template>
  <div>
    <el-form-item label="集合配置">
      <el-button @click="onClick">
        配置
      </el-button>
    </el-form-item>
    <dialog-collection-editor
      v-if="dialogCollectionEditorConfig.visible"
      :configuration="dialogCollectionEditorConfig"
      :value="value"
      @change="onChange"
      append-to-body
    />
  </div>
</template>

<script>
import DialogCollectionEditor from './DialogCollectionEditor'
export default {
  name: 'ConfigurationCollections',
  components: {
    DialogCollectionEditor
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dialogCollectionEditorConfig: {}
    }
  },
  created () {
    this.dialogCollectionEditorConfig = {
      visible: false,
      title: '集合设置',
      field: [
        {
          name: 'label',
          default: '选项1',
          description: '显示文字',
          config: null
        },
        {
          name: 'value',
          default: 0,
          description: '对应值',
          config: null
        }
      ]
    }
  },
  methods: {
    onChange (currentValue) {
      this.$emit('change', {
        collections: currentValue
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
