<template lang="pug">
  .inspection-information
    .title
      el-form(:inline="true" size="mini")
        el-form-item(label="起止时间")
          el-date-picker(
            size="mini"
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期")
        el-form-item
          el-button(type="primary") 搜索
        el-form-item
          el-button 同步病历病程
    .content(class="clearfix")
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
        :data="tableData"
      )
        vxe-table-column(field="testNo" title="病程修改时间")
        vxe-table-column(field="testName" title="最后修改时间")
        vxe-table-column(field="testNo" title="操作")
          template
            el-button(size="mini" type="primary") 查看影像
</template>
<script>
export default {
  name: 'InspectionInformation',
  data () {
    return {
      tableData: [{ testNo: '123', testName: '123', testType: '12', testDate: '2020-7-14' }],
      dialogVisible: false,
      title: '',
      date: ''
    }
  },
  components: {
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
      // line-height 30px
    .content
      height calc(100% - 48px)
      .left
        width 50%
        float left
        height 100%
      .right
        height 100%
        width 50%
        float right
</style>
