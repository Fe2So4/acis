<template lang="pug">
.device-gather
  .content
    .top
      vxe-table.scroll(
        border,
        show-header-overflow,
        show-overflow,
        keep-source,
        highlight-hover-row,
        ref="monitor",
        align="center",
        height="100%",
        size="mini",
        :data="monitorList",
        :checkbox-config="{ checkRowKeys: defaultSelectedMonitor, checkMethod: checkCheckboxMethod, checkStrictly: true }",
        row-id="instrumentCode",
        @checkbox-change="onMonitorCheckboxChange"
      )
        vxe-table-column(field="label", title="监护仪")
        vxe-table-column(field="startTime", title="开始时间")
        vxe-table-column(field="defaultRecvFrequency", title="默认记录间隔")
        vxe-table-column(field="currentRecvFrequency", title="实际记录时间")
        vxe-table-column(field="collectNumber", title="采集次数/秒")
        vxe-table-column(field="roomNo", title="手术间")
        vxe-table-column(type="checkbox", width="60", title="选择")
    .middle
      vxe-table.scroll(
        border,
        show-header-overflow,
        show-overflow,
        keep-source,
        highlight-hover-row,
        ref="anesMachine",
        align="center",
        height="100%",
        size="mini",
        :data="anesMachineList",
        :checkbox-config="{ checkRowKeys: defaultSelectedAnesMachine, checkMethod: checkCheckboxMethod, checkStrictly: true }",
        row-id="instrumentCode",
        @checkbox-change="onAnesMachineCheckboxChange"
      )
        vxe-table-column(field="label", title="麻醉机")
        vxe-table-column(field="startTime", title="开始时间")
        vxe-table-column(field="defaultRecvFrequency", title="默认记录间隔")
        vxe-table-column(field="currentRecvFrequency", title="实际记录时间")
        vxe-table-column(field="collectNumber", title="采集次数/秒")
        vxe-table-column(field="roomNo", title="手术间")
        vxe-table-column(type="checkbox", width="60", title="选择")
  .option
    el-form(:inline="true")
      el-form-item(label="开始时间")
        el-date-picker(
          type="datetime",
          size="mini",
          v-model="time",
          value-format="yyyy-MM-dd HH:mm:ss",
          popper-class="dateTimePicker"
        )
      el-form-item(label="默认记录间隔")
        el-input(size="mini", v-model="defaultRecvFrequency")
      el-form-item(label="实际记录间隔")
        el-input(size="mini", v-model="currentRecvFrequency")
      el-form-item(label="采集次数/秒")
        el-input(size="mini", v-model="collectNumber")
    el-form(:inline="true", style="text-align:right")
      el-form-item
        el-button(type="primary", @click="onConfirm", size="mini") 确定
      el-form-item
        el-button(@click="onCancel", size="mini") 取消
