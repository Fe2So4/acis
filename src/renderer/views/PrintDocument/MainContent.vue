<template>
  <div class="mainContent">
    <div class="documentContent">
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
          @finish="onFinish(item.name)"
        />
      </widget-wrapper>
    </div>
  </div>
</template>

<script>
import WidgetWrapper from './WidgetWrapper'
import { controls } from '../TemplateDesigner/getAllConfigurationPage'
export default {
  name: 'MainContent',
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
  methods: {
    onFinish (widgetName) {
      this.$emit('widget-finish', widgetName)
    }
  }
}
</script>

<style lang="scss" scoped>
.mainContent {
  .documentContent {
    width: 210mm;
    height: 297mm;
    background: #fff;
    border-radius: 5px;
    position: relative;
  }
}
</style>
