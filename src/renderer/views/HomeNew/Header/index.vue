<template>
  <div
    class="header"
    style="-webkit-app-region: drag;"
  >
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
</template>
<script>
const {
  BrowserWindow
} = require('electron').remote
const win = BrowserWindow.getAllWindows()[0]
export default {
  name: 'Header',
  data () {
    win.on('maximize', () => {
      this.isMax = true
    })
    win.on('unmaximize', () => {
      this.isMax = false
    })
    return {
      activeIndex: -1,
      isMax: win.isMaximized(),
      iconMax: 'icon-icon_min2'
    }
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
      win.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  line-height:32px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  height:100%;
  align-items: center;
  i{
    -webkit-app-region: no-drag;
    font-size:18px;
    font-weight: bold;
    color:#0094ff;
    margin-right:20px;
    cursor: pointer;
  }
}
</style>
