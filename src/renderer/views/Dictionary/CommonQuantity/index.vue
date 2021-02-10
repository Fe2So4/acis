
<template lang="pug">
  .common-quantity
    .content(class="clearfix")
      .left
        el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="eventCode"
            default-expand-all
            :props="defaultProps"
            @node-click="handleChange"
           )
      .right
        vxe-table(
          border
          round
          auto-resize
          show-header-overflow
          show-overflow
          keep-source
          ref="xTable"
          highlight-hover-row
          highlight-current-row
          align="center"
          height="100%"
          size="mini"
          :data="tableData"
          @current-change="currentChangeEvent"
          :checkbox-config="{checkStrictly: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true,activeMethod: activeRowMethod}"
        )
          //- class="scroll"
          vxe-table-column(field="detailCode" title="序号")
          vxe-table-column(field="eventName" title="事件分类")
          vxe-table-column(field="detailName" title="事件名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini" @blur="handleBlur")
          vxe-table-column(field="drugSpec" title="药品规格" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.drugSpec" size="mini" @blur="handleBlur")
          vxe-table-column(field="doseUnit" title="单位" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.doseUnit" @change="handleBlur")
                el-option(v-for="item in doseUnitList" :label="item.detail_name" :value="item.detail_code" :key="item.detail_code")
          vxe-table-column(field="usualDose1" title="常用量1" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose1" size="mini" @blur="handleBlur")
          vxe-table-column(field="usualDose2" title="常用量2" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose2" size="mini" @blur="handleBlur")
          vxe-table-column(field="usualDose3" title="常用量3" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose3" size="mini" @blur="handleBlur")
          vxe-table-column(field="usualDose4" title="常用量4" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose4" size="mini" @blur="handleBlur")
    .option
      el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
      el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
      el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
      el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
import { anaesEventList, commonUseDetail, addCommonUseDetail, deleteCommonUseDetail, updateCommonUseDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
import {
  getDoseUnit
} from '@/api/anaesDrug'
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      tableData: [],
      data: [],
      defaultProps: {
        children: 'eventDetailVoList',
        label: 'eventName'
      },
      currentMenu: {},
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {},
      doseUnitList: []
    }
  },
  created () {
    this.getDoseUnit()
  },
  mounted () {
    this.getList()
  },
  methods: {
    getDoseUnit () {
      request({
        url: getDoseUnit
      }).then(res => {
        this.doseUnitList = res.data.data
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
          insertRecords[0].drugSpec !== '' ||
          insertRecords[0].detailName !== '' ||
          insertRecords[0].doseUnit !== '' ||
          insertRecords[0].usualDose1 !== '' ||
          insertRecords[0].usualDose2 !== '' ||
          insertRecords[0].usualDose3 !== '' ||
          insertRecords[0].usualDose4 !== ''
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
    getList () {
      request({
        method: 'GET',
        url: anaesEventList
      }).then(res => {
        const data = res.data.data
        this.data = data
      })
    },
    handleChange (val) {
      this.currentMenu = val
      this.currentMenu = val
      this.addDisabled = false
      this.deleteDisabled = true
      this.saveDisabled = true
      this.refreshDisabled = true
      this.cancelDisabled = true
      this.getDetail()
    },
    getDetail () {
      if (this.currentMenu.eventCode) {
        request({
          method: 'GET',
          url: commonUseDetail + '/' + this.currentMenu.eventCode
        }).then(res => {
          const data = res.data.data
          this.tableData = data
        })
      } else {
        this.$message({ type: 'warning', message: '请选择事件' })
      }
    },
    deleteDetail () {
      if (this.currentRow.detailCode && this.currentRow.detailCode !== '') {
        request({
          method: 'DELETE',
          url: deleteCommonUseDetail + `${this.currentRow.detailCode}/${this.currentMenu.eventCode}`
        }).then(res => {
          this.currentRow = {}
          this.deleteDisabled = true
          this.getDetail()
        })
      }
    },
    async insertEvent (row) {
      if (this.currentMenu.eventCode) {
        this.addDisabled = true
        this.cancelDisabled = false
        let sort = null
        if (this.tableData.length > 0) {
          const length = this.tableData.length - 1
          sort = parseInt(this.tableData[length].detailCode) + 1
        } else {
          sort = 1
        }
        const record = {
          detailCode: sort,
          detailName: '',
          drugSpec: '',
          usualDose1: '',
          usualDose2: '',
          usualDose3: '',
          usualDose4: '',
          doseUnit: '',
          eventName: this.currentMenu.eventName
        }
        // this.insertData = record
        const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
        console.log(newRow)
      }
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
      obj.detailCode = param.detailCode
      obj.detailName = param.detailName
      obj.doseUnit = param.doseUnit
      obj.eventCode = this.currentMenu.eventCode
      obj.drugSpec = param.drugSpec
      obj.usualDose1 = param.usualDose1
      obj.usualDose2 = param.usualDose2
      obj.usualDose3 = param.usualDose3
      obj.usualDose4 = param.usualDose4
      request({
        method: 'POST',
        url: addCommonUseDetail,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      request({
        method: 'PUT',
        url: updateCommonUseDetail,
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
<style lang="scss" scoped>
 @import "@/styles/theme";
  .common-quantity{
    height:100%;
    .content{
      height:calc(100% - 40px);
      .left{
        float:left;
        width:20%;
        height:100%;
        @include theme-property("border", $border-event-left);
        border-right: unset !important;
        border-radius:5px 0px 0px 5px;
      }
      .right{
        height:100%;
        float:right;
        width:80%;
      }
    }
    .option{
      text-align:right;
      margin-top:10px;
      .el-button{
        margin-right:10px;
      }
    }
  }
</style>
