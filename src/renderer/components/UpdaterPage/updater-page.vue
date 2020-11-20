<template>
  <div class="app-container">
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
    >
      <span>{{ remark }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          type="primary"
          @click="updateApp"
        >立即升级</el-button>
        <el-button
          size="mini"
          @click="centerDialogVisible = false"
        >稍 后</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="downloadDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="下载进度"
      width="30%"
    >
      <div style="text-align:center">
        <!-- type="circle" -->
        <el-progress
          color="#67c23a"
          style="height:20px;"
          :percentage="downloadPercent"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      downloadPercent: 0,
      // centerDialogVisible: false,
      downloadDialogVisible: false,
      title: '更新', // titile和remark需要使用axios方法远程去调用才行，这里只是做测试使用，所以这两个值是写固定的
      remark: '当前检测到最新版本！是否立即更新？'
    }
  },
  mounted () {
    // this.checkForUpdate()
  },
  methods: {
    updateApp () {
      this.centerDialogVisible = false
      this.downloadDialogVisible = true
      this.downloadUpdate()
    },
    handleClose () {
      this.$emit('handleClose')
    },
    checkForUpdate () {
      ipcRenderer.send('checkForUpdate')
    },
    downloadUpdate () {
      ipcRenderer.send('downloadUpdate')
      // ipcRenderer.send('downloadUpdate')
      // 注意："downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
      ipcRenderer.on('message', (event, { message, progressObj }) => {
        if (message === 'download-progress') {
          this.downloadPercent = Math.trunc(progressObj.percent) || 0
          // console.log(Math.trunc(this.downloadPercent) === 100)
          if (Math.trunc(this.downloadPercent) === 100) {
            ipcRenderer.on('isUpdateNow', function () {
              ipcRenderer.send('isUpdateNow')
            })
          }
        }
      })
    }
  },
  beforeDestroy () {
    ipcRenderer.removeAll(['message', 'isUpdateNow', 'checkForUpdate', 'downloadUpdate'])
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  /deep/ .el-progress-bar__outer{
    height: 10px !important;
    // background: #EBEEF4 !important;
  }
}
</style>