</template>
<script>
import request from '@/utils/requestForMock'
import { getMonitorInfo, addMonitorInfo } from '@/api/device'
import { createNamespacedHelpers } from 'vuex'
import moment from 'moment'
const { mapState } = createNamespacedHelpers('Base')
export default {
  data () {
    return {
      monitorList: [],
      anesMachineList: [],
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      defaultRecvFrequency: '',
      currentRecvFrequency: '',
      collectNumber: ''
    }
  },
  computed: {
    ...mapState(['roomNo', 'operationId']),
    defaultSelectedMonitor () {
      const item = this.monitorList.find((item) => +item.state === 2)
      if (item) {
        return [item.instrumentCode]
      } else {
        return []
      }
    },
    defaultSelectedAnesMachine () {
      const item = this.anesMachineList.find((item) => +item.state === 2)
      if (item) {
        return [item.instrumentCode]
      } else {
        return []
      }
    }
  },
  watch: {
    roomNo: {
      handler: function (val) {
        if (val) {
          this.getMonitorInfo()
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCheckboxMethod ({ row }) {
      return row.state - 1 !== 0
    },
    onMonitorCheckboxChange ({ rowIndex, checked, row }) {
      if (checked) {
        this.$refs.monitor.clearCheckboxRow()
        this.$refs.monitor.setCheckboxRow([this.monitorList[rowIndex]], true);
        ({
          defaultRecvFrequency: this.defaultRecvFrequency,
          currentRecvFrequency: this.currentRecvFrequency,
          collectNumber: this.collectNumber
        } = row)
      }
      this.pickNow()
    },
    onAnesMachineCheckboxChange ({ rowIndex, checked }) {
      if (checked) {
        this.$refs.anesMachine.clearCheckboxRow()
        this.$refs.anesMachine.setCheckboxRow(
          [this.anesMachineList[rowIndex]],
          true
        )
      }
      this.pickNow()
    },
    onConfirm () {
      const selectedMonitor = this.$refs.monitor.getCheckboxRecords()
      const selecteAnesMachine = this.$refs.anesMachine.getCheckboxRecords()
      const requestArr = []
      if (selectedMonitor.length) {
        const monitorItem = {};
        ({
          instrumentCode: monitorItem.instrumentCode,
          itemType: monitorItem.itemType,
          label: monitorItem.label,
          collectNumber: monitorItem.collectNumber,
          currentRecvFrequency: monitorItem.currentRecvFrequency,
          defaultRecvFrequency: monitorItem.defaultRecvFrequency
        } = selectedMonitor[0])
        monitorItem.startTime = this.time
        monitorItem.collectNumber = this.collectNumber || monitorItem.collectNumber
        monitorItem.currentRecvFrequency = this.currentRecvFrequency || monitorItem.currentRecvFrequency
        monitorItem.defaultRecvFrequency = this.defaultRecvFrequency || monitorItem.defaultRecvFrequency
        requestArr.push(monitorItem)
      }
      if (selecteAnesMachine.length) {
        const anesMachineItem = {};
        ({
          instrumentCode: anesMachineItem.instrumentCode,
          startTime: anesMachineItem.startTime,
          collectNumber: anesMachineItem.collectNumber,
          currentRecvFrequency: anesMachineItem.currentRecvFrequency,
          defaultRecvFrequency: anesMachineItem.defaultRecvFrequency,
          itemType: anesMachineItem.itemType,
          label: anesMachineItem.label
        } = selecteAnesMachine[0])
        requestArr.push(anesMachineItem)
      }
      if (requestArr.length) {
        requestArr.forEach(item => {
          item.roomNo = this.roomNo
          item.operationId = this.operationId
        })
        this.addMonitorInfo(requestArr)
      } else {
        this.$message({
          type: 'info',
          message: '无选中项'
        })
      }
    },
    onCancel () {
      this.$eventHub.$emit('close-dialog')
    },
    getMonitorInfo () {
      return request({
        url: `${getMonitorInfo}/${this.roomNo}`,
        method: 'get'
      }).then((res) => {
        if (res.data && res.data.success) {
          const { monitor, anesMachine } = res.data.data
          if (Array.isArray(monitor)) {
            this.monitorList = monitor
          }
          if (Array.isArray(anesMachine)) {
            this.anesMachineList = anesMachine
          }
        }
      })
    },
    addMonitorInfo (arr) {
      return request({
        method: 'post',
        url: addMonitorInfo,
        data: arr
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$eventHub.$emit('close-dialog')
          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
          this.$message({
            showClose: true,
            message: '保存失败',
            type: 'errpr'
          })
        }
      )
    },
    pickNow () {
      this.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
.device-gather {
  height: 80vh;

  // width 60vw
  .content {
    height: calc(100% - 92px);
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
    }

    .middle {
      flex: 1;
      margin-top: 10px;
    }
  }

  .option {
    height: 80px;
    margin-top: 10px;

    .el-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>
