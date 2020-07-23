<template lang="pug">
  .anaes-score
    //- .title 麻醉评分
    .nav
      el-tabs(v-model="activeName" @tab-click="handleClick")
        el-tab-pane(label="Balthazar胰腺病变CT严重性指数评分" name="1")
          Balthazar
        el-tab-pane(label="Child-Pugh肝脏疾病患者手术危险性评分" name="2")
          ChildPugh
        el-tab-pane(label="GOLDMAN心脏高危因素评分" name="3")
          GoldMan
        el-tab-pane(label="Lutz麻醉危险性评分" name="4")
          Lutz
        el-tab-pane(label="PARS麻醉恢复评分" name="5")
          Pars
        el-tab-pane(label="APACHE2评分" name="6")
          Apache
        el-tab-pane(label="TISS评分" name="7")
          Tiss
</template>
<script>
import Balthazar from './Balthazar/index'
import Lutz from './Lutz/index'
import Tiss from './Tiss/index'
import ChildPugh from './ChildPugh/index'
import Pars from './Pars/index'
import GoldMan from './GoldMan/index'
import Apache from './Apache/index'
export default {
  name: 'AnaesScore',
  data () {
    return {
      activeName: '1'
    }
  },
  components: {
    Balthazar,
    Lutz,
    Tiss,
    ChildPugh,
    Pars,
    GoldMan,
    Apache
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="stylus" scoped>
.anaes-score {
  height: 80vh;
  width: 62vw;

  .title {
    line-height: 28px;
    font-size: 14px;
    color: #9BA3D5;
  }

  .nav {
    height: calc(100% - 28px);

    .el-tabs {
      height: 100%;

      /deep/ .el-tabs__content {
        height: calc(100% - 55px);

        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
}

.anaes-score /deep/ .el-tabs__nav-wrap::after {
  background-color: #181C27;
}
</style>
