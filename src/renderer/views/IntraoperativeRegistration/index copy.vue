<template>
  <div class="registration clearfix">
    <div class="left">
      <div class="anaesthesia content">
        <h3>麻醉事件</h3>
        <div class="table">
          <div class="anaes">
            <AnaesTable />
          </div>
          <div
            class="option"
            style="display:flex;justify-content:space-between;"
          >
            <span>
              <el-button
                size="mini"
                type="primary"
              >保存模板</el-button>
              <el-button size="mini">套用模板</el-button>
              <span>
                类型筛选
              </span>
              <el-select
                size="mini"
                v-model="type"
              >
                <el-option
                  value="1"
                  label="麻药"
                />
                <el-option
                  value="2"
                  label="用药"
                />
                <el-option
                  value="3"
                  label="呼吸"
                />
              </el-select>
            </span>
            <span>
              <el-button
                size="mini"
                type="primary"
              >保存</el-button>
              <el-button
                :disabled="true"
                size="mini"
              >删除</el-button>
              <el-button size="mini">刷新</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="signsData content">
        <h3>体征数据</h3>
        <div class="table">
          <div class="sign">
            <vxe-table
              border
              auto-resize
              show-header-overflow
              show-overflow
              height="100%"
              highlight-hover-row
              align="left"
              size="mini"
              class="scroll"
              :data="signData"
            >
              <vxe-table-column
                field="name"
                title="名称"
              />
            </vxe-table>
          </div>
          <div class="option">
            <el-button
              size="mini"
              :disabled="true"
            >
              保存(S)
            </el-button>
            <el-button
              size="mini"
              :disabled="true"
            >
              刷新(R)
            </el-button>
            <el-button
              size="mini"
              :disabled="true"
            >
              删除(S)
            </el-button>
            <el-button
              size="mini"
              v-popover:popover
            >
              增加项目
            </el-button>
            <el-button
              size="mini"
              @click="handleShowDialog"
            >
              插入数据
            </el-button>
            <el-button size="mini">
              删除项目
            </el-button>
            <el-popover
              placement="top-start"
              width="400"
              trigger="click"
              ref="popover"
            >
              <vxe-table
                height="400px"
                auto-resize
                keep-source
                highlight-hover-row
                align="left"
                size="mini"
                class="scroll"
                :data="itemData"
              >
                <vxe-table-column
                  field="name"
                  title="项目名称"
                />
              </vxe-table>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <div class="buttons">
          <el-button
            v-for="item in buttonList"
            :key="item.value"
            size="mini"
            style="margin-left:10px;margin-bottom:10px;"
          >
            {{ item.label }}
          </el-button>
        </div>
        <div class="event-table">
          <vxe-table
            auto-resize
            show-header-overflow
            show-overflow
            keep-source
            highlight-hover-row
            align="center"
            height="100%"
            size="mini"
            class="scroll"
            :data="eventData"
          >
            <vxe-table-column
              field="name"
              title="事件名称"
            />
            <vxe-table-column
              field="specs"
              title="规格"
            />
          </vxe-table>
        </div>
      </div>
    </div>
    <insert-dialog
      v-if="insertDialogVisible"
      @close="handleClose"
    />
  </div>
</template>
<script>
import AnaesTable from '@/components/AnaesTable/index'
import InsertDialog from './NewItemDialog/index'
export default {
  data () {
    return {
      gridData: [],
      itemData: [{ name: '呼吸' }, { name: '平均压' }, { name: '心率' }],
      buttonList: [
        { label: '麻药', value: '1' },
        { label: '用药', value: '2' },
        { label: '事件', value: '3' },
        { label: '输液', value: '4' },
        { label: '出量', value: '5' },
        { label: '插管', value: '6' },
        { label: '拔管', value: '7' },
        { label: '输血', value: '8' },
        { label: '输氧', value: '9' },
        { label: '呼吸', value: '10' },
        { label: '其他', value: '11' }
      ],
      eventData: [
        { name: '多巴胺', specs: '5mg' },
        { name: '多巴胺', specs: '5mg' },
        { name: '多巴胺', specs: '5mg' },
        { name: '多巴胺', specs: '5mg' },
        { name: '多巴胺', specs: '5mg' },
        { name: '多巴胺', specs: '5mg' }
      ],
      signData: [
        { name: '呼吸' },
        { name: 'SpO2' },
        { name: '呼吸' },
        { name: 'SpO2' },
        { name: '呼吸' },
        { name: 'SpO2' },
        { name: '呼吸' },
        { name: 'SpO2' }
      ],
      insertDialogVisible: false,
      type: ''
    }
  },
  components: {
    AnaesTable,
    InsertDialog
  },
  methods: {
    handleClose () {
      this.insertDialogVisible = false
    },
    handleShowDialog () {
      this.insertDialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.registration {
  font-size: 14px;
  width: 90vw;
  height: 80vh;
  h3 {
    color: #9ba3d5;
    margin: 0;
    line-height: 28px;
    font-size: 14px;
  }
  .left {
    float: left;
    height: 100%;
    width: calc(100% - 262px);
    .table{
      border:1px solid rgba(57, 66, 92, 1);
      border-radius:5px;
      background:#1E222E;
      height: calc(100% - 28px);
    }
    .content{
      height:50%;
      .sign,.anaes{
        height:calc(100% - 68px)
      }
    }
    .option{
      padding:20px;
      span>span{
        color:#9BA3D5;
        margin:0 10px;
      }
    }
  }
  .right {
    float:right;
    width:242px;
    padding-top: 28px;
    height: 100%;
    .content{
      background:#1E222E;
      border:1px solid rgba(57, 66, 92, 1);
      border-radius:5px;
      height: 100%;
      .buttons{
        padding:10px 0 0 0;
      }
      .event-table{
        height:calc(100% - 124px)
      }
    }
  }
}
.registration /deep/ .el-divider--horizontal {
  margin: 10px 0;
}
.registration /deep/ .vxe-table .vxe-table--border-line{
  border-top:unset;
  border-left:unset;
  border-right:unset;
}
.registration /deep/ .el-button--mini{
  padding:7px 11px;
}
</style>
