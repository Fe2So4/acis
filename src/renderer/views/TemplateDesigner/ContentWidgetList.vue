<template>
  <div class="widgetList">
    <widget-copiable
      v-for="widget of widgetList"
      :key="widget.name"
      :widget="widget"
    />
  </div>
</template>
<script>
import WidgetCopiable from './WidgetCopiable'
export default {
  name: 'ContentWidgetList',
  components: {
    WidgetCopiable
  },
  data () {
    return {
      widgetList: [
        {
          label: '输入框',
          name: 'widget-input'
        },
        {
          label: '文本',
          name: 'widget-text'
        },
        {
          label: '线',
          name: 'widget-line'
        },
        {
          label: '复选框',
          name: 'widget-checkbox'
        },
        {
          label: '面板',
          name: 'widget-panel'
        },
        {
          label: '标签',
          name: 'widget-label'
        },
        {
          label: '体征曲线',
          name: 'widget-physical-sign'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetList {
  // flex: 0 1 200px;
  height: 100%;
  background: blanchedalmond;
  padding: 10px;
}
</style>
