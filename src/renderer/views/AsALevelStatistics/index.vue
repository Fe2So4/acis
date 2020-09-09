<template>
  <div class="search-statistics">
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
              popper-class="dateTimePicker"
              placeholder="选择日期"
              style="width:165px"
            />
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
        export-config
        size="mini"
        ref="xTable"
        class="xTable"
        :data="tableData"
        :footer-method="footerMethod"
        show-footer
        align="center"
      >
        <vxe-table-column
          field="asa_class"
          title="ASA分级"
        />
        <vxe-table-column
          field="count"
          title="例数"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import { getAsaStatistics, exportExcel, getAsaExcel } from '@/api/statistics'
import request from '@/utils/requestForMock'
import { ipcRenderer } from 'electron'
import XEUtils from 'xe-utils'
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
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
      form: {
        afterTime: moment(new Date()).format('YYYY-MM-DD'),
        beforeTime: moment(new Date()).format('YYYY-MM-DD'),
        operationAfterState: '麻醉结束时间',
        operationBeforeState: '麻醉开始时间'
      },
      beforeTimeType: ['麻醉开始时间', '手术开始时间', '入手术室时间', '手术安排时间'],
      afterTimeType: ['麻醉结束时间', '手术结束时间', '出手术室时间', '手术安排时间']
    }
  },
  components: {
  },
  methods: {
    ...mapActions('Statistics', ['showExport']),
    getData () {
      request({
        url: getAsaStatistics,
        method: 'post',
        data: {
          afterTime: this.form.afterTime,
          beforeTime: this.form.beforeTime,
          operationAfterState: this.form.operationAfterState,
          operationBeforeState: this.form.operationBeforeState
        }
      }).then(res => {
        this.tableData = res.data.data
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
          url: getAsaExcel,
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
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.search-statistics {
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
