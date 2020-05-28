<template>
  <div class="bloodGasAnalysis">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>血气分析选项</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <el-table
        size="mini"
        border
        :data="tableData"
        class="table"
        @cell-dblclick="onCellDblClick"
        :cell-style="cellStyle"
      >
        <el-table-column
          prop="show"
          label="是否显示"
          width="70"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.show" />
          </template>
        </el-table-column>
        <el-table-column
          prop="analysisItem"
          label="血气分析选项"
        />
        <el-table-column
          prop="customItemName"
          label="项目自定义名称"
        >
          <template slot-scope="scope">
            <input
              class="cellInput"
              type="text"
              v-if="scope.row === activeRow && scope.column.id === activeColumnId"
              v-model="scope.row.customItemName"
              @blur="onCellBlur"
            >
            <span v-else>{{ scope.row.customItemName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
        >
          <template slot-scope="scope">
            <input
              class="cellInput"
              type="text"
              v-if="scope.row === activeRow && scope.column.id === activeColumnId"
              v-model="scope.row.unit"
              @blur="onCellBlur"
            >
            <span v-else>{{ scope.row.unit }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BloodGasAnalysis',
  data () {
    return {
      tableData: [
        {
          show: true,
          analysisItem: 'BE(B)',
          customItemName: '自定义',
          unit: 'mMol/L'
        }
      ],
      activeRow: null,
      activeColumnId: null,
      cellStyle: {
        position: 'relative'
      }
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    onCellDblClick (row, column, cell, event) {
      this.activeRow = row
      this.activeColumnId = column.id
      setTimeout(() => {
        const input = event.target.querySelector('input')
        input && input.select()
      })
    },
    onCellBlur () {
      this.activeRow = null
      this.activeColumnId = null
    }
  }
}
</script>
<style lang="scss" scoped>
.bloodGasAnalysis {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }
  .mainContent {
    padding: 20px 10px 10px;

    .table {
      width: 100%;
      min-height: 400px;

      .cellInput {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        font-size: 12px;
        line-height: 100%;
        text-indent: 10px;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
