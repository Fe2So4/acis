<template>
  <div class="contentDisplayer">
    <div class="content">
      <widget-wrapper
        v-for="(item,index) of widgetList"
        :key="index"
        :widget="item"
      >
        <component
          :is="item.name"
          :configuration="item"
          :edit-mode="editMode"
          :start-time="startTime"
          :end-time="endTime"
        />
      </widget-wrapper>
    </div>
  </div>
</template>

<script>
import WidgetWrapper from './WidgetWrapper'
import { controls } from '../TemplateDesigner/getAllConfigurationPage'
export default {
  name: 'ContentDisplayer',
  components: {
    WidgetWrapper,
    ...controls
  },
  props: {
    widgetList: {
      type: Array,
      default () {
        return []
      }
    },
    startTime: {
      type: String,
      default () {
        return ''
      }
    },
    endTime: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      editMode: false
    }
  },
  computed: {

  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.contentDisplayer {
  height: calc(100vh - 30px);
  overflow: auto;
  .content {
    position: relative;
    width: 210mm;
    height: 297mm;
  }
}
</style>
