<template>
  <div class="home">
    <el-container>
      <el-header height="116px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view :key="key" />
        </el-main>
      </el-container>
      <el-footer height="26px">当前用户：mdss</el-footer>
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
    background: #263754;
    width: auto !important;
  }
  .el-main {
    flex: 1;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-footer {
    text-indent: 5px;
    background: #144177;
    font: 12px/26px "";
    color: #fff;
  }
}
</style>
