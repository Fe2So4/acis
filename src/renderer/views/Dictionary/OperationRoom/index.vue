
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
          vxe-table-column(field="roomNo" title="手术间号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.roomNo" size="mini" @blur="handleBlur")
          vxe-table-column(field="deptCode" title="科室代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.deptCode" size="mini" @blur="handleBlur")
          vxe-table-column(field="locations" title="位置" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.locations" size="mini" @blur="handleBlur")
          vxe-table-column(field="state" title="状态" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.state" size="mini" @blur="handleBlur")
          vxe-table-column(field="bedNo" title="床号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.bedNo" size="mini" @blur="handleBlur")
          vxe-table-column(field="bedId" title="床位标号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.bedId" size="mini" @blur="handleBlur")
          vxe-table-column(field="monitorId" title="监护仪代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.monitorId" size="mini" @blur="handleBlur")
          vxe-table-column(field="roomType" title="手术间类型" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.roomType" size="mini" @blur="handleBlur")
    .option
        el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
        el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
        el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
        el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
        el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
// opeRoomDetail
import { opeRoomDetail, addRoomDetail, updateRoomDetail, deleteRoomDetail } from '@/api/dictionary'
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
      currentRow: {},
      defaultDept: ''
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      request({
        method: 'GET',
        url: opeRoomDetail
      }).then(res => {
        const data = res.data.data
        this.tableData = data.roomList
        this.defaultDept = data.roomCode
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
          insertRecords[0].roomNo !== '' ||
          insertRecords[0].locations !== '' ||
          insertRecords[0].bedId !== '' ||
          insertRecords[0].bedNo !== '' ||
          insertRecords[0].monitorId !== '' ||
          insertRecords[0].roomType !== '' ||
          insertRecords[0].state !== ''
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
      if (this.currentRow.roomNo && this.currentRow.roomNo !== '') {
        request({
          method: 'DELETE',
          url: deleteRoomDetail + `/${this.currentRow.roomNo}`
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
        roomNo: '',
        deptCode: this.defaultDept,
        locations: '',
        state: '',
        bedNo: '',
        bedId: '',
        monitorId: '',
        roomType: ''
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
      obj.roomNo = param.roomNo
      obj.locations = param.locations
      obj.state = param.state
      obj.bedNo = param.bedNo
      obj.bedId = param.bedId
      obj.monitorId = param.monitorId
      obj.roomType = param.roomType
      obj.deptCode = param.deptCode
      request({
        method: 'POST',
        url: addRoomDetail,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateRoomDetail,
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
