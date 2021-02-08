
<template lang="pug">
  .operation-room
    .content
      .search-container
        el-input(v-model="search" placeholder="请输入内容" @keyup.enter.native="getDetail(1)" size="mini" clearable)
      .table-container
        vxe-table(
          border
          round
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          highlight-current-row
          align="left"
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
          vxe-table-column(field="opeName" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.opeName" size="mini" @blur="handleBlur")
      //- .pagination-container
    .option
      span
        Pagination(@getData="getDetail" :total="total" :pageSize="pageSize")
      span
        el-button(size="mini" :disabled="addDisabled" @click="insertEvent(0)") 新增(N)
        el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
        el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
        el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
        el-button(size="mini" :disabled="refreshDisabled" @click="getDetail(1)") 刷新(R)
</template>
<script>
// opeRoomDetail
import { opeNameData, deleteOpeNameData, addOpeNameData, updateOpeNameData } from '@/api/dictionary'
import { getDeptList } from '@/api/anaesDrug'
import Pagination from '@/components/Pagination/pagination'
import request from '@/utils/requestForMock'
import XEUtils from 'xe-utils'
export default {
  data () {
    return {
      tableData: [],
      search: '',
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {},
      defaultDept: '',
      deptList: [],
      currentPage: 1,
      pageSize: 100,
      total: 0
    }
  },
  components: {
    Pagination
  },
  mounted () {
    this.getDeptList()
    this.getDetail()
  },
  methods: {
    getSelectLabel (value, list, valueProp = 'deptCode', labelField = 'deptName') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    getDeptList () {
      request({
        method: 'GET',
        url: getDeptList
      }).then(res => {
        this.deptList = res.data.data
      })
    },
    getDetail (currentPage = this.currentPage) {
      request({
        method: 'GET',
        url: opeNameData,
        params: {
          start: currentPage,
          size: this.pageSize,
          content: this.search
        }
      }).then(res => {
        const data = res.data.data
        this.tableData = data.list
        this.currentPage = data.pageNum
        this.total = data.total
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
          insertRecords[0].opeName !== ''
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
      if (this.currentRow.opeCode && this.currentRow.opeCode !== '') {
        request({
          method: 'DELETE',
          url: deleteOpeNameData + `/${this.currentRow.opeCode}`
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
        opeName: '',
        detailCode
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
      obj.opeName = param.opeName
      request({
        method: 'POST',
        url: addOpeNameData,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateOpeNameData,
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
    height calc(100% - 50px)
    .table-container
      height calc(100% - 28px)
    // .pagination-container
    //   height 40px
  .option
    text-align right
    margin-top 10px
    display flex
    justify-content space-between
    span{
      .el-button{
        margin-right:10px;
      }
    }
</style>
