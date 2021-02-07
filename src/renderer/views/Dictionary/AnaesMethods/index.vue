
<template lang="pug">
  .anaes-methods
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
        ref="xTable"
        height="100%"
        size="mini"
        auto-resize
        :data="tableData"
        :checkbox-config="{checkStrictly: true}"
        @current-change="currentChangeEvent"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true,activeMethod: activeRowMethod}"
      )
        //- class="scroll"
        vxe-table-column(field="sort" title="序号")
        vxe-table-column(field="anesCode" title="编码" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesCode" size="mini" @blur="handleBlur")
        vxe-table-column(field="anesName" title="名称" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesName" size="mini" @blur="handleBlur")
        vxe-table-column(field="inputCode" title="输入码" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.inputCode" size="mini" @blur="handleBlur")
        vxe-table-column(field="anesName" title="分类" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesName" size="mini" @blur="handleBlur")
    .option
      el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
      el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
      el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
      el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
import { anaesMethodDetail, addMethodDetail, updateMethodDetail, deleteMethodDetail } from '@/api/dictionary'
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
        url: anaesMethodDetail
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
          insertRecords[0].anesName !== '' ||
            insertRecords[0].anesCode !== '' ||
            insertRecords[0].inputCode !== '') {
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
    handleChange (val) {
      this.currentMenu = val
      this.addDisabled = false
      this.deleteDisabled = true
      this.saveDisabled = true
      this.refreshDisabled = true
      this.cancelDisabled = true
      this.getDetail()
    },
    deleteDetail () {
      if (this.currentRow.anesCode && this.currentRow.anesCode !== '') {
        request({
          method: 'DELETE',
          url: deleteMethodDetail + `/${this.currentRow.anesCode}`
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
      let sort = null
      if (this.tableData.length > 0) {
        const length = this.tableData.length - 1
        sort = parseInt(this.tableData[length].sort) + 1
      } else {
        sort = 1
      }
      const record = {
        sort: sort,
        anesCode: '',
        anesName: '',
        inputCode: ''
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
      obj.sort = param.sort
      obj.anesCode = param.anesCode
      obj.anesName = param.anesName
      obj.inputCode = param.inputCode
      request({
        method: 'POST',
        url: addMethodDetail,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateMethodDetail,
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
.anaes-methods
  height 100%
  .content
    height calc(100% - 40px)
  .option
    text-align right
    margin-top 10px
    .el-button{
      margin-right:10px;
    }
</style>
