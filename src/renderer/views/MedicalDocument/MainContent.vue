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
        <!-- @click.right="showCtxMenu($event)" -->
        <div
          class="widgetContent"
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
              :is-rescue-mode="isRescueMode"
              :operation-id="operationId"
              :patient-id="patientId"
              @select-event-time-range="onSelectEventTimeRange"
              @change="onChange($event, item)"
              @change-sign-data="onChangeSignData"
            />
          </widget-wrapper>
        </div>
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
    },
    isRescueMode: {
      type: Boolean,
      default: false
    },
    operationId: {
      type: String,
      required: true
    },
    patientId: {
      type: String,
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
        width: `calc(${this.paperSetting.width}mm + 100px)`,
        height: `calc(${this.paperSetting.height}mm + 100px)`
      }
    }
  },
  methods: {
    onSelectEventTimeRange (e) {
      this.$emit('select-event-time-range', e)
    },
    onChange (e, widget) {
      widget.value = e
    },
    // 体征数据修改
    onChangeSignData (data) {
      this.$emit('change-sign-data', data)
    },
    showCtxMenu (e) {
      console.log(e)
      this.$ctxMenu({
        list: [
          {
            label: 'his',
            value: 1
          },
          {
            label: '检验',
            value: 1
          }
        ],
        posX: e.pageX,
        posY: e.pageY,
        onSelectMenuItem (e) {
          console.log(e)
          // e = that.eventDictList.find(item => e.label === item.detailName)
          // if (e) {
          // that.$emit('select-event-time-range', e)
          // }
        }
      })
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
    width: calc(210mm + 100px);
    height: 0;
    transition:0.3s;
    padding: 50px;
    margin: 20px auto;
    background: rgba(227, 227, 227, 1);
    box-shadow: 0px 20px 45px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    .widgetContent {
      height: 100%;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
