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
  BrowserWindow,
  dialog
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
    handleTest () {
      console.log(123)
    },
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
      dialog.showMessageBox({
        type: 'warning',
        // 按钮文字
        buttons: ['确认', '取消'],
        // 默认选择的按钮索引值
        defaultId: 1,
        title: '警告',
        message: '是否确认退出当前程序',
        // 触发退出的索引值
        cancelId: 1
      }).then(
        res => {
          if (res.response === 0) {
            win.close()
          }
        }
      )
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
