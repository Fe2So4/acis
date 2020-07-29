<template>
  <div class="intraoperativeRegistration">
    <div class="event">
      <div class="table">
        <event-table
          :table-data="tableData"
          :approach-list="approachList"
          :event-list="eventList"
          @change-event="onChangeEvent"
          @delete-event="onDeleteEvent"
          @save-event="onSaveEvent"
        />
      </div>
      <div class="list">
        <event-list
          :event-list="eventList"
          @add-event="onAddEvent"
        />
      </div>
    </div>
    <div class="detail">
      <div>table</div>
    </div>
  </div>
</template>

<script>
import {
  getExistEvent,
  getApproachList,
  getEventList
} from '@/api/intraoperative'
import request from '@/utils/requestForMock'
import EventTable from './EventTable'
import EventList from './EventList'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'IntraoperativeRegistration',
  components: {
    EventTable,
    EventList
  },
  data () {
    return {
      tableData: [],
      approachList: [],
      eventList: [],
      originRowLength: 0,
      existIndex: 0,
      addIndex: 0,
      changedMap: {},
      deletedMap: {},
      addedMap: {}
    }
  },
  computed: {
    ...mapState(['operationId'])
  },
  created () {
    this.getExistEvent()
    this.getApproachList()
    this.getEventList()
  },
  methods: {
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
      this.tableData.push(event)
      this.addedMap[event.addIndex] = event
    },
    onChangeEvent (row) {
      if (row._tag === 'exist') {
        this.changedMap[row.existIndex] = row
      } else if (row._tag === 'add') {
        this.changedMap[row.addIndex] = row
      }
    },
    onDeleteEvent (row) {
      if (row._tag === 'exist') {
        delete this.changedMap[row.existIndex]
        this.deletedMap[row.existIndex] = row
        const data = this.tableData.find(
          (item) => item.existIndex === row.existIndex
        )
        const rowIndex = this.tableData.indexOf(data)
        this.tableData.splice(rowIndex, 1)
      } else if (row._tag === 'add') {
        delete this.addedMap[row.addIndex]
        const data = this.tableData.find(
          (item) => item.addIndex === row.addIndex
        )
        const rowIndex = this.tableData.indexOf(data)
        this.tableData.splice(rowIndex, 1)
      }
    },
    onSaveEvent () {
      console.log(
        'changedMap',
        this.changedMap,
        'deletedMap',
        this.deletedMap,
        'addedMap',
        this.addedMap
      )
    },
    getExistEvent () {
      return request({
        method: 'post',
        url: getExistEvent,
        params: {
          operationId: this.operationId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.tableData = res.data.data.map((item) => {
            item.existIndex = this.existIndex++
            item._tag = 'exist'
            return item
          })
          this.originRowLength = this.tableData.length
        }
      })
    },
    getApproachList () {
      return request({
        method: 'get',
        url: getApproachList
      }).then((res) => {
        if (res.data && res.data.success) {
          this.approachList = res.data.data
        }
      })
    },
    getEventList () {
      return request({
        url: getEventList,
        method: 'get'
      }).then((res) => {
        if (res.data && res.data.success) {
          this.eventList = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.intraoperativeRegistration {
  font-size: 14px;
  width: 90vw;
  height: 80vh;
  .event {
    display: grid;
    grid-template-columns: 80% calc(20% - 20px);
    grid-gap: 20px;
    .table {
    }
    .list {
    }
  }
}
</style>
