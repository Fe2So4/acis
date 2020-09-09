<template lang="pug">
  .balthazar
    el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
      ScoreChart
      .option
        el-button(type="primary" size="mini") 保存(S)
        el-button(size="mini") 删除(D)
      .form
        .score
          el-input(size="mini" style="width:90px" readonly v-model="grossScore")
        el-row(:gutter="20")
          el-col(:span="24" v-for="item in group[1]" :key="item.id" class="radioBlock")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="24" v-for="item in group[2]" :key="item.id" class="radioBlock")
            component(:is="'score-'+item.type" v-bind="item" v-model="item.value")
        el-row(:gutter="20")
          el-col(:span="24" v-for="item in group[3]" :key="item.id")
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
  name: 'Balthazar',
  mixins: [mixin],
  components: {
    ScoreChart,
    ...ScoringComponents
  },
  data () {
    return {
      anesthesiaScoreId: 1
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/theme";
  $radioBorder:(
    "light-white": 1px solid #CECECE
  );

  .balthazar {
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
        .el-col {
          margin: 0 0 20px 0;
        }

        .radioBlock ::v-deep .el-radio {
          display: block;
          @include theme-property("background", $background-dialog-content);
          @include theme-property("border", $radioBorder);
          border-radius: 5px;
          margin: 0 0 20px 0;
          padding-left: 10px;
        }
      }
    }
  }
</style>
