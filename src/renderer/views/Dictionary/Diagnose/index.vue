
<template lang="pug">
  .operation-room
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
          :edit-config="{trigger: 'click', mode: 'cell',activeMethod: activeRowMethod, showStatus: true}"
        )
          //- class="scroll"
          vxe-table-column(field="diagCode" title="诊断代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.diagCode" size="mini" @blur="handleBlur")
          vxe-table-column(field="diagName" title="诊断名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.diagName" size="mini" @blur="handleBlur")
          vxe-table-column(field="stdIndicator" title="正名标志" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.stdIndicator" size="mini" @blur="handleBlur")
          vxe-table-column(field="approvedIndicator" title="标准化标志" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.approvedIndicator" size="mini" @blur="handleBlur")
          vxe-table-column(field="createTime" title="创建日期")
          vxe-table-column(field="inputCode" title="输入码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.inputCode" size="mini" @blur="handleBlur")
    .option
        el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
        el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
        el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
        el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
        el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
// opeRoomDetail
import { diagnoseData, deleteDiagnoseData, addDiagnoseData, updateDiagnoseData } from '@/api/dictionary'
import request from '@/utils/requestForMock'
import XEUtils from 'xe-utils'
export default {
  data () {
    return {
      tableData: [],
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {},
      defaultDept: '',
      deptList: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getSelectLabel (value, list, valueProp = 'deptCode', labelField = 'deptName') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    getDetail () {
      request({
        method: 'GET',
        url: diagnoseData
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
          insertRecords[0].diagCode !== '' ||
          insertRecords[0].diagName !== '' ||
          insertRecords[0].stdIndicator !== '' ||
          insertRecords[0].approvedIndicator !== '' ||
          insertRecords[0].inputCode !== ''
        ) {
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
      if (this.currentRow.diagCode && this.currentRow.diagCode !== '') {
        request({
          method: 'DELETE',
          url: deleteDiagnoseData + `/${this.currentRow.diagCode}`
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
        detailCode,
        diagCode: '',
        createTime: '',
        inputCode: '',
        approvedIndicator: '',
        stdIndicator: '',
        diagName: ''
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
      obj.diagCode = param.diagCode
      obj.diagName = param.diagName
      obj.inputCode = param.inputCode
      obj.approvedIndicator = param.approvedIndicator
      obj.stdIndicator = param.stdIndicator
      request({
        method: 'POST',
        url: addDiagnoseData,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateDiagnoseData,
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
.operation-room
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
