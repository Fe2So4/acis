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
        :class="iconMax"
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
const { BrowserWindow, dialog } = require('electron').remote
const win = BrowserWindow.getAllWindows()[0]
export default {
  name: 'Header',
  components: {
    ThemePicker
  },
  data () {
    return {
      activeIndex: -1,
      isMax: win.isMaximized(),
      iconMax: 'icon-icon_max'
    }
  },

  mounte () {
    win.on('maximize', () => {
      this.isMax = true
    })
    win.on('unmaximize', () => {
      this.isMax = false
    })
  },
  methods: {
    miniWindow () {
      // 最小化窗口
      win.minimize()
    },
    maxWindow () {
      const isMax = win.isMaximized()
      if (isMax) {
        win.unmaximize()
        this.iconMax = 'icon-icon_min2'
      } else {
        win.maximize()
        this.iconMax = 'icon-icon_max'
      }
    },
    closeWindow () {
      dialog
        .showMessageBox({
          type: 'warning',
          // 按钮文字
          buttons: ['确认', '取消'],
          // 默认选择的按钮索引值
          defaultId: 1,
          title: '警告',
          message: '是否确认退出当前程序',
          // 触发退出的索引值
          cancelId: 1
        })
        .then((res) => {
          if (res.response === 0) {
            win.close()
          }
        })
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
  @media all and (orientation: portrait) {
    .title {
      box-shadow: unset !important;
    }
  }
  .title {
    @include theme-property("color", $color-text-primary);
    @include theme-property(background, $color-background-aside);
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
