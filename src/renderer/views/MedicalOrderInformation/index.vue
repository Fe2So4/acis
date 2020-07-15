<template lang="pug">
  .medical-order-information
    .title
      span 医嘱信息
      el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="time" size="mini")
      el-radio-group(v-model="radio1")
        el-radio(:label="3") 全部
        el-radio(:label="6") 临时
        el-radio(:label="9") 长期
      el-radio-group(v-model="radio2")
        el-radio(:label="3") 全部
        el-radio(:label="6") 新开
        el-radio(:label="7") 校对
        el-radio(:label="8") 已执行
        el-radio(:label="9") 已停止
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
      vxe-table-column(width="120" field="itemName" title="长期/临时")
      vxe-table-column(width="120" field="result" title="开始时间")
      vxe-table-column(width="120" field="unit" title="结束时间")
      vxe-table-column(width="120" field="value" title="医嘱内容")
      vxe-table-column(width="120" field="value" title="剂量")
      vxe-table-column(width="120" field="value" title="剂量单位")
      vxe-table-column(width="120" field="value" title="途径")
      vxe-table-column(width="120" field="value" title="频率")
      vxe-table-column(width="120" field="value" title="执行时间")
      vxe-table-column(width="120" field="value" title="停止时间")
</template>
<script>
export default {
  name: 'MedicalOrderInformation',
  data () {
    return {
      tableData: [],
      radio1: '',
      radio2: '',
      time: ''
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  .medical-order-information
    height 500px
    font-size 14px
    .title
      line-height 38px
      span
        color #9BA3D5
      .el-radio-group
        background #1E222E
        padding 5px
        border-radius 5px
        margin-left 20px
      .el-date-picker
        margin-left 20px
    .table
      height calc(100% - 38px)
</style>
