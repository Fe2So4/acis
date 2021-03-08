<template>
  <div class="eventTable">
    <div class="table">
      <vxe-table
        border="inner"
        ref="table"
        resizable
        highlight-hover-row
        height="330px"
        :data="tableData"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        class="table"
        size="mini"
      >
        <vxe-table-column
          type="checkbox"
          width="40"
        />
        <vxe-table-column
          field="eventType"
          title="类型"
          width="60"
        />
        <vxe-table-column
          field="eventName"
          title="事件名称"
          width="200"
        />
        <vxe-table-column
          field="approach"
          title="途径"
          width="80"
          :edit-render="{
            name: '$select',
            options: approachList,
            optionProps: {
              value: 'detailCode',
              label: 'detailName'
            },
            events: {
              change: onApproachChange
            }
          }"
        />
        <vxe-table-column
          field="concentration"
          title="浓度"
          width="80"
          :edit-render="{
            name: '$input',
            props: { type: 'float', digits: 2 },
            events: { change: onInputChange }
          }"
        />
        <vxe-table-column
          field="concentrationUnit"
          title="单位"
          :edit-render="{
            name: '$select',
            options: conUnitList,
            optionProps: {
              value: 'detail_code',
              label: 'detail_name'
            },
            events: {
              change: onApproachChange
            }
          }"
          width="120"
        />
        <vxe-table-column
          field="speed"
          title="速度"
          width="80"
          :edit-render="{
            name: '$input',
            props: { type: 'float', digits: 2 },
            events: { change: onInputChange }
          }"
        />
        <vxe-table-column
          field="speedUnit"
          title="单位"
          :edit-render="{
            name: '$select',
            options: speedUnitList,
            optionProps: {
              value: 'detail_code',
              label: 'detail_name'
            },
            events: {
              change: onApproachChange
            }
          }"
          width="120"
        />
        <vxe-table-column
          field="dosage"
          title="剂量"
          width="80"
          :edit-render="{
            name: '$input',
            props: { type: 'float', digits: 2 },
            events: { change: onInputChange }
          }"
        />
        <vxe-table-column
          field="dosageUnit"
          title="单位"
          :edit-render="{
            name: '$select',
            options: doseUnitList,
            optionProps: {
              value: 'detail_code',
              label: 'detail_name'
            },
            events: {
              change: onApproachChange
            }
          }"
          width="120"
        />
        <vxe-table-column
          field="isHolding"
          title="持续用药"
          :edit-render="{
            name: '$select',
            options: isHoldingList,
            optionProps: {
              value: 'value',
              label: 'name'
            },
            events: {
              change: onApproachChange
            }
          }"
          width="90"
        />
        <vxe-table-column
          field="eventStartTime"
          title="发生时间"
          width="130"
          :edit-render="{}"
        >
          <template v-slot:edit="{ row }">
            <el-date-picker
              v-model="row.eventStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              popper-class="dateTimePicker"
              size="mini"
              :clearable="false"
              @change="
                val => {
                  onStartTimeChange({ row })
                }
              "
            />
          </template>
          <template v-slot="{ row }">
            {{ row.eventStartTime }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="holdingTime"
          title="持续时间"
          width="100"
          :edit-render="{
            name: '$input',
            props: { type: 'number' },
            events: { input: onHoldingTimeChange }
          }"
        />
        <vxe-table-column
          field="eventEndTime"
          title="结束时间"
          width="130"
          :edit-render="{}"
        >
          <template v-slot:edit="{ row }">
            <el-date-picker
              v-model="row.eventEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              popper-class="dateTimePicker"
              size="mini"
              @change="
                val => {
                  onEndTimeChange({ row })
                }
              "
            />
          </template>
          <template v-slot="{ row }">
            {{ row.eventEndTime }}
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <div class="buttons">
      <div class="left">
        <el-button
          size="mini"
          type="primary"
          @click="onSaveAsTemplate"
        >
          保存模板
        </el-button>
        <el-button
          size="mini"
          @click="onShowTemplates"
        >
          套用模板
        </el-button>
        <span style="margin: 0 10px">类型筛选</span>
        <el-select
          size="mini"
          v-model="eventType"
          @change="onChangeEventType"
          clearable
        >
          <el-option
            v-for="type in eventList"
            :key="type.eventId"
            :value="type.eventId"
            :label="type.eventName"
          />
        </el-select>
      </div>
      <div class="right">
        <el-button
          size="mini"
          type="primary"
          @click="onSave"
        >
          保存
        </el-button>
        <el-button
          @click="onDelete"
          size="mini"
        >
          删除
        </el-button>
        <el-button
          size="mini"
          @click="onRefresh"
        >
          刷新
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import XEUtils from 'xe-utils'
import request from '@/utils/requestForMock'
import { getConUnit, getSpeedUnit, getDoseUnit } from '@/api/anaesDrug'
export default {
  name: 'EventTable',
  props: {
    tableData: {
      required: true,
      type: Array
    },
    approachList: {
      required: true,
      type: Array
    },
    eventList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      isHoldingList: [
        { name: '是', value: '1' },
        { name: '否', value: '0' }
      ],
      eventType: '',
      conUnitList: [],
      speedUnitList: [],
      doseUnitList: []
    }
  },
  mounted () {
    this.getDoseUnit()
    this.getConUnit()
    this.getSpeedUnit()
  },
  methods: {
    getDoseUnit () {
      request({
        url: getDoseUnit
      }).then(res => {
        this.doseUnitList = res.data.data
      })
    },
    getConUnit () {
      request({
        url: getConUnit
      }).then(res => {
        this.conUnitList = res.data.data
      })
    },
    getSpeedUnit () {
      request({
        url: getSpeedUnit
      }).then(res => {
        this.speedUnitList = res.data.data
      })
    },
    getSelectLabel (
      value,
      list,
      valueProp = 'detail_code',
      labelField = 'detail_name'
    ) {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    onApproachChange ({ row }) {
      this.$emit('change-event', row)
    },
    onInputChange ({ row }) {
      this.$emit('change-event', row)
    },
    onStartTimeChange ({ row }) {
      this.changeTimeData(row, 'eventStartTime')
      this.$emit('change-event', row)
    },
    onHoldingTimeChange ({ row }) {
      this.changeTimeData(row, 'holdingTime')
      this.$emit('change-event', row)
    },
    onEndTimeChange ({ row }) {
      this.changeTimeData(row, 'eventEndTime')
      this.$emit('change-event', row)
    },
    onSaveAsTemplate () {
      this.$emit('save-template')
    },
    onShowTemplates () {
      this.$emit('show-templates')
    },
    onChangeEventType (eventId) {
      this.$emit('change-type', eventId)
    },
    onSave () {
      this.$emit('save-event')
    },
    onDelete () {
      const selectedArr = this.$refs.table.getCheckboxRecords()
      if (selectedArr.length) {
        selectedArr.forEach(row => {
          this.$emit('delete-event', row)
        })
      }
    },
    onRefresh () {
      this.$emit('refresh-event')
    },
    changeTimeData (row, changedItem) {
      const { eventStartTime, eventEndTime, holdingTime } = row
      const startMoment = eventStartTime ? moment(eventStartTime) : 0
      const endMoment = eventEndTime ? moment(eventEndTime) : 0
      switch (changedItem) {
        case 'eventStartTime':
          if (eventStartTime) {
            if (eventEndTime) {
              row.isHolding = '1'
              row.holdingTime = endMoment.diff(startMoment, 'minutes')
            } else {
              row.isHolding = '0'
            }
          } else {
            row.isHolding = '0'
            row.holdingTime = ''
            row.eventEndTime = ''
          }
          break
        case 'eventEndTime':
          if (eventEndTime) {
            if (eventStartTime) {
              row.isHolding = '1'
              row.holdingTime = endMoment.diff(startMoment, 'minutes')
            } else {
              row.isHolding = '0'
              row.holdingTime = ''
              row.eventEndTime = ''
            }
          } else {
            row.isHolding = '0'
            row.holdingTime = ''
          }
          break
        case 'holdingTime':
          console.log(holdingTime)
          if (+holdingTime) {
            if (eventStartTime) {
              row.isHolding = '1'
              row.eventEndTime = startMoment
                .add(holdingTime, 'm')
                .format('YYYY-MM-DD HH:mm')
            } else {
              row.isHolding = '0'
              row.holdingTime = ''
              row.eventEndTime = ''
            }
          } else {
            row.isHolding = '0'
            row.holdingTime = ''
            row.eventEndTime = ''
          }
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.eventTable {
  @import '@/styles/theme';
  border: 1px solid;
  @include theme-property('border-color', $dateTimePicker-color-border);
  border-radius: 5px;
  height: 400px;

  .buttons {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left,
    .right {
      height: 30px;
      padding: 0 20px;
      @include theme-property('color', $color-text-regular);
    }
  }

  & ::v-deep .vxe-table .vxe-body--column .vxe-cell {
    white-space: unset;
  }
}
</style>
