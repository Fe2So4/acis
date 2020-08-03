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
        <el-scrollbar
          style="height:100%;width:100%;"
          class="scrollbar"
        >
          <ul>
            <li
              class="clearfix"
              v-for="item in fromList"
              :key="item.id"
            >
              <!-- <el-button
                size="mini"
                @dblclick.native="handleAddAnesthetic"
              /> -->
              <div class="event-button">
                <span class="button">{{ item.detailName }}</span>
              </div>
              <div class="dose-button">
                <span>{{ item.usualDose1 }}</span>
                <span>{{ item.usualDose2 }}</span>
                <span>{{ item.usualDose3 }}</span>
                <span>{{ item.usualDose4 }}</span>
              </div>
            </li>
          </ul>
        </el-scrollbar>
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
        <!-- <anaes-table :table-data="tableData" /> -->
        <!-- <other-event /> -->
        <vxe-table
          show-overflow
          size="mini"
          ref="xTable"
          width="100%"
          align="center"
          height="100%"
          auto-resize
          keep-source
          class="anaesTable scroll"
          :loading="loading"
          :data="tableData"
          highlight-hover-row
          :checkbox-config="{checkStrictly: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        >
          <vxe-table-column
            type="checkbox"
            width="60"
            title="选择"
          />
          <vxe-table-column
            field="type"
            title="类型"
            width="60"
          />
          <vxe-table-column
            field="eventName"
            title="事件名称"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.eventName"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="method"
            title="途径"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.method"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="concentration"
            title="浓度"
            :edit-render="{}"
            width="80"
          >
            <template v-slot:edit="{row}">
              <el-input
                v-model="row.concentration"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="concentrationUnit"
            title="单位"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.concentrationUnit"
                size="mini"
                @change="$refs.xTable.updateStatus(scope)"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.concentrationUnit, unitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="speed"
            title="速度"
            :edit-render="{}"
            width="80"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.speed"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="speedUnit"
            title="单位"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.speedUnit"
                size="mini"
                @change="$refs.xTable.updateStatus(scope)"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.speedUnit, unitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="dose"
            title="剂量"
            :edit-render="{}"
            width="80"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.dose"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="doseUnit"
            title="单位"
            :edit-render="{}"
            width="120"
          >
            <template v-slot:edit="scope">
              <el-select
                v-model="scope.row.doseUnit"
                size="mini"
                @change="$refs.xTable.updateStatus(scope)"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.doseUnit, unitList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="startTime"
            title="发生时间"
            :edit-render="{}"
            width="150"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                v-model="row.startTime"
                type="datetime"
                size="mini"
                format="MM-dd HH:mm"
                value-format="MM-dd HH:mm"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.startTime, 'MM-DD HH:mm') }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="continue"
            title="是否持续"
            width="80"
          >
            <template v-slot="{ row }">
              <el-switch v-model="row.continue" />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="continueTime"
            title="持续时间"
            :edit-render="{}"
            width="100"
          >
            <template v-slot:edit="{ row }">
              <el-input
                v-model="row.continueTime"
                size="mini"
              />
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="endTime"
            title="结束时间"
            :edit-render="{}"
            width="150"
          >
            <template v-slot:edit="{ row }">
              <el-date-picker
                v-model="row.endTime"
                size="mini"
                type="datetime"
                format="MM-dd HH:mm"
                value-format="MM-dd HH:mm"
              />
            </template>
            <template v-slot="{ row }">
              {{ formatDate(row.endTime, 'MM-DD HH:mm') }}
            </template>
          </vxe-table-column>
        </vxe-table>
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
// import AnaesTable from '@/components/AnaesTable/index'
import request from '@/utils/requestForMock'
import { getEventList, optionEvent } from '@/api/anaesDrug'
import XEUtils from 'xe-utils'
import moment from 'moment'
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
      fromList: [],
      activeRow: null,
      activeColumnId: null,
      time: '',
      currentRow: null,
      currentPage: 0,
      pageSize: 10,
      total: 0,
      loading: false,
      unitList: [{ label: 'mg/h', value: '1' }, { label: 'mg/m', value: '2' }]
    }
  },
  components: {
    // AnaesTable
    // OtherEvent
  },
  methods: {
    formatDate (value, format) {
      return moment(value).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
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
    getEventList () {
      request({
        url: getEventList,
        params: {
          eventCode: 'E002',
          pageIndex: 1,
          pageSize: 10
        }
      }).then(res => {
        // console.log(res.data.data)
        this.fromList = res.data.data.list
      })
    },
    onCellBlur () {
      this.activeRow = null
      this.activeColumnId = null
    },
    handleOptionEvent () {
      request({
        url: optionEvent
      }).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getEventList()
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
          width: 374px;
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
              height: 100%;
              ul{
                  height: 100%;
                  padding:5px;
                  flex: 1;
                  li{
                      margin-bottom: 5px;
                      .el-button{
                          width: 100%;
                      }
                      .event-button{
                        .button{
                          display: inline-block;
                          width:150px;
                          border-radius:4px;
                          line-height: 30px;
                          text-indent: 10px;
                          background:rgba(37,44,64,1);
                          border:1px solid rgba(53,62,86,1);
                          color:#9BA3D5;
                          cursor: pointer;
                          &:hover{
                            background: #0094FF;
                            color:#fff;
                          }
                        }
                      }
                      .dose-button{
                        span{
                          width:36px;
                          height:30px;
                          background:rgba(37,44,64,1);
                          border:1px solid rgba(53,62,86,1);
                          border-radius:4px;
                          display: inline-block;
                          line-height: 30px;
                          color: #9BA3D5;
                          cursor: pointer;
                          text-align: center;
                          &:hover{
                            background: #0094FF;
                            color:#fff;
                          }
                        }
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
        width:calc(100% - 394px);
        float: right;
        padding: 0 5px;
        display: flex;
        background: #1E222E;
        border-radius:10px;
        flex-direction: column;
        .content{
            height:calc(100% - 90px);
            // flex: 1;
            // display: flex;
            width: 100%;
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
<style>
.event .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
