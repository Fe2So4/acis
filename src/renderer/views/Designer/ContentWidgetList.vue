<template>
  <div class="widgetList">
    <widget-copiable
      v-for="widget of widgetNameList"
      :key="widget.name"
      :widget="widget"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import WidgetCopiable from './WidgetCopiable'
const { mapState } = createNamespacedHelpers(
  'Designer'
)
export default {
  name: 'ContentWidgetList',
  components: {
    WidgetCopiable
  },
  data () {
    return {
      widgetNameList: [
        {
          label: '输入框',
          name: 'widget-input'
        },
        {
          label: '多行输入框',
          name: 'widget-textarea'
        },
        {
          label: '文本',
          name: 'widget-text'
        },
        {
          label: '线',
          name: 'widget-line'
        },
        // {
        //   label: '复选框',
        //   name: 'widget-checkbox'
        // },
        {
          label: '体征曲线',
          name: 'widget-physical-sign'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      // widgetList: state => state.widgetList
    })
  },
  methods: {
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
