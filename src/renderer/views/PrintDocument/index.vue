<template>
  <div class="printDocument">
    <main-content
      v-for="item in Arr"
      :key="item.pageIndex"
      id="mainContent"
      :ref="'mainContent' + item.pageIndex"
      :widget-list="item.widgetList"
      :start-time="item.startTime"
      :end-time="item.endTime"
      :patient-id="patientId"
      :paper-setting="item.paperSetting"
      :is-rescue-mode="isRescueMode"
      :operation-id="operationId"
      :total-page="Number(totalPageNum) + 1"
      :page-index="item.pageIndex"
      :operation-phase="opePhase"
      @widget-finish="onWidgetFinish"
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
import { ipcRenderer } from 'electron'
export default {
  name: 'MedicalDocument',
  components: {
    MainContent
  },
  data () {
    return {
      Arr: [],
      arrPathSetting: {},
      totalPageNum: 0,
      flag: '',
      widgetList: [],
      startTime: '',
      endTime: '',
      totalPage: 1,
      pageIndex: 0,
      isRescueMode: false,
      paperSetting: {},
      canvasWidgetList: [],
      templateId: '',
      operationId: '',
      patientId: '',
      rescueMode: '', // 是否有抢救模式
      pageInfo: '', // 是否分页
      opePhase: '' // 文书属于的手术阶段
    }
  },
  created () {
    this.templateId = this.$route.params.templateId
    this.operationId = this.$route.params.operationId
    this.patientId = this.$route.params.patientId
    // this.pageIndex = this.$route.params.pageIndex
    this.opePhase = this.$route.params.opePhase
    this.pageInfo = this.$route.params.pageInfo
    this.totalPageNum = this.$route.params.totalPageNum
    // console.log(this.totalPageNum)
    // this.flag = this.$route.params.flag || ''
    this.isRescueMode = this.$route.params.isRescueMode === 'true'
    this.getData(0)
  },
  mounted () {
    ipcRenderer.on('wordTest', data => {
      console.log(data)
    })
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
        const [widgetList, valueMap] = [res[0].data.data.list, res[1].data.data]
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
        this.arrPathSetting.paperSetting = paperSetting

        // this.paperSetting = paperSetting
        widgetList.splice(paperSettingIndex, 1)
        // this.tempList = widgetList
        // console.log(widgetList)
        this.arrPathSetting.tempList = widgetList
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
          pageTimeInterval,
          operState: this.opePhase
        }
      }).then(res => {
        const {
          startTime,
          endTime,
          totalPage,
          pageIndex,
          integralPointList
        } = res.data.data
        // this.startTime = startTime
        // this.endTime = endTime
        // this.totalPage = totalPage
        // this.pageIndex = pageIndex
        this.arrPathSetting.startTime = startTime
        this.arrPathSetting.endTime = endTime
        this.arrPathSetting.totalPage = totalPage
        this.arrPathSetting.pageIndex = pageIndex
        this.integralPointList = integralPointList
        this.arrPathSetting.tempList.forEach(widget => {
          // x轴起止时间更改
          if (widget.xAxis) {
            widget.xAxis.boldTimeList = integralPointList
            widget.xAxis.startTime = startTime
            widget.xAxis.endTime = endTime
          }
        })
        // this.tempList.forEach(widget => {
        //   // x轴起止时间更改
        //   if (widget.xAxis) {
        //     widget.xAxis.startTime = startTime
        //     widget.xAxis.endTime = endTime
        //   }
        // })
        this.arrPathSetting.canvasWidgetList = this.getCanvasWidget(
          this.arrPathSetting.tempList
        )
        this.canvasWidgetList = this.getCanvasWidget(
          this.arrPathSetting.tempList
        )
      })
    },
    async getData (pageIndex) {
      this.arrPathSetting = {}
      this.arrPathSetting.pageIndex = pageIndex
      // console.log(pageIndex, '11111')
      await this.getTemplateAndValueData()
      if (+this.pageInfo) {
        await this.getIntraoperativeData(pageIndex)
      }
      this.arrPathSetting.widgetList = this.arrPathSetting.tempList
      // 删除打印不需要的元素
      for (let i = this.arrPathSetting.widgetList.length - 1; i >= 0; i--) {
        if (
          this.arrPathSetting.widgetList[i].tagName &&
          this.arrPathSetting.widgetList[i].tagName.includes('ifOperText')
        ) {
          // console.log(this.arrPathSetting.widgetList[i])
          this.arrPathSetting.widgetList.splice(i, 1)
        }
      }
      this.Arr.push(this.arrPathSetting)
      return false
      // this.onWidgetFinish()
    },
    getCanvasWidget (tempList) {
      const canvasWidgets = [
        'widget-physical-sign',
        'widget-in-out',
        'widght-anaes-table'
      ]
      // const canvasNoWidgets = ['ifOperText']
      return tempList.reduce((arr, widget) => {
        if (canvasWidgets.includes(widget.name)) {
          return arr.concat([widget.name])
        } else {
          return arr
        }
      }, [])
    },
    onWidgetFinish (widgetName) {
      // console.log('进入=====', widgetName)
      if (this.timer) {
        clearTimeout(this.timer)
      }

      for (let i = 0; i < this.canvasWidgetList.length; i++) {
        if (this.canvasWidgetList[i] === widgetName) {
          this.canvasWidgetList.splice(i, 1)
          break
        }
      }
      if (this.canvasWidgetList.length === 0) {
        console.log(
          '当前第',
          this.pageIndex,
          '页， 一共,',
          this.totalPageNum,
          '页'
        )
        if (Number(this.pageIndex) === Number(this.totalPageNum)) {
          console.log(
            '开始生成第',
            this.pageIndex,
            '页， 一共,',
            this.totalPageNum,
            '页'
          )
          this.timer = setTimeout(() => {
            console.log('开始打印文件')
            this.$electron.ipcRenderer.send('ready-to-print', this.operationId)
          }, 1000)
        } else {
          this.pageIndex = Number(this.pageIndex) + 1
          this.getData(this.pageIndex)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.printDocument {
  font-family: '宋体';
}
@media print {
  #mainContent {
    page-break-after: always;
  }
}
</style>
