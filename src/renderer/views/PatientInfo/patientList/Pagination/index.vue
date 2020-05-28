<template>
  <div class="pagination">
    <div class="top">
        <div><span>患者数量：</span>{{21}}</div>
        <div>共{{20}}页</div>
        <div><span>排序方式：</span>
            <span>
                <el-radio v-model="radio" label="1">术间</el-radio>
                <el-radio v-model="radio" label="2">时间</el-radio>
            </span>
        </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total,sizes, prev, pager, next, jumper"
      :total="40"
    />
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  data () {
    return {
      currentPage4: 4,
      radio: '1'
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss" scoped>
    .pagination{
        border-top:1px solid #144177;
        position: absolute;
        bottom:0;
        left:0;
        font-size: 14px;
        background: #fff;
        padding:10px 0;
        width: 100%;
        .top{
            display:flex;
            padding:0 5px;
            margin-bottom:10px;
            justify-content: space-between;
        }
    }
</style>
