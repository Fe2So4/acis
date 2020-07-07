<template>
  <div class="medicalDocument">
    <main-content
      :widget-list="widgetList"
      :start-time="startTime"
      :end-time="endTime"
      @select-event-time-range="onSelectEventTimeRange"
    />
    <bottom-buttons
      :is-intraoperative="isIntraoperative"
      :is-rescue-mode="isRescueMode"
      :total-page="totalPage"
      :page-index="pageIndex"
      @changePage="onChangePage"
      @changeRescueMode="onChangeRescueMode"
      @print="onPrint"
      @printAll="onPrintAll"
      @refresh="onRefresh"
      @save="onSave"
      @configure="onConfigure"
    />
    <dialog-event-time-range
      v-if="dialogEventTimeRangeVisible"
      :visible.sync="dialogEventTimeRangeVisible"
      :event-data="dialogEventData"
      @event-added-successfully="onEventAddedSuccuessfully"
    />
  </div>
</template>

<script>
import {
  getTemplateInfo,
  getTemplateData,
  getValueData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import MainContent from './MainContent'
import BottomButtons from './BottomButtons'
import DialogEventTimeRange from './DialogEventTimeRange'
export default {
  name: 'MedicalDocument',
  components: {
    MainContent,
    BottomButtons,
    DialogEventTimeRange
  },
  data () {
    return {
      widgetList: [],
      startTime: '',
      endTime: '',
      totalPage: 1,
      pageIndex: 0,
      isIntraoperative: false,
      isRescueMode: false,
      dialogEventTimeRangeVisible: false,
      dialogEventData: null
    }
  },
  created () {
    this.getData(0)
  },
  methods: {
    // 通用接口 - 获取模板和源数据表中查出的信息
    getTemplateAndValueData () {
      return Promise.all([
        request({
          url: getTemplateData,
          method: 'POST',
          data: {
            templateCode: this.$route.params.templateId
          }
        }),
        request({
          url: getValueData,
          method: 'POST',
          data: {
            templateCode: this.$route.params.templateId
          }
        })
      ]).then(
        res => {
          const [widgetList, valueMap] = [res[0].data.data.list, res[1].data.data]
          widgetList.forEach(widget => {
          // 源数据赋值
            if (widget.dataSource) {
              const { tableName, className } = widget.dataSource
              let value
              if (valueMap[tableName] && valueMap[tableName][className]) {
                value = valueMap[tableName][className]
              }
              if (value) {
                widget.value = value
              }
            }
          })
          this.tempList = widgetList
          return res[0].data.data.isIntraoperative
        }
      )
    },
    // 只有术中文书才有，获取术中文书相关信息
    getIntraoperativeData (pageIndex) {
      let intervalTime, pageTimeInterval
      if (this.isRescueMode) {
        intervalTime = 1
        pageTimeInterval = 1
      } else {
        intervalTime = 5
        pageTimeInterval = 4
      }
      return request({
        method: 'POST',
        url: getTemplateInfo,
        data: {
          operationId: '',
          intervalTime,
          pageIndex,
          pageTimeInterval
        }
      }).then(
        res => {
          const {
            startTime,
            endTime,
            pageTotal,
            pageIndex
          } = res.data.data
          this.startTime = startTime
          this.endTime = endTime
          this.totalPage = pageTotal
          this.pageIndex = pageIndex
          this.tempList.forEach(widget => {
            // x轴起止时间更改
            if (widget.xAxis) {
              widget.xAxis.startTime = startTime
              widget.xAxis.endTime = endTime
            }
          })
          this.widgetList = this.tempList
          return res.data.data
        }
      )
    },
    async getData (pageIndex) {
      const isIntraoperative = await this.getTemplateAndValueData()
      if (isIntraoperative) {
        await this.getIntraoperativeData(pageIndex)
      }
      this.isIntraoperative = isIntraoperative
    },
    onSelectEventTimeRange (e) {
      this.dialogEventData = e
      this.dialogEventTimeRangeVisible = true
    },
    async onChangePage (pageIndex) {
      await this.getIntraoperativeData(pageIndex)
      this.$eventHub.$emit('document-redraw')
    },
    async onChangeRescueMode (rescueMode) {
      this.isRescueMode = rescueMode
      await this.getIntraoperativeData(0)
      this.$eventHub.$emit('document-redraw')
    },
    onEventAddedSuccuessfully () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    onPrint () {
      window.print()
    },
    onPrintAll () {},
    onRefresh () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    onSave () {},
    onConfigure () {}
  }
}
</script>

<style lang="scss" scoped>
.medicalDocument {
  width: 100%;
  height: calc(100% - 172px);
  position: relative;
}
</style>
