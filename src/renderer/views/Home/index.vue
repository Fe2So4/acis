<template>
  <div class="home">
    <el-container>
      <el-header height="116px">
        <Header />
      </el-header>
      <el-container>
        <el-aside>
          <Aside />
        </el-aside>
        <el-main>
          <router-view :key="key" />
        </el-main>
      </el-container>
      <el-footer height="26px">
        当前用户：mdss
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from './Header/index'
import Aside from './Aside/index'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  computed: {
    key () {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  components: {
    Header,
    Aside
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-header,
  .el-footer {
    padding: 0;
  }
  .el-container {
    height: 100%;
    .el-container {
      height: calc(100% - 120px);
      display: flex;
    }
  }
  .el-aside {
    background: #f8f9fa;
    width: auto !important;
    position: relative;
    overflow: unset;
    // border-right: 1px solid #144177;
  }
  .el-main {
    flex: 1;
    color: #333;
    // text-align: center;
    height: 100%;
    padding:0;
    // min-width: 1737px;
    // overflow-x: hidden;
  }
  .el-footer {
    text-indent: 5px;
    background: #f8f9fa;
    font: 12px/26px "";
    // color: #;
  }
}
</style>
<style>
  .el-picker-panel{
    background:#252c40 !important;
  }
</style>
