<template lang="pug">
  .cancel
    el-form(size="mini")
      el-form-item(label="取消原因:")
        el-input(v-model="cancel")
      el-form-item(style="text-align:right;margin-top:40px;")
        el-button(type="primary") 确定
        el-button 取消
</template>
<script>
export default {
  data () {
    return {
      cancel: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cancel
    width 600px
    height 200px
    display flex
    align-items center
    .el-form
      width 100%
      .el-form-item
        margin-bottom 0
</style>
