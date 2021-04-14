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
      @dblclick-time="onDblclickTime"
      @set-total-page="onSetTotalPage"
    />
    <bottom-buttons
      :rescue-mode="rescueMode"
      :page-info="pageInfo"
      :is-rescue-mode="isRescueMode"
      :total-page="totalPage"
      :page-index="pageIndex"
      :displayed-buttons="displayedButtons"
      :operation-id="operationId"
      @change-page="onChangePage"
      @change-rescue-mode="onChangeRescueMode"
      @print="onPrint"
      @upload="onLoad"
      @print-all="onPrintAll"
      @refresh="onRefresh"
      @save="onSave"
      @configure="onConfigure"
    />
    <dialog-event-time-range
      v-if="dialogEventTimeRangeVisible"
      :visible.sync="dialogEventTimeRangeVisible"
      :event-data="dialogEventData"
      @event-added-successfully="onEventAddedSuccessfully"
    />
    <dialog-designer
      v-if="dialogDesignerVisible"
      :visible.sync="dialogDesignerVisible"
      :template-id="$route.params.templateId"
      @update-successfully="onUpdateSuccessfully"
    />
    <DialogAddBloodGas
      :visible.sync="visibleBloodGas"
      :default-time="addBloodGasTime"
      @confirm="onAddBloodGas"
    />
  </div>
</template>

