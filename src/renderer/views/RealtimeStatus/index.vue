<template lang="pug">
  .realtime-status
    el-form(:model="form" :inline="true" size="mini")
      el-form-item(label="日期" )
        el-date-picker(type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date")
      el-form-item(label="手术科室")
        el-input(v-model="form.dept")
      el-form-item(label="手术间")
        el-input(v-model="form.room")
      el-form-item
        div(class="status")
          span(v-for="item in list" :key="item.label" style="margin-right:10px;")
            span(:class="[item.type === 'circle'?'circle':'rectangle']" :style="{background:item.color}")
            span {{item.label}}
    .status-content
      .left
        .title
          span(class="white") 手术间
          span(class="green") 完成
          span(class="blue") 总数
        ul
          li(v-for="(item,index) in numberList" :key="index")
            span(class="white") {{item.room}}
            span(class="green") {{item.finish}}
            span(class="blue") {{item.total}}
      .right
        el-scrollbar(class="rowScrollbar")
          .content
              .line(ref="line")
              ul
                li(v-for="item in 2")
                  .relative
                    .detail
                      .ready
                      .operating
                      .wake
                      .circle
                      p(class="patient-info") 袁启明 男 49 二病区 18 盖妍妍
                      p(class="ope-info") 袁启明 超浅麻醉 脑血管造影 经导管颅内血栓塞术
</template>
<script>
import * as spritejs from 'spritejs'
// const { Scene, Group, Label, Polyline } = spritejs
const { Scene, Group, Polyline, Label } = spritejs
export default {
  name: 'RealtimeStatus',
  data () {
    return {
      form: {
        room: '',
        dept: '',
        date: ''
      },
      layer: null,
      scene: null,
      list: [{ label: '择期', color: '#24E760', type: 'circle' }, { label: '急诊', color: '#FF4045', type: 'circle' },
        { label: '准备', color: '#69A7FB', type: 'rectangle' }, { label: '手术中', color: '#F7CF42', type: 'rectangle' },
        { label: '苏醒期', color: '#15D18D', type: 'rectangle' }],
      numberList: [{ room: '03', finish: '1', total: '2' }, { room: '03', finish: '1', total: '2' }],
      timeList: []
    }
  },
  mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
  },
  methods: {
    handleSubmit () {
      console.log(123)
    },
    renderScene () {
      this.scene = new Scene({
        container: this.$refs.line,
        width: this.$refs.width,
        height: this.$refs.height
        // mode: 'static'
      })
      this.layer = this.scene.layer()
    },
    createGroups () {
      const topPart = new Group({ className: 'topPart' })
      const bottomPart = new Group({ className: 'bottomPart' })
      this.layer.append(topPart, bottomPart)
    },
    setLayout () {
      const topPart = this.layer.getElementsByClassName('topPart')[0]
      topPart.attr({
        size: [
          this.layer.width,
          20
        ]
      })
      const bottomPart = this.layer.getElementsByClassName('bottomPart')[0]
      bottomPart.attr({
        pos: [0, topPart.attr('height')],
        size: [
          this.layer.width,
          30
        ]
      })
      const line = new Polyline({
        pos: [0, 0.5],
        points: [0, 0, topPart.attr('width'), 0],
        strokeColor: '#4A5A87',
        lineWidth: 1
      })
      bottomPart.append(line)
      for (let i = 0; i < 24; i++) {
        const hour = new Polyline({
          pos: [80 + i * 160 + 0.5, 0],
          points: [0, 0, 0, 20],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })

        bottomPart.append(hour)
      }
      for (let i = 0; i <= 24; i++) {
        const half = new Polyline({
          pos: [i * 160 + 0.5, 0],
          points: [0, 0, 0, 15],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })
        bottomPart.append(half)
      }
      for (let i = 0; i < 48; i++) {
        const quarter = new Polyline({
          pos: [40 + i * 80 + 0.5, 0],
          points: [0, 0, 0, 10],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })
        bottomPart.append(quarter)
      }
    },
    setContent () {
      console.log(123)
      const topPart = this.layer.getElementsByClassName('topPart')[0]
      for (let i = 1; i <= 24; i++) {
        const s = i + ':00'
        this.timeList.push(s)
      }
      this.timeList = [...this.timeList.slice(7, 24), ...this.timeList.slice(0, 7)]
      for (let i = 0; i < this.timeList.length; i++) {
        if (this.timeList[i]) {
          const label = new Label(this.timeList[i])
          label.attr({
            pos: [80 + i * 160 - 15, 0],
            anchor: [0, 0],
            fontSize: 14,
            fontFamily: '宋体',
            textAlign: 'center',
            fillColor: '#4A5A87',
            height: 20,
            lineHeight: 20
          })
          topPart.append(label)
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .realtime-status
    height 70vh
    width 80vw
    color #9BA3D5
    font-size 14px
    .status
      display flex
      line-height 28px
      .circle
        vertical-align middle
        display inline-block
        width 12px
        height 12px
        border-radius 50%
        margin-right 6px
        margin-top -2px
      .rectangle
        margin-top -2px
        display inline-block
        vertical-align middle
        width 20px
        height 14px
        margin-right 6px
    .el-form
      height 30px
      .el-form-item
        margin-bottom 0
    .status-content
      width 100%
      .right
        width calc(100% - 200px)
        float right
        .content
          width 3841px
          height 600px
          ul
            height calc(100% - 50px)
            li
              margin-bottom 20px
              position relative
              height 56px
              .relative
                  position absolute
                  left 12px
                  top 0
                  border:1px solid rgba(205, 218, 255, 1);
                  border-radius:5px;
                  box-sizing border-box
                .detail
                  display flex
                  overflow hidden
                  position relative
                  p
                    font-size 14px
                    color #D0DAE5
                  div
                    height 54px
                  .wake
                    width 50px
                    background #15D18D
                  .ready
                    width 40px
                    background #69A7FB
                  .operating
                    width 60px
                    background #F7CF42
                  .circle
                    position absolute
                    left 10px
                    top 10px
                    width 12px
                    height 12px
                    border-radius 50%
                    background green
          .line
            height 50px
      .left
        width 200px
        float left
        padding-right 20px
        box-sizing border-box
        text-align center
        span
          display inline-block
          line-height 50px
        .white
          color #FFFFFF
          width 50px
        .green
          width 28px
          color #00B337
        .blue
          width 28px
          color #007EFF
        .title
          line-height 30px
          display flex
          justify-content space-between
        ul
          li
            display flex
            justify-content space-between
            margin-bottom 20px
            span
              display inline-block
              text-align center
              padding 3px 0
              &:first-child
                width 50px
                height 50px
                font-size 24px
                line-height 50px
                font-weight bold
                text-shadow:0px 1px 3px rgba(0, 0, 0, 0.2);
                border-radius 50%
                background #3C79E9
</style>
<style>
  .rowScrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
  }
</style>
