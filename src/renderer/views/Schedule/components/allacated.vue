<template>
  <div class="allacated">
    <vxe-table
      height="100%"
      width="100%"
      border
      ref="xTable2"
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
        field="patientName"
        title="病人"
        width="82"
      />
      <vxe-table-column
        field="inpatientWard"
        title="病区"
        width="120"
      />
      <vxe-table-column
        field="bedNo"
        title="床号"
        width="82"
      />
      <vxe-table-column
        field="patientId"
        title="住院号"
        width="120"
      />
      <!-- <vxe-table-column field="diagBeforeOperation" title="诊断" width="120"></vxe-table-column> -->
      <vxe-table-column
        field="surgeon"
        title="手术医师"
        width="82"
      />
      <vxe-table-column
        field="scheduledDateTime"
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
        field="doctor"
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
        field="name"
        title="备注"
        width="82"
      />
      <vxe-table-column
        title="操作"
        width="180"
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
import { getAllocatedList, cancelOpeApply } from '@/api/schedule'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom', 'time'])
  },
  watch: {
    handler (val) {
      this.getData()
    }
  },
  methods: {
    getData () {
      request({
        url: getAllocatedList + `/${this.currentRoom}/${this.time}`
      }).then(res => {
        const data = res.data.data
        this.data = data
      })
    },
    cancelSingle (row) {
      if (row.state === 2) {
        this.$message({ type: 'warning', message: '当前手术申请已提交' })
      } else {
        request({
          method: 'PUT',
          url: cancelOpeApply + `/${row.operationId}`
        }).then(res => {
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.getData()
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
          color: 'black'
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
    this.getData()
    this.$eventHub.$on('get-allocated', () => {
      // 获取数据
      this.getData()
    })
  }
}
</script>

<style lang="scss" scoped>
  .allacated{
    height: 100%;
    width: 100%;
  }
</style>