<script>
import utilsDebounce from '@/utils/utilsDebounce'
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
import {
  addBloodGasAnalysisRecord,
  getsThePageThatCurrently
} from '@/api/blood'
import request from '@/utils/requestForMock'
import MainContent from './MainContent'
import BottomButtons from './BottomButtons'
import DialogEventTimeRange from './DialogEventTimeRange'
import DialogDesigner from './DialogDesigner'
import DialogAddBloodGas from './DialogAddBloodGas'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'MedicalDocument',
  components: {
    MainContent,
    BottomButtons,
    DialogEventTimeRange,
    DialogDesigner,
    DialogAddBloodGas
  },
  data () {
    return {
      bmiWeight: '',
      bmiHeight: '',
      wardAlertness: '',
      wardBreathPatency: '',
      wardMobility: '',
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
      buttonConfig: '',
      visibleBloodGas: false,
      addBloodGasTime: ''
    }
  },
  computed: {
    ...mapState(['operationId', 'patientId']),
    // 展示的按钮
    displayedButtons () {
      return this.buttonConfig.split(',')
    },
    bmiWeightNum () {
      let weight = ''
      this.widgetList.forEach(item => {
        if (item.tagName === 'patientWeight') {
          weight = item.value
          this.widget = weight
          return false
        }
      })
      return weight
    },
    bmiHeightNum () {
      let height = ''
      this.widgetList.forEach(item => {
        if (item.tagName === 'patientHeight') {
          height = item.value
          this.height = item.value
        }
      })
      return height
    },
    wardAlertnessCNM () {
      let alertness = ''
      this.widgetList.forEach(item => {
        if (item.tagName === 'outpacuAvpu') {
          console.log(item, 'outpacuAvpu')
          alertness = item.value

          return false
        }
      })
      return alertness
    },
    wardBreathPatencyCNM () {
      let breathPatency = ''
      this.widgetList.forEach(item => {
        if (item.tagName === 'outpacuBreathe') {
          console.log(item, 'outpacuBreathe')
          breathPatency = item.value

          return false
        }
      })
      return breathPatency
    },
    wardMobilityCNM () {
      let mobility = ''
      this.widgetList.forEach(item => {
        if (item.tagName === 'outpacuLimb') {
          console.log(item, 'outpacuLimb')
          mobility = item.value

          return false
        }
      })
      return mobility
    }
  },
  watch: {
    wardAlertnessCNM (val) {
      console.log(val)
      this.wardAlertness = val
      utilsDebounce(() => {
        this.getSteWard()
      }, 1000)
    },
    wardBreathPatencyCNM (val) {
      console.log(val)
      this.wardBreathPatency = val
      utilsDebounce(() => {
        this.getSteWard()
      }, 1000)
    },
    wardMobilityCNM (val) {
      console.log(val)
      this.wardMobility = val
      utilsDebounce(() => {
        this.getSteWard()
      }, 1000)
    },
    bmiWeightNum (val) {
      this.bmiWieight = val
      utilsDebounce(() => {
        this.getBmiNum()
      }, 1000)
    },
    bmiHeightNum (val) {
      this.bmiHeight = val
      utilsDebounce(() => {
        this.getBmiNum()
      }, 1000)
    },
    $route: {
      handler (to, from) {
        this.templateId = to.params.templateId
        this.rescueMode = to.params.rescueMode
        this.pageInfo = to.params.pageInfo
        this.syncHis = to.params.syncHis
        this.opePhase = to.params.opePhase
        this.buttonConfig = to.params.buttonConfig
        this.totalPage = 1
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
    this.showLeaveMessage(next, () => next(false))
  },
  methods: {
    // 计算steward
    getSteWard () {
      let qxNum = 0
      let hxNum = 0
      let ztNum = 0
      if (this.wardAlertness === '完全苏醒') {
        qxNum = 2
      } else if (this.wardAlertness === '对刺激有反应') {
        qxNum = 1
      } else {
        qxNum = 0
      }
      if (this.wardBreathPatency === '可按医师吩咐咳嗽') {
        hxNum = 2
      } else if (this.wardBreathPatency === '不用支持可以维持呼吸道畅通') {
        hxNum = 1
      } else {
        hxNum = 0
      }
      if (this.wardMobility === '肢体能作有意识的活动') {
        ztNum = 2
      } else if (this.wardMobility === '肢体无意识活动') {
        ztNum = 1
      } else {
        ztNum = 0
      }
      this.widgetList.forEach(item => {
        if (item.tagName === 'outpacuSteward') {
          item.value = Number(qxNum) + Number(hxNum) + Number(ztNum)
        }
      })
    },
    // 计算BMI
    getBmiNum () {
      if (this.bmiWieight && this.bmiHeight) {
        const bmi = Math.round(
          Number(this.bmiWieight) /
            ((Number(this.bmiHeight) * Number(this.bmiHeight)) / 10000)
        )
        this.widgetList.forEach(item => {
          if (item.tagName === 'bmi') {
            item.value = bmi
          }
        })
      }
    },
    // 通用接口 - 获取模板和源数据表中查出的信息
    getTemplateAndValueData () {
      return Promise.all([this.getTemplateData(), this.getValueData()]).then(
        res => {
          const [
            { list: widgetList } = { list: [], isIntraoperative: false },
            valueMap = {}
          ] = res
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
              widget.dirty = false
              widget.value = value
            }
            // 表格中赋值 - 暂未使用 20210202 zwf
            // if (widget.name === 'widget-table') {
            //   widget.cells.forEach((row) => {
            //     row.forEach((cell) => {
            //       cell.value = valueMap[cell.tableName] && valueMap[cell.tableName].find(
            //         ({ className }) => className === cell.className
            //       )
            //         ? valueMap[cell.tableName].find(
            //           ({ className }) => className === cell.className
            //         ).value
            //         : cell.value
            //     })
            //   })
            // }
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
          operationId: this.operationId,
          intervalTime,
          pageIndex,
          pageTimeInterval,
          operState: this.opePhase
        }
      }).then(res => {
        if (res.data && res.data.success) {
          const {
            startTime,
            endTime,
            totalPage,
            pageIndex,
            integralPointList
          } = res.data.data
          this.startTime = startTime
          this.endTime = endTime
          this.totalPage = totalPage
          this.pageIndex = pageIndex
          this.integralPointList = integralPointList
          this.tempList.forEach(widget => {
            // x轴起止时间更改
            if (widget.xAxis) {
              widget.xAxis.boldTimeList = integralPointList
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
      // 0-没有分页 1-麻醉记录单、复苏记录单 2-药品耗材清单
      switch (+this.pageInfo) {
        case 1:
          await this.getIntraoperativeData(pageIndex)
          break
        case 2:
        case 0:
        default:
      }
      const data = this.tempList
      data.forEach(item => {
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
      switch (+this.pageInfo) {
        case 1:
          await this.getIntraoperativeData(pageIndex)
          this.$eventHub.$emit('document-redraw')
          break
        case 2:
          this.pageIndex = pageIndex
          break
        case 0:
        default:
      }
    },
    async onChangeRescueMode (rescueMode) {
      const result = await this.changeDisplayMode()
      if (result.data.success) {
        this.isRescueMode = rescueMode
        await this.getIntraoperativeData(0)
        this.$eventHub.$emit('document-redraw')
      }
    },
    onEventAddedSuccessfully () {
      this.getData(this.pageIndex)
      this.$eventHub.$emit('document-refresh')
    },
    onPrint () {
      let flag
      // this.$refs.mainContent.daochuPDF()
      if (this.buttonConfig.includes('ANES')) {
        flag = 0
      } else if (this.buttonConfig.includes('ANAB')) {
        flag = 1
      } else {
        flag = 2
      }
      if (flag !== 2) {
        return request({
          url: getsThePageThatCurrently + `/${this.operationId}/${flag}`,
          method: 'get'
        }).then(res => {
          if (res.data.code === 200) {
            const totalPageNum = res.data.data
            utilsDebounce(() => {
              this.$electron.ipcRenderer.send('print-document', {
                path: `/printDocument/${this.templateId}/${this.operationId}/${this.patientId}/${this.pageIndex}/${this.isRescueMode}/${this.opePhase}/${this.pageInfo}/${totalPageNum}/${flag}`
              })
            }, 1000)
          }
        })
      } else {
        this.$electron.ipcRenderer.send('print-document', {
          path: `/printDocument/${this.templateId}/${this.operationId}/${this.patientId}/${this.pageIndex}/${this.isRescueMode}/${this.opePhase}/${this.pageInfo}`
        })
      }
    },

    onLoad () {
      this.getsThePageThatCurrently()
    },
    getsThePageThatCurrently () {
      let flag
      // this.$refs.mainContent.daochuPDF()
      if (this.buttonConfig.includes('ANES')) {
        flag = 0
      } else if (this.buttonConfig.includes('ANAB')) {
        flag = 1
      }
      return request({
        url: getsThePageThatCurrently + `/${this.operationId}/${flag}`,
        method: 'get'
      }).then(res => {
        if (res.data.code === 200) {
          const totalPageNum = res.data.data
          this.$electron.ipcRenderer.send('print-documentPDF', {
            path: `/printDocumentPDF/${this.templateId}/${this.operationId}/${this.patientId}/${this.pageIndex}/${this.isRescueMode}/${this.opePhase}/${this.pageInfo}/${flag}/${totalPageNum}`
          })
        }
      })
    },
    onPrintAll () {},
    onSetTotalPage (page) {
      this.totalPage = page
    },
    onRefresh () {
      this.widgetList = []
      // 重置修改过的体征
      this.changedSignDataList = []
      this.getData(this.pageIndex)
      // this.$eventHub.$emit('document-refresh')
    },
    async onSave () {
      await this.saveNormalData()
      await this.saveChangedSignData()
    },
    validateModified () {
      const list = this.widgetList.filter(widget => widget.dirty)
      return list.length !== 0
    },
    validateFilledRequiredItem () {
      let flag = true
      this.widgetList
        .filter(widget => widget.required)
        .forEach(widget => {
          if (!widget.value) {
            flag = false
          }
        })
      return flag
    },
    saveNormalData () {
      const customDataList = this.widgetList
        // .filter(
        //   widget =>
        //     widget.dirty &&
        //     widget.dataSource &&
        //     (widget.dataSource.tableName === 'acis_patient_writ_data' ||
        //       widget.dataSource.tableName === 'acis_amount_record')
        // )
        .map(widget => {
          return {
            widgetId: widget.id,
            tagName: widget.tagName || '',
            value: widget.value
          }
        })

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
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.widgetList.forEach(widget => {
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
      } else {
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
      }
    },
    onChangeSignData ({ itemCode, itemName, itemValue, timePoint }) {
      // console.log(itemCode, itemName, itemValue, timePoint, '111111111')
      if (!itemCode) {
        return
      }
      const group = this.changedSignDataList.find(
        group => group.itemCode === itemCode && group.itemName === itemName
      )
      if (group) {
        const item = group.list.find(item => item.timePoint === timePoint)
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
    // 双击某一点
    onDblclickTime (time) {
      this.addBloodGasTime = moment(time).format('YYYY-MM-DD HH:mm:ss')
      this.visibleBloodGas = true
    },
    saveChangedSignData () {
      console.log(this.changedSignDataList, '1111')
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
      }).then(res => {
        if (res.data.success) {
          this.changedSignDataList = []
          this.$message({
            type: 'success',
            message: '已保存修改后的体征数据'
          })
          this.onRefresh()
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
      }).then(res => {
        const infoList = res.data.data
        if (Array.isArray(infoList)) {
          const hasTagWidgetList = this.widgetList.filter(item => item.tagName)
          hasTagWidgetList.forEach(widget => {
            const info = infoList.find(item => item.tagName === widget.tagName)
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
      }).then(res => {
        const infoList = res.data.data
        if (Array.isArray(infoList)) {
          const hasTagWidgetList = this.widgetList.filter(item => item.tagName)
          hasTagWidgetList.forEach(widget => {
            const info = infoList.find(item => item.tagName === widget.tagName)
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
    },
    getTemplateData () {
      return request({
        url: getTemplateData,
        method: 'POST',
        params: {
          templateCode: this.templateId
        }
      })
        .then(res => {
          if (res.data.success) {
            return res.data.data || undefined
          }
          return Promise.reject(new Error('获取模板数据失败'))
        })
        .catch(e => {
          this.$message.error(e.message)
          return undefined
        })
    },
    getValueData () {
      return request({
        url: getValueData,
        method: 'POST',
        params: {
          templateCode: this.templateId,
          operationId: this.operationId,
          patientId: this.patientId
        }
      })
        .then(res => {
          if (res.data.success) {
            return res.data.data || undefined
          }
          return Promise.reject(new Error('获取模板值失败'))
        })
        .catch(e => {
          this.$message.error(e.message)
          return undefined
        })
    },
    addBloodGasAnalysisRecord (data) {
      return request({
        url: addBloodGasAnalysisRecord,
        method: 'post',
        data
      }).then(res => {
        if (res.data.success) {
          return res
        } else {
          return Promise.reject(new Error('保存血气分析失败'))
        }
      })
    },
    onAddBloodGas (data) {
      this.addBloodGasAnalysisRecord(data).then(res => {
        this.$message.success('添加成功')
        this.visibleBloodGas = false
        this.$eventHub.$emit('document-refresh')
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
  font-family: '宋体';
}
</style>
