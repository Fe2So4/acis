<template lang="pug">
  .tiss
    el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
      ScoreChart
      .option
        el-button(type="primary" size="mini") 保存(S)
        el-button(size="mini") 删除(D)
      .form
        .score
          span 得分
          el-input(size="mini" style="width:90px" readonly v-model="grossScore")
        el-row(:gutter="20")
          el-col(:span="item.span" v-for="item in group[1]" :key="item.id")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="item.span" v-for="item in group[2]" :key="item.id")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="item.span" v-for="item in group[3]" :key="item.id")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="item.span" v-for="item in group[4]" :key="item.id")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="item.span" v-for="item in group[5]" :key="item.id")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        .option
          el-button(size="mini" @click="clear") 清空
          el-button(size="mini" @click="calculate") 评分
</template>
<script>
import ScoreChart from '../components/charts'
import ScoringComponents from '../components/ScoringItem'
import mixin from '../mixin'
export default {
  name: 'Tiss',
  mixins: [mixin],
  components: {
    ScoreChart,
    ...ScoringComponents
  },
  data () {
    return {
      anesthesiaScoreId: 7
    }
  }
}
</script>
<style lang="stylus" scoped>
.tiss {
  padding: 0;
  height: 100%;
  .option {
    margin: 20px 0;
    text-align: right;
  }
  .form {
    .score {
      text-align: right;
      margin-bottom: 20px;

      span {
        color: #fd4b4b;
        font-size: 14px;
      }

      .el-input {
        margin-left: 20px;
      }
    }

    .el-row {
        margin: 0 0 20px 0;
      .el-col {
      }
      .radioBlock ::v-deep .el-radio {
        display: block;
        background: #1e222e;
        border-radius: 5px;
        margin: 0 0 20px 0;
      }
    }
  }
}
</style>
