<template>
  <div class="physicalAlarm">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>体征报警选项</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <div class="leftPart">
        <el-table
          size="mini"
          border
          :data="tableData"
          class="table"
          @cell-dblclick="onCellDblClick"
          :cell-style="cellStyle"
          highlight-current-row
          @current-change="onCurrentChange"
        >
          <el-table-column
            prop="code"
            label="体征代码"
          />
          <el-table-column
            prop="name"
            label="体征名称"
          />
          <el-table-column
            prop="lowerLimit"
            label="预警阀值下限（含）"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.lowerLimit"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.lowerLimit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="upperLimit"
            label="预警阀值上限（含）"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.upperLimit"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.upperLimit }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rightPart">
        <el-form
          ref="form"
          label-width="180px"
          size="mini"
          label-position="top"
        >
          <el-form-item label="新增">
            <el-select
              v-model="physicalItem"
              placeholder="请选择"
            >
              <el-option
                v-for="item in physicalItemOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <div style="text-align:center;margin-bottom:18px">
            <el-button
              type="primary"
              size="small"
            >
              确认新增
            </el-button>
          </div>
          <div style="text-align:center">
            <el-button
              type="danger"
              size="small"
            >
              删除选中
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhysicalAlarm',
  data () {
    return {
      tableData: [
        {
          code: 100,
          name: '体温',
          lowerLimit: '35.00',
          upperLimit: '38.00'
        }
      ],
      activeRow: null,
      activeColumnId: null,
      cellStyle: {
        position: 'relative'
      },
      physicalItemOptions: [
        {
          label: '体温',
          value: 1200
        }
      ],
      physicalItem: null,
      currentRow: null
    }
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
    },
    onCurrentChange (currentRow) {
      this.currentRow = currentRow
    }
  }
}
</script>
<style lang="scss" scoped>
.physicalAlarm {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }
  .mainContent {
    padding: 20px 10px 10px;
    display: flex;
    .leftPart {
      flex: 1 1 200px;

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
    .rightPart {
      padding-left: 20px;
      flex: 0 0 210px;
    }
  }
}
</style>
