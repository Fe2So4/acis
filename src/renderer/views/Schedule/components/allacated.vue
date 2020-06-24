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
      class="mytable-style"
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
            <el-button
              type="text"
              @click="distribute(row)"
            >
              分配医生
            </el-button>
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
export default {
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    cancelSingle (row) {
      this.$emit('cancelSingle', row)
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

  }
}
</script>

<style lang="scss" scoped>
  .allacated{
    height: 100%;
    width: 100%;
  }
</style>
