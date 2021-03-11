<template>
  <div class="intraoperativeRegistration">
    <div class="event">
      <div>
        <event-table
          :table-data="filteredTableData"
          :approach-list="approachList"
          :event-list="eventList"
          @change-type="onChangeType"
          @show-templates="onShowTemplates"
          @save-template="onShowConfirmDialog"
          @change-event="onChangeEvent"
          @delete-event="onDeleteEvent"
          @save-event="onSaveEvent"
          @refresh-event="onRefreshEvent"
        />
      </div>
      <div>
        <event-list
          :event-list="eventList"
          @add-event="onAddEvent"
        />
      </div>
    </div>
    <div class="detail">
      <sign-and-monitor-table :event-list="eventList" />
    </div>
    <dialog-event-template
      v-if="dialogTemplateVisible"
      :visible.sync="dialogTemplateVisible"
      :approach-list="approachList"
      @use-template="onUseTemplate"
    />
    <dialog-confirm
      :visible.sync="dialogConfirmVisible"
      @save-template="onSaveTemplate"
    />
  </div>
</template>

<script>
import $bus from '@/utils/bus'
// 术中登记
import {
  getExistEvent,
  getApproachList,
  getEventList,
  saveEvent,
  addNewTemplate,
  useTemplateDuringOperation
} from '@/api/intraoperative'
import request from '@/utils/requestForMock'
import EventTable from './EventTable'
import EventList from './EventList'
import DialogEventTemplate from './DialogEventTemplate'
import SignAndMonitorTable from './SignAndMonitorTable'
import DialogConfirm from './DialogConfirm'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState, mapGetters } = createNamespacedHelpers('Base')
export default {
  name: 'IntraoperativeRegistration',
  components: {
    EventTable,
    EventList,
    DialogEventTemplate,
    SignAndMonitorTable,
    DialogConfirm
  },
  data () {
    return {
      tableData: [],
      approachList: [],
      eventList: [],
      existIndex: 0,
      addIndex: 0,
      changedMap: {},
      deletedMap: {},
      addedMap: {},
      filterType: '',
      dialogTemplateVisible: false,
      dialogConfirmVisible: false
    }
  },
  computed: {
    ...mapState(['operationId']),
    ...mapGetters(['validateHours']),
    filteredTableData () {
      if (this.filterType) {
        return this.tableData.filter(item => item.eventId === this.filterType)
      }
      return [...this.tableData]
    }
  },
  created () {
    this.getExistEvent()
    this.getApproachList()
    this.getEventList()
    console.log('术中登记')
  },
  methods: {
    onShowTemplates () {
      this.dialogTemplateVisible = true
    },
    onAddEvent (event) {
      const startTime = moment().format('YYYY-MM-DD HH:mm')
      event = Object.assign(
        {
          eventId: '',
          detailId: '',
          eventType: '',
          eventName: '',
          approach: '',
          concentration: '',
          concentrationUnit: '',
          speed: '',
          speedUnit: '',
          dosage: '',
          dosageUnit: '',
          isHolding: '',
          eventStartTime: startTime,
          eventEndTime: '',
          holdingTime: '',
          addIndex: this.addIndex++,
          _tag: 'add'
        },
        event
      )
      event.isHolding = '0'
      this.tableData.push(event)
      this.addedMap[event.addIndex] = event
    },
    onChangeEvent (row) {
      if (row._tag === 'exist') {
        this.changedMap[row.existIndex] = row
      } else if (row._tag === 'add') {
        this.addedMap[row.addIndex] = row
      }
    },
    onDeleteEvent (row) {
      if (row._tag === 'exist') {
        delete this.changedMap[row.existIndex]
        this.deletedMap[row.existIndex] = row
        const rowIndex = this.tableData.findIndex(
          item => item.existIndex === row.existIndex
        )
        this.tableData.splice(rowIndex, 1)
      } else if (row._tag === 'add') {
        delete this.addedMap[row.addIndex]
        const rowIndex = this.tableData.findIndex(
          item => item.addIndex === row.addIndex
        )
        this.tableData.splice(rowIndex, 1)
      }
    },
    onSaveEvent () {
      if (!this.validate72Hours()) return
      const requestArr = []
      const changedList = Object.values(this.changedMap).map(item => {
        const obj = {}
        ;({
          approach: obj.approach,
          concentration: obj.concentration,
          concentrationUnit: obj.concentrationUnit,
          detailId: obj.detailId,
          dosage: obj.dosage,
          dosageUnit: obj.dosageUnit,
          eventId: obj.eventId,
          eventName: obj.eventName,
          eventStartTime: obj.eventStartTime,
          eventType: obj.eventType,
          id: obj.id,
          isHolding: obj.isHolding,
          speed: obj.speed,
          speedUnit: obj.speedUnit
        } = item)
        obj.holdingTime = item.holdingTime ? item.holdingTime : null
        obj.eventEndTime = item.eventEndTime ? item.eventEndTime : null
        obj.operationId = this.operationId
        return obj
      })
      if (changedList.length) {
        requestArr.push(this.saveEvent(changedList, 1))
      }
      const addedList = Object.values(this.addedMap).map(item => {
        const obj = {}
        ;({
          approach: obj.approach,
          concentration: obj.concentration,
          concentrationUnit: obj.concentrationUnit,
          detailId: obj.detailId,
          dosage: obj.dosage,
          dosageUnit: obj.dosageUnit,
          eventEndTime: obj.eventEndTime,
          eventId: obj.eventId,
          eventName: obj.eventName,
          eventStartTime: obj.eventStartTime,
          eventType: obj.eventType,
          holdingTime: obj.holdingTime,
          speed: obj.speed,
          isHolding: obj.isHolding,
          speedUnit: obj.speedUnit
        } = item)
        obj.operationId = this.operationId
        return obj
      })
      if (addedList.length) {
        requestArr.push(this.saveEvent(addedList, 0))
      }
      const deletedList = Object.values(this.deletedMap).map(item => {
        const obj = {}
        ;({ id: obj.id, eventId: obj.eventId } = item)
        return obj
      })
      if (deletedList.length) {
        requestArr.push(this.saveEvent(deletedList, 2))
      }
      if (requestArr.length) {
        return Promise.all(requestArr).then(res => {
          const success = res.every(res => res.data && res.data.data)
          if (success) {
            this.init()
          } else {
            this.$message.warning('存在持续用药未结束')
            this.init()
          }
        })
      }
    },
    onRefreshEvent () {
      this.init()
    },
    onChangeType (type) {
      this.filterType = type
    },
    onUseTemplate ({ list, date, useDosage }) {
      const arr = list.map(
        ({
          id,
          approach,
          concentration,
          concentrationUnit,
          detailId,
          dosage,
          durationFromInroom,
          dosageUnit,
          eventId,
          eventName,
          eventType,
          holdingTime,
          isHolding,
          modeId,
          speed,
          speedUnit
        }) => {
          let eventEndTime = ''
          if (isHolding && holdingTime) {
            eventEndTime = moment(date)
              .add(holdingTime, 'm')
              .format('YYYY-MM-DD HH:mm')
          }
          return {
            id,
            eventId,
            detailId,
            eventType,
            eventName,
            approach,
            concentration,
            concentrationUnit,
            speed,
            speedUnit,
            durationFromInroom,
            dosage: useDosage ? dosage : '',
            dosageUnit,
            isHolding,
            eventStartTime: date,
            eventEndTime,
            holdingTime,
            addIndex: this.addIndex++,
            _tag: 'add'
          }
        }
      )
      this.useTemplateDuringOperationAdd(arr)
      // arr.forEach(event => {
      //   this.addedMap[event.addIndex] = event
      //   this.tableData.push(event)
      // })
    },
    useTemplateDuringOperationAdd (arr) {
      return request({
        method: 'post',
        url: useTemplateDuringOperation + `/${this.operationId}`,
        data: arr
      })
        .then(res => {
          if (res.data.code === 200) {
            this.dialogTemplateVisible = false
            this.$message.success('添加成功')
            this.onRefreshEvent()
          }
        })
        .catch(e => {})
    },
    onShowConfirmDialog () {
      this.dialogConfirmVisible = true
    },
    onSaveTemplate ({ havingWay, templateName, templateParentName }) {
      this.dialogConfirmVisible = false
      const list = this.tableData.map(
        ({
          approach,
          concentration,
          concentrationUnit,
          detailId,
          dosage,
          dosageUnit,
          eventId,
          eventName,
          eventType,
          holdingTime,
          eventStartTime,
          isHolding,
          speed,
          speedUnit
        }) => {
          return {
            approach,
            concentration,
            concentrationUnit,
            detailId,
            dosage,
            dosageUnit,
            eventId,
            eventName,
            eventType,
            holdingTime,
            eventStartTime,
            isHolding,
            speed,
            speedUnit
          }
        }
      )
      if (list.length) {
        this.addNewTemplate({
          havingWay,
          templateName,
          templateParentName,
          list
        })
      }
    },
    getExistEvent () {
      return request({
        method: 'post',
        url: getExistEvent,
        params: {
          operationId: this.operationId,
          type: 1
        }
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.tableData = res.data.data.map(item => {
              item.existIndex = this.existIndex++
              item._tag = 'exist'
              return item
            })
          }
        })
        .catch(e => {})
    },
    getApproachList () {
      return request({
        method: 'get',
        url: getApproachList
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.approachList = res.data.data
          }
        })
        .catch(e => {})
    },
    getEventList () {
      return request({
        url: getEventList,
        method: 'get'
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.eventList = res.data.data
          }
        })
        .catch(e => {})
    },
    saveEvent (list, mode) {
      return request({
        url: saveEvent,
        method: 'post',
        data: {
          list,
          mode
        }
      })
    },
    addNewTemplate ({ havingWay, templateName, templateParentName, list }) {
      return request({
        url: addNewTemplate,
        method: 'post',
        data: {
          operationId: this.operationId,
          havingWay,
          templeteName: templateName,
          templeteParentName: templateParentName,
          list
        }
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch(e => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },
    init () {
      $bus.$emit('changeShuaxin')
      $bus.$emit('shuaxinStatusList')
      this.tableData = []
      this.existIndex = 0
      this.addIndex = 0
      this.changedMap = {}
      this.deletedMap = {}
      this.addedMap = {}
      this.getExistEvent()
    },
    validate72Hours () {
      const result = this.validateHours(72)
      if (!result) {
        this.$message({
          type: 'warning',
          message: '距离手术结束已经超过72小时！不可进行操作'
        })
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.intraoperativeRegistration {
  font-size: 14px;
  width: 95vw;
  height: 90vh;
  .event {
    display: grid;
    grid-template-columns: 70% calc(30% - 20px);
    grid-gap: 20px;
  }
  .detail {
    margin-top: 20px;
    height: calc(100% - 420px);
  }
}
</style>
