<template>
  <div class="registration">
    <div class="top">
      <h3>麻醉事件</h3>
      <div class="top-content">
        <div class="top-content-left">
          <div class="anaes-table">
            <AnaesTable />
          </div>
          <div class="top-option">
            <span>
              <el-button size="mini">保存模板</el-button>
              <el-button size="mini">套用模板</el-button>
            </span>
            <span>
              <el-button size="mini">保存(S)</el-button>
              <el-button
                :disabled="true"
                size="mini"
              >删除(D)</el-button>
              <el-button size="mini">刷新(R</el-button>
            </span>
          </div>
        </div>
        <div class="top-content-right">
          <div>
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
              border
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
    </div>
    <el-divider />
    <div class="bottom">
      <h3>体征数据</h3>
      <div class="bottom-content">
        <vxe-table
          border
          auto-resize
          show-header-overflow
          show-overflow
          height="100%"
          keep-source
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
      <div class="bottom-option">
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
            border
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
      insertDialogVisible: false
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
  .top {
    height: calc(60% - 20px);
    .top-content {
      display: flex;
      height: calc(100% - 28px);
      .top-content-left {
        flex: 1;
        height: 100%;
        .anaes-table {
          height: calc(100% - 46px);
        }
        .top-option {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
        }
      }
      .top-content-right {
        height: 100%;
        margin-left: 10px;
        width: 300px;
        .event-table {
          height: calc(100% - 114px);
        }
      }
    }
  }
  .bottom {
    height: 40%;
    .bottom-content {
      height: calc(100% - 76px);
    }
    .bottom-option {
      padding: 10px 0;
    }
  }
}
.registration /deep/ .el-divider--horizontal {
  margin: 10px 0;
}
</style>
  <style>
/*滚动条整体部分*/
.scroll div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.scroll div::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.scroll div::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.scroll div::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.scroll div::-webkit-scrollbar-thumb:active {
  /* background-color: #787878; */
  background-color: rgba(144, 147, 153, 0.3)
}
/*边角，即两个滚动条的交汇处*/
.scroll div::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
