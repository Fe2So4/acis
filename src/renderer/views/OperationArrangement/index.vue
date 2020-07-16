<template lang="pug">
  .operation-arrangement
    .title {{titleDate}}手术排台
    el-form(:inline="true" size="mini" :model="form")
      el-form-item
        el-radio-group(v-model="form.radio")
          el-radio(:label="1") 全部
          el-radio(:label="2") 本人的
      el-form-item(label="其他人")
        el-select(v-model="form.select")
          el-option(v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled")
      el-form-item(label="时间")
        el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date")
    .content
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
        :data="tableData"
        :checkbox-config="{checkStrictly: true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      )
        vxe-table-column(field="ptId" title="排序")
        vxe-table-column(field="name" title="术间")
        vxe-table-column(field="bedNo" title="台次")
        vxe-table-column(field="sex" title="麻醉医生")
        vxe-table-column(field="sex" title="麻醉医生2")
        vxe-table-column(field="sex" title="科室")
        vxe-table-column(field="sex" title="床号")
        vxe-table-column(field="sex" title="患者姓名")
        vxe-table-column(field="sex" title="性别")
        vxe-table-column(field="sex" title="年龄")
        vxe-table-column(field="sex" title="患者ID")
        vxe-table-column(field="sex" title="住院号")
        vxe-table-column(field="sex" title="诊断")
        vxe-table-column(field="sex" title="手术名称")
        vxe-table-column(field="sex" title="备注")
        vxe-table-column(field="sex" title="麻醉方式")
        vxe-table-column(field="sex" title="洗手护士")
        vxe-table-column(field="sex" title="巡回护士")
        vxe-table-column(field="sex" title="手术医师")
        vxe-table-column(field="sex" title="手术助手")
</template>
<script>
import moment from 'moment'
export default {
  name: 'OperationArrangement',
  data () {
    return {
      tableData: [],
      form: {
        radio: '1',
        select: '',
        date: new Date()
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  computed: {
    titleDate () {
      return moment(this.form.date).format('yyyy-MM-DD')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .operation-arrangement
    width 80vw
    height 70vh
    .title
      color #9BA3D5
      text-align center
      font-size 18px
      line-height 28px
      font-weight bold
    .content
      height calc(100% - 74px)
</style>
