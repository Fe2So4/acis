<template>
  <div class="allacated">
    <vxe-table
      height="100%"
      width="100%"
      border
      ref="xTable2"
      auto-resize
      size="mini"
      align="center"
      highlight-current-row
      :data="data"
      class="mytable-style scroll"
      :row-style="rowStyle"
      @cell-dblclick="handleDetailVisible"
      @cell-click="handleSimpleApply"
    >
      <vxe-table-column
        field="sequence"
        title="台"
        width="82"
      />
      <vxe-table-column
        field="ptName"
        title="病人"
        width="82"
      />
      <vxe-table-column
        field="bedId"
        title="床号"
        width="82"
      />
      <vxe-table-column
        field="visitId"
        title="住院号"
        width="120"
      />
      <!-- <vxe-table-column field="diagBeforeOperation" title="诊断" width="120"></vxe-table-column> -->
      <vxe-table-column
        field="surgeonName"
        title="手术医师"
        width="82"
      />
      <vxe-table-column
        field="opeScheduleTime"
        title="手术时间"
        width="82"
      />
      <vxe-table-column
        field="operationName"
        title="手术名称"
        width="120"
        show-overflow="title"
      />
      <vxe-table-column
        field="anaesthesiaName"
        title="麻醉方法"
        width="120"
      />
      <vxe-table-column
        field="anesDocName"
        title="主麻医师"
        width="82"
        show-overflow="title"
      />
      <vxe-table-column
        field="subDoc"
        title="副麻医师"
        width="82"
        show-overflow="title"
      />
      <vxe-table-column
        field="washNurse"
        title="洗手护士"
        width="120"
        show-overflow="title"
      />
      <vxe-table-column
        field="hangNurse"
        title="巡回护士"
        width="120"
        show-overflow="title"
      />
      <vxe-table-column
        field="memo"
        title="备注"
        width="82"
      />
      <vxe-table-column
        title="操作"
        width="120"
        fixed="right"
      >
        <template v-slot="{ row }">
          <template>
            <!-- <el-button
              type="text"
              @click="distribute(row)"
            >
              分配医生
            </el-button> -->
            <el-button
              type="text"
              @click="cancelSingle(row)"
            >
              删除
            </el-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { cancelOpeApply } from '@/api/schedule'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom', 'time'])
  },
  watch: {
    // handler (val) {
    //   this.getData()
    // }
  },
  methods: {
    // getData () {
    //   request({
    //     url: getAllocatedList + `/${this.currentRoom.roomNo}/${this.time}`
    //   }).then(res => {
    //     const data = res.data.data
    //     data.forEach(item => {
    //       item.subDoc = (
    //         item.firstAnesDocName +
    //       ',' +
    //       item.secAnesDocName +
    //       ',' +
    //       item.thirdAnesDocName
    //       )
    //         .replace(/^,+/, '')
    //         .replace(/,+$/, '')
    //       item.washNurse = (item.firstOpeNurseName + ',' + item.secOpeNurseName + ',' + item.thirdOpeNurseName)
    //         .replace(/^,+/, '')
    //         .replace(/,+$/, '')
    //       item.hangNurse = (item.firstSupplyNurseName + ',' + item.secSupplyNurseName + ',' + item.thirdSupplyNurseName)
    //         .replace(/^,+/, '')
    //         .replace(/,+$/, '')
    //     })
    //     this.data = data
    //   })
    // },
    cancelSingle (row) {
      if (row.state === '2') {
        this.$message({ type: 'warning', message: '当前手术申请已提交' })
      } else {
        request({
          method: 'PUT',
          url: cancelOpeApply + `/${row.operationId}`
        }).then(res => {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.$eventHub.$emit('get-allocated')
        })
      }
      // this.$emit('cancelSingle', row)
    },
    distribute (row) {
      this.$emit('distribute', row)
    },
    rowStyle ({
      row,
      rowIndex
    }) {
      if (row.state === '1') {
        return {
          color: 'red'
        }
      } else {
        return {
          color: 'green'
        }
      }
    },
    handleDetailVisible () {
      this.$emit('handleDetailVisible')
    },
    handleSimpleApply () {
      this.$emit('handleSimpleApply')
    }
  },
  mounted () {
    // this.getData()
    // this.$eventHub.$on('get-allocated', () => {
    //   // 获取数据
    //   this.getData()
    // })
  }
}
</script>

<style lang="scss" scoped>
  .allacated{
    height: 100%;
    width: 100%;
  }
</style>
