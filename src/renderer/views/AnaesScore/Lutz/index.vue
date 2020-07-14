<template lang="pug">
  .lutz
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
          el-col(:span="8")
            span(class="label") 手术种类
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 手术部位
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 手术时间(分钟)
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="8")
            span(class="label") 病人年龄(岁)
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="16")
            span(class="label") 全身情况
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 心脏
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="24")
            span(class="label") 心率失常
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="16")
            span(class="label") 循环系统
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 呼吸
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="16")
            span(class="label") 代谢
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 意识
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
        el-row(:gutter="20")
          el-col(:span="8")
            span(class="label") 肾功能
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 血钾
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
          el-col(:span="8")
            span(class="label") 肝功能
            el-select(size="mini" v-model="form.opeType")
              el-option(:value="1" label="手术种类")
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
  name: 'Lutz',
  data () {
    return {
      form: {
        opeType: '1'
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
.lutz
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
      width 110px
      padding-right 10px
      box-sizing border-box
      text-align right
      line-height 28px
    .el-row
      margin 20px 0 0 !important
      .el-col
        margin 0
        padding 0 !important
        display flex
        .el-input
          flex 1
        .el-select
          flex 1
</style>
