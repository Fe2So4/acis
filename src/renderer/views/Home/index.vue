<template>
  <div class="home">
    <el-container>
      <el-header height="116px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <Aside></Aside>
        </el-aside>
        <el-main>Main</el-main>
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
  components: {
    Header, Aside
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-header,
  .el-footer {
    padding:0;
  }
  .el-container {
    height: 100%;
    .el-container {
      height: calc(100% - 120px);
      display: flex;
    }
  }
  .el-aside {
  }
  .el-main {
    flex: 1;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: calc(100%);
  }
  .el-footer{
    background:#144177;
    font:12px/26px '';
    color:#fff;
  }
}
</style>
