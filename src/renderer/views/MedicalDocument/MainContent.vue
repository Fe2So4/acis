<template>
  <div class="mainContent">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
      <div
        class="documentContent"
        :style="sizeStyle"
        @click.right="showCtxMenu($event)"
      >
        <div class="widgetContent">
          <widget-wrapper
            v-for="(item, index) of widgetList"
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
              :total-page="totalPage"
              :page-index="pageIndex"
              :operation-phase="operationPhase"
              @select-event-time-range="onSelectEventTimeRange"
              @change="onChange($event, item)"
              @change-sign-data="onChangeSignData"
              @dblclick-time="time => $emit('dblclick-time', time)"
              @set-total-page="onSetTotalPage"
            />
          </widget-wrapper>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
// import { ipcRenderer } from 'electron'
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
    },
    totalPage: {
      required: false,
      type: [Number, String],
      default: ''
    },
    pageIndex: {
      required: false,
      type: [Number, String],
      default: ''
    },
    syncHis: {
      required: true,
      type: [String, Number]
    },
    operationPhase: {
      required: true,
      type: [String, Number]
    }
  },
  data () {
    return {
      pdfTitle: 'test',
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
      if (!+this.syncHis) {
        return
      }
      const that = this
      this.$ctxMenu({
        list: [
          {
            label: '同步his体征数据',
            value: 'his'
          },
          {
            label: '同步检验数据',
            value: 'check'
          }
        ],
        posX: e.pageX,
        posY: e.pageY,
        onSelectMenuItem (e) {
          that.$emit('get-info', e.value)
        }
      })
    },
    onSetTotalPage (page) {
      this.$emit('set-total-page', Math.max(+this.totalPage, +page))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme';
.mainContent {
  width: 100%;
  height: calc(100% - 36px);
  overflow: auto;
  .documentContent {
    width: calc(210mm + 100px);
    height: 0;
    transition: 0.3s;
    padding: 50px;
    margin: 20px auto;
    @include theme-property('background', $color-background-document);
    @include theme-property('box-shadow', $box-shadow-document);
    border-radius: 5px;

    .widgetContent {
      height: 100%;
      // overflow: hidden;
      position: relative;
    }
  }
}
</style>
