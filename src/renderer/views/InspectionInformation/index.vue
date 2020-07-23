<template lang="pug">
  .inspection-information
    //- .title 检验信息
    .title
       el-form(:inline="true" size="mini")
        el-form-item(label="起止时间")
          el-date-picker(
            size="mini"
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="onSearch"
            popper-class="dateTimePicker"
            )
        el-form-item
          //- el-button(type="primary" @click="onSearch") 搜索
        el-form-item
          el-button(@click="onSync") 同步检验信息
    .content(class="clearfix")
      .left
        vxe-table(
          border
          show-header-overflow
          show-overflow
          highlight-hover-row
          align="center"
          height="100%"
          auto-resize
          size="mini"
          class="scroll"
          :data="testList"
          @cell-click="onLeftTableCellClick"
        )
          vxe-table-column(field="testCode" title="检验号" width="120")
          vxe-table-column(field="testName" title="检验名称" width="120")
          vxe-table-column(field="sample" title="检验类别" width="120")
          vxe-table-column(field="spcmReceivedTime" title="检验日期" width="120")
      el-divider(direction="vertical")
      .right
        vxe-table(
          border
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
          vxe-table-column(field="itemName" title="项目名称" width="120")
          vxe-table-column(field="value" title="测试结果" width="120")
          vxe-table-column(field="unit" title="单位" width="120")
          vxe-table-column(field="referenceRanges" title="参考值" width="120")
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
import { getTestInfo, syncTestInfo } from '@/api/systemIntegration'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'InspectionInformation',
  components: {
    DialogChart
  },
  data () {
    return {
      dialogVisible: false,
      title: '',
      date: [],
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
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    onSearch () {
      const { length } = this.date
      if (length) {
        this.getTestInfo()
      } else {
        this.$message({
          showClose: true,
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      }
    },
    onSync () {
      const { length } = this.date
      if (length) {
        this.syncTestInfo()
      } else {
        this.$message({
          showClose: true,
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      }
    },
    onLeftTableCellClick ({ row }) {
      if (row.testItemList) {
        this.testItemList = row.testItemList
      }
    },
    onRightTableCellDblclick ({ row }) {
      this.dialogVisible = true
      this.title = row.itemName
      this.itemCode = row.itemCode
    },
    getTestInfo () {
      return request({
        url: getTestInfo,
        method: 'get',
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
    syncTestInfo () {
      return request({
        url: syncTestInfo,
        method: 'get',
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
