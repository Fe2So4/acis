<template>
  <div class="blood-template">
    <div class="top">
      <span>选择血气模板：</span>
      <el-select
        v-model="value"
        placeholder="请选择"
        size="mini"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        size="mini"
        style="width:217px"
      />
      <el-button size="mini">
        增加模板
      </el-button>
    </div>
    <div class="content">
      <div class="left">
        <div class="title">
          备选项目
        </div>
        <el-table
          class="table"
          size="mini"
          border
          :data="tableData"
          :cell-style="cellStyle"
        >
          <el-table-column
            label="项目代码"
            prop="item"
          />
          <el-table-column
            label="显示名称"
            prop="name"
          />
        </el-table>
      </div>
      <div class="right">
        <div class="title">
          备选项目
        </div>
        <el-table
          class="table"
          size="mini"
          border
          :data="tableData"
          :cell-style="cellStyle"
        >
          <el-table-column
            label="项目代码"
            prop="item"
          />
          <el-table-column
            label="显示名称"
            prop="name"
          />
        </el-table>
      </div>
    </div>
    <div class="option">
      <el-button size="mini">
        保存（S）
      </el-button>
      <el-button size="mini">
        删除（D）
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BloodTemplate',
  data () {
    return {
      cellStyle: {
        position: 'relative',
        height: '36px',
        textAlign: 'center'
      },
      tableData: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .blood-template{
    .top{
      padding: 10px 0 10px 10px;
    }
    .content{
      display: flex;
      .title{
        font-size: 14px;
        padding-left:10px;
        line-height: 26px;
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
      .left{
        flex: 1;
      }
      .right{
        flex:1
      }
    }
    .option{
      padding: 10px 10px 10px 0;
      text-align: right;
    }
  }
</style>
