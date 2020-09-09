<template>
  <div class="ope-doc-statistics">
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
              popper-class="dateTimePicker"
              type="date"
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
          <el-form-item label="手术医生">
            <el-select
              v-model="form.surgeonCode"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getOpeDocData"
              :loading="loading"
            >
              <el-option
                v-for="item in opeDocList"
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
          field="surgeon_no"
          title="手术医师编号"
        />
        <vxe-table-column
          field="surgeon"
          title="手术医师姓名"
        />
        <vxe-table-column
          field="dept_name"
          title="医师所在科室"
        />
        <vxe-table-column
          field="surgeon"
          title="主刀"
        />
        <vxe-table-column
          field="first_assist"
          title="手术助手1"
        />
        <vxe-table-column
          field="seccond_assist"
          title="手术助手2"
        />
        <vxe-table-column
          field="third_assist"
          title="手术助手3"
        />
        <vxe-table-column
          field="forth_assist"
          title="手术助手4"
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
import { getSurgeonWork, getSurgeonWorkName, exportExcel } from '@/api/statistics'
import request from '@/utils/requestForMock'
import moment from 'moment'
import XEUtils from 'xe-utils'
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'
import { opeDoc } from '@/mixin/statistics'
export default {
  data () {
    return {
      tableData: [],
      beforeTimeType: ['麻醉开始时间', '手术开始时间', '入手术室时间', '手术安排时间'],
      afterTimeType: ['麻醉结束时间', '手术结束时间', '出手术室时间', '手术安排时间'],
      form: {
        afterTime: moment(new Date()).format('YYYY-MM-DD'),
        beforeTime: moment(new Date()).format('YYYY-MM-DD'),
        operationAfterState: '麻醉结束时间',
        operationBeforeState: '麻醉开始时间',
        surgeonCode: ''
      },
      pageSize: 20,
      currentPage: 1,
      totalSize: 0,
      totalPages: 1,
      tableColumn: [
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex', formatter: this.formatterSex },
        { field: 'date3', title: 'Date' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      tableData2: [],
      loading: false
    }
  },
  mixins: [opeDoc],
  components: {
    BottomButtons
  },
  methods: {
    ...mapActions('Statistics', ['showExport']),
    getData () {
      request(
        {
          method: 'post',
          url: getSurgeonWork + `?pageSize=${this.pageSize}&index=${this.currentPage}&surgeonCode=${this.form.surgeonCode}`,
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
          if (column.property === 'dept_name' || column.property === 'surgeon_no' || column.property === 'surgeon') {

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
          url: getSurgeonWorkName + `?surgeonCode=${this.form.surgeonCode}`,
          data: {
            afterTime: this.form.afterTime,
            beforeTime: this.form.beforeTime,
            operationAfterState: this.form.operationAfterState,
            operationBeforeState: this.form.operationBeforeState
          }
        }
      ).then(res => {
        console.log(res.data.data)
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
.ope-doc-statistics {
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
