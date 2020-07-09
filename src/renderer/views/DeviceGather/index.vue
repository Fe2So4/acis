<template lang="pug">
  .device-gather
    .content
      .top
        vxe-table(
          border
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="custodyData"
        )
          vxe-table-column(field="name" title="监护仪")
          vxe-table-column(field="specs" title="开始时间")
          vxe-table-column(field="specs" title="默认记录间隔")
          vxe-table-column(field="specs" title="实际记录时间")
          vxe-table-column(field="specs" title="采集次数/秒")
          vxe-table-column(field="specs" title="手术")
          vxe-table-column(type="checkbox" width="60")
      .middle
        vxe-table(
          border
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="anaesData"
        )
          vxe-table-column(field="name" title="麻醉机")
          vxe-table-column(field="specs" title="开始时间")
          vxe-table-column(field="specs" title="默认记录间隔")
          vxe-table-column(field="specs" title="实际记录时间")
          vxe-table-column(field="specs" title="采集次数/秒")
          vxe-table-column(field="specs" title="手术")
          vxe-table-column(type="checkbox" width="60")
    .option
      el-form(:inline="true")
        el-form-item(label="开始时间")
          el-date-picker(type="datetime" size="mini")
        el-form-item(label="默认记录间隔")
          el-input(size="mini")
        el-form-item(label="实际记录间隔")
          el-input(size="mini")
        el-form-item(label="采集次数/秒")
          el-input(size="mini")
</template>
<script>
export default {
  data () {
    return {
      eventData: [],
      custodyData: [],
      anaesData: []
    }
  }
}
</script>
<style lang="stylus" scoped>
  .device-gather
    height 70vh
    width 60vw
    .content
      height calc(100% - 52px)
      display flex
      flex-direction column
      .top
        flex 1
      .middle
        flex 1
        margin-top 10px
    .option
      height 42px
      margin-top 10px
      .el-form
        .el-form-item
          margin-bottom 0
</style>
