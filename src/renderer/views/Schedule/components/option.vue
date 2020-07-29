<template>
  <div class="option">
    <span>共0台</span>
    <span>
      <el-button
        type="text"
        size="mini"
        @click="showPreview"
      >提交前预览</el-button>
      <el-button
        type="text"
        size="mini"
      >刷新</el-button>
      <!-- <el-button
        type="text"
        size="mini"
      >切换</el-button> -->
      <el-button
        type="text"
        size="mini"
        @click="submitAll"
      >提交</el-button>
    </span>
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { submitAllApply } from '@/api/schedule'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters('Schedule', ['time'])
  },
  methods: {
    showPreview () {
      this.$emit('showPreview')
    },
    submitAll () {
      request({
        url: submitAllApply + '/' + this.time,
        method: 'PUT'
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '提交成功' })
          this.$eventHub.$emit('get-unallocated')
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('get-records')
          this.$eventHub.$emit('get-DocNurse')
        } else {
          this.$message({ type: 'warning', message: '提交失败' })
        }
      })
    }
  },
  mounted () {
    this.$eventHub.$on('submit-all', () => {
      this.submitAll()
    })
  }
}
</script>
<style lang="scss" scoped>
.option {
  padding: 0 20px;
  background: #181c27;
  display: flex;
  color: #9ba3d5;
  font-size: 14px;
  line-height: 28px;
  justify-content: space-between;
  border-radius: 0px 0px 5px 5px;
}
.option /deep/ .el-button--text {
  color: #9ba3d5;
}
</style>
