<template>
  <div class="mainContent">
    <div
      class="documentContent"
      :style="sizeStyle"
    >
      <div class="widgetContent">
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
    },
    paperSetting: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editMode: false
    }
  },
  computed: {
    sizeStyle () {
      return {
        // width: `calc(${this.paperSetting.width}mm - 100px)`,
        // height: `calc(${this.paperSetting.height}mm - 100px)`
        width: `${this.paperSetting.width}mm`,
        height: `${this.paperSetting.height}mm`
      }
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
    margin: 0 auto;
    background: #fff;
    .widgetContent {
      position: relative;
      height: 100%;
    }
  }
}
</style>
