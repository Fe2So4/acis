<template lang="pug">
  .device-gather
    .title 术后状态维护
    el-form(:model="form" :inline="true" size="mini")
      el-form-item(label="日期" )
        el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date")
      el-form-item(label="病人ID")
        el-input(v-model="form.ptId")
      el-form-item
        el-button(type="primary") 搜索
    .stateTable
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
        :data="stateData"
        :checkbox-config="{checkStrictly: true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      )
        vxe-table-column(field="ptId" title="病人ID" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.ptId" size="mini")
        vxe-table-column(field="name" title="姓名" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="bedNo" title="床号" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.bedNo" size="mini")
        vxe-table-column(field="sex" title="性别" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.sex" size="mini")
        vxe-table-column(field="opeName" title="手术名称" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.opeName" size="mini")
        vxe-table-column(field="opeDoc" title="手术医师" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.opeDoc" size="mini")
        vxe-table-column(field="opeMethod" title="麻醉方法" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.opeMethod" size="mini")
        vxe-table-column(field="anaesDoc" title="麻醉医生" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anaesDoc" size="mini")
        vxe-table-column(field="washDoc" title="洗手护士" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.washDoc" size="mini")
        vxe-table-column(field="hangDoc" title="巡回护士" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.hangDoc" size="mini")
        vxe-table-column(field="state" title="状态" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.state" size="mini")
        vxe-table-column(type="checkbox" width="120" title="是否撤销" )
    .option
      el-button(type="primary" size="mini" @click="handleSubmit") 状态修改
</template>
<script>
export default {
  data () {
    return {
      form: {
        ptId: '',
        date: ''
      },
      stateData: [{ ptId: '123456', name: '123', sex: '男', bedNo: '12', opeName: '12', opeDoc: '12', opeMethod: '12', anaesDoc: '12', washDoc: '12', hangDoc: '12', state: '1' }]
    }
  },
  methods: {
    handleSubmit () {
      console.log(123)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .device-gather
    height 70vh
    width 60vw
    .title
      color #9BA3D5
      line-height 28px
    .el-form
      .el-form-item
        margin-bottom 0
    .stateTable
      margin-top 10px
      height calc(100% - 105px)
    .option
      margin-top 10px
      text-align right
</style>
