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
            <el-button size="mini">
              镇&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;静
            </el-button>
          </li>
          <li
            v-for="(item,index) in 10"
            :key="index"
          >
            <el-button size="mini">
              咪达挫抡
            </el-button>
          </li>
        </ul>
        <ul>

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
        >
          <el-table-column
            label="类型"
            prop="type"
          />
          <el-table-column
            label="事件名称"
            prop="event"
          />
          <el-table-column
            label="途径"
            prop="from"
          />
          <el-table-column
            label="浓度"
            prop="concentration"
          />
          <el-table-column
            label="单位"
            prop="unit"
          />
          <el-table-column
            label="速度"
            prop="speed"
          />
          <el-table-column
            label="单位"
            prop="unit"
          />
          <el-table-column
            label="剂量"
            prop="dose"
          />
          <el-table-column
            label="单位"
            prop="unit"
          />
          <el-table-column
            label="发生时间"
            prop="startTime"
          />
          <el-table-column
            label="持续"
            prop="continue"
          />
          <el-table-column
            label="结束时间"
            prop="endTime"
          />
        </el-table>
      </div>
      <div class="option">
          <el-row>
            <span>类型筛选  </span>
            <el-select v-model="select" size="mini" style="margin-right:10px;
            ">
            <el-option value="1" label="麻药">麻药</el-option>
            <el-option value="2" label="输液">输液</el-option>
            </el-select>
            <el-button size="mini" >保存（S）</el-button>
            <el-button size="mini" disabled>删除（D）</el-button>
            <el-button size="mini">刷新（R）</el-button>
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
      tableData: [{ type: '麻药', event: 'UI', from: 'UI', unit: 'UI', speed: 'UI', dose: 'UI', startTime: '2012-12-34', endTime: '2020-12-12', continue: 'UI' }],
      cellStyle: {
        position: 'relative',
        height: '36px',
        textAlign: 'center'
      }
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
    .event{
        display: flex;
        height: 100%;
        font-size: 14px;
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
                        // padding:5px;
                        margin-bottom: 5px;
                        // border:1px solid #f8f9fa;
                        .el-button{
                            width: 100%;
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
            // .cellInput {
            //     position: absolute;
            //     left: 0;
            //     top: 0;
            //     width: 100%;
            //     height: 100%;
            //     font-size: 12px;
            //     line-height: 100%;
            //     text-indent: 10px;
            //     border: none;
            //     outline: none;
            // }
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
