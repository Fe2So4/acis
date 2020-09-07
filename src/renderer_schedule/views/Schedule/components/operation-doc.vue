<template>
  <div class="operation-doc">
    <el-dialog
      title="手术医生"
      :visible.sync="doctorVisible"
      width="60%"
    >
      <vxe-table
        width="100%"
        height="500"
        border
        ref="xTable2"
        size="mini"
        align="center"
        highlight-current-row
        :data="doctorList"
        @cell-dblclick="distributeOperationDoc"
      >
        <vxe-table-column
          field="userId"
          title="序号"
        />
        <vxe-table-column
          field="userName"
          title="姓名"
        />
        <vxe-table-column
          field="inputCode"
          title="输入码"
        />
      </vxe-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    doctorList: {
      type: Array,
      default: function () {
        return []
      }
    },
    doctorVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
    distributeOperationDoc () {

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
