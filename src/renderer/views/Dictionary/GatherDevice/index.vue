
<template lang="pug">
  .gather-device
    .content
      vxe-table(
        border
        show-header-overflow
        show-overflow
        keep-source
        highlight-hover-row
        align="center"
        height="100%"
        size="mini"
        auto-resize
        class="scroll"
        :data="tableData"
        :checkbox-config="{checkStrictly: true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      )
        vxe-table-column(field="label" title="监护仪标识" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.label" size="mini")
        vxe-table-column(field="firmName" title="厂家" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.firmName" size="mini")
        vxe-table-column(field="model" title="型号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.model" size="mini")
        vxe-table-column(field="interfaceType" title="接口类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.interfaceType" size="mini")
        vxe-table-column(field="ipAddr" title="IP地址" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.ipAddr" size="mini")
        vxe-table-column(field="commPort" title="通讯串口" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.commPort" size="mini")
        vxe-table-column(field="driverProgram" title="采集程序" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.driverProgram" size="mini")
        vxe-table-column(field="itemType" title="仪器分类" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.itemType" size="mini")
        vxe-table-column(field="name" title="必采项" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="deptCode" title="科室代码" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.deptCode" size="mini")
        vxe-table-column(field="deptType" title="科室类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.deptType" size="mini")
        vxe-table-column(field="name" title="床号（手术间）" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="commPort" title="端口号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.commPort" size="mini")
        vxe-table-column(field="defaultRecvFrequency" title="默认采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.defaultRecvFrequency" size="mini")
        vxe-table-column(field="currentRecvFrequency" title="当前采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.currentRecvFrequency" size="mini")
        vxe-table-column(field="state" title="状态" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.state" size="mini")
        vxe-table-column(field="memo" title="备注" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.memo" size="mini")
    .option
        el-button(size="mini") 新增(N)
        el-button(size="mini") 删除(D)
        el-button(size="mini") 保存(S)
        el-button(size="mini") 取消(C)
        el-button(size="mini") 刷新(R)
</template>
<script>
// deviceDetail
import { deviceDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      request({
        method: 'GET',
        url: deviceDetail
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.gather-device
  height 100%
  .content
    width 100%
    height calc(100% - 38px)
  .option
    text-align right
    margin-top 10px
</style>
