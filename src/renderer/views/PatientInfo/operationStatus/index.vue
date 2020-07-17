<template lang="pug">
  .operation-status(class="clearfix")
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
    .step
      .left-arow(@click="handleChangeNav(1)")
        i(class="el-icon-arrow-left arow")
      .scroll-content(ref="scrollContent")
        el-scrollbar(class="rowScrollbar" style="overflow-y:hidden;" ref="scrollbar")
          ul
            li(v-for="(item,index) in opeStatusList" :key="index")
              .img
                img(:src="getImg(item.status)")
                .line(v-if="item.status === 0 && index>0")
                .gray(v-else-if="item.status === 2 && index>0")
                  ol
                    li
                    li
                    li
                    li
                    li
                    li
                    li
                    li
                .loading(v-else-if="item.status===1 && index>0")
                  ol
                    li
                    li
                    li
                    li
                    li
                    li
                    li
                    li
              .title 准备手术
              .time
                el-date-picker(
                  :value="item.date"
                  :disabled="item.date!==''"
                  size="mini"
                  type="datetime"
                  style="width:130px;"
                  placeholder=""
                  default-time="12:00:00"
                  format="MM-dd HH:mm"
                  value-format="MM-dd HH:mm"
                )
      .right-arow(@click="handleChangeNav(2)")
        i(class="el-icon-arrow-right arow")
</template>
<script>
import unstart from '@/assets/unstart.png'
import ongoing from '@/assets/ongoing.png'
import finished from '@/assets/finished.png'
export default {
  data () {
    return {
      datetime: '',
      opeStatusList: [{ status: 0, title: '准备手术', date: '7-17 9:05' },
        { status: 0, title: '准备手术', date: '7-17 9:30' }, { status: 0, title: '准备手术', date: '7-17 9:40' },
        { status: 0, title: '准备手术', date: '7-17 10:10' },
        { status: 1, title: '准备手术', date: '' }, { status: 2, title: '准备手术', date: '' },
        { status: 2, title: '准备手术', date: '' }]
    }
  },
  computed: {
    getImg (status) {
      return function (status) {
        switch (status) {
          case 0:
            return finished
          case 1:
            return ongoing
          case 2:
            return unstart
        }
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/home')
    },
    handleChangeNav (nav) {
      const scrollbarEl = this.$refs.scrollbar.wrap
      // const scrollContent = this.$refs.scrollContent
      if (nav === 1) {
        scrollbarEl.scrollLeft -= 130
      } else {
        scrollbarEl.scrollLeft += 130
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .operation-status
    width 100%
    height 114px
    background #181C27
    box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
    border-radius 5px
    overflow hidden
    // display flex
    .card
      margin 10px 0 0 10px
      width 210px
      float left
      min-width 210px
      max-height 94px
      background rgba(37,44,64,1)
      border 2px solid rgba(53,62,86,1)
      border-radius 6px
      font-size 14px
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

    .step
      // flex 1
      height 100%
      float right
      width calc(100% - 220px)
      position relative
      .left-arow
        position absolute
        left 10px
        top 0
        bottom 0
        margin auto
        transition all ease 0.3s
        cursor pointer
        &:hover
          transform:scale(1.4)
      .right-arow
        position absolute
        right 10px
        top 0
        bottom 0
        margin auto
        cursor pointer
        transition all ease 0.3s
        &:hover
          transform:scale(1.4)
      .arow
        font-size 48px
        line-height 114px
        font-weight bold
        color #2D95F7
      .scroll-content
        width calc(100% - 116px)
        margin 0 auto
        ul
          width 100%
          display flex
          height 114px
          margin 0 auto
          padding 0 9px
          li
            margin-right 38px
            &:last-child
              margin-right 0
            .img
                height 40px
                // overflow hidden
                margin-top 10px
                text-align center
                position relative
                img
                  height 40px
                  width 40px
                  transform scale(1.9)
                  z-index 1
                .line
                  height 2px
                  position absolute
                  left -90px
                  top 0
                  bottom 0
                  margin auto
                  background #2991EF
                  width 140px
                .loading
                  height 2px
                  position absolute
                  left -78px
                  top 0
                  bottom 0
                  margin auto
                  width 140px
                  ol
                    padding 0
                    display flex
                    li
                      width 10px
                      height 2px
                      margin-right 5px
                      // background #2991EF
                      background #ff4359
                      border-radius:1px;
                      animation: load 1.06s ease infinite;
                      &:nth-child(1)
                        animation-delay:0.13s
                      &:nth-child(2)
                        animation-delay:0.26s
                      &:nth-child(3)
                        animation-delay:0.39s
                      &:nth-child(4)
                        animation-delay:0.52s
                      &:nth-child(5)
                        animation-delay:0.65s
                      &:nth-child(6)
                        animation-delay:0.78s
                      &:nth-child(7)
                        animation-delay:0.91s
                      &:nth-child(8)
                        animation-delay:1.04s
                    @keyframes load
                      0%
                        opacity: 1;
                      100%
                        opacity: 0;
                .gray
                  height 2px
                  position absolute
                  left -78px
                  top 0
                  bottom 0
                  margin auto
                  width 140px
                  ol
                    padding 0
                    display flex
                    li
                      width 10px
                      height 2px
                      margin-right 5px
                      background #E3E7ED
                      border-radius:1px;
          .title
            font-size 14px
            line-height 26px
            color #9BA3D5
            text-align center
</style>
<style>
  .el-picker-panel{
    background:#252c40 !important;
  }
  .scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .rowScrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
  }
</style>
