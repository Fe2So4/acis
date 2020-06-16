<template>
  <div>
    <el-form-item label="数据集">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
        disabled
      >
        <el-button
          slot="append"
          icon="el-icon-setting"
          @click="handleClick"
        />
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
// const path = require("path");
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
export default {
  data () {
    return {
      input3: '',
      win: null
    }
  },
  methods: {
    handleClick () {
      this.win = new BrowserWindow({ width: 400, height: 400 })
      this.win.loadURL(`file://${__dirname}/index.html`, { hash: 'home' })
      this.win.on('close', function () {
        this.win = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
