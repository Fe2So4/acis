<template lang="pug">
.medical-order-information
  .title
    span 医嘱信息
    el-date-picker(
      type="date",
      format="yyyy-MM-dd",
      value-format="yyyy-MM-dd",
      v-model="date",
      size="mini",
      style="margin: 0 10px",
      @change="onSearch"
      popper-class="dateTimePicker"
    )
    el-button(@click="onSync", size="mini") 同步
    el-radio-group(v-model="orderType", style="margin-right:10px")
      el-radio(label="all") 全部
      el-radio(label="0") 临时
      el-radio(label="1") 长期
    el-radio-group(v-model="orderState")
      el-radio(label="all") 全部
      el-radio(label="1") 新开
      el-radio(label="2") 校对
      el-radio(label="3") 已执行
      el-radio(label="4") 已停止
  vxe-table.scroll.table(
    border,
    show-header-overflow,
    show-overflow,
    highlight-hover-row,
    align="center",
    auto-resize,
    size="mini",
    :data="filteredOrderList"
  )
    vxe-table-column(
      width="120",
      field="odType",
      title="长期/临时",
      :formatter="formatOrderType"
    )
    vxe-table-column(width="120", field="startTime", title="开始时间")
    vxe-table-column(width="120", field="stopTime", title="结束时间")
    vxe-table-column(width="120", field="odName", title="医嘱内容")
    vxe-table-column(width="120", field="dosage", title="剂量")
    vxe-table-column(width="120", field="dosageUnit", title="剂量单位")
    vxe-table-column(width="120", field="useWay", title="途径")
    vxe-table-column(width="120", field="frequency", title="频率")
    vxe-table-column(width="120", title="执行时间")
      template(v-slot="{row}") {{ row.duration + row.durationUnit }}
    vxe-table-column(width="120", field="odStopTime", title="停止时间")
</template>
<script>
import request from '@/utils/requestForMock'
import { getOrderInfo, syncOrderInfo } from '@/api/systemIntegration'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'MedicalOrderInformation',
  data () {
    return {
      date: '',
      orderList: [],
      orderType: 'all',
      orderState: 'all'
    }
  },
  computed: {
    ...mapState(['patientId']),
    filteredOrderList () {
      let filteredList = [...this.orderList]
      if (this.orderType !== 'all') {
        filteredList = filteredList.filter(
          (item) => item.odType - this.orderType === 0
        )
      }
      if (this.orderState !== 'all') {
        filteredList = filteredList.filter(
          item => item.odState - this.orderState === 0
        )
      }
      return filteredList
    }
  },
  methods: {
    onSearch () {
      if (this.date) {
        this.getOrderInfo()
      } else {
        this.orderList = []
      }
    },
    onSync () {
      if (this.date) {
        this.syncOrderInfo()
      } else {
        this.orderList = []
      }
    },
    getOrderInfo () {
      return request({
        url: getOrderInfo,
        method: 'get',
        params: {
          dateStr: this.date,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.orderList = res.data.data
        }
      })
    },
    syncOrderInfo () {
      return request({
        url: syncOrderInfo,
        method: 'get',
        params: {
          dateStr: this.date,
          patientId: this.patientId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.orderList = res.data.data
        }
      })
    },
    formatOrderType ({ cellValue }) {
      switch (+cellValue) {
        case 0:
          return '临时'
        case 1:
          return '长期'
        default:
          return '未识别'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.medical-order-information {
  height: 500px;
  font-size: 14px;

  .title {
    line-height: 38px;

    span {
      color: #9BA3D5;
    }

    .el-radio-group {
      background: #1E222E;
      padding: 5px;
      border-radius: 5px;
      margin-left: 20px;
    }

    .el-date-picker {
      margin-left: 20px;
    }
  }

  .table {
    height: calc(100% - 38px);
  }
}
</style>
