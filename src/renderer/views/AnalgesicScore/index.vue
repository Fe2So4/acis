<template>
  <div class="AnalgesicScore">
    <el-scrollbar
      :wrap-style="wrapStyle"
      style="height:100%;"
    >
      <div class="form">
        <div class="score">
          <el-input
            size="mini"
            style="width:90px"
            readonly
            v-model="grossScore"
          />
        </div>
        <div class="title">
          Steward 评分
        </div>
        <el-row :gutter="20">
          <el-col
            :span="24"
            v-for="item in group[1]"
            :key="item.id"
          >
            <component
              :is="'score-'+item.type"
              v-bind="item"
              v-model="item.value"
            />
          </el-col>
        </el-row>
        <div class="title">
          NRS 评分
        </div>
        <el-row :gutter="20">
          <el-col
            :span="24"
            v-for="item in group[2]"
            :key="item.id"
          >
            <component
              :is="'score-'+item.type"
              v-bind="item"
              v-model="item.value"
            />
          </el-col>
        </el-row>
        <div class="title">
          FLACC 评分
        </div>
        <el-row :gutter="20">
          <el-col
            :span="24"
            v-for="item in group[3]"
            :key="item.id"
          >
            <component
              :is="'score-'+item.type"
              v-bind="item"
              v-model="item.value"
            />
          </el-col>
        </el-row>
        <div class="title">
          Glasgow 昏迷评分
        </div>
        <el-row :gutter="20">
          <el-col
            :span="24"
            v-for="item in group[4]"
            :key="item.id"
          >
            <component
              :is="'score-'+item.type"
              v-bind="item"
              v-model="item.value"
            />
          </el-col>
        </el-row>
        <div class="title" />
        <el-row :gutter="20">
          <el-col
            :span="24"
            v-for="item in group[5]"
            :key="item.id"
          >
            <component
              :is="'score-'+item.type"
              v-bind="item"
              v-model="item.value"
            />
          </el-col>
        </el-row>
        <div class="option">
          <el-button
            size="mini"
            @click="clear"
          >
            清空
          </el-button>
          <el-button
            size="mini"
            @click="calculate"
          >
            评分
          </el-button>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import ScoringComponents from '../AnaesScore/components/ScoringItem'
import mixin from '../AnaesScore/mixin'
export default {
  name: 'AnalgesicScore',
  mixins: [mixin],
  components: {
    ...ScoringComponents
  },
  data () {
    return {
      anesthesiaScoreId: 8
    }
  }

}

</script>
<style lang='scss' scoped>
.AnalgesicScore {
  width: 80vw;
  height: 80vh;
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
    .title {
      color: #fd4b4b;
      padding: 10px 0;
    }
    .el-row {
      .el-col {
        margin: 0 0 10px 0;
      }
    }
    .option {
      text-align: right;
    }
  }
}
</style>
