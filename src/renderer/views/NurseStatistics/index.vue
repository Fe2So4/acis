<template>
  <div class="nurse-statistics">
    <div class="top">
      <el-form
        size="mini"
        :inline="true"
        :model="form"
      >
        <span>
          <el-form-item>
            <el-select
              v-model="form.operationBeforeState"
              placeholder="请选择"
              style="width:120px;margin-right:4px;"
            >
              <el-option
                v-for="item in beforeTimeType"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-model="form.beforeTime"
              type="date"
              popper-class="dateTimePicker"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:165px"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.operationAfterState"
              placeholder="请选择"
              style="width:120px;margin-right:4px;"
            >
              <el-option
                v-for="item in afterTimeType"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-model="form.afterTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:165px"
              popper-class="dateTimePicker"
            />
          </el-form-item>
          <el-form-item label="护士">
            <el-select
              v-model="form.nurseCode"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getNurseData"
              :loading="loading"
            >
              <el-option
                v-for="item in nurseList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
        </span>
        <span>
          <el-form-item>
            <el-button
              type="primary"
              @click="getData"
            >
              查询
            </el-button>
            <el-button @click="showExport">导出配置</el-button>
            <el-button @click="handleExport">导出</el-button>
          </el-form-item>
        </span>
      </el-form>
    </div>
    <div class="table">
      <vxe-table
        border
        round
        show-footer
        size="mini"
        ref="xTable"
        class="xTable"
        :data="tableData"
        :footer-method="footerMethod"
        align="center"
      >
        <vxe-table-column
          field="nurse_no"
          title="护士编号"
        />
        <vxe-table-column
          field="surgeon"
          title="护士姓名"
        />
        <vxe-table-column
          field="first_ope_nurse"
          title="洗手护士1"
        />
        <vxe-table-column
          field="sec_ope_nurse"
          title="洗手护士2"
        />
        <vxe-table-column
          field="third_ope_nurse"
          title="洗手护士3"
        />
        <vxe-table-column
          field="first_supply_nurse"
          title="巡回护士1"
        />
        <vxe-table-column
          field="sec_supply_nurse"
          title="巡回护士2"
        />
        <vxe-table-column
          field="third_supply_nurse"
          title="巡回护士3"
        />
        <vxe-table-column
          field="all_sequence"
          title="总台数"
        />
        <vxe-table-column
          field="all_time"
          title="总时长"
        />
        <vxe-table-column
          field="avg_time"
          title="平均时长"
        />
      </vxe-table>
    </div>
    <bottom-buttons
      :page-size="pageSize"
      :current-page="currentPage"
      :total-size="totalSize"
      :total-pages="totalPages"
      @changePage="handleChangePage"
    />
  </div>
</template>

<script>
import BottomButtons from '@/components/StatisticsBottomButtons/BottomButtons'
import { getNurseWork, getNurseWorkExcel, exportExcel } from '@/api/statistics'
import request from '@/utils/requestForMock'
import { nurse } from '@/mixin/statistics'
import moment from 'moment'
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'
import XEUtils from 'xe-utils'
export default {
  data () {
    return {
      tableData: [],
      value: '',
      beforeTimeType: ['麻醉开始时间', '手术开始时间', '入手术室时间', '手术安排时间'],
      afterTimeType: ['麻醉结束时间', '手术结束时间', '出手术室时间', '手术安排时间'],
      form: {
        afterTime: moment(new Date()).format('YYYY-MM-DD'),
        beforeTime: moment(new Date()).format('YYYY-MM-DD'),
        operationAfterState: '麻醉结束时间',
        operationBeforeState: '麻醉开始时间',
        nurseCode: ''
      },
      pageSize: 20,
      currentPage: 1,
      totalSize: 0,
      totalPages: 1,
      loading: false
    }
  },
  mixins: [nurse],
  components: {
    BottomButtons
  },
  methods: {
    ...mapActions('Statistics', ['showExport']),
    getData () {
      request(
        {
          method: 'post',
          url: getNurseWork + `?pageSize=${this.pageSize}&index=${this.currentPage}&nurseCode=${this.form.nurseCode}`,
          data: {
            afterTime: this.form.afterTime,
            beforeTime: this.form.beforeTime,
            operationAfterState: this.form.operationAfterState,
            operationBeforeState: this.form.operationBeforeState
          }
        }).then(res => {
        if (res.data.data) {
          this.tableData = res.data.data.list
          this.pageSize = res.data.data.pageSize
          this.totalSize = res.data.data.total
          this.totalPages = res.data.data.totalPage
        } else {
          this.tableData = []
        }
      })
    },
    footerMethod ({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('合计：')
        } else {
          let sumCell = null
          // switch (column.property) {
          //   case 'big':
          //     sumCell = XEUtils.sum(data, column.property)
          //     break
          // }
          if (column.property === 'dept_name') {

          } else {
            sumCell = XEUtils.sum(data, column.property)
            sums.push(sumCell)
          }
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    },
    handleExport () {
      request(
        {
          method: 'post',
          url: getNurseWorkExcel + `?nurseCode=${this.form.nurseCode}`,
          data: {
            afterTime: this.form.afterTime,
            beforeTime: this.form.beforeTime,
            operationAfterState: this.form.operationAfterState,
            operationBeforeState: this.form.operationBeforeState
          }
        }
      ).then(res => {
        if (res.data.data) {
          this.exportExcel(res.data.data)
        }
      })
    },
    exportExcel (param) {
      ipcRenderer.send('download',
        JSON.stringify({
          downloadUrl: exportExcel + `/${param}`
        }))
    },
    handleChangePage (param) {
      switch (param) {
        case 1:
          if (this.currentPage < this.totalPages) {
            this.currentPage = this.currentPage + 1
          } else {
            this.currentPage = 1
          }
          break
        case -1:
          if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
          } else {
            this.currentPage = 1
          }
          break
        case 0:
          this.currentPage = 1
          break
        case 2:
          this.currentPage = this.totalPages
          break
      }
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.nurse-statistics {
  position: relative;
  color: #9ba3d5;
  font-size: 14px;
  height: 100%;
  .top {
    padding: 20px 0 0 66px;
    .el-checkbox {
      margin-right: 10px;
    }
    height: 70px;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    .el-form{
      &:first-child{
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .table {
    margin-top: 20px;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    height: calc(100% - 90px);
    padding: 20px;
    padding-top: unset;
    overflow: hidden;
    box-sizing: border-box;
    .xTable{
      margin-top: 20px;
      height: calc(100% - 56px);
    }
  }
}
</style>
