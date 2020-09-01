<template>
  <div class="cancel-statistics">
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
              align="right"
              unlink-panels
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="麻醉结束时间">
            <el-date-picker
              v-model="form.anesEndTime"
              type="date"
              style="width:165px;"
              align="right"
              unlink-panels
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="麻醉医生">
            <el-input v-model="form.anesDocNo" />
          </el-form-item>
          <el-form-item label="麻醉方法">
            <el-input v-model="form.anesMethodNo" />
          </el-form-item>
          <el-form-item label="手术科室">
            <el-input v-model="form.deptCode" />
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
      :total-size="totalPages"
      :total-pages="totalPages"
    />
  </div>
</template>

<script>
import BottomButtons from '@/components/StatisticsBottomButtons/BottomButtons'
import { getOpeMethodStatistics } from '@/api/statistics'
import request from '@/utils/requestForMock'
import XEUtils from 'xe-utils'
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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
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
        anesDocNo: 'P0183',
        anesMethodNo: 'A002',
        deptCode: '1001',
        anesName: '臂丛神经阻滞麻醉'
      },
      totalSize: 0,
      totalPages: 0
    }
  },
  components: {
    BottomButtons
  },
  methods: {
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
    }
  },
  mounted () {
    this.getData()
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
