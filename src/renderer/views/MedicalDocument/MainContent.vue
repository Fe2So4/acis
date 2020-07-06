<template>
  <div class="mainContent">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
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
          />
        </widget-wrapper>
      </div>
    </el-scrollbar>
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
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      editMode: false
    }
  }
}
</script>

<style lang="scss" scoped>
.mainContent {
  width: 100%;
  height: calc(100% - 36px);
  overflow: auto;
  .documentContent {
    width: 210mm;
    height: 297mm;
    margin: 20px auto;
    background: rgba(227, 227, 227, 1);
    box-shadow: 0px 20px 45px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    position: relative;
  }
}
</style>
