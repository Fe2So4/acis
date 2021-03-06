<template>
  <div class="event clearfix">
    <div class="left">
      <div class="top">
        <div class="title">
          拼音快速检索
        </div>
        <el-input
          v-model="searchName"
          placeholder
          clearable
          size="mini"
          @keyup.enter.native="getEventList"
          @clear="getEventList"
        />
      </div>
      <div class="content">
        <el-scrollbar
          style="height:100%;width:100%;"
          class="scrollbar"
        >
          <ul>
            <li
              class="clearfix"
              v-for="item in fromList"
              :key="item.id"
            >
              <div class="event-button">
                <span
                  class="button"
                  @click="handleAddAnesthetic(item)"
                >{{
                  item.detailName
                }}</span>
              </div>
              <div class="dose-button">
                <span
                  v-if="item.usualDose1 !== 0"
                  @click="handleAddAnesthetic(item, 1)"
                >{{ item.usualDose1 }}</span>
                <span
                  v-if="item.usualDose2 !== 0"
                  @click="handleAddAnesthetic(item, 2)"
                >{{ item.usualDose2 }}</span>
                <span
                  v-if="item.usualDose3 !== 0"
                  @click="handleAddAnesthetic(item, 3)"
                >{{ item.usualDose3 }}</span>
                <span
                  v-if="item.usualDose4 !== 0"
                  @click="handleAddAnesthetic(item, 4)"
                >{{ item.usualDose4 }}</span>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <div class="pagination">
        <el-pagination
          background
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentPageChange"
        />
      </div>
    </div>
    <div class="right">
      <div class="title">
        麻醉事件
      </div>
      <div class="content">
        <vxe-table
          round
          show-overflow
          size="mini"
          ref="xTable"
          width="100%"
          align="center"
          height="100%"
          auto-resize
          keep-source
          class="anaesTable"
          :loading="loading"
          :data="tableData"
          highlight-hover-row
          highlight-current-row
          @checkbox-change="handleCheck"
          :checkbox-config="{
            checkStrictly: true,
            highlight: true,
            checkField: 'checked',
            trigger: 'row'
          }"
          :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
        >
          <!-- @current-change="currentChangeEvent" -->
          <vxe-table-column
            type="checkbox"
            width="60"
            title="选择"
          />
          <vxe-table-column
            field="eventType"
            title="类型"
            width="60"
          />
          <vxe-table-column
            field="eventName"
            title="事件名称"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.eventName"
                size="mini"
                @blur="handleBlur"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="approach"
            title="途径"
            :edit-render="{}"
            width="120"
            v-if="showColumn"
          >
            <template v-slot:edit="{ row }">
              <el-select
                size="mini"
                v-model="row.approach"
                @change="handleBlur"
              >
                <el-option
                  v-for="item in channelList"
                  :label="item.detail_name"
                  :value="item.detail_code"
                  :key="item.detail_code"
                />
              </el-select>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="concentration"
            title="浓度"
            :edit-render="{}"
            width="80"
            v-if="showColumn"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.concentration"
                size="mini"
                @blur="handleBlur"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="concentrationUnit"
            title="单位"
            :edit-render="{}"
            width="120"
            v-if="showColumn"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.concentrationUnit"
                size="mini"
                @change="
                  () => {
                    $refs.xTable.updateStatus(scope)
                    handleBlur()
                  }
                "
              >
                <el-option
                  v-for="item in conUnitList"
                  :label="item.detail_name"
                  :value="item.detail_code"
                  :key="item.detail_code"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.concentrationUnit, conUnitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="speed"
            title="速度"
            :edit-render="{}"
            width="80"
            v-if="showColumn"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.speed"
                size="mini"
                @blur="handleBlur"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="speedUnit"
            title="单位"
            :edit-render="{}"
            width="120"
            v-if="showColumn"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.speedUnit"
                size="mini"
                @change="
                  () => {
                    $refs.xTable.updateStatus(scope)
                    handleBlur()
                  }
                "
              >
                <el-option
                  v-for="item in speedUnitList"
                  :label="item.detail_name"
                  :value="item.detail_code"
                  :key="item.detail_code"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.speedUnit, speedUnitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="dosage"
            title="剂量"
            :edit-render="{}"
            width="80"
            v-if="showColumn"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.dosage"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="dosage"
            title="频率"
            :edit-render="{}"
            width="80"
            v-if="eventType.eventCode === 'E013'"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.dosage"
                @blur="handleBlur"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="dosageUnit"
            title="单位"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.dosageUnit"
                size="mini"
                @change="
                  () => {
                    $refs.xTable.updateStatus(scope)
                    handleBlur()
                  }
                "
              >
                <el-option
                  v-for="item in doseUnitList"
                  :label="item.detail_name"
                  :value="item.detail_code"
                  :key="item.detail_code"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.dosageUnit, doseUnitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="eventStartTime"
            title="发生时间"
            :edit-render="{}"
            width="150"
          >
            <template v-slot:edit="{ row }">
              <div
                style="position: absolute; width:100%; height:28px; z-index:1001"
                @click="focusPicker(row, 1)"
              />
              <el-date-picker
                readonly
                v-model="row.eventStartTime"
                type="datetime"
                popper-class="dateTimePicker"
                size="mini"
                format="MM-dd HH:mm"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm"
                @change="handleDateChange(row)"
              />
              <!-- @change="handleBlur" -->
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.eventStartTime, 'MM-DD HH:mm') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="isHolding"
            title="是否持续"
            width="100"
          >
            <template v-slot="{ row }">
              <el-switch
                v-model="row.isHolding"
                active-value="1"
                inactive-value="0"
                @change="handleChangeSwitch(row)"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="holdingTime"
            title="持续时间"
            :edit-render="{}"
            width="100"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.holdingTime"
                size="mini"
                @blur="handleBlur"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="eventEndTime"
            title="结束时间"
            :edit-render="{}"
            width="150"
          >
            <template v-slot:edit="{ row }">
              <div
                style="position: absolute; width:100%; height:28px; z-index:1001"
                @click="focusPicker(row, 2)"
              />
              <el-date-picker
                readonly
                v-model="row.eventEndTime"
                size="mini"
                popper-class="dateTimePicker"
                type="datetime"
                :clearable="false"
                @change="handleDateChange(row)"
                format="MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.eventEndTime, 'MM-DD HH:mm') }}
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="option">
        <el-row
          typ="flex"
          justify="space-between"
        >
          <el-col
            :span="12"
            class="tip"
          >
            要删除某时间点，必须选中整行！
          </el-col>
          <el-col :span="12">
            <el-button
              size="mini"
              @click="handleSave"
              :disabled="saveVisible"
            >
              保存
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete"
              :disabled="deleteVisible"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              @click="handleRefresh"
            >
              刷新
            </el-button>
          </el-col>
          <!-- <span>类型筛选</span>
          <el-select
            v-model="select"
            size="mini"
            style="margin-right:10px;
            "
          >
            <el-option
              value="1"
              label="麻药"
            >
              麻药
            </el-option>
            <el-option
              value="2"
              label="输液"
            >
              输液
            </el-option>
          </el-select>-->
        </el-row>
      </div>
    </div>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="请选择时间"
      :visible.sync="dialogVisible"
      width="350px"
      :before-close="onCancel"
    >
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            style="width:130px"
            size="mini"
            format="MM-dd"
            value-format="yyyy-MM-dd"
            v-model="selectYear"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <div
            class="el-date-editor el-input el-input--mini el-input--prefix el-input--suffix el-date-editor--date"
            style="width:130px"
          >
            <input
              style="width:130px;height:28px;fontSize:14px"
              class="el-input__inner"
              size="mini"
              maxlength="5"
              v-model="selectTime"
              type="time"
            >
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="onCancel"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="onSaveTime"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import AnaesTable from '@/components/AnaesTable/index'
import request from '@/utils/requestForMock'
import {
  getEventList,
  optionEvent,
  getEventDetail,
  getDoseUnit,
  getConUnit,
  getSpeedUnit,
  getDrugChannel
} from '@/api/anaesDrug'
import getNowFormatDate from '@/utils/utilsNewTime'
import XEUtils from 'xe-utils'
import moment from 'moment'
// import OtherEvent from './components/otherEvent'
import { mapGetters } from 'vuex'
export default {
  name: 'Event',
  data () {
    return {
      type: 1,
      selectYear: '',
      selectTime: '',
      selectItem: {},
      dialogVisible: false,
      select: '',
      searchName: '',
      tableData: [],
      cellStyle: {
        position: 'relative',
        height: '36px',
        textAlign: 'center'
      },
      fromList: [],
      activeRow: null,
      activeColumnId: null,
      time: '',
      currentRow: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      doseUnitList: [],
      speedUnitList: [],
      conUnitList: [],
      channelList: [],
      loading: false,
      unitList: [
        { label: 'mg/h', value: '1' },
        { label: 'mg/m', value: '2' }
      ],
      deleteVisible: true,
      saveVisible: true,
      showColumn: true
    }
  },
  components: {
    // AnaesTable
    // OtherEvent
  },
  watch: {
    eventType: {
      handler (newVal) {
        this.getEventList()
        this.getEventDetail()
        if (
          newVal.eventCode === 'E001' ||
          newVal.eventCode === 'E010' ||
          newVal.eventCode === 'E012' ||
          newVal.eventCode === 'E013' ||
          newVal.eventCode === 'E015'
        ) {
          this.showColumn = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapGetters('Anaes', ['eventType']),
    ...mapGetters('Base', ['operationId'])
  },
  methods: {
    focusPicker (item, type) {
      console.log(item, type)
      this.type = type
      this.selectItem = item
      if (type === 1) {
        if (item.eventStartTime) {
          this.selectYear = String(item.eventStartTime.split(' ')[0])
          const time = String(item.eventStartTime.split(' ')[1])
          this.selectTime = time.substring(0, 5)
        } else {
          this.selectYear = String(getNowFormatDate().split(' ')[0])
          const time = String(getNowFormatDate().split(' ')[1])
          this.selectTime = time.substring(0, 5)
        }
      } else {
        if (item.eventEndTime) {
          this.selectYear = String(item.eventEndTime.split(' ')[0])
          const time = String(item.eventEndTime.split(' ')[1])
          this.selectTime = time.substring(0, 5)
        } else {
          this.selectYear = String(getNowFormatDate().split(' ')[0])
          const time = String(getNowFormatDate().split(' ')[1])
          this.selectTime = time.substring(0, 5)
        }
      }

      this.dialogVisible = true
    },
    onSaveTime () {
      if (
        this.selectYear === '' ||
        this.selectYear === undefined ||
        this.selectYear === null
      ) {
        this.$message.warning('请输入正确的日期')
        return false
      }
      if (
        this.selectTime === '' ||
        this.selectTime === undefined ||
        this.selectTime === null
      ) {
        this.$message.warning('请输入正确的时间')
        return false
      }
      const time = this.selectYear + ' ' + this.selectTime
      if (this.type === 1) {
        this.selectItem.eventStartTime = time

        this.handleDateChange(this.selectItem)
      } else {
        this.selectItem.eventEndTime = time
        this.handleDateChange(this.selectItem)
      }
      this.onCancel()
    },
    onCancel () {
      this.dialogVisible = false
    },
    handleBlur () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (updateRecords.length > 0) {
        this.saveVisible = false
      } else {
        if (insertRecords.length > 0) {
          this.saveVisible = false
        } else {
          this.saveVisible = true
        }
      }
    },
    // 处理开关时间改变
    handleChangeSwitch (row) {
      this.handleBlur()
      if (row.isHolding === '0') {
        row.eventEndTime = ''
        row.holdingTime = ''
      } else {
        row.eventEndTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
        row.holdingTime = moment(new Date()).diff(
          moment(row.eventStartTime),
          'minute'
        )
      }
    },
    // 处理时间改变
    handleDateChange (row) {
      this.handleBlur()
      // eventStartTime eventEndTime holdingTime
      if (row.isHolding === '1') {
        if (row.eventEndTime && row.eventStartTime) {
          row.holdingTime = moment(row.eventEndTime).diff(
            moment(row.eventStartTime),
            'minute'
          )
        } else if (row.eventEndTime && !row.eventStartTime) {
          row.holdingTime = moment(row.eventEndTime).minutes() - 0
        } else if (!row.eventEndTime && !row.eventStartTime) {
          row.holdingTime = 0
        } else {
          row.holdingTime = 0 - moment(row.eventStartTime).minutes()
        }
      }
      if (!row.eventEndTime) {
        row.eventEndTime = ''
      }
      if (!row.eventStartTime) {
        row.eventStartTime = ''
      }
      console.log(row)
    },
    handleCheck ({ records }) {
      console.log(records.length)
      if (records.length > 0) {
        this.deleteVisible = false
      } else {
        this.deleteVisible = true
      }
    },
    getEventDetail () {
      request({
        url: getEventDetail,
        params: {
          operationId: this.operationId,
          eventId: this.eventType.eventCode
        }
      }).then(res => {
        const data = res.data.data
        data.forEach(value => {
          value.checked = false
          value.remote = true
        })
        this.deleteVisible = true
        this.tableData = res.data.data
      })
    },
    handleCurrentPageChange (val) {
      // 改变默认的页数
      this.currentPage = val
      this.getEventList()
      // 切换页码时，要获取每页显示的条数
      // this.getData(this.PageSize, (val) * (this.pageSize))
    },
    formatDate (value, format) {
      if (value === '') {
        return ''
      } else {
        return moment(value).format(format)
      }
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
    currentChangeEvent ({ row }) {
      this.currentRow = row
      console.log(row)
    },
    async handleAddAnesthetic (item, index) {
      let dose = null
      if (index) {
        switch (index) {
          case 1:
            dose = item.usualDose1
            break
          case 2:
            dose = item.usualDose2
            break
          case 3:
            dose = item.usualDose3
            break
          case 4:
            dose = item.usualDose4
            break
        }
      } else {
        dose = item.dose
      }
      const record = {
        approach: item.way,
        concentration: item.concentration,
        concentrationUnit: item.conUnit,
        dosageUnit: item.doseUnit,
        dosage: dose,
        eventEndTime:
          item.isContinue === '1'
            ? moment(new Date()).format('YYYY-MM-DD HH:mm')
            : '',
        eventName: item.detailName,
        eventType: this.eventType.eventName, // 此处需要写活
        holdingTime:
          item.isContinue === '1'
            ? moment(new Date()).diff(moment(new Date()), 'minute')
            : '',
        isHolding: item.isContinue,
        speed: item.speed,
        speedUnit: item.speedUnit,
        eventStartTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        operationId: this.operationId, // 写活
        id: item.id,
        eventId: item.eventCode,
        detailId: item.detailCode,
        checked: false,
        remote: false
      }
      // this.insertData = record
      const { row: newRow } = await this.$refs.xTable.insertAt(record, 0)
      console.log(newRow)
      this.saveVisible = false
    },
    handleUpdate () {
      const { updateRecords } = this.$refs.xTable.getRecordset()
      const obj = {}
      obj.mode = 1
      obj.list = updateRecords
      request({
        url: optionEvent,
        method: 'POST',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.getEventDetail()
          this.saveVisible = true
        } else {
        }
      })
    },
    handleDelete () {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      let remoteArr = []
      let notRemoteArr = []
      remoteArr = selectRecords.filter(item => {
        return item.remote === true
      })
      notRemoteArr = selectRecords.filter(item => {
        return item.remote === false
      })
      if (notRemoteArr.length) {
        notRemoteArr.forEach(item => {
          this.$refs.xTable.remove(item)
        })
        this.deleteVisible = true
      }
      if (remoteArr.length) {
        const obj = {}
        obj.mode = 2
        obj.list = remoteArr
        request({
          url: optionEvent,
          method: 'POST',
          data: obj
        }).then(res => {
          if (res.data.code === 200) {
            this.$message({ type: 'success', message: '删除成功' })
            remoteArr.forEach(item => {
              this.$refs.xTable.remove(item)
            })
            this.deleteVisible = true
            // this.getEventDetail()
          } else {
            this.$message({ type: 'error', message: res.data.msg })
          }
        })
      }
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0 || updateRecords.length > 0) {
        this.saveVisible = false
        // this.resertData()
      } else {
        this.saveVisible = true
      }
      // }
    },
    // 新增事件
    handleAdd (param) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      const obj = {}
      obj.mode = 0
      obj.list = insertRecords
      request({
        url: optionEvent,
        method: 'POST',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.getEventDetail()
          this.saveVisible = true
        } else {
        }
      })
    },
    handleSave () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      console.log(insertRecords, updateRecords)
      if (insertRecords.length > 0) {
        this.handleAdd()
      } else {
        if (updateRecords.length > 0) {
          this.handleUpdate()
        }
      }
    },
    handleRefresh () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0 || updateRecords.length > 0) {
        this.$confirm(
          '检测到未保存的内容，是否在刷新前保存修改？',
          '确认信息',
          {
            distinguishCancelAndClose: true,
            confirmButtonText: '保存',
            cancelButtonText: '放弃修改'
          }
        )
          .then(() => {
            this.handleSave()
          })
          .catch(action => {
            this.getEventDetail()
            this.saveVisible = true
            this.$message({
              type: 'info',
              message: action === 'cancel' ? '放弃保存' : '停留在当前'
            })
          })
      } else {
        this.getEventDetail()
      }
    },
    onCellDblClick (row, column, cell, event) {
      this.activeRow = row
      this.activeColumnId = column.id
      setTimeout(() => {
        const input = event.target.querySelector('input')
        input && input.select()
      })
    },
    getEventList () {
      request({
        url: getEventList,
        params: {
          eventCode: this.eventType.eventCode,
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          inputCode: this.searchName
        }
      }).then(res => {
        // console.log(res.data.data)
        this.fromList = res.data.data.list
        this.total = res.data.data.total
      })
    },
    onCellBlur () {
      this.activeRow = null
      this.activeColumnId = null
    },
    handleOptionEvent () {
      request({
        url: optionEvent
      }).then(res => {
        console.log(res)
      })
    },
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
    getDrugChannel () {
      request({
        url: getDrugChannel
      }).then(res => {
        this.channelList = res.data.data
      })
    },
    resertData () {
      this.$refs.xTable.revertData()
    }
  },
  created () {
    this.getDrugChannel()
    this.getDoseUnit()
    this.getSpeedUnit()
    this.getConUnit()
    // this.getEventList()
    // this.getEventDetail()
  },
  mounted () {}
}
</script>
<style>
.el-picker-panel .el-time-panel {
  left: -30px !important;
}
</style>

