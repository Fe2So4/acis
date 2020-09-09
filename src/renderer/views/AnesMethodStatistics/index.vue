<template>
  <div class="anes-method-statistics">
    <div class="top">
      <el-form
        size="mini"
        :inline="true"
        :model="form"
      >
        <span>
          <el-form-item label="麻醉开始时间">
            <el-date-picker
              v-model="form.anesStartTime"
              type="date"
              style="width:165px;"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              popper-class="dateTimePicker"
            />
          </el-form-item>
          <el-form-item label="麻醉结束时间">
            <el-date-picker
              v-model="form.anesEndTime"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              popper-class="dateTimePicker"
              style="width:165px;"
            />
          </el-form-item>
          <el-form-item label="麻醉医生">
            <el-select
              v-model="form.anesDocNo"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getAnesDocData"
              :loading="loading"
            >
              <el-option
                v-for="item in anesDocList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="麻醉方法">
            <el-select
              v-model="form.anesMethodNo"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getAnesMethodData"
              :loading="loading"
            >
              <el-option
                v-for="item in anesMethodList"
                :key="item.anesCode"
                :label="item.anesName"
                :value="item.anesCode"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="手术科室">
            <el-select
              v-model="form.deptCode"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getDeptData"
              :loading="loading"
            >
              <el-option
                v-for="item in deptList"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode"
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
        ref="xTable"
        class="xTable"
        size="mini"
        :data="tableData"
        :footer-method="footerMethod"
        show-footer
      >
        <vxe-table-column
          field="anes_name"
          title="麻醉方法"
        />
        <vxe-table-column
          field="count"
          width="120"
          title="例数"
        />
        <!-- footer-align="center" -->
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
import { getOpeMethodStatistics, getAnesMethodExcel, exportExcel } from '@/api/statistics'
import request from '@/utils/requestForMock'
import XEUtils from 'xe-utils'
import moment from 'moment'
import { dept, anesDoc, anesMethod } from '@/mixin/statistics'
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'
export default {
  name: 'AnesMethodStatistics',
  data () {
    return {
      tableData: [],
      value: '',
      filterOptions: [
        { name: '全部', value: '1' },
        { name: '术前', value: '2' },
        { name: '术中', value: '3' },
        {
          name: '术后',
          value: '4'
        }
      ],
      radioOptions: [
        {
          name: '全部',
          value: '1'
        },
        {
          name: '急诊',
          value: '2'
        },
        {
          name: '择期',
          value: '3'
        },
        {
          name: '未填',
          value: '4'
        }
      ],
      currentPage: 1,
      pageSize: 20,
      form: {
        anesEndTime: moment(new Date()).format('YYYY-MM-DD'),
        anesStartTime: moment(new Date()).format('YYYY-MM-DD'),
        anesDocNo: '',
        anesMethodNo: '',
        deptCode: '',
        anesName: '臂丛神经阻滞麻醉'
      },
      totalSize: 0,
      totalPages: 1,
      loading: false
    }
  },
  components: {
    BottomButtons
  },
  mixins: [dept, anesDoc, anesMethod],
  methods: {
    ...mapActions('Statistics', ['showExport']),
    getData () {
      request({
        method: 'post',
        url: getOpeMethodStatistics + `?pageSize=${this.pageSize}&index=${this.currentPage}`,
        data: {
          anesDocNo: this.form.anesDocNo,
          anesEndTime: this.form.anesEndTime,
          anesMethodNo: this.form.anesMethodNo,
          anesName: this.form.anesName,
          anesStartTime: this.form.anesStartTime,
          deptCode: this.form.deptCode
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
          switch (column.property) {
            case 'count':
              sumCell = XEUtils.sum(data, column.property)
              break
          }
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [sums]
    },
    handleExport () {
      request(
        {
          method: 'post',
          url: getAnesMethodExcel + `?deptCode=${this.form.dept}`,
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
.anes-method-statistics {
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
