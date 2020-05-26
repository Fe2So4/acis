<template>
    <div class="home">
       <el-container>
        <el-header height="100px">Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
        <el-footer height="20px">foot</el-footer>
    </el-container>
    </div>
</template>
<script>
    export default {
      data () { return {} }
    }
</script>  
<style lang="scss" scoped>
.home{
    height:100%;
      .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }
  .el-container{
      height: 100%;
      .el-container{
        height: calc(100% - 120px);
        display: flex;
      }
   
  } 
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
   .el-main {
    flex: 1;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100%);
  }
}

</style>    