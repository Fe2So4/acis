<template lang="pug">
  .dialog
    //- .dialog-mask
    .dialog-content
      .dialog-title
        span {{title}}
        i(class="el-icon-close" @click="handleClose")
      .dialog-body
        InsertSignData(@close="handleClose")
</template>
<script>
import InsertSignData from '../InsertSignData/index'
export default {
  name: 'NewItemDialog',
  data () {
    return {
      title: '插入体征数据'
    }
  },
  props: {

  },
  components: {
    InsertSignData
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .dialog
    font-size 14px
    position fixed
    width 100vw
    height 100vh
    left 0
    top 0
    z-index 3
    display flex
    justify-content center
    align-items center
    .dialog-content
      padding 0px 20px 20px
      background #181C27
      box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
      border-radius 10px
      .dialog-title
        line-height 32px
        display flex
        color #0094FF
        justify-content space-between
        i
          font-size 18px
          margin-top 7px
          font-weight bold
          cursor pointer
          transition all ease 0.3
          &:hover
            transform scale(1.2)
    // .dialog-body
</style>
