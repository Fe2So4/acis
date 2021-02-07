
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
          vxe-table-column(field="userName" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.userName" size="mini" @blur="handleBlur")
          vxe-table-column(field="deptCode" title="科室" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.deptCode" @change="handleBlur")
                el-option(v-for="item in deptList" :label="item.deptName" :value="item.deptCode" :key="item.deptCode")
            template(v-slot="{ row }") {{ getSelectLabel(row.deptCode, deptList) }}
          vxe-table-column(field="inputCode" title="输入码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.inputCode" size="mini" @blur="handleBlur")
          vxe-table-column(field="userJob" title="类别" :edit-render="{}")
          vxe-table-column(field="createTime" title="创建日期")
    .option
        el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
        el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
        el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
        el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
        el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
// opeRoomDetail
import { doctorData, deleteDoctorData, addDoctorData, updateDoctorData } from '@/api/dictionary'
import { getDeptList } from '@/api/anaesDrug'
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
    getDetail () {
      request({
        method: 'GET',
        url: doctorData + '/1'
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
          insertRecords[0].userName !== '' ||
          insertRecords[0].deptName !== '' ||
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
      if (this.currentRow.userId && this.currentRow.userId !== '') {
        request({
          method: 'DELETE',
          url: deleteDoctorData + `/${this.currentRow.userId}`
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
        userName: '',
        userJob: '医生',
        // userId:'',
        createTime: '',
        deptCode: '',
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
      obj.userName = param.userName
      if (param.userJob === '医生') {
        obj.userJob = 1
      } else {
        obj.userJob = 2
      }
      obj.inputCode = param.inputCode
      obj.deptName = param.deptName
      obj.deptCode = param.deptCode
      request({
        method: 'POST',
        url: addDoctorData,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      list.forEach(element => {
        if (element.userJob === '医生') {
          element.userJob = 1
        } else {
          element.userJob = 2
        }
      })
      request({
        method: 'PUT',
        url: updateDoctorData,
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
