<template>
  <div class="export-config">
    <el-dialog
      title="导出excel配置"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="export-content clearfix">
        <div class="left">
          <div class="title">
            可选字段
          </div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        <!-- <div class="tips">
          <el-button type="primary">
            <i class="el-icon-d-arrow-left" />
          </el-button>
          <el-button type="primary">
            <i class="el-icon-d-arrow-right" />
          </el-button>
          点击单项可以拖拽
        </div> -->
        <div class="right">
          <div class="title">
            已选字段
          </div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    }
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
  }
</style>
