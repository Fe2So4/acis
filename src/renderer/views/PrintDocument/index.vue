<template>
  <div class="printDocument">
    <main-content
      id="mainContent"
      ref="mainContent"
      :widget-list="widgetList"
      :start-time="startTime"
      :end-time="endTime"
      @widget-finish="onWidgetFinish"
      :paper-setting="paperSetting"
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
      canvasWidgetList: []
    }
  },
  created () {
    this.getData(this.$route.params.pageIndex)
  },
  methods: {
    // 通用接口 - 获取模板和源数据表中查出的信息
    getTemplateAndValueData () {
      return Promise.all([
        request({
          url: getTemplateData,
          method: 'POST',
          params: {
            templateCode: this.$route.params.templateId
          }
        }),
        Promise.resolve({
          data: {
            data: {}
          }
        })
        // request({
        //   url: getValueData,
        //   method: 'POST',
        //   params: {
        //     templateCode: this.$route.params.templateId
        //   }
        // })
      ]).then(res => {
        const [widgetList, valueMap] = [
          res[0].data.data.list,
          res[1].data.data
        ]
        widgetList.forEach(widget => {
          // 源数据赋值
          if (widget.dataSource) {
            const { tableName, className } = widget.dataSource
            let value
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
          operationId: 'b0f9d8bda9244397a44cb8ff278937d9',
          intervalTime,
          pageIndex,
          pageTimeInterval
        }
      }).then(res => {
        const { startTime, endTime, pageTotal, pageIndex } = res.data.data
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
      console.log('WidgetFinish', widgetName)
      for (let i = 0; i < this.canvasWidgetList.length; i++) {
        if (this.canvasWidgetList[i] === widgetName) {
          this.canvasWidgetList.splice(i, 1)
          break
        }
      }
      console.log(this.canvasWidgetList.length)
      if (this.canvasWidgetList.length === 0) {
        setTimeout(() => {
          this.$electron.ipcRenderer.send('ready-to-print')
        }, 300)
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
