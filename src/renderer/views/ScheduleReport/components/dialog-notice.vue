<template>
  <el-dialog
    :visible.sync="dialogVisible"
    center
    class="dialog-notice"
    width="1100px"
    @opened="onOpened"
  >
    <notice id="operationNotice" />
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onPrint"
      >打印</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Notice from './notice.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers(
  'operationApplication'
)
// const { ipcRenderer } = require('electron')
export default {
  components: { Notice },
  computed: {
    ...mapGetters(['dialogNoticeVisible', 'noticeData']),
    dialogVisible: {
      get () {
        return this.dialogNoticeVisible
      },
      set (val) {
        return this.setDialogNoticeVisible(val)
      }
    }
  },
  methods: {
    ...mapActions(['setDialogNoticeVisible']),
    onPrint () {
      this.$electron.ipcRenderer.send('print-document', {
        path: '/print-notice'
      })
    },
    onOpened () {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
