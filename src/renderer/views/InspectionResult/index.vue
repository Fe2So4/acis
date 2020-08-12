<template lang="pug">
.inspection-information
  .title
    el-form(:inline="true", size="mini")
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
        //- el-button(type="primary") 搜索
      el-form-item
        el-button(@click="onSync") 同步检查结果
  .content.clearfix
    vxe-table.scroll(
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      align="center"
      height="100%"
      auto-resize
      size="mini"
      :data="examList"
    )
      vxe-table-column(field="examClass" title="检查名称" width="120")
      vxe-table-column(field="examSubClass" title="类型" width="120")
      vxe-table-column(field="examPara" title="部位" width="120")
      vxe-table-column(field="reportDateTime" title="报告日期" width="120")
      vxe-table-column(field="description" title="检查描述" width="120")
      vxe-table-column(field="clinDiag" title="结论" width="120")
      vxe-table-column(title="操作" width="120")
        template(v-slot="{row}")
          el-button(size="mini" type="primary" @click="onCheck(row)") 查看影像
</template>
<script>
import request from '@/utils/requestForMock'
import { getExamInfo, syncExamInfo } from '@/api/systemIntegration'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'InspectionResult',
  data () {
    let _moment = moment()
    const endTime = _moment.format('YYYY-MM-DD HH:mm:ss')
    _moment.subtract(1, 'months')
    const startTime = _moment.format('YYYY-MM-DD HH:mm:ss')
    _moment = null
    return {
      title: '',
      date: [startTime, endTime],
      examList: []
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
    onSearch () {
      const { length } = this.date
      if (length) {
        this.getExamInfo()
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
        this.syncExamInfo()
      } else {
        this.$message({
          showClose: true,
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      }
    },
    onCheck (row) {
      console.log(row)
    },
    getExamInfo () {
      return request({
        url: getExamInfo,
        method: 'get',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.examList = res.data.data
        }
      })
    },
    syncExamInfo () {
      return request({
        url: syncExamInfo,
        method: 'get',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.examList = res.data.data
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
    // line-height 30px
  }

  .content {
    height: calc(100% - 48px);

    .left {
      width: 50%;
      float: left;
      height: 100%;
    }

    .right {
      height: 100%;
      width: 50%;
      float: right;
    }
  }
}
</style>
