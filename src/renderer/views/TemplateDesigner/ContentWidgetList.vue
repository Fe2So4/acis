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
          label: '体征曲线',
          name: 'widget-physical-sign'
        },
        {
          label: '麻醉用药',
          name: 'widget-anaes-drug'
        },
        {
          label: '多行文本',
          name: 'widget-text-area'
        },
        {
          label: '输液输血',
          name: 'widget-in-out'
        },
        {
          label: '多选框组',
          name: 'widget-checkbox-group'
        },
        {
          label: '监测表格',
          name: 'widget-anaes-table'
        },
        {
          label: '图片',
          name: 'widget-image'
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
  background: palevioletred;
  padding: 10px;
}
</style>
