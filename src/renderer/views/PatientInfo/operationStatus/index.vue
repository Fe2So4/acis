<template lang="pug">
  .operation-status
    .card
      .top
        span 姓名
          span  钱书明
        span 性别
          span  男
      .center ID
          span 1000213960
      .bottom
        i(class="el-icon-back" @click="back")
        .room 07-1
    .step hello
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    back () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .operation-status
    height 114px
    background #181C27
    box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
    border-radius 5px
    overflow hidden
    .card
      margin 10px 0 0 10px
      width 210px
      background:rgba(37,44,64,1);
      border:2px solid rgba(53,62,86,1);
      border-radius:6px;
      font-size 12px
      padding 4px 9px 9px
      color #D0DAE5
      .top
        display flex
        justify-content space-between
        span
          >
           span
            color #9BA3D5
            display inline-block
            line-height 22px
            text-indent 13px
      .center
        span
         color #9BA3D5
         text-indent 13px
         line-height 22px
         display inline-block
      .bottom
        position relative
        margin-top 5px
        i
          cursor pointer
          width 18px
          height 18px
          font-size 18px
          position absolute
          left 0
          top 0
          bottom 0
          margin auto
        .room
          width 100px
          height 30px
          background:linear-gradient(120deg,rgba(84,190,234,1),rgba(219,83,160,1));
          border-radius 15px
          font-size 18px
          font-weight bold
          color #FFFFFF
          text-shadow 0px 1px 3px rgba(0, 0, 0, 0.2)
          line-height 30px
          text-align  center
          margin 0 auto
</style>
