<template>
  <div>
    <DialogCollectionEditor
      :configuration="configuration"
      :value="value"
      append-to-body
      @change="onChange"
    />
    {{ configuration }}
  </div>
</template>

<script>
export default {
  name: 'DialogCollectionEditorContent',
  components: {
    // DialogCollectionEditor: () => import('./DialogCollectionEditor')
  },
  props: {
    configuration: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  beforeCreate () {
    this.$options.components.DialogCollectionEditor = require('./DialogCollectionEditor.vue').default
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
