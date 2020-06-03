<template>
  <div class="event">
    <div class="left">
      <div class="top">
        <div class="title">
          检索
        </div>
        <el-input
          v-model="searchName"
          placeholder=""
          size="mini"
        />
      </div>
      <div class="content">
        <ul>
          <li>
            <el-button
              size="mini"
              @dblclick.native="handleAddAnesthetic"
            >
              镇&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;静
            </el-button>
          </li>
          <li
            v-for="(item,index) in 10"
            :key="index"
          >
            <el-button
              size="mini"
              @dblclick.native="handleAddAnesthetic"
            >
              咪达挫抡
            </el-button>
          </li>
        </ul>
        <ul>
          <li>
            <el-button
              size="mini"
              @click="handleAddAnesthetic"
            >
              10
            </el-button>
            <el-button size="mini">
              9
            </el-button>
            <el-button size="mini">
              8
            </el-button>
            <el-button size="mini">
              7
            </el-button>
          </li>
          <li>
            <el-button size="mini">
              6
            </el-button>
            <el-button size="mini">
              5
            </el-button>
            <el-button size="mini">
              4
            </el-button>
            <el-button size="mini">
              3
            </el-button>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="10"
        />
      </div>
    </div>
    <div class="right">
      <div class="title">
        麻醉事件
      </div>
      <div class="content">
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
            label="类型"
            prop="type"
          />
          <el-table-column
            label="事件名称"
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
            label="途径"
            prop="from"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.from"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                placeholder=""
                filterable
                allow-create
                size="mini"
                @blur="onCellBlur"
              >
                <el-option
                  v-for="item in fromList"
                  :key="item.event"
                  :label="item.label"
                  :value="item.event"
                />
              </el-select>
              <span v-else>{{ scope.row.from }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="浓度"
            prop="concentration"
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
          <el-table-column
            label="单位"
            prop="unit"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.unit"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                placeholder=""
                filterable
                allow-create
                size="mini"
                @blur="onCellBlur"
              >
                <el-option
                  v-for="item in fromList"
                  :key="item.event"
                  :label="item.label"
                  :value="item.event"
                />
              </el-select>
              <span v-else>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="速度"
            prop="speed"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.speed"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.speed }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            prop="unit"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.unit"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                placeholder=""
                filterable
                allow-create
                size="mini"
                @blur="onCellBlur"
              >
                <el-option
                  v-for="item in fromList"
                  :key="item.event"
                  :label="item.label"
                  :value="item.event"
                />
              </el-select>
              <span v-else>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="剂量"
            prop="dose"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.dose"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.dose }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单位"
            prop="unit"
          >
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.unit"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                placeholder=""
                filterable
                allow-create
                size="mini"
                @blur="onCellBlur"
              >
                <el-option
                  v-for="item in fromList"
                  :key="item.event"
                  :label="item.label"
                  :value="item.event"
                />
              </el-select>
              <span v-else>{{ scope.row.unit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发生时间"
            prop="startTime"
          >
            <template slot-scope="scope">
              <el-date-picker
                type="datetime"
                style="width:100%;position:absolute;left:0;top:4px;"
                size="mini"
                prefix-icon=""
                v-model="scope.row.startTime"
                placeholder=""
                :clearable="false"
                value-format="yyyy-MM-dd hh:mm"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                @change="onCellBlur"
              />
              <span v-else>{{ scope.row.startTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="持续"
            prop="continue"
          >
            <template slot-scope="scope">
              <input
                class="cellInput"
                type="text"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                v-model="scope.row.continue"
                @blur="onCellBlur"
              >
              <span v-else>{{ scope.row.continue }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="结束时间"
            prop="endTime"
          >
            <template slot-scope="scope">
              <el-date-picker
                type="datetime"
                style="width:100%;position:absolute;left:0;top:4px;"
                size="mini"
                prefix-icon=""
                v-model="scope.row.endTime"
                placeholder=""
                :clearable="false"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-if="scope.row === activeRow && scope.column.id === activeColumnId"
                @change="onCellBlur"
              />
              <span v-else>{{ scope.row.endTime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="option">
        <el-row>
          <span>类型筛选  </span>
          <el-select
            v-model="select"
            size="mini"
            style="margin-right:10px;
            "
          >
            <el-option
              value="1"
              label="麻药"
            >
              麻药
            </el-option>
            <el-option
              value="2"
              label="输液"
            >
              输液
            </el-option>
          </el-select>
          <el-button size="mini">
            保存（S）
          </el-button>
          <el-button
            size="mini"
            disabled
          >
            删除（D）
          </el-button>
          <el-button size="mini">
            刷新（R）
          </el-button>
        </el-row>
        <p>要删除某时间点，必须选中整行！</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Event',
  data () {
    return {
      select: '',
      searchName: '',
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
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style>
    .el-picker-panel .el-time-panel{
      /* background: red !important; */
      left: -30px !important;
    }
</style>

<style lang="scss" scoped>
    .event{
        display: flex;
        height: 100%;
        font-size: 14px;
        position: relative;
        .title{
            line-height: 30px;
            padding-left: 5px;
        }
        .left{
            width: 40%;
            border-right: 1px solid #f8f9fa;
            // border-right: 1px solid #e6e6e6;
            display: flex;
            flex-direction: column;
            .pagination{
                padding:10px 0;
                .el-pagination{
                    text-align: right;
                }
            }
            .top{
                display: flex;
                justify-content: space-between;
            }
            .content{
                flex: 1;
                border: 1px solid #f8f9fa;
                border-right: unset;
                display: flex;
                ul{
                    padding:5px;
                    flex: 1;
                    li{
                        margin-bottom: 5px;
                        .el-button{
                            width: 100%;
                        }
                    }
                    &:last-child{
                      width: 100%;
                      li{
                        justify-content: space-around;
                        display: flex;
                        .el-button{
                          margin:0 5px 0 0;
                        &:last-child{
                            margin:unset
                        }
                        }
                      }
                  }
                }
            }
            .el-input{
                max-width: 217px;
            }
        }
        .right{
            flex: 1;
            padding: 0 5px;
            display: flex;
            flex-direction: column;
            .content{
                flex: 1;
                display: flex;
            }
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
            .option{
                text-align: right;
                padding: 10px 0;
                p{
                    text-align: left;
                    margin:10px 0;
                    text-indent: 20px;
                    color: #409eff;
                }
            }
        }
    }
    .event /deep/ .el-table th>.cell{
        text-align: center;
    }
</style>
