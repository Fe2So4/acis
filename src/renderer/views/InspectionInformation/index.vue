<template lang="pug">
  .inspection-information
    .title 检验信息
    .content(class="clearfix")
      .left
        vxe-table(
          border
          show-header-overflow
          show-overflow
          highlight-hover-row
          align="center"
          height="100%"
          auto-resize
          size="mini"
          class="scroll"
          :data="testData"
        )
          vxe-table-column(field="testNo" title="检验号" width="120")
          vxe-table-column(field="testName" title="检验名称" width="120")
          vxe-table-column(field="testType" title="检验类别" width="120")
          vxe-table-column(field="testDate" title="检验日期" width="120")
      .right
        vxe-table(
          border
          show-header-overflow
          show-overflow
          highlight-hover-row
          align="center"
          height="100%"
          auto-resize
          size="mini"
          class="scroll"
          :data="resultData"
          @cell-dblclick="cellDBLClickEvent"
        )
          vxe-table-column(field="itemName" title="项目名称" width="120")
          vxe-table-column(field="result" title="测试结果" width="120")
          vxe-table-column(field="unit" title="单位" width="120")
          vxe-table-column(field="value" title="参考值" width="120")
    Dialog(v-if="dialogVisible" @handleClose="handleClose" :title="title")
</template>
<script>
import Dialog from './components/chart'
export default {
  name: 'InspectionInformation',
  data () {
    return {
      testData: [{ testNo: '123', testName: '123', testType: '12', testDate: '2020-7-14' }],
      resultData: [{ itemName: '123', result: '123', unit: 'mg/l', value: '123' }],
      dialogVisible: false,
      title: ''
    }
  },
  components: {
    Dialog
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    cellDBLClickEvent ({ row }) {
      this.dialogVisible = true
      this.title = row.itemName
    }
  }
}
</script>
<style lang="stylus" scoped>
  .inspection-information
    height 520px
    font-size 14px
    .title
      color #9BA3D5
      line-height 28px
    .content
      height calc(100% - 28px)
      .left
        width 50%
        float left
        height 100%
      .right
        height 100%
        width 50%
        float right
</style>
