<template lang="pug">
  .patient-warning
    vxe-table(
      border
      show-header-overflow
      show-overflow
      highlight-hover-row
      align="center"
      auto-resize
      size="mini"
      class="scroll table"
      :data="tableData"
    )
      vxe-table-column(field="itemName" title="已读")
      vxe-table-column(field="result" title="时间")
      vxe-table-column(field="unit" title="消息")
      vxe-table-column(field="value" title="记录时间")
      vxe-table-column(field="value" title="报警类型")
      vxe-table-column(field="value" title="读取时间")
    .option
      .message 您共有0条未读消息
      .buttons
        el-button(size="mini" type="primary") 保存
        el-button(size="mini") 关闭
</template>
<script>
export default {
  name: 'PatientWarning',
  data () {
    return {
      tableData: []
    }
  }
}
</script>
<style lang="stylus" scoped>
  .patient-warning
    width 60vw
    height 50vh
    font-size 14px
    .table
      height calc(100% - 48px)
    .option
      margin 10px 0
      display flex
      justify-content space-between
      .message
        color #9BA3D5
</style>
