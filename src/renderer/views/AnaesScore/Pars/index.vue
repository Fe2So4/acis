<template lang="pug">
  .pars
    el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
      ScoreChart
      .option
        el-button(type="primary" size="mini") 保存(S)
        el-button(size="mini") 删除(D)
      .form
        .score
          //- span 危重程度
          el-input(size="mini" style="width:90px")
          //- el-input(size="mini" style="width:90px")
        el-row(:gutter="20" type="flex" justif="space-between")
          el-col(:span="24")
            span(class="label") 活动
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") A级(!!!!!!!!!)
              el-radio(:label="6") B级()
              el-radio(:label="7") C级
              el-radio(:label="8") D级
              el-radio(:label="9") E级
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 呼吸
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 无坏死
              el-radio(:label="6") 坏死&lt;1/2
              el-radio(:label="9") 坏死&lt;1/3
              el-radio(:label="10") 坏死&gt;1/2
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 循环
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 无坏死
              el-radio(:label="6") 坏死&lt;1/2
              el-radio(:label="9") 坏死&lt;1/3
              el-radio(:label="10") 坏死&gt;1/2
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 意识
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 无坏死
              el-radio(:label="6") 坏死&lt;1/2
              el-radio(:label="9") 坏死&lt;1/3
              el-radio(:label="10") 坏死&gt;1/2
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 皮肤
            el-radio-group(v-model="form.radio")
              el-radio(:label="3") 无坏死
              el-radio(:label="6") 坏死&lt;1/2
              el-radio(:label="9") 坏死&lt;1/3
              el-radio(:label="10") 坏死&gt;1/2
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 病情描述
            el-input(type="textarea" rows="3")
        .option
          el-button(size="mini") 清空(C)
          el-button(size="mini") 保存(A)
          el-button(size="mini") 评分(G)
</template>
<script>
import ScoreChart from '../components/charts'
export default {
  name: 'Balthazar',
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
.pars
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
      width 80px
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
