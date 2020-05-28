<template>
  <div class="liquidProperties">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>液体属性选项</el-breadcrumb-item>
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
          prop="propertyName"
          label="属性名称"
        >
          <template slot-scope="scope">
            <input
              class="cellInput"
              type="text"
              v-if="scope.row === activeRow && scope.column.id === activeColumnId"
              v-model="scope.row.propertyName"
              @blur="onCellBlur"
            >
            <span v-else>{{ scope.row.propertyName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LiquidProperties',
  data () {
    return {
      tableData: [
        {
          propertyName: '晶体'
        },
        {
          propertyName: '胶体'
        }
      ],
      activeRow: null,
      activeColumnId: null,
      cellStyle: {
        position: 'relative',
        height: '36px'
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
.liquidProperties {
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
