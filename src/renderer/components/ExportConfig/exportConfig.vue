<template>
  <div class="export-config">
    <el-dialog
      title="导出excel配置"
      :visible.sync="exportVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="export-content clearfix">
        <div class="left">
          <div class="title">
            可选字段
          </div>
          <ul class="export-left">
            <li>l1</li>
            <li>l2</li>
            <li>l3</li>
            <li>l4</li>
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
          <ul class="export-right">
            <li>r1</li>
            <li>r2</li>
            <li>r3</li>
            <li>r4</li>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sortable from 'sortablejs'
export default {
  data () {
    return {

    }
  },
  props: {
  },
  computed: {
    ...mapGetters('Statistics', ['exportVisible'])
  },
  methods: {
    ...mapActions('Statistics', ['closeExport']),
    handleClose () {
      this.closeExport()
    },
    handleSortable () {
      this.$nextTick(() => {
        const left = document.querySelector('.export-left')
        const right = document.querySelector('.export-right')
        var leftSort = new Sortable(left, {
          group: 'shared',
          animation: 150
        })
        var rightSort = new Sortable(right, {
          group: 'shared',
          animation: 150
        })
        console.log(leftSort, rightSort)
      })
    }
  },
  mounted () {
    this.handleSortable()
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
