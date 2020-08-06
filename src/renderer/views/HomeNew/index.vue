<template>
  <div class="home">
    <el-container>
      <el-aside width="220px">
        <Aside />
      </el-aside>
      <el-container style="padding-left:8px;">
        <el-header height="32px">
          <Header />
        </el-header>
        <el-main>
          <!-- <router-view :key="key" /> -->
          <transition
            name="fade"
            mode="out-in"
          >
            <keep-alive include="PatientList">
              <router-view />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
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
    // key () {
    //   console.log(this.$route.path)
    //   return this.$route.path
    // }
  },
  components: {
    Header,
    Aside
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/login') {
      const { BrowserWindow } = require('electron').remote
      BrowserWindow.getFocusedWindow().maximize()
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background:#121421;
  .el-header{
    margin: 0 0 0 12px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    // width: auto !important;
    // margin-right: 20px;
    position: relative;
    overflow: unset;
    box-shadow:4px 3px 5px 0px rgba(0, 0, 0, 0.4);
  }
  .el-main {
    height: calc(100% - 32px);
    background:#121421;
    padding:0;
  }
}
</style>
