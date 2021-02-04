<template>
  <div
    class="header"
    style="-webkit-app-region: drag;"
  >
    <div class="title">
      Dandelion 智慧手术中心
      <i />临床麻醉
    </div>
    <div class="options">
      <theme-picker />
      <i
        class="el-icon-minus"
        @click="miniWindow"
      />
      <i
        class="iconfont icon-icon_min"
        :class="isMax? 'icon-icon_max':'icon-icon_min2'"
        @click="maxWindow"
      />
      <i
        class="el-icon-close"
        @click="closeWindow"
      />
    </div>
  </div>
</template>
<script>
import ThemePicker from './ThemePicker'
export default {
  name: 'Header',
  components: {
    ThemePicker
  },
  data () {
    return {
      activeIndex: -1,
      isMax: true
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('isMaximized-main')
    this.$electron.ipcRenderer.on('isMaximized-main-reply', (e, isMax) => {
      this.isMax = isMax
    })
    this.$electron.ipcRenderer.on('change-isMaximized', (e, isMax) => {
      this.isMax = isMax
    })
  },
  methods: {
    miniWindow () {
      // 最小化窗口
      this.$electron.ipcRenderer.send('minimize-main')
    },
    maxWindow () {
      this.$electron.ipcRenderer.send('change-main-isMaximized')
    },
    closeWindow () {
      this.$electron.ipcRenderer.send('close-main')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.header {
  line-height: 32px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  overflow: hidden;
  .title {
    @include theme-property("color", $color-text-primary);
    @include theme-property("background", $color-background-aside);
    z-index: 1;
    line-height: 32px;
    text-align: center;
    text-indent: 2px;
    width: 220px;
    font-size: 12px;
    cursor: pointer;
    @include theme-property("box-shadow", $box-shadow-aside);
    i {
      display: inline-block;
      width: 5px;
      vertical-align: middle;
      height: 5px;
      border-radius: 50%;
      @include theme-property("background", $color-primary);
      margin: 0 4px;
    }
  }
  @media all and (orientation: portrait) {
    .title {
      @include theme-property(box-shadow, $unset);
    }
  }
  .options {
    display: flex;
    height: 100%;
    align-items: center;
    i {
      -webkit-app-region: no-drag;
      font-size: 18px;
      display: inline-block;
      font-weight: bold;
      @include theme-property("color", $color-primary);
      margin-left: 12px;
      cursor: pointer;
    }
  }
}
</style>
