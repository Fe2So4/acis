<template lang="pug">
  .about
    .img
      img(src="../../assets/tq.png" alt="")
    .title 麻醉临床信息系统
    //- .title Dandelion手术中心麻醉临床信息系统
    .option
      el-button(size="mini" @click="handleClose") 确定
    .copy-right copyright&copy;仝佥信息版权所有
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleClose () {
      this.$eventHub.$emit('close-dialog')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .about
    text-align center
    color #D0DAE5
    width 430px
    // .img
    .title
      line-height 28px
      margin 23px 0 38px
    // .option
    .copy-right
      font-size 12px
      margin-top 20px
</style>
