
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
          vxe-table-column(field="roomNo" title="手术间号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.roomNo" size="mini")
          vxe-table-column(field="deptCode" title="科室代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.deptCode" size="mini")
          vxe-table-column(field="locations" title="位置" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.locations" size="mini")
          vxe-table-column(field="state" title="状态" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.state" size="mini")
          vxe-table-column(field="bedNo" title="床号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.bedNo" size="mini")
          vxe-table-column(field="bedId" title="床位标号" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.bedId" size="mini")
          vxe-table-column(field="monitorId" title="监护仪代码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.monitorId" size="mini")
          vxe-table-column(field="roomType" title="手术间类型" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.roomType" size="mini")
    .option
        el-button(size="mini") 新增(N)
        el-button(size="mini") 删除(D)
        el-button(size="mini") 保存(S)
        el-button(size="mini") 取消(C)
        el-button(size="mini") 刷新(R)
</template>
<script>
// opeRoomDetail
import { opeRoomDetail } from '@/api/dictionary'
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
        url: opeRoomDetail
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.operation-room
  height 100%
  .content
    width 100%
    height calc(100% - 38px)
  .option
    text-align right
    margin-top 10px
</style>
