
<template lang="pug">
  .gather-device
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
        vxe-table-column(field="sex" title="监护仪标识" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.sex" size="mini")
        vxe-table-column(field="sex" title="厂家" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.sex" size="mini")
        vxe-table-column(field="name" title="型号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="接口类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="IP地址" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="通讯串口" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="采集程序" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="仪器分类" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="必采项" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="科室代码" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="科室类型" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="床号（手术间）" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="端口号" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="默认采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="当前采集频率" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="状态" :edit-render="{}" width='200')
          template(v-slot:edit="{ row }")
            el-input(v-model="row.name" size="mini")
        vxe-table-column(field="name" title="备注" :edit-render="{}" width='200')
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
.gather-device
  height 100%
  .content
    width 100%
    height calc(100% - 28px)
  .option
    text-align right
</style>
