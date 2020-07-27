<template lang="pug">
  .cancel
    el-form(size="mini")
      el-form-item(label="取消原因:")
        el-input(v-model="reasonForCancellation")
      el-form-item(style="text-align:right;margin-top:40px;")
        el-button(type="primary" @click="onCancel") 确定
        el-button(@click="onClose") 取消
</template>
<script>
import request from '@/utils/requestForMock'
import { cancelOperation } from '@/api/operationCancellation'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  data () {
    return {
      reasonForCancellation: ''
    }
  },
  computed: {
    ...mapState([
      'userId',
      'operationId'
    ])
  },
  methods: {
    onCancel () {
      if (this.reasonForCancellation.length) {
        this.cancelOperation()
      } else {
        this.$message({
          message: '请输入取消原因',
          type: 'info'
        })
      }
    },
    onClose () {
      this.$eventHub.$emit('close-dialog')
    },
    cancelOperation () {
      return request({
        method: 'post',
        url: cancelOperation,
        params: {
          operationId: this.operationId,
          cancelReason: this.reasonForCancellation,
          deleteUser: this.userId
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$eventHub.$emit('close-dialog')
            this.$message({
              message: '取消成功',
              type: 'success'
            })
          } else {
            return Promise.reject(new Error(res.msg))
          }
        }
      ).catch(
        e => {
          this.$message({
            message: '取消失败',
            type: 'error'
          })
        }
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cancel
    width 600px
    height 200px
    display flex
    align-items center
    .el-form
      width 100%
      .el-form-item
        margin-bottom 0
</style>
