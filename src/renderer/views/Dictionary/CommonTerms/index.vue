
<template lang="pug">
  .common-terms
    .content(class="clearfix")
      .left
        el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="itemCode"
            :props="defaultProps"
            default-expand-all
            @node-click="handleChange"
        )
      .right
        vxe-table(
          border
          ref="xTable"
          auto-resize
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          highlight-current-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="tableData"
          :checkbox-config="{checkStrictly: true}"
          :radio-config="{highlight: true}"
          @radio-change="currentChangeEvent"
          @current-change="currentChangeEvent"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true,activeMethod: activeRowMethod}"
        )
          //- vxe-table-column(type="radio" width="60")
          //-   //- template
          //-   //-   span(class="drag-btn")
          //-   //-     i(class="vxe-icon--menu")
          vxe-table-column(field="detailId" title="序号")
          vxe-table-column(field="itemName" title="分类")
          vxe-table-column(field="detailName" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini" @blur="handleBlur")
          vxe-table-column(field="detailCode" title="编码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailCode" size="mini" @blur="handleBlur")
    .option
      el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" :disabled="deleteDisabled" @click="deleteCommonTerms") 删除(D)
      el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
      el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
      el-button(size="mini" :disabled="refreshDisabled" @click="getCommonTermsDetail") 刷新(R)
</template>
<script>
import {
  commonTermsList,
  commonTermsDetail,
  addCommonTermsDetail,
  updateCommonTermsDetail,
  deleteCommonTermsDetail
} from '@/api/dictionary'
import request from '@/utils/requestForMock'
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
        children: 'children',
        label: 'itemName'
      },
      currentMenu: {},
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {}
    }
  },
  watch: {
    data: {
      handler (val) {
        return val
      }
    }
  },
  mounted () {
    this.getCommonTerms()
  },
  methods: {
    activeRowMethod ({ row, rowIndex }) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        if (insertRecords[0].detailId === row.detailId) {
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
          insertRecords[0].detailCode !== '' ||
          insertRecords[0].detailName !== ''
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
    handleChange (val) {
      this.currentMenu = val
      this.addDisabled = false
      this.deleteDisabled = true
      this.saveDisabled = true
      this.refreshDisabled = true
      this.cancelDisabled = true
      this.getCommonTermsDetail()
    },
    getCommonTerms () {
      request({
        method: 'GET',
        url: commonTermsList
      }).then(res => {
        const data = res.data.data
        this.data = data
      })
    },
    deleteCommonTerms () {
      if (this.currentRow.detailId && this.currentRow.detailId !== '') {
        request({
          method: 'DELETE',
          url: deleteCommonTermsDetail + `/${this.currentRow.detailId}/${this.currentMenu.itemCode}`
        }).then(res => {
          this.currentRow = {}
          this.deleteDisabled = true
          this.getCommonTermsDetail()
        })
      }
    },
    getCommonTermsDetail () {
      request({
        method: 'GET',
        url: commonTermsDetail + '/' + this.currentMenu.itemCode
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    },
    async insertEvent (row) {
      if (this.currentMenu.itemCode) {
        this.addDisabled = true
        this.cancelDisabled = false
        this.data.forEach(value => {
          value.disabled = true
        })
        const length = this.tableData.length - 1
        const record = {
          detailId: parseInt(this.tableData[length].detailId) + 1,
          itemName: this.currentMenu.itemName,
          detailCode: '',
          detailName: ''
        }
        // this.insertData = record
        const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
        console.log(newRow)
      }
    },
    // rowDrop () {
    //   this.$nextTick(() => {
    //     const xTable = this.$refs.xTable
    //     this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
    //       handle: '.drag-btn',
    //       onEnd: ({ newIndex, oldIndex }) => {
    //         const currRow = this.tableData.splice(oldIndex, 1)[0]
    //         this.tableData.splice(newIndex, 0, currRow)
    //       }
    //     })
    //   })
    // },
    revertEvent () {
      this.$refs.xTable.revertData()
      this.cancelDisabled = true
      this.addDisabled = false
      this.deleteDisabled = true
      this.refreshDisabled = false
      this.saveDisabled = true
    },
    addCommonTermsDetail (param) {
      const obj = {}
      obj.detailId = param.detailId
      obj.detailCode = param.detailCode
      obj.detailName = param.detailName
      obj.itemCode = this.currentMenu.itemCode
      request({
        method: 'POST',
        url: addCommonTermsDetail,
        data: obj
      }).then(res => this.getCommonTermsDetail())
    },
    updateCommonTermsDetail (param) {
      const list = param
      list.forEach(value => {
        value.itemCode = this.currentMenu.itemCode
        for (var k in value) {
          if (k === 'itemName') {
            delete value[k]
          }
        }
      })
      request({
        method: 'PUT',
        url: updateCommonTermsDetail,
        data: list
      }).then(res => this.getCommonTermsDetail())
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      console.log(insertRecords, updateRecords)
      if (insertRecords.length > 0) {
        this.addCommonTermsDetail(insertRecords[0])
      }
      if (updateRecords.length > 0) {
        this.updateCommonTermsDetail(updateRecords)
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
.common-terms {
  height: 100%;

  .content {
    height: calc(100% - 38px);

    .left {
      float: left;
      width: 20%;
      height: 100%;
    }

    .right {
      height: 100%;
      float: right;
      width: 80%;
    }
  }

  .option {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
