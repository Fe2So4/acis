<template>
  <div class="printDocument">
    <main-content
      id="mainContent"
      ref="mainContent"
      :widget-list="widgetList"
      :start-time="startTime"
      :end-time="endTime"
      :is-rescue-mode="isRescueMode"
      :operation-id="operationId"
      :patient-id="patientId"
      @widget-finish="onWidgetFinish"
      :paper-setting="paperSetting"
      :total-page="totalPage"
      :page-index="pageIndex"
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

export default {
  name: 'MedicalDocument',
  components: {
    MainContent
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
      paperSetting: {},
      canvasWidgetList: [],
      templateId: '',
      operationId: '',
      patientId: ''
    }
  },
  created () {
    this.templateId = this.$route.params.templateId
    this.operationId = this.$route.params.operationId
    this.patientId = this.$route.params.patientId
    this.pageIndex = this.$route.params.pageIndex
    this.isRescueMode = this.$route.params.isRescueMode === 'true'
    this.getData(this.pageIndex)
  },
  methods: {
    // 通用接口 - 获取模板和源数据表中查出的信息
    getTemplateAndValueData () {
      return Promise.all([
        request({
          url: getTemplateData,
          method: 'POST',
          params: {
            templateCode: this.templateId
          }
        }),
        request({
          url: getValueData,
          method: 'POST',
          params: {
            templateCode: this.templateId,
            operationId: this.operationId,
            patientId: this.patientId
          }
        })
      ]).then(res => {
        const [widgetList, valueMap] = [
          res[0].data.data.list,
          res[1].data.data
        ]
        widgetList.forEach(widget => {
          // 源数据赋值
          if (widget.dataSource) {
            const { tableName, className } = widget.dataSource
            let value = ''
            if (valueMap[tableName]) {
              const valueArr = valueMap[tableName].filter(
                item => item.className === className
              )
              valueArr.forEach(valueItem => {
                const { widgetId, value: widgetValue } = valueItem
                if (widgetId && widgetId === widget.id) {
                  value = widgetValue
                } else if (widgetId === '') {
                  value = widgetValue
                }
              })
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
      })
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
          operationId: this.operationId,
          intervalTime,
          pageIndex,
          pageTimeInterval
        }
      }).then(res => {
        const { startTime, endTime, totalPage, pageIndex } = res.data.data
        this.startTime = startTime
        this.endTime = endTime
        this.totalPage = totalPage
        this.pageIndex = pageIndex
        this.tempList.forEach(widget => {
          // x轴起止时间更改
          if (widget.xAxis) {
            widget.xAxis.startTime = startTime
            widget.xAxis.endTime = endTime
          }
        })
        this.canvasWidgetList = this.getCanvasWidget()
        return res.data.data
      })
    },
    async getData (pageIndex) {
      const isIntraoperative = await this.getTemplateAndValueData()
      if (isIntraoperative) {
        await this.getIntraoperativeData(pageIndex)
      }
      this.widgetList = this.tempList
      this.isIntraoperative = isIntraoperative
      this.onWidgetFinish()
    },
    getCanvasWidget () {
      const canvasWidgets = ['widget-physical-sign']
      return this.widgetList.reduce((arr, widget) => {
        if (canvasWidgets.includes(widget.name)) {
          return arr.concat([widget.name])
        } else {
          return arr
        }
      }, [])
    },
    onWidgetFinish (widgetName) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      console.log('WidgetFinish', widgetName)
      for (let i = 0; i < this.canvasWidgetList.length; i++) {
        if (this.canvasWidgetList[i] === widgetName) {
          this.canvasWidgetList.splice(i, 1)
          break
        }
      }
      console.log(this.canvasWidgetList.length)
      if (this.canvasWidgetList.length === 0) {
        this.timer = setTimeout(() => {
          this.$electron.ipcRenderer.send('ready-to-print')
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.printDocument {
  font-family: "宋体";
}
</style>
