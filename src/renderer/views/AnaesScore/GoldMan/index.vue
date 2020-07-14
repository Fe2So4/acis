<template lang="pug">
  .goldman
    el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
      ScoreChart
      .option
        el-button(type="primary" size="mini") 保存(S)
        el-button(size="mini") 删除(D)
      .form
        .score
          span 危重级别
          el-input(size="mini" style="width:90px")
          span 级
          span 死亡率
          el-input(size="mini" style="width:90px")
          span %
          el-input(size="mini" style="width:90px")
        el-row(:gutter="20" type="flex" justif="space-between")
          el-col(:span="24")
            el-checkbox-group(v-model="checkList")
              el-checkbox(v-for="item in checkboxData" :key="item.value" :label="item.label")
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
  name: 'GoldMan',
  data () {
    return {
      form: {
        opeType: '1'
      },
      checkList: [],
      wrapStyle: [{
        'overflow-x': 'hidden'
      }],
      checkboxData: [{ value: '1', label: '心脏骤停或除颤后(48h内)' },
        { value: '2', label: '抑制呼吸，用或不用PEEP' },
        { value: '3', label: '控制呼吸,间歇性或者持续性肌松药' },
        { value: '4', label: '食道静脉出血,三腔管压迫止血' }, { value: '5', label: '心脏骤停或除颤后(48h内)' },
        { value: '6', label: '抑制呼吸，用或不用PEEP' },
        { value: '7', label: '控制呼吸,间歇性或者持续性肌松药' },
        { value: '8', label: '食道静脉出血,三腔管压迫止血' }, { value: '12', label: '心脏骤停或除颤后(48h内)' },
        { value: '9', label: '抑制呼吸，用或不用PEEP' },
        { value: '10', label: '控制呼吸,间歇性或者持续性肌松药' },
        { value: '11', label: '食道静脉出血,三腔管压迫止血' }]
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
.goldman
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
        margin-left 20px
      .el-input
          margin-left 20px
    span.label
      color #9BA3D5
      display inline-block
      width 110px
      padding-right 10px
      box-sizing border-box
      text-align right
      line-height 28px
    .el-row
      margin 20px 0 0 !important
      border-radius 5px
      background #1E222E
      padding 10px
      .el-col
        margin 0
        padding 0 !important
        display flex
        .el-input
          flex 1
        .el-select
          flex 1
</style>
