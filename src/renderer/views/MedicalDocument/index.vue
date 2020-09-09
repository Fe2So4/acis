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
      :is-rescue-mode="isRescueMode"
      :operation-id="operationId"
      :patient-id="patientId"
      :total-page="totalPage"
      :page-index="pageIndex"
      :sync-his="syncHis"
      :operation-phase="opePhase"
      @select-event-time-range="onSelectEventTimeRange"
      @change-sign-data="onChangeSignData"
      @get-info="onGetInfo"
    />
    <bottom-buttons
      :rescue-mode="rescueMode"
      :page-info="pageInfo"
      :is-rescue-mode="isRescueMode"
      :total-page="totalPage"
      :page-index="pageIndex"
      :displayed-buttons="displayedButtons"
      @change-page="onChangePage"
      @change-rescue-mode="onChangeRescueMode"
      @print="onPrint"
      @print-all="onPrintAll"
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
  saveDocumentData,
  saveChangedSignData,
  getSignInfo,
  getTestInfo,
  changeDisplayMode
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import MainContent from './MainContent'
import BottomButtons from './BottomButtons'
import DialogEventTimeRange from './DialogEventTimeRange'
import DialogDesigner from './DialogDesigner'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
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
      isRescueMode: false,
      dialogEventTimeRangeVisible: false,
      dialogEventData: null,
      paperSetting: {},
      dialogDesignerVisible: false,
      templateId: '',
      rescueMode: '', // 是否有抢救模式
      pageInfo: '', // 是否分页
      syncHis: '', // 是否开启右击
      opePhase: '', // 文书属于的手术阶段
      loadingVisible: false,
      changedSignDataList: [],
      buttonConfig: ''
    }
  },
  computed: {
    ...mapState(['operationId', 'patientId']),
    // 展示的按钮
    displayedButtons () {
      return this.buttonConfig.split(',')
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        this.templateId = to.params.templateId
        this.rescueMode = to.params.rescueMode
        this.pageInfo = to.params.pageInfo
        this.syncHis = to.params.syncHis
        this.opePhase = to.params.opePhase
        this.buttonConfig = to.params.buttonConfig
      },
      immediate: true
    }
  },
  created () {
    this.getData(0)
  },
  beforeRouteUpdate (to, from, next) {
    this.showLeaveMessage(() => {
      this.changedSignDataList = []
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
            operationId: this.operationId,
            patientId: this.patientId
          }
        })
      ]).then((res) => {
        const [widgetList, valueMap] = [
          res[0].data.data.list,
          res[1].data.data
        ]
        widgetList.forEach((widget) => {
          // 源数据赋值
          if (widget.dataSource) {
            const { tableName, className } = widget.dataSource
            let value = ''
            if (valueMap[tableName]) {
              const valueArr = valueMap[tableName].filter(
                (item) => item.className === className
              )
              valueArr.forEach((valueItem) => {
                const { widgetId, value: widgetValue } = valueItem
                if (widgetId && widgetId === widget.id) {
                  value = widgetValue
                } else if (widgetId === '') {
                  value = widgetValue
                }
              })
            }
            widget.dirty = false
            widget.value = value
          }
          // 表格中赋值
          if (widget.name === 'widget-table') {
            widget.cells.forEach((row) => {
              row.forEach((cell) => {
                cell.value = valueMap[cell.tableName] && valueMap[cell.tableName].find(
                  ({ className }) => className === cell.className
                )
                  ? valueMap[cell.tableName].find(
                    ({ className }) => className === cell.className
                  ).value
                  : cell.value
              })
            })
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
      }).then((res) => {
        if (res.data && res.data.success) {
          const { startTime, endTime, totalPage, pageIndex } = res.data.data
          this.startTime = startTime
          this.endTime = endTime
          this.totalPage = totalPage
          this.pageIndex = pageIndex
          this.tempList.forEach((widget) => {
            // x轴起止时间更改
            if (widget.xAxis) {
              widget.xAxis.startTime = startTime
              widget.xAxis.endTime = endTime
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '未进入手术室或进入复苏室'
          })
        }
      })
    },
    async getData (pageIndex) {
      this.loadingVisible = true
      await this.getTemplateAndValueData()
      if (+this.pageInfo) {
        await this.getIntraoperativeData(pageIndex)
      }
      const data = this.tempList
      data.forEach((item) => {
        if (item.name === 'widget-anaes-table') {
          item.name = 'widget-monitor-table'
        }
      })
      this.widgetList = data
      this.loadingVisible = false
    },
    onSelectEventTimeRange (e) {
      this.dialogEventData = e
      this.dialogEventTimeRangeVisible = true
    },
    async onChangePage (pageIndex) {
      console.log(pageIndex)
      await this.getIntraoperativeData(pageIndex)
      this.$eventHub.$emit('document-redraw')
    },
    async onChangeRescueMode (rescueMode) {
      const result = await this.changeDisplayMode()
      if (result.data.success) {
        this.isRescueMode = rescueMode
        await this.getIntraoperativeData(0)
        this.$eventHub.$emit('document-redraw')
      }
    },
    onEventAddedSuccuessfully () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    onPrint () {
      this.$electron.ipcRenderer.send('print-document', {
        path: `/printDocument/${this.templateId}/${this.operationId}/${this.patientId}/${this.pageIndex}/${this.isRescueMode}/${this.opePhase}/${this.pageInfo}`
      })
    },
    onPrintAll () {},
    onRefresh () {
      this.widgetList = []
      // 重置修改过的体征
      this.changedSignDataList = []
      this.getData(this.pageIndex)
      // this.$eventHub.$emit('document-refresh')
    },
    onSave () {
      const modified = this.validateModified()
      const filledRequiredItem = this.validateFilledRequiredItem()
      if (!modified) {
        this.$message({
          message: '没有已修改的数据',
          type: 'info'
        })
        return
      }
      if (!filledRequiredItem) {
        this.$message({
          message: '当前有必填项未填写信息，请检查',
          type: 'warning'
        })
        return
      }
      this.saveNormalData()
      this.saveChangedSignData()
    },
    validateModified () {
      const list = this.widgetList.filter((widget) => widget.dirty)
      return list.length !== 0
    },
    validateFilledRequiredItem () {
      let flag = true
      this.widgetList
        .filter((widget) => widget.required)
        .forEach((widget) => {
          if (!widget.value) {
            flag = false
          }
        })
      return flag
    },
    saveNormalData () {
      const customDataList = this.widgetList
        .filter(
          (widget) =>
            widget.dirty &&
            widget.dataSource &&
            (widget.dataSource.tableName === 'acis_patient_writ_data' ||
              widget.dataSource.tableName === 'acis_amount_record')
        )
        .map((widget) => {
          return {
            widgetId: widget.id,
            tagName: widget.tagName || '',
            value: widget.value
          }
        })
      const { length } = customDataList
      if (length) {
        return request({
          method: 'POST',
          url: saveDocumentData,
          data: customDataList,
          params: {
            templateCode: this.templateId,
            operationId: this.operationId,
            patientId: this.patientId,
            tableName: 'acis_patient_writ_data'
          }
        }).then((res) => {
          if (res.data.success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.widgetList.forEach((widget) => {
              if (widget.dirty) {
                widget.dirty = false
              }
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          message: '当前无可保存到自定义表数据',
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
      const modified = this.validateModified()
      if (!modified) {
        nextFn()
        return
      }
      this.$confirm('此操作将不会保存修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'messageBox'
      })
        .then(() => {
          nextFn()
        })
        .catch(() => {
          rejectFn()
        })
    },
    onChangeSignData ({ itemCode, itemName, itemValue, timePoint }) {
      if (!itemCode) {
        return
      }
      const group = this.changedSignDataList.find(
        (group) => group.itemCode === itemCode && group.itemName === itemName
      )
      if (group) {
        const item = group.list.find((item) => item.timePoint === timePoint)
        if (item) {
          item.itemValue = itemValue
        } else {
          group.list.push({
            timePoint,
            itemValue
          })
        }
      } else {
        this.changedSignDataList.push({
          itemCode,
          itemName,
          list: [
            {
              itemValue,
              timePoint
            }
          ]
        })
      }
    },
    saveChangedSignData () {
      const { length } = this.changedSignDataList
      if (length === 0) return
      return request({
        url: saveChangedSignData,
        method: 'POST',
        data: {
          list: this.changedSignDataList,
          dataMode: this.isRescueMode ? 1 : 5,
          operationId: this.operationId
        }
      }).then((res) => {
        if (res.data.success) {
          this.changedSignDataList = []
          this.$message({
            type: 'success',
            message: '已保存修改后的体征数据'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    onGetInfo (value) {
      switch (value) {
        case 'his':
          this.getSignInfo()
          break
        case 'check':
          this.getTestInfo()
          break
        default:
      }
    },
    // 获取his体征数据
    getSignInfo () {
      return request({
        method: 'GET',
        url: `${getSignInfo}/${this.patientId}/${this.operationId}`
      }).then((res) => {
        const infoList = res.data.data
        if (Array.isArray(infoList)) {
          const hasTagWidgetList = this.widgetList.filter(
            (item) => item.tagName
          )
          hasTagWidgetList.forEach((widget) => {
            const info = infoList.find(
              (item) => item.tagName === widget.tagName
            )
            if (info) {
              widget.dirty = true
              widget.value = info.signValue
            }
          })
        }
      })
    },
    // 获取检验数据
    getTestInfo () {
      return request({
        method: 'GET',
        url: `${getTestInfo}/${this.patientId}`
      }).then((res) => {
        const infoList = res.data.data
        if (Array.isArray(infoList)) {
          const hasTagWidgetList = this.widgetList.filter(
            (item) => item.tagName
          )
          hasTagWidgetList.forEach((widget) => {
            const info = infoList.find(
              (item) => item.tagName === widget.tagName
            )
            if (info) {
              widget.dirty = true
              widget.value = info.itemValue
            }
          })
        }
      })
    },
    changeDisplayMode () {
      return request({
        method: 'put',
        url: `${changeDisplayMode}/${!this.isRescueMode}/${this.operationId}`
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
