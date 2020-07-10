
<template lang="pug">
  .anaes-methods
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
          vxe-table-column(field="no" title="序号")
          vxe-table-column(field="sex" title="编码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="name" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="输入码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="name" title="分类" :edit-render="{}")
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
      tableData: []
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.anaes-methods
  height 100%
  .content
    height calc(100% - 28px)
  .option
    text-align right
</style>
