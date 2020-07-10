<template lang="pug">
  .device-gather
    .title 文书质控
    el-form(:model="form" :inline="true" size="mini")
      el-form-item()
        el-radio(v-model="form.radio" label="1") 全部
        el-radio(v-model="form.radio" label="2") 本人的
      el-form-item(label="其他人")
        el-input(v-model="form.ptId")
      el-form-item(label="日期" )
        el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date")
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
        vxe-table-column(field="opeDate" title="手术日期" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.ptId" size="mini")
        vxe-table-column(field="opeRoom" title="手术间" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.opeName" size="mini")
        vxe-table-column(field="opeName" title="手术名称" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.bedNo" size="mini")
        vxe-table-column(field="ptName" title="患者" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.sex" size="mini")
        vxe-table-column(field="state" title="状态" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.opeName" size="mini")
        vxe-table-column(field="anaesDoc" title="麻醉医生" :edit-render="{}")
          //- template(v-slot:edit="{ row }")
          //-   el-input(v-model="row.opeDoc" size="mini")
        //- vxe-table-column(type="checkbox" width="120" title="是否撤销" )
    .option
      el-button(type="primary" size="mini" @click="handleSubmit") 状态修改
</template>
<script>
export default {
  data () {
    return {
      form: {
        radio: '',
        ptId: '',
        date: ''
      },
      stateData: [{ opeRoom: '12', name: '123', opeName: '12', opeDate: '2020/7/9', anaesDoc: '12', state: '1' }]
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
