<template>
  <div
    class="medicalDocument"
  >
    <main-content
      ref="mainContent"
      :widget-list="widgetList"
      :start-time="startTime"
      :end-time="endTime"
      :paper-setting="paperSetting"
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
    <dialog-designer
      v-if="dialogDesignerVisible"
      :visible.sync="dialogDesignerVisible"
      :template-id="$route.params.templateId"
      @update-successfully="onUpdateSuccessfully"
    />
  </div>
</template>

<script>
import {
  getTemplateInfo,
  getTemplateData
  // getValueData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import MainContent from './MainContent'
import BottomButtons from './BottomButtons'
import DialogEventTimeRange from './DialogEventTimeRange'
import DialogDesigner from './DialogDesigner'
export default {
  name: 'MedicalDocument',
  components: {
    MainContent,
    BottomButtons,
    DialogEventTimeRange,
    DialogDesigner
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
      dialogEventData: null,
      paperSetting: {},
      dialogDesignerVisible: false
    }
  },
  created () {
    this.getData(0)
  },
  beforeRouteUpdate (to, from, done) {
    console.log('beforeRouteUpdate')
    done()
  },
  methods: {
    // 通用接口 - 获取模板和源数据表中查出的信息
    getTemplateAndValueData () {
      const requestData = {
        templateCode: this.$route.params.templateId
      }
      return Promise.all([
        request({
          url: getTemplateData,
          method: 'POST',
          params: requestData
        }),
        // request({
        //   url: getValueData,
        //   method: 'POST',
        //   data: {
        //     templateCode: this.$route.params.templateId
        //   }
        // })
        Promise.resolve({
          data: {
            data: {}
          }
        })
      ]).then(
        res => {
          const [widgetList, valueMap] = [res[0].data.data.list, res[1].data.data]
          widgetList.forEach(widget => {
          // 源数据赋值
            if (widget.dataSource) {
              const { tableName, className } = widget.dataSource
              let value = ''
              if (valueMap[tableName] && valueMap[tableName][className]) {
                value = valueMap[tableName][className]
              }
              widget.value = value
            }
          })
          let paperSettingIndex
          const paperSetting = widgetList.find((item, index) => {
            if (item.id === 'paper') {
              paperSettingIndex = index
              return true
            }
            return false
          })
          if (typeof paperSettingIndex !== 'number') {
            return Promise.reject(new Error('未找到纸张配置'))
          }
          this.paperSetting = paperSetting
          widgetList.splice(paperSettingIndex, 1)
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
      request({
        method: 'POST',
        url: getTemplateInfo,
        data: {
          operationId: '',
          intervalTime,
          pageIndex,
          pageTimeInterval
        }
      })
      // 模拟数据 -------------------start--------------------------
      return Promise.resolve(
        {
          data: {
            code: 200,
            success: true,
            data: {
              templateId: 1,
              startTime: '2020-07-14 16:00',
              endTime: '2020-07-14 20:00',
              pageIndex: 1,
              pageTotal: 3
            }
          }
        }
      )
      // 模拟数据 -----------------end----------------------------
        .then(
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
            return res.data.data
          }
        )
    },
    async getData (pageIndex) {
      const isIntraoperative = await this.getTemplateAndValueData()
      if (isIntraoperative) {
        await this.getIntraoperativeData(pageIndex)
      }
      this.widgetList = this.tempList
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
      this.$electron.ipcRenderer.send('print-document', {
        path: `/printDocument/${this.$route.params.templateId}/${this.pageIndex}`
      })
    },
    onPrintAll () {},
    onRefresh () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    onSave () {
      const list = this.widgetList
        .filter(widget => widget.value || widget.required)
        .map(widget => ({
          id: widget.id,
          value: widget.value,
          required: widget.required
        }))
      let flag = true
      list.forEach(widget => {
        if (widget.required && !widget.value) {
          flag = false
        }
      })
      console.log(flag, list)
    },
    onConfigure () {
      this.dialogDesignerVisible = true
    },
    onUpdateSuccessfully () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
.medicalDocument {
  width: 100%;
  height: calc(100% - 172px);
  position: relative;
  font-family: '宋体';
}
</style>
