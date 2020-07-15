<template lang="pug">
  .state-maintain
    .content(class="clearfix")
      .left
        .title 用户信息列表
        el-form(:model="form" :inline="true" size="mini")
          el-form-item(label="科室" )
            el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date")
          el-form-item(label="姓名")
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
            vxe-table-column(field="ptId" title="选择" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.ptId" size="mini")
            vxe-table-column(field="name" title="科室" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.name" size="mini")
            vxe-table-column(field="bedNo" title="用户工号" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.bedNo" size="mini")
            vxe-table-column(field="sex" title="用户名称" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.sex" size="mini")

      el-divider(direction="vertical")
      .right
        .title 手术信息一览
        el-form(:model="form" :inline="true" size="mini")
          el-form-item(label="编号" )
            el-select(v-model="form.ptId" placeholder="请选择编号")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
          el-form-item(label="名称")
            el-select(v-model="form.ptId" placeholder="请选择名称")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
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
            vxe-table-column(field="ptId" title="选择" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.ptId" size="mini")
            vxe-table-column(field="name" title="编号" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.name" size="mini")
            vxe-table-column(field="bedNo" title="手术名称" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.bedNo" size="mini")
            vxe-table-column(field="sex" title="手术级别" :edit-render="{}")
              template(v-slot:edit="{ row }")
                el-input(v-model="row.sex" size="mini")
    .option
      el-button(type="primary" size="mini" @click="handleSubmit") 保存
      el-button(type="primary" size="mini" @click="handleSubmit") 关闭
</template>
<script>
export default {
  name: 'StateMaintain',
  data () {
    return {
      form: {
        ptId: '',
        date: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
  .state-maintain
    height 70vh
    // width 80vw
    .title
      color #9BA3D5
      line-height 28px
    .content
      height calc(100% - 38px)
      .el-divider--vertical
        width 0
      .stateTable
        margin-top 10px
        height calc(100% - 68px)
      .left
        float left
        height 100%
      .right
        float right
        height 100%
    .el-form
      .el-form-item
        margin-bottom 0
    .option
      margin-top 10px
      text-align right
</style>
