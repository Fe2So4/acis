<template lang="pug">
  .anaes-event
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
          vxe-table-column(field="detailCode" title="序号" width='60')
          vxe-table-column(field="detailCode" title="事件分类" width="120")
          vxe-table-column(field="detailName" title="事件名称" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.name" size="mini")
          vxe-table-column(field="sex" title="药品规格" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="收费分类" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="dose" title="剂量" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.dose" size="mini")
          vxe-table-column(field="doseUnit" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.doseUnit" size="mini")
          vxe-table-column(field="sex" title="浓度" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="速度" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="途径" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="持续" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="属性" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="药品属性" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
          vxe-table-column(field="sex" title="医嘱分类" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.sex" size="mini")
    .option
      el-button(size="mini") 新增(N)
      el-button(size="mini") 删除(D)
      el-button(size="mini") 保存(S)
      el-button(size="mini") 取消(C)
      el-button(size="mini") 刷新(R)
</template>
<script>
import { anaesEventList, anaesEventDetail } from '@/api/dictionary'
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
  created () {
    // for (let i = 5; i < 120; i++) {
    //   this.data.push({ id: i, label: '123', children: [] })
    // }
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
        url: anaesEventDetail + '/' + this.currentMenu.eventCode
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.anaes-event
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
    margin-top 10px
    text-align right
</style>
