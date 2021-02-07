<template>
  <div class="home">
    <el-container>
      <el-header height="32px">
        <Header />
      </el-header>
      <el-container class="container">
        <el-aside width="220px">
          <Aside />
        </el-aside>
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
  components: {
    Header,
    Aside
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/login') {
      const { ipcRenderer } = require('electron')
      ipcRenderer.send('maximize-main')
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.home {
  height: 100%;
  .el-header {
    // margin: 0 0 0 2px;
    padding-left: 0;
    @media screen and (orientation: portrait) {
      & {
        @include theme-property(background, $color-background-aside);
        z-index: 1;
      }
    }
  }
  .el-container {
    height: 100%;
    @include theme-property("background", $color-background-home);
  }
  .container {
    @media all and (orientation: portrait) {
      display: flex;
      flex-direction: column;
      .el-aside {
        width: 100% !important;
        margin-bottom: 20px;
        height: 50px;
      }
    }
    @media all and (orientation: landscape) {
    }
  }
  .el-aside {
    // width: auto !important;
    // margin-right: 20px;
    position: relative;
    overflow: unset;
    @include theme-property("box-shadow", $box-shadow-aside);
  }
  .el-main {
    // height: calc(100% - 32px);
    height: 100%;
    padding: 0;
  }
}
</style>
