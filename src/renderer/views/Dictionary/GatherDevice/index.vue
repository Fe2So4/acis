
<template lang="pug">
  .gather-device
    .content
      vxe-table(
        border
        round
        show-header-overflow
        show-overflow
        keep-source
        highlight-hover-row
        highlight-current-row
        align="center"
        height="100%"
        size="mini"
        ref="xTable"
        auto-resize
        :data="tableData"
        @current-change="currentChangeEvent"
        :checkbox-config="{checkStrictly: true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true,activeMethod: activeRowMethod}"
      )
        //- class="scroll"
        vxe-table-column(field="label" title="监护仪标识" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.label" size="mini" @blur="handleBlur")
        vxe-table-column(field="firmName" title="厂家" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.firmName" size="mini" @blur="handleBlur")
        vxe-table-column(field="model" title="型号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.model" size="mini" @blur="handleBlur")
        vxe-table-column(field="interfaceType" title="接口类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.interfaceType" size="mini" @blur="handleBlur")
        vxe-table-column(field="ipAddr" title="IP地址" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.ipAddr" size="mini" @blur="handleBlur")
        vxe-table-column(field="commPort" title="通讯串口" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.commPort" size="mini" @blur="handleBlur")
        vxe-table-column(field="driverProgram" title="采集程序" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.driverProgram" size="mini" @blur="handleBlur")
        vxe-table-column(field="itemType" title="仪器分类" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.itemType" size="mini" @blur="handleBlur")
        vxe-table-column(field="label" title="必采项" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.label" size="mini" @blur="handleBlur")
        vxe-table-column(field="deptCode" title="科室代码" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.deptCode" size="mini" @blur="handleBlur")
        vxe-table-column(field="deptType" title="科室类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.deptType" size="mini" @blur="handleBlur")
        vxe-table-column(field="label" title="床号（手术间）" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.label" size="mini" @blur="handleBlur")
        vxe-table-column(field="commPort" title="端口号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.commPort" size="mini" @blur="handleBlur")
        vxe-table-column(field="defaultRecvFrequency" title="默认采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.defaultRecvFrequency" size="mini" @blur="handleBlur")
        vxe-table-column(field="currentRecvFrequency" title="当前采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.currentRecvFrequency" size="mini" @blur="handleBlur")
        vxe-table-column(field="state" title="状态" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.state" size="mini" @blur="handleBlur")
        vxe-table-column(field="memo" title="备注" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.memo" size="mini" @blur="handleBlur")
    .option
        el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
        el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
        el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
        el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
        el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
// deviceDetail
import { deviceDetail, deleteDeviceDetail, updateDeviceDetail, addDeviceDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      tableData: [],
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      request({
        method: 'GET',
        url: deviceDetail
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    },
    activeRowMethod ({ row, rowIndex }) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        if (insertRecords[0].detailCode === row.detailCode) {
          return true
        }
        return false
      } else {
        return true
      }
    },
    handleBlur () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        if (
          insertRecords[0].label !== '' ||
          insertRecords[0].firmLabel !== '' ||
          insertRecords[0].model !== '' ||
          insertRecords[0].memo !== '' ||
          insertRecords[0].state !== '' ||
          insertRecords[0].itemType !== '' ||
          insertRecords[0].ipAddr !== '' ||
          insertRecords[0].interfaceType !== '' ||
          insertRecords[0].instrumentCode !== '' ||
          insertRecords[0].driverProgram !== '' ||
          insertRecords[0].currentRecvFrequency !== '' ||
          insertRecords[0].defaultRecvFrequency !== '' ||
          insertRecords[0].commPort !== '' ||
          insertRecords[0].deptCode !== '' ||
         insertRecords[0].deptType !== '') {
          this.saveDisabled = false
          this.cancelDisabled = false
        } else {
          this.saveDisabled = true
          this.cancelDisabled = false
        }
      }
      if (updateRecords.length > 0) {
        this.saveDisabled = false
        this.addDisabled = true
        this.cancelDisabled = false
        this.deleteDisabled = true
        this.refreshDisabled = true
      }
    },
    currentChangeEvent ({ row }) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        this.deleteDisabled = true
        this.cancelDisabled = false
        this.refreshDisabled = true
        this.addDisabled = true
      } else {
        this.currentRow = row
        this.deleteDisabled = false
        this.refreshDisabled = false
      }
    },
    deleteDetail () {
      if (this.currentRow.instrumentCode && this.currentRow.instrumentCode !== '') {
        request({
          method: 'DELETE',
          url: deleteDeviceDetail + `/${this.currentRow.instrumentCode}`
        }).then(res => {
          this.currentRow = {}
          this.deleteDisabled = true
          this.getDetail()
        })
      }
    },
    async insertEvent (row) {
      this.addDisabled = true
      this.cancelDisabled = false
      let detailCode = null
      if (this.tableData.length > 0) {
        const length = this.tableData.length
        detailCode = length + 1
      } else {
        detailCode = 1
      }
      const record = {
        detailCode: detailCode,
        label: '',
        firmLabel: '',
        model: '',
        memo: '',
        state: '',
        itemType: '',
        ipAddr: '',
        interfaceType: '',
        instrumentCode: '',
        driverProgram: '',
        currentRecvFrequency: '',
        defaultRecvFrequency: '',
        commPort: '',
        deptCode: '',
        deptType: ''
      }
      // this.insertData = record
      const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
      console.log(newRow)
    },
    revertEvent () {
      this.$refs.xTable.revertData()
      this.cancelDisabled = true
      this.addDisabled = false
      this.deleteDisabled = true
      this.refreshDisabled = false
      this.saveDisabled = true
    },
    addDetail (param) {
      const obj = {}
      obj.label = param.label
      obj.firmLabel = param.firmLabel
      obj.model = param.model
      obj.memo = param.memo
      obj.state = param.state
      obj.itemType = param.itemType
      obj.ipAddr = param.ipAddr
      obj.interfaceType = param.interfaceType
      obj.instrumentCode = param.instrumentCode
      obj.driverProgram = param.driverProgram
      obj.currentRecvFrequency = param.currentRecvFrequency
      obj.defaultRecvFrequency = param.defaultRecvFrequency
      obj.commPort = param.commPort
      obj.deptCode = param.deptCode
      obj.deptType = param.deptType
      request({
        method: 'POST',
        url: addDeviceDetail,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateDeviceDetail,
        data: list
      }).then(res => this.getDetail())
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        this.addDetail(insertRecords[0])
      }
      if (updateRecords.length > 0) {
        this.updateDetail(updateRecords)
      }
      this.addDisabled = false
      this.saveDisabled = true
      this.refreshDisabled = false
      this.cancelDisabled = true
      this.deleteDisabled = true
    }
  }
}
</script>
<style lang="stylus" scoped>
.gather-device
  height 100%
  .content
    width 100%
    height calc(100% - 40px)
  .option
    text-align right
    margin-top 10px
    .el-button{
      margin-right:10px;
    }
</style>
