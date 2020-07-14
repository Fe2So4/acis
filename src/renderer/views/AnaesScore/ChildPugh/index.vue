<template lang="pug">
  .child-pugh
    el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
      ScoreChart
      .option
        el-button(type="primary" size="mini") 保存(S)
        el-button(size="mini") 删除(D)
      .form
        .score
          span 危重程度
          el-input(size="mini" style="width:90px")
          el-input(size="mini" style="width:90px")
        el-row(:gutter="20" type="flex" justif="space-between")
          el-col(:span="24")
            span(class="label") 肝性病脑
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 男
              el-radio(:label="6") 1~2期
              el-radio(:label="9") 3~4期
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 腹水
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 无
              el-radio(:label="6") 轻
              el-radio(:label="9") 中
            </el-radio-group>
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label" style="line-height:93px;") 胆红素(mg/100ml)
            .cirrhosis
              el-row(:gutter="20")
                el-col(:span="24")
                  span(class="label") 原发性胆汁性肝硬化
                  el-radio-group(v-model="form.radio")
                    el-radio(:label="3") 1~4
                    el-radio(:label="6") 4~10
                    el-radio(:label="9") &gt;10
              el-row(:gutter="20")
                el-col(:span="24")
                  span(class="label") 非原发性胆汁性肝硬化
                  el-radio-group(v-model="form.radio")
                    el-radio(:label="3") 1~2
                    el-radio(:label="6") 2~3
                    el-radio(:label="9") &gt;10
              //- .primary
              //- .non-primary
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 白蛋白(g/100ml)
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 3.5
              el-radio(:label="6") 2.8~3.5
              el-radio(:label="9") &lt;2.8
            </el-radio-group>
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 凝血酶原时间(延长秒数)
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 1~4
              el-radio(:label="6") 4~6
              el-radio(:label="9") &gt;6
            </el-radio-group>
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 营养不良状况
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 轻度
              el-radio(:label="6") 中度
              el-radio(:label="9") 重度
            </el-radio-group>
        .option
          el-button(size="mini") 清空(C)
          el-button(size="mini") 保存(A)
          el-button(size="mini") 评分(G)
</template>
<script>
import ScoreChart from '../components/charts'
export default {
  name: 'ChildPugh',
  data () {
    return {
      form: {
        opeType: '1',
        radio: ''
      },
      wrapStyle: [{
        'overflow-x': 'hidden'
      }]
    }
  },
  components: {
    ScoreChart
  },
  mounted () {

  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.child-pugh
  padding 0 200px
  height 100%
  .option
    margin 20px 0
    text-align right
  .form
    // margin-top 40px
    .score
      text-align right
      margin-bottom 20px
      span
        color #FD4B4B
        font-size 14px
      .el-input
          margin-left 20px
    span.label
      color #9BA3D5
      display inline-block
      width 160px
      padding-right 10px
      box-sizing border-box
      text-align right
      line-height 38px
    .el-row
      margin 20px 0 0 !important
      .el-col
        margin 0
        padding 0 !important
        display flex
        .cirrhosis
          flex 1
          .el-row
            &:first-child
              margin-top unset !important
        .el-radio-group
          flex 1
        .el-input
          flex 1
        .el-select
          flex 1
        // #1E222E
        .el-radio-group
          background #1E222E
          border-radius 5px
          padding 10px
          height 38px
</style>
