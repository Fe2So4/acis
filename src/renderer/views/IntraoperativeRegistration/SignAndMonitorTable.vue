<template>
  <div class="signAndMonitorTable">
    <div class="buttons">
      <el-button-group>
        <el-button
          :type="state === 'sign' ? 'primary' : ''"
          size="mini"
          @click="onSelectSign"
        >
          体征数据
        </el-button>
        <!--        <el-button
          :type="state === 'monitor' ? 'primary': ''"
          size="mini"
          @click="onSelectMonitor"
        >
          监测数据
        </el-button>-->
      </el-button-group>
      <el-button-group size="mini">
        <el-button
          size="mini"
          :disabled="pageIndex <= 0"
          @click="onPageUp"
        >
          上一页
        </el-button>
        <el-button
          size="mini"
          :disabled="pageIndex + 1 >= totalPage"
          @click="onPageDown"
        >
          下一页
        </el-button>
      </el-button-group>
    </div>
    <div class="table">
      <vxe-table
        border="inner"
        ref="table"
        resizable
        highlight-hover-row
        height="100%"
        :data="tableData"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        size="mini"
        :checkbox-config="{ labelField: 'itemName' }"
      >
        <!-- class="scroll" -->
        <vxe-table-column
          type="checkbox"
          title="名称"
          width="110"
          fixed="left"
        />
        <vxe-table-column
          v-for="timePoint in timePointArr"
          :key="timePoint"
          :field="timePoint"
          :title="timePoint.slice(11, 16)"
          width="80"
          :edit-render="{
            name: '$input',
            props: { type: 'float', digits: 2 },
            events: { change: onInputChange }
          }"
        />
      </vxe-table>
    </div>
    <div class="bottomButtons">
      <el-button
        @click="onSave"
        size="mini"
        type="primary"
      >
        保存
      </el-button>
      <el-button
        @click="onRefresh"
        size="mini"
      >
        刷新
      </el-button>
      <el-button
        @click="moreAddTable"
        size="mini"
      >
        批量添加体征
      </el-button>
      <el-popover
        placement="top"
        width="160"
        trigger="click"
      >
        <div>
          <el-scrollbar
            style="height: 100px"
            :wrap-style="wrapStyles"
          >
            <el-button
              v-for="button in signList"
              :key="button.itemCode"
              size="mini"
              type="text"
              @click="onAddItem(button)"
              style="display:block;margin: 4px 0"
            >
              {{ button.itemName }}
            </el-button>
          </el-scrollbar>
        </div>
        <el-button
          slot="reference"
          size="mini"
        >
          增加项目
        </el-button>
      </el-popover>
      <el-button
        @click="onDeleteItem"
        size="mini"
      >
        删除项目
      </el-button>
    </div>

    <el-dialog
      width="600px"
      append-to-body
      :before-close="handleClose"
      title="批量添加体征"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :inline="true"
        size="mini"
        label-width="120px"
      >
        <row>
          <el-form-item label="开始时间">
            <div
              style="position: absolute; width:100%; height:28px; z-index:1001"
              @click="focusPicker(1)"
            />
            <el-date-picker
              readonly
              v-model="addForm.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <div
              style="position: absolute; width:100%; height:28px; z-index:1001"
              @click="focusPicker(2)"
            />
            <el-date-picker
              readonly
              v-model="addForm.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </row>
        <el-form-item
          :label="item.itemName"
          v-for="item in moreSignList"
          :key="item.itemCode"
        >
          <el-input
            style="width:130px"
            v-model="item.itemValue"
            @input="inputValue"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="saveMoreAdd"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
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
import moment from 'moment'
import {
  getTemplateInfo,
  getSignData,
  batchAddIntraoMonitorData
} from '@/api/medicalDocument'
import getNowFormatDate from '@/utils/utilsNewTime'
import {
  getMonitorData,
  addSignOrMonitorItem,
  deleteSignOrMonitorItem,
  saveSignOrMonitorData
} from '@/api/intraoperative'
import { getSignList } from '@/api/generalConfig'
import request from '@/utils/requestForMock'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters } = createNamespacedHelpers('Base')
export default {
  name: 'SignAndMonitorTable',
  props: {
    operationState: {
      default: 2,
      type: [String, Number]
    }
  },
  data () {
    return {
      type: 1,
      selectYear: '',
      selectTime: '',
      selectItem: {},
      dialogVisible: false,
      addForm: {
        startTime: '',
        endTime: ''
      },
      value1: '',
      dialogFormVisible: false,
      startTime: '',
      endTime: '',
      totalPage: 1,
      pageIndex: 0,
      state: 'sign',
      tableData: [],
      defaultTimePointSet: new Set(),
      timePointArr: [],
      wrapStyles: [
        {
          'overflow-x': 'hidden'
        }
      ],
      signList: [],
      moreSignList: []
    }
  },
  computed: {
    ...mapGetters(['validateHours']),
    ...mapState(['operationId'])
  },
  async created () {
    await this.getIntraoperativeData(0)
    this.getData()
    this.getSignList()
  },
  methods: {
    onCancel () {
      this.dialogVisible = false
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
      console.log(this.type)
      if (this.type === 1) {
        this.addForm.startTime = time
      } else {
        this.addForm.endTime = time
      }
      this.onCancel()
    },
    focusPicker (type) {
      this.type = type
      if (type === 1) {
        this.selectYear = String(getNowFormatDate().split(' ')[0])
        const time = String(getNowFormatDate().split(' ')[1])
        this.selectTime = time.substring(0, 5)
      } else {
        this.selectYear = String(getNowFormatDate().split(' ')[0])
        const time = String(getNowFormatDate().split(' ')[1])
        this.selectTime = time.substring(0, 5)
      }
      this.dialogVisible = true
    },
    inputValue (e) {
      this.$forceUpdate()
    },
    handleClose () {
      this.moreSignList.forEach(item => {
        item.itemValue = ''
      })
      this.dialogFormVisible = false
    },
    // 批量添加体征
    moreAddTable () {
      this.dialogFormVisible = true
    },
    // 保存批量
    saveMoreAdd () {
      const list = []
      this.moreSignList.forEach(item => {
        if (item.itemValue && item.itemValue > 0) {
          list.push(item)
        }
      })
      return request({
        method: 'POST',
        url: batchAddIntraoMonitorData,
        data: {
          operationId: this.operationId,
          startTime: this.addForm.startTime,
          endTime: this.addForm.endTime,
          signList: list
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加体征成功')
          this.handleClose()
          this.onRefresh()
        }
      })
    },
    onSelectSign () {
      this.state = 'sign'
      this.getData()
    },
    onSelectMonitor () {
      this.state = 'monitor'
      this.getData()
    },
    async onPageUp () {
      await this.getIntraoperativeData(this.pageIndex - 1)
      this.getData()
    },
    async onPageDown () {
      await this.getIntraoperativeData(this.pageIndex + 1)
      this.getData()
    },
    onInputChange (data) {},
    onSave () {
      if (!this.validate72Hours()) return
      const list = this.tableData.reduce((acc, item) => {
        const {
          itemName,
          itemCode,
          itemUnit,
          disColor,
          drawIcon,
          _XID,
          ...points
        } = item
        const timePoints = Object.keys(points)
        const items = timePoints.map(timePoint => {
          return {
            timePoint,
            itemName,
            itemCode,
            itemUnit,
            itemValue: points[timePoint]
          }
        })
        return [...acc, ...items]
      }, [])
      this.saveSignOrMonitorData(list)
    },
    onRefresh () {
      this.getData()
    },
    onAddItem (event, scope) {
      this.addSignOrMonitorItem(event)
    },
    onDeleteItem () {
      const selectedArr = this.$refs.table.getCheckboxRecords()
      if (selectedArr.length) {
        selectedArr.forEach(row => {
          this.deleteSignOrMonitorItem(row)
        })
      }
    },
    // 获取术中文书相关信息
    getIntraoperativeData (pageIndex) {
      return request({
        method: 'POST',
        url: getTemplateInfo,
        data: {
          operationId: this.operationId,
          intervalTime: 5,
          pageIndex,
          pageTimeInterval: 4,
          operState: this.operationState
        }
      }).then(res => {
        const { startTime, endTime, totalPage, pageIndex } = res.data.data
        this.startTime = startTime
        this.endTime = endTime
        this.totalPage = totalPage
        this.pageIndex = pageIndex
        this.initDefaultTimePointSet()
        return res.data.data
      })
    },
    getData () {
      if (this.state === 'sign') {
        this.getSignData()
      } else {
        this.getMonitorData()
      }
    },
    getSignData () {
      return request({
        method: 'post',
        url: getSignData,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          dataMode: 5, // 5-正常模式 1-抢救模式
          operationId: this.operationId,
          modeCode: 'N033'
        }
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.tableData = this.convertTableData(res.data.data)
          }
        })
        .catch(e => {})
    },
    getMonitorData () {
      return request({
        method: 'post',
        url: getMonitorData,
        data: {
          startTime: this.startTime,
          endTime: this.endTime,
          operationId: this.operationId
        }
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.tableData = this.convertTableData(res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getSignList () {
      return request({
        method: 'get',
        url: getSignList
      }).then(res => {
        if (res.data && res.data.success) {
          this.signList = res.data.data
          this.moreSignList = JSON.parse(JSON.stringify(this.signList))
        }
      })
    },
    addSignOrMonitorItem ({ itemCode, itemName }) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        url: addSignOrMonitorItem,
        method: 'post',
        data: {
          itemCode,
          itemName,
          mode
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.onRefresh()
        }
      })
    },
    deleteSignOrMonitorItem ({ itemCode, itemName }) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        url: deleteSignOrMonitorItem,
        method: 'post',
        data: {
          itemCode,
          itemName,
          mode
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.onRefresh()
        }
      })
    },
    initDefaultTimePointSet () {
      this.defaultTimePointSet = new Set()
      const start = +moment(this.startTime)
      const end = +moment(this.endTime)
      for (let i = start; i <= end;) {
        this.defaultTimePointSet.add(moment(i).format('YYYY-MM-DD HH:mm:ss'))
        i += 5 * 60 * 1000
      }
    },
    convertTableData (responseData) {
      const timePointSet = new Set(this.defaultTimePointSet)
      responseData.forEach(item => {
        item.list.forEach(data => {
          timePointSet.add(data.timePoint)
        })
      })
      const timePointArr = Array.from(timePointSet)
      timePointArr.sort((a, b) => {
        return +moment(a) - +moment(b)
      })
      this.timePointArr = [...timePointArr]
      const arr = responseData.map(item => {
        const obj = {}
        ;({
          itemCode: obj.itemCode,
          itemName: obj.itemName,
          itemUnit: obj.itemUnit,
          disColor: obj.disColor,
          drawIcon: obj.drawIcon
        } = item)
        timePointArr.forEach(timePoint => {
          let itemValue = item.list.find(i => i.timePoint === timePoint)
          itemValue = itemValue ? itemValue.itemValue : ''
          obj[timePoint] = itemValue
        })
        return obj
      })
      return arr
    },
    saveSignOrMonitorData (list) {
      const mode = this.state === 'sign' ? 1 : 2
      return request({
        method: 'post',
        url: saveSignOrMonitorData,
        data: {
          list,
          mode,
          operationId: this.operationId
        }
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
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
@import '@/styles/theme';

.signAndMonitorTable {
  display: flex;
  flex-direction: column;
  height: 100%;

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .table {
    flex: 1;
    border: 1px solid;
    @include theme-property('border-color', $dateTimePicker-color-border);
    border-radius: 5px;
    // height: calc(100% - 40px);
  }
  .bottomButtons {
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>
