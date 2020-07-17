<template>
  <div class="event clearfix">
    <div class="left">
      <div class="top">
        <div class="title">
          拼音快速检索
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
              20
            </el-button>
            <el-button size="mini">
              20
            </el-button>
            <el-button size="mini">
              20
            </el-button>
          </li>
          <li>
            <el-button size="mini">
              10
            </el-button>
            <el-button size="mini">
              20
            </el-button>
            <el-button size="mini">
              40
            </el-button>
            <el-button size="mini">
              30
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
        <anaes-table :table-data="tableData" />
        <!-- <other-event /> -->
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
import AnaesTable from '@/components/AnaesTable/index'
// import OtherEvent from './components/otherEvent'
export default {
  name: 'Event',
  data () {
    return {
      select: '',
      searchName: '',
      tableData: [{
        type: '输液',
        eventName: '0.9%氯化钠',
        method: '吸入',
        concentration: '浓度',
        concentrationUnit: '1',
        speed: '20',
        speedUnit: '2',
        dose: '20',
        doseUnit: '2',
        startTime: '04-21 11:20',
        endTime: '05-22 11:20',
        continue: true,
        continueTime: '持续时间'
      }],
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
  components: {
    AnaesTable
    // OtherEvent
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
      width: 80vw;
      height: 60vh;
      font-size: 14px;
      position: relative;
      .title{
          line-height: 30px;
          padding-left: 5px;
          color:#9BA3D5;
      }
      .left{
          height: 100%;
          padding:20px;
          margin-right:20px;
          width: 354px;
          float: left;
          display: flex;
          background: #1E222E;
          border-radius:10px;
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
        height: 100%;
        width:calc(100% - 374px);
        float: right;
        padding: 0 5px;
        display: flex;
        background: #1E222E;
        border-radius:10px;
        flex-direction: column;
        .content{
            height:calc(100% - 90px);
            flex: 1;
            display: flex;
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
            span{
              color:#9BA3D5;
            }
        }
      }
    }
    .event /deep/ .el-table th>.cell{
        text-align: center;
    }
</style>
