<template>
  <div class="home">
    <el-container>
      <el-header height="100px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
      <el-footer height="20px">foot</el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from './Header/index'
import Aside from './Aside/index'
export default {
  name: 'home',
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
    background-color: #b3c0d1;
    color: #333;
  }
  .el-container {
    height: 100%;
    .el-container {
      height: calc(100% - 120px);
      display: flex;
    }
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    flex: 1;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    height: calc(100%);
  }
}
</style>    