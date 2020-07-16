<template>
  <div
    class="medicalDocument"
    v-loading="loadingVisible"
    element-loading-background="rgba(0, 0, 0, 0)"
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
  getTemplateData,
  getValueData,
  saveDocumentData
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
      dialogDesignerVisible: false,
      templateId: '',
      loadingVisible: false
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        this.templateId = to.params.templateId
      }
    }
  },
  created () {
    this.templateId = this.$route.params.templateId
    this.getData(0)
  },
  beforeRouteUpdate (to, from, next) {
    this.showLeaveMessage(() => {
      this.templateId = to.params.templateId
      this.getData(0)
      next()
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.showLeaveMessage(next)
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
            operationId: 'qwe16',
            patientId: 'a54sd'
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
            if (valueMap[tableName] && valueMap[tableName][className]) {
              value = valueMap[tableName][className]
            }
            widget.dirty = false
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
        return res.data.data
      })
    },
    async getData (pageIndex) {
      this.loadingVisible = true
      const isIntraoperative = await this.getTemplateAndValueData()
      if (isIntraoperative) {
        await this.getIntraoperativeData(pageIndex)
      }
      this.widgetList = this.tempList
      this.isIntraoperative = isIntraoperative
      this.loadingVisible = false
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
      let flag = true
      list.forEach(widget => {
        if (widget.required && !widget.value) {
          flag = false
        }
      })
      if (!flag) {
        this.$message({
          message: '当前有必填项未填写信息，请重新确认',
          type: 'warning'
        })
        return
      }
      const customDataList = list
        .filter(
          widget =>
            widget.dataSource &&
            widget.dataSource.tableName === 'acis_patient_writ_data'
        )
        .map(widget => {
          const obj = {}
          obj[widget.id] = widget.value
          return obj
        })
      const { length } = customDataList
      if (length) {
        return request({
          method: 'POST',
          url: saveDocumentData,
          data: customDataList,
          params: {
            templateCode: this.templateId,
            operationId: 'qwe16',
            patientId: 'a54sd',
            tableName: 'acis_patient_writ_data'
          }
        }).then(
          res => {
            if (res.data.success) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '保存失败',
                type: 'warning'
              })
            }
          }
        )
      } else {
        this.$message({
          message: '无需要保存的数据',
          type: 'info'
        })
      }
    },
    onConfigure () {
      this.dialogDesignerVisible = true
    },
    onUpdateSuccessfully () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    showLeaveMessage (nextFn, rejectFn = () => {}) {
      this.$confirm('此操作将不会保存修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          nextFn()
        })
        .catch(() => {
          rejectFn()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.medicalDocument {
  width: 100%;
  height: calc(100% - 172px);
  position: relative;
  font-family: "宋体";
}
</style>
