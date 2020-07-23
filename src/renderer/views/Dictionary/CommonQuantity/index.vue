
<template lang="pug">
  .common-quantity
    .content(class="clearfix")
      .left
        el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="eventCode"
            default-expand-all
            :props="defaultProps"
            @node-click="handleChange"
           )
      .right
        vxe-table(
          border
          auto-resize
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
          vxe-table-column(field="detailCode" title="序号")
          vxe-table-column(field="eventName" title="事件分类")
          vxe-table-column(field="detailName" title="事件名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini")
          vxe-table-column(field="drugSpec" title="药品规格" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.drugSpec" size="mini")
          vxe-table-column(field="doseUnit" title="单位" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.doseUnit" size="mini")
          vxe-table-column(field="usualDose1" title="常用量1" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose1" size="mini")
          vxe-table-column(field="usualDose2" title="常用量2" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose2" size="mini")
          vxe-table-column(field="usualDose3" title="常用量3" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose3" size="mini")
          vxe-table-column(field="usualDose4" title="常用量4" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.usualDose4" size="mini")
    .option
      el-button(size="mini") 新增(N)
      el-button(size="mini") 删除(D)
      el-button(size="mini") 保存(S)
      el-button(size="mini") 取消(C)
      el-button(size="mini") 刷新(R)
</template>
<script>
import { anaesEventList, commonUseDetail } from '@/api/dictionary'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      tableData: [],
      data: [],
      defaultProps: {
        children: 'eventDetailVoList',
        label: 'eventName'
      },
      currentMenu: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      request({
        method: 'GET',
        url: anaesEventList
      }).then(res => {
        const data = res.data.data
        this.data = data
      })
    },
    handleChange (val) {
      this.currentMenu = val
      this.getDetail()
    },
    getDetail () {
      request({
        method: 'GET',
        url: commonUseDetail + '/' + this.currentMenu.eventCode
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .common-quantity
    height 100%
    .content
      height calc(100% - 38px)
      .left
        float left
        width 20%
        height 100%
      .right
        height 100%
        float right
        width 80%
    .option
      text-align right
      margin-top 10px
</style>
