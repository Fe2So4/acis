
<template lang="pug">
  .operation-room
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
          auto-resize
          class="scroll"
          :data="tableData"
          :checkbox-config="{checkStrictly: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        )
          vxe-table-column(field="sex" title="手术间号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="科室代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="name" title="位置" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="状态" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="床号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="床位标号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="监护仪代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="手术间类型" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
    .option
        el-button(size="mini") 新增(N)
        el-button(size="mini") 删除(D)
        el-button(size="mini") 保存(S)
        el-button(size="mini") 取消(C)
        el-button(size="mini") 刷新(R)
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      data: [{
        id: 1,
        label: '一级 1',
        children: []
      }, {
        id: 2,
        label: '一级 2',
        children: []
      },
      {
        id: 3,
        label: '一级 3',
        children: []
      }, {
        id: 4,
        label: '一级 4',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.operation-room
  height 100%
  .content
    width 100%
    height calc(100% - 28px)
  .option
    text-align right
</style>