<style lang="scss" scoped>
@import '@/styles/theme';
.event {
  width: 80vw;
  height: 60vh;
  font-size: 14px;
  position: relative;
  .title {
    line-height: 30px;
    padding-left: 5px;
    @include theme-property('color', $color-text-regular);
  }
  .left {
    height: 100%;
    padding: 12px 20px 0;
    margin-right: 20px;
    width: 374px;
    float: left;
    display: flex;
    @include theme-property('background', $background-dialog-content);
    border-radius: 10px;
    flex-direction: column;
    .pagination {
      padding: 10px 0;
      .el-pagination {
        text-align: right;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
    }
    .content {
      flex: 1;
      display: flex;
      height: 100%;
      ul {
        height: 100%;
        padding: 5px;
        flex: 1;
        li {
          margin-bottom: 5px;
          .el-button {
            width: 100%;
          }
          .event-button {
            float: left;
            .button {
              display: inline-block;
              width: 150px;
              border-radius: 4px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              line-height: 30px;
              text-indent: 10px;
              @include theme-property('background', $background-event-list);
              @include theme-property('border', $border-event-list);
              @include theme-property('color', $color-event-list);
              cursor: pointer;
              &:hover {
                @include theme-property(
                  'background',
                  $background-hover-event-list
                );
                color: #fff;
              }
            }
          }
          .dose-button {
            float: right;
            span {
              width: 36px;
              height: 30px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              @include theme-property('background', $background-event-list);
              @include theme-property('border', $border-event-list);
              border-radius: 4px;
              display: inline-block;
              line-height: 30px;
              @include theme-property('color', $color-event-list);
              cursor: pointer;
              text-align: center;
              &:hover {
                @include theme-property(
                  'background',
                  $background-hover-event-list
                );
                color: #fff;
              }
            }
          }
        }
        //   &:last-child{
        //     width: 100%;
        //     li{
        //       justify-content: space-around;
        //       display: flex;
        //       .el-button{
        //         margin:0 5px 0 0;
        //       &:last-child{
        //           margin:unset
        //       }
        //       }
        //     }
        // }
      }
    }
    .el-input {
      max-width: 217px;
    }
  }
  .right {
    height: 100%;
    width: calc(100% - 394px);
    float: right;
    padding: 0 5px;
    display: flex;
    @include theme-property('background', $background-dialog-content);
    border-radius: 10px;
    flex-direction: column;
    .content {
      height: calc(100% - 90px);
      // flex: 1;
      // display: flex;
      width: 100%;
    }
    .option {
      text-align: right;
      padding: 10px 0;
      .tip {
        text-align: left;
        line-height: 30px;
        text-indent: 20px;
        color: #fb4451;
      }
      span {
        color: #9ba3d5;
      }
    }
  }
}
.event /deep/ .el-table th > .cell {
  text-align: center;
}
</style>
<style lang="scss">
@import '@/styles/theme';
.event {
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .el-pager li {
    @include theme-property(background-color, $background-event-list);
  }
}
.event .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
