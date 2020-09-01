<template>
  <div class="cancel-statistics">
    <div class="top">
      <el-form
        size="mini"
        :inline="true"
      >
        <span>
          <el-form-item label="手术安排时间">
            <el-date-picker
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              popper-class="dateTimePicker"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </span>
        <span>
          <el-form-item>
            <el-button
              type="primary"
              @click="getCancelData"
            >
              查询
            </el-button>
            <el-button>导出配置</el-button>
            <el-button>导出</el-button>
          </el-form-item>
        </span>
      </el-form>
    </div>
    <div class="table">
      <vxe-table
        border
        round
        export-config
        size="mini"
        ref="xTable"
        class="xTable"
        height="100%"
        :data="tableData"
        align="center"
      >
        <vxe-table-column
          type="seq"
          title="序号"
        />
        <vxe-table-column
          field="ope_req_time"
          title="手术安排时间"
        />
        <vxe-table-column
          field="patient_id"
          title="病人ID"
        />
        <vxe-table-column
          field="patient_name"
          title="病人姓名"
        />
        <vxe-table-column
          field="visit_id"
          title="住院号"
        />
        <vxe-table-column
          field="bed_id"
          title="床号"
        />
        <vxe-table-column
          field="dept_name"
          title="住院科室"
        />
        <vxe-table-column
          field="diagnose_before"
          title="术前诊断"
        />
        <vxe-table-column
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="operationName"
          title="麻醉方法"
        />
        <vxe-table-column
          field="surgeon"
          title="手术医师"
        />
        <vxe-table-column
          field="anes_doc"
          title="麻醉医师"
        />
        <vxe-table-column
          field="delete_reason"
          title="取消原因"
        />
      </vxe-table>
    </div>
    <bottom-buttons
      :page-size="pageSize"
      :current-page="currentPage"
      :total-size="totalPages"
      :total-pages="totalPages"
    />
  </div>
</template>

<script>
import BottomButtons from '@/components/StatisticsBottomButtons/BottomButtons'
import { getCancelStatistics } from '@/api/statistics'
import request from '@/utils/requestForMock'
import moment from 'moment'
export default {
  name: 'CancelOperationStatistics',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      tableData: [],
      time: [moment(new Date()).format('YYYY-MM-DD'), moment(new Date()).format('YYYY-MM-DD')],
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
      totalSize: 0,
      totalPages: 0
    }
  },
  components: {
    BottomButtons
  },
  methods: {
    getCancelData () {
      request({
        url: getCancelStatistics + `?pageSize=${this.pageSize}&index=${this.currentPage}`,
        method: 'post',
        data: {
          arrangeBeforeTime: moment(this.time[0]).format('YYYY-MM-DD'),
          arrangeAfterTime: moment(this.time[1]).format('YYYY-MM-DD')
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
    }
  },
  mounted () {
    this.getCancelData()
  }
}
</script>

<style lang="scss" scoped>
.cancel-statistics {
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
    /deep/ .el-range-input{
      background: transparent
    }
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
