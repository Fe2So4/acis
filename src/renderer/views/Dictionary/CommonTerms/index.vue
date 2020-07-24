
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
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        )
          //- vxe-table-column(type="radio" width="60")
          //-   //- template
          //-   //-   span(class="drag-btn")
          //-   //-     i(class="vxe-icon--menu")
          vxe-table-column(field="detailId" title="序号")
          vxe-table-column(field="itemName" title="分类")
          vxe-table-column(field="detailName" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini")
          vxe-table-column(field="detailCode" title="编码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailCode" size="mini")
    .option
      el-button(size="mini" :disabled="optionType!==1" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" @click="$refs.xTable.removeCheckboxRow()" :disabled="optionType===1") 删除(D)
      el-button(size="mini" @click="saveEvent" :disabled="optionType===1") 保存(S)
      el-button(size="mini" @click="revertEvent" :disabled="optionType===1") 取消(C)
      el-button(size="mini") 刷新(R)
</template>
<script>
import { commonTermsList, commonTermsDetail, addCommonTermsDetail, updateCommonTermsDetail } from '@/api/dictionary'
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
      optionType: 1 // 新增状态,
      // currentRow: {}
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
    currentChangeEvent ({ row }) {
      console.log(row)
      // this.currentRow = row
    },
    handleChange (val) {
      this.currentMenu = val
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
      this.optionType = 2
      this.data.forEach((value) => {
        value.disabled = true
      })
      const record = { detailId: this.tableData.length + 1, itemName: this.currentMenu.itemName, detailCode: '', detailName: '' }
      const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
      console.log(newRow)
      // await this.$refs.xTable.setActiveCell(newRow, 'sex')
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
      }).then(
        res => this.getCommonTermsDetail()
      )
    },
    updateCommonTermsDetail (param) {
      const list = param
      list.forEach(value => {
        value.itemCode = this.currentMenu.itemCode
        for (var k in value) {
          if (k === 'itemName') { delete value[k] }
        }
      })
      request({
        method: 'PUT',
        url: updateCommonTermsDetail,
        data: list
      }).then(
        res => this.getCommonTermsDetail()
      )
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      // this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
      console.log(insertRecords, updateRecords)
      if (insertRecords.length > 0) {
        this.addCommonTermsDetail(insertRecords[0])
      }
      if (updateRecords.length > 0) {
        this.updateCommonTermsDetail(updateRecords)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .common-terms
    height 100%
    .content
      height calc(100% - 38px)
      .left
        float left
        width 20%
        height 100%
      .right
        height 100%
        float right
        width 80%
    .option
      margin-top 10px
      text-align right
</style>
