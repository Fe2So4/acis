<template>
  <div class="mainContent">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
      <div
        class="documentContent"
        :style="sizeStyle"
      >
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
            @select-event-time-range="onSelectEventTimeRange"
            @change="onChange($event, item)"
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
    },
    paperSetting: {
      type: Object,
      required: true
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
  },
  computed: {
    sizeStyle () {
      return {
        width: `${this.paperSetting.width}mm`,
        height: `${this.paperSetting.height}mm`
      }
    }
  },
  methods: {
    onSelectEventTimeRange (e) {
      this.$emit('select-event-time-range', e)
    },
    onChange (e, widget) {
      widget.value = e
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
    overflow: hidden;
    margin: 20px auto;
    background: rgba(227, 227, 227, 1);
    box-shadow: 0px 20px 45px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    position: relative;
  }
}
</style>
