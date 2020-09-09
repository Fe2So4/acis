<template>
  <div class="export-config">
    <el-dialog
      title="导出excel配置"
      :visible.sync="exportVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="export-content clearfix">
        <div class="left">
          <div class="title">
            可选字段
          </div>
          <ul class="export-left">
            <el-scrollbar
              style="height:100%;width:100%;"
              class="scrollbar"
            >
              <draggable
                class="excel-group"
                group="excel"
                :list="leftList"
              >
                <li
                  v-for="item in leftList"
                  :key="item.itemCode"
                >
                  {{ item.itemName }}
                </li>
              </draggable>
            </el-scrollbar>
          </ul>
        </div>
        <div class="right">
          <div class="title">
            已选字段
          </div>
          <ul class="export-right">
            <el-scrollbar
              style="height:100%;width:100%;"
              class="scrollbar"
            >
              <draggable
                class="excel-group"
                group="excel"
                :list="rightList"
              >
                <li
                  v-for="item in rightList"
                  :key="item.itemCode"
                >
                  {{ item.itemName }}
                </li>
              </draggable>
            </el-scrollbar>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="closeExport"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { customExportTemplate, saveTemplate, findUserInfo } from '@/api/statistics'
import request from '@/utils/requestForMock'
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      leftList: [],
      rightList: [],
      userInfo: {}
    }
  },
  props: {
  },
  components: {
    draggable
  },
  computed: {
    ...mapGetters('Statistics', ['exportVisible'])
  },
  methods: {
    ...mapActions('Statistics', ['closeExport']),
    handleClose () {
      this.closeExport()
    },
    getListData () {
      request({
        method: 'POST',
        url: customExportTemplate + `?userId=${this.userInfo.userId}&templateCode=${this.$route.query.code}`
      }).then(res => {
        this.leftList = res.data.data.notUse
        this.rightList = res.data.data.inUse
      })
    },
    handleSubmit () {
      request({
        url: saveTemplate,
        method: 'POST',
        data: this.rightList
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '提交成功' })
          this.getListData()
        }
      })
    },
    findUserInfo () {
      request({
        url: findUserInfo,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.userInfo = res.data.data
          this.getListData()
        }
      })
    }
  },
  created () {
    this.findUserInfo()
  },
  mounted () {
    // this.handleSortable()
    // this.getListData()
  }
}
</script>

<style lang="scss" scoped>
  .export-config{
    .export-content{
      position: relative;
      .title{
        font-size: 14px;
        line-height: 52px;
        text-indent: 20px;
      }
      ul{
        height:calc(100% - 52px);
        .excel-group{
          height: 100%;
          li{
            height:30px;
            background:rgba(41,47,64,1);
            margin-bottom:1px;
            text-indent: 48px;
            line-height: 30px;
            &:hover{
              background:rgba(54,64,92,1);
            }
          }
        }
      }
      .left{
        width:330px;
        height:490px;
        background:rgba(30,34,46,1);
        border:1px solid rgba(57, 66, 92, 1);
        border-radius:5px;
        float: left;
      }
      .tips{
        position: absolute;
        bottom: 0;
        left: 40%;
        height: 100%;
      }
      .right{
        width:330px;
        float: right;
        height:490px;
        background:rgba(30,34,46,1);
        border:1px solid rgba(57, 66, 92, 1);
        border-radius:5px;
      }
    }
    /deep/ .el-scrollbar__view{
      height: 100%;
    }
  }
</style>
