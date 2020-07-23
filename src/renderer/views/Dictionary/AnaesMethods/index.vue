
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
        vxe-table-column(field="sort" title="序号")
        vxe-table-column(field="anesCode" title="编码" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesCode" size="mini")
        vxe-table-column(field="anesName" title="名称" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesName" size="mini")
        vxe-table-column(field="inputCode" title="输入码" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.inputCode" size="mini")
        vxe-table-column(field="anesName" title="分类" :edit-render="{}")
          template(v-slot:edit="{ row }")
            el-input(v-model="row.anesName" size="mini")
    .option
      el-button(size="mini") 新增(N)
      el-button(size="mini") 删除(D)
      el-button(size="mini") 保存(S)
      el-button(size="mini") 取消(C)
      el-button(size="mini") 刷新(R)
</template>
<script>
import { anaesMethodDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      request({
        method: 'GET',
        url: anaesMethodDetail
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    }
    // getCommonTermsDetail () {
    //   request({
    //     method: 'GET',
    //     url: commonTermsDetail + '/' + this.currentMenu.itemCode
    //   }).then(res => {
    //     const data = res.data.data
    //     this.tableData = data
    //   })
    // },
  }
}
</script>
<style lang="stylus" scoped>
.anaes-methods
  height 100%
  .content
    height calc(100% - 38px)
  .option
    text-align right
    margin-top 10px
</style>
