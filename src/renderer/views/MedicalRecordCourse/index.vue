<template lang="pug">
.medical-record-course
  el-form(:inline="true", size="mini")
    el-form-item(label="起止时间")
      el-date-picker(
        size="mini",
        v-model="date",
        type="datetimerange",
        range-separator="至",
        start-placeholder="开始日期",
        end-placeholder="结束日期",
        value-format="yyyy-MM-dd HH:mm:ss",
        @change="onSearch",
        popper-class="dateTimePicker"
      )
    el-form-item
      el-button(@click="onSync") 同步病历病程
  .content.clearfix
    vxe-table.scroll(
      border,
      show-header-overflow,
      show-overflow,
      highlight-hover-row,
      align="center",
      height="100%",
      auto-resize,
      size="mini",
      :data="emrList"
    )
      vxe-table-column(field="sectionName", title="病程标题")
      vxe-table-column(field="reportTime", title="最后修改时间")
      vxe-table-column(title="操作")
        template(v-slot="{row}")
          el-button(size="mini", type="primary", @click="onCheck(row)") 查看病历
</template>
<script>
import request from '@/utils/requestForMock'
import { getEmrInfo, syncEmrInfo } from '@/api/systemIntegration'
import { createNamespacedHelpers } from 'vuex'
import displayEMR from '@/utils/displayEMR'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'MedicalRecordCourse',
  data () {
    let _moment = moment()
    const endTime = _moment.format('YYYY-MM-DD HH:mm:ss')
    _moment.subtract(1, 'months')
    const startTime = _moment.format('YYYY-MM-DD HH:mm:ss')
    _moment = null
    return {
      title: '',
      date: [startTime, endTime],
      emrList: []
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
        this.getEmrInfo()
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
        this.syncEmrInfo()
      } else {
        this.$message({
          showClose: true,
          message: '请输入开始时间和结束时间',
          type: 'warning'
        })
      }
    },
    onCheck (row) {
      displayEMR(row.sectionName, row.sectionContent)
    },
    getEmrInfo () {
      return request({
        url: getEmrInfo,
        method: 'get',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.emrList = res.data.data
        }
      })
    },
    syncEmrInfo () {
      return request({
        url: syncEmrInfo,
        method: 'get',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.emrList = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.medical-record-course {
  height: 520px;
  font-size: 14px;

  /deep/ .el-range-input {
    background: transparent;
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
