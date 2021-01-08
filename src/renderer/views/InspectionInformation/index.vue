<template lang="pug">
  .inspection-information
    //- .title 检验信息
    .title
       el-form(:inline="true" size="mini")
        el-form-item(label="起止时间")
          el-date-picker(
            size="mini"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="onSearch"
            popper-class="dateTimePicker"
            )
        el-form-item
          //- el-button(type="primary" @click="onSearch") 搜索
        //el-form-item
        //  el-button(@click="onSync") 同步检验信息
    .content(class="clearfix")
      .left
        vxe-table(
          border
          round
          show-header-overflow
          show-overflow
          highlight-hover-row
          highlight-current-row
          align="center"
          height="100%"
          auto-resize
          size="mini"
          class="scroll"
          :data="testList"
          @cell-click="onLeftTableCellClick"
        )
          vxe-table-column(field="inspectionNo" title="报告编号" width="80")
          vxe-table-column(field="patId" title="患者ID" width="80")
          vxe-table-column(field="patName" title="患者姓名" width="80")
          vxe-table-column(field="inspectionCategory" title="检验项目" width="80")
          vxe-table-column(field="clinicDiag" title="诊断" width="80")
          vxe-table-column(field="inspectionSpecimen" title="标本" width="80")
          vxe-table-column(field="inspectionSpecimendate" title="样本时间" width="140")
          vxe-table-column(field="inspectionStatus" title="执行状态" width="80")
          vxe-table-column(field="inspectionRptdate" title="完成时间" width="140")
          vxe-table-column(field="inspectionRptby" title="报告人" width="80")
          vxe-table-column(field="inspectionAuditorby" title="审核人" width="80")
      el-divider(direction="vertical")
      .right
        vxe-table(
          border
          round
          show-header-overflow
          show-overflow
          highlight-hover-row
          align="center"
          height="100%"
          auto-resize
          size="mini"
          class="scroll"
          :data="testItemList"
          @cell-dblclick="onRightTableCellDblclick"
        )
          vxe-table-column(field="reportItemName" title="项目名称" width="80")
          vxe-table-column(field="reportResult" title="检验结果" width="80")
          vxe-table-column(field="reportAbnormal" title="标志" width="80")
          vxe-table-column(field="reportUnits" title="单位" width="80")
          vxe-table-column(field="inspectionRefrange" title="参考值" width="80")
    DialogChart(
      v-if="dialogVisible"
      @handleClose="handleClose"
      :title="title"
      :startTime="startTime"
      :endTime="endTime"
      :itemCode="itemCode"
      :patientId="patientId"
      )
</template>
<script>
import DialogChart from './DialogChart'
import request from '@/utils/requestForMock'
import { getBDGInspectionApply, getBEGInspectionReport } from '@/api/systemIntegration'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'InspectionInformation',
  components: {
    DialogChart
  },
  data () {
    let _moment = moment()
    const endTime = _moment.format('YYYY-MM-DD')
    _moment.subtract(1, 'months')
    const startTime = _moment.format('YYYY-MM-DD')
    _moment = null
    return {
      dialogVisible: false,
      title: '',
      date: [startTime, endTime],
      testList: [],
      testItemList: [],
      itemCode: ''
    }
  },
  computed: {
    ...mapState(['patientId']),
    startTime () {
      const { length } = this.date
      if (length) {
        return this.date[0]
      }
      return ''
    },
    endTime () {
      const { length } = this.date
      if (length) {
        return this.date[1]
      }
      return ''
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    onSearch () {
      const { length } = this.date
      if (length) {
        this.getBDGInspectionApply()
      } else {
        this.$message({
          showClose: true,
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      }
    },
    onLeftTableCellClick ({ row }) {
      if (row.inspectionNo) {
        this.getBEGInspectionReport(row.inspectionNo)
      }
    },
    onRightTableCellDblclick ({ row }) {
      this.dialogVisible = true
      this.title = row.itemName
      this.itemCode = row.itemCode
    },
    getBDGInspectionApply () {
      return request({
        url: getBDGInspectionApply,
        method: 'post',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.testList = res.data.data
          this.testItemList = []
        }
      })
    },
    getBEGInspectionReport (inspectionNo) {
      return request({
        url: getBEGInspectionReport,
        method: 'post',
        params: {
          inspectionNo
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.testItemList = res.data.data
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.inspection-information {
  height: 520px;
  font-size: 14px;

  & ::v-deep .el-range-input {
    background: transparent;
  }

  .title {
    color: #9ba3d5;
    line-height: 28px;
  }

  .content {
    height: calc(100% - 48px);

    .el-divider--vertical {
      width: 0;
    }

    .left {
      // width 50%
      float: left;
      height: 100%;
    }

    .right {
      height: 100%;
      // width 50%
      float: right;
    }
  }
}
</style>
