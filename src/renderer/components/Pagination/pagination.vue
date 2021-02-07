<template>
  <div class="pagination">
    <el-pagination
      :page-size="pageSize"
      background
      layout="prev,pager,next"
      :total="total"
      @current-change="handleChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {

    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleChange (page) {
      this.$emit('getData', page)
    },
    handlePrevClick (page) {
      this.$emit('getData', page)
    },
    handleNextClick (page) {
      this.$emit('getData', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
    text-align: right;
    display: flex;
    padding:4px;
    // justify-content: flex-end;
    .el-pagination{
      // background: ;
    }
  }
</style>
