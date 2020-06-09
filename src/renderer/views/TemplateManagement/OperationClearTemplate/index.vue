<template>
  <div class="clear-template">
    <div class="content">
      <div class="left">
        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        />
      </div>
      <div class="right">
        <el-table
          size="mini"
          border
          :data="tableData"
          class="table"
          :cell-style="cellStyle"
          highlight-current-row
          @current-change="handleCurrentChange"
          @cell-click="onCellDblClick"
        >
          <el-table-column
            label="品名"
            prop="event"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.event"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.event }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="基数"
            prop="concentration"
            width="200px"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.concentration"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.concentration }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="option">
      <el-button size="mini">
        保存（S）
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClearTemplate',
  data () {
    return {
      filterText: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [{ type: '麻药', event: 'UI', from: 'UI', unit: 'UI', speed: 'UI', dose: 'UI', startTime: '', endTime: '', continue: 'UI' }],
      cellStyle: {
        position: 'relative',
        height: '36px',
        textAlign: 'center'
      },
      fromList: [{ event: 'UI', label: 'PCA' }, { event: 'UX', label: 'aaa' }],
      activeRow: null,
      activeColumnId: null,
      time: '',
      currentRow: null
    }
  },
  methods: {
    // 选中当前行
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleAddAnesthetic () {
      this.tableData.push({ type: '麻药', event: '咪达挫抡', from: 'UI', unit: 'UI', speed: 'UI', dose: 'UI', startTime: '', endTime: '', continue: 'UI' })
    },
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
  .clear-template{
    height: 100%;
    .content{
      height: calc(100% - 48px);
      display: flex;
      .left{

      }
      .right{
        flex: 1;
        width: 100%;
         .table {
                width: 100%;
                text-align: center;
                min-height: 400px;
                flex: 1;
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
    .option{
      text-align: right;
      padding:10px 10px 10px 0;
    }
  }
  .clear-template /deep/ .el-table th>.cell{
    text-align: center;
  }
</style>
