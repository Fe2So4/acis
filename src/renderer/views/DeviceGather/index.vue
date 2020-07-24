<template lang="pug">
  .device-gather
    .content
      .top
        vxe-table(
          border
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          ref="monitor"
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="monitorList"
          :checkbox-config="{checkRowKeys:defaultSelectedMonitor,checkMethod: checkCheckboxMethod}"
          row-id="instrumentCode"
          @checkbox-change="onMonitorCheckboxChange"
        )
          vxe-table-column(field="label" title="监护仪")
          vxe-table-column(field="startTime" title="开始时间")
          vxe-table-column(field="defaultRecvFrequency" title="默认记录间隔")
          vxe-table-column(field="currentRecvFrequency" title="实际记录时间")
          vxe-table-column(field="collectNumber" title="采集次数/秒")
          vxe-table-column(field="roomNo" title="手术间")
          vxe-table-column(type="checkbox" width="60" title="选择")
      .middle
        vxe-table(
          border
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          ref="anesMachine"
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="anesMachineList"
          :checkbox-config="{checkRowKeys:defaultSelectedAnesMachine, checkMethod: checkCheckboxMethod}"
          row-id="instrumentCode"
          @checkbox-change="onAnesMachineCheckboxChange"
        )
          vxe-table-column(field="label" title="麻醉机")
          vxe-table-column(field="startTime" title="开始时间")
          vxe-table-column(field="defaultRecvFrequency" title="默认记录间隔")
          vxe-table-column(field="currentRecvFrequency" title="实际记录时间")
          vxe-table-column(field="collectNumber" title="采集次数/秒")
          vxe-table-column(field="roomNo" title="手术间")
          vxe-table-column(type="checkbox" width="60" title="选择")
    .option
      el-form(:inline="true")
        el-form-item(label="开始时间")
          el-date-picker(type="datetime" size="mini")
        el-form-item(label="默认记录间隔")
          el-input(size="mini")
        el-form-item(label="实际记录间隔")
          el-input(size="mini")
        el-form-item(label="采集次数/秒")
          el-input(size="mini")
</template>
<script>
import request from '@/utils/requestForMock'
import { getMonitorInfo, addMonitorInfo } from '@/api/device'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  data () {
    return {
      monitorList: [],
      anesMachineList: []
    }
  },
  computed: {
    ...mapState(['roomNo']),
    defaultSelectedMonitor () {
      const item = this.monitorList.find(item => +item.state === 2)
      if (item) {
        return [item.instrumentCode]
      } else {
        return []
      }
    },
    defaultSelectedAnesMachine () {
      const item = this.anesMachineList.find(item => +item.state === 2)
      if (item) {
        return [item.instrumentCode]
      } else {
        return []
      }
    }
  },
  created () {
    this.getMonitorInfo()
  },
  methods: {
    checkCheckboxMethod ({ row }) {
      return row.state - 1 !== 0
    },
    onMonitorCheckboxChange ({ rowIndex, checked }) {
      if (checked) {
        this.$refs.monitor.clearCheckboxRow()
        this.$refs.monitor.setCheckboxRow([this.monitorList[rowIndex]], true)
      }
    },
    onAnesMachineCheckboxChange ({ rowIndex, checked }) {
      if (checked) {
        this.$refs.anesMachine.clearCheckboxRow()
        this.$refs.anesMachine.setCheckboxRow([this.monitorList[rowIndex]], true)
      }
    },
    getMonitorInfo () {
      return request({
        url: `${getMonitorInfo}/${this.roomNo}`,
        method: 'get'
      }).then(
        res => {
          if (res.data && res.data.success) {
            const { monitor, anesMachine } = res.data.data
            if (Array.isArray(monitor)) {
              this.monitorList = monitor
            }
            if (Array.isArray(anesMachine)) {
              this.anesMachineList = anesMachine
            }
          }
        }
      )
    },
    addMonitorInfo () {
      return request({
        method: 'post',
        url: addMonitorInfo,
        data: {
          collectNumber: '',
          currentRecvFrequency: '',
          defaultRecvFrequency: '',
          instrumentCode: '',
          label: '',
          operationId: '',
          roomNo: '',
          startTime: ''
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .device-gather
    height 70vh
    width 60vw
    .content
      height calc(100% - 52px)
      display flex
      flex-direction column
      .top
        flex 1
      .middle
        flex 1
        margin-top 10px
    .option
      height 42px
      margin-top 10px
      .el-form
        .el-form-item
          margin-bottom 0
</style>
