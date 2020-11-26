<template>
  <div class="allacated">
    <vxe-table
      height="100%"
      width="100%"
      border
      round
      ref="xTable2"
      auto-resize
      size="mini"
      align="center"
      highlight-current-row
      :data="data"
      class="mytable-style scroll"
      :checkbox-config="{trigger: 'row', highlight: true, range: true, checkMethod:handleCheckFilter}"
      :row-style="rowStyle"
      @checkbox-change="selectChangeEvent"
      @cell-dblclick="handleDetailVisible"
      @cell-click="handleSimpleApply"
    >
      <vxe-table-column
        type="checkbox"
        width="50"
      />
      <vxe-table-column
        field="sequence"
        title="台次"
        width="50"
      />
      <vxe-table-column
        field="ptName"
        title="患者"
        width="70"
      />
      <vxe-table-column
        field="bedId"
        title="床位"
        width="70"
      />
      <vxe-table-column
        field="visitId"
        title="住院号"
        width="80"
      />
      <!-- <vxe-table-column field="diagBeforeOperation" title="诊断" width="120"></vxe-table-column> -->
      <vxe-table-column
        field="surgeonName"
        title="主刀"
        width="70"
      />
      <vxe-table-column
        field="opeScheduleTime"
        title="手术时间"
        width="120"
      />
      <vxe-table-column
        field="operationName"
        title="手术名称"
        width="230"
        show-overflow="title"
      />
      <vxe-table-column
        field="anesMethod"
        title="麻醉方法"
        width="120"
      />
      <vxe-table-column
        field="anesDocName"
        title="主麻医师"
        width="70"
        show-overflow="title"
      />
      <vxe-table-column
        field="subDoc"
        title="副麻医师"
        width="140"
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
        width="80"
        fixed="right"
      >
        <template v-slot="{ row }">
          <template>
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
    <allocated-detail
      v-if="detailVisible"
      :detail-visible="detailVisible"
      :detail="detailApply"
      @close="handleClose"
    />
    <detail-batch
      v-if="batchVisible"
      :check-list="checkList"
      :batch-visible="batchVisible"
      @close="handleCloseBatch"
    />
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { cancelOpeApply } from '@/api/schedule'
import { mapGetters } from 'vuex'
import AllocatedDetail from './allocated-detail'
import DetailBatch from './allocated-detail-batch'
export default {
  data () {
    return {
      detailVisible: false,
      detailApply: null,
      batchVisible: false,
      checkList: []
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    AllocatedDetail, DetailBatch
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
    handleCheckFilter ({ row }) {
      return row.state === '1'
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
    handleDetailVisible ({ row }) {
      if (row.state === '2') {
        this.$message({ type: 'warning', message: '当前手术申请已提交' })
      } else {
        this.detailVisible = true
        this.detailApply = JSON.parse(JSON.stringify(row))
      }
    },
    handleBatchVisible () {
      if (this.checkList.length > 0) {
        this.batchVisible = true
      } else {
        this.$message({ type: 'warning', message: '请勾选要修改的手术' })
      }
    },
    handleSimpleApply ({ row }) {
      // console.log(row)
      this.$emit('handleSimpleApply', row)
    },
    handleClose () {
      this.detailVisible = false
    },
    handleCloseBatch () {
      this.batchVisible = false
    },
    selectChangeEvent ({ records }) {
      this.checkList = records
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
    /deep/ .el-button.el-button--text{
      padding-top: unset !important;
      padding-bottom: unset !important;
    }
  }
</style>
