<template lang="pug">
  .pass
    h2 密码修改
    .form-box
      el-form(ref="form" :model="form" label-width="100px" :label-position="position" size="mini" :rules="rules")
        el-form-item(label="用户名称")
          el-input(v-model="form.userName" disabled)
        el-form-item(label="登录名称")
          el-input(v-model="form.loginName" disabled)
        el-form-item(label="当前密码")
          el-input(v-model="form.currentPWD" type="password" )
        el-form-item(label="新密码" prop="newPWD")
          el-input(v-model="form.newPWD" type="password" )
        el-form-item(label="确认新密码" prop="confirmPWD")
          el-input(v-model="form.confirmPWD" type="pasword" )
        el-form-item
          el-button(type="primary" @click="onSubmit('form')") 确定
          el-button(@click="handleClose") 取消
</template>
<script>
import { changePass, getUserInfo } from '@/api/login'
import request from '@/utils/requestForMock'
import { getCurrentAccount } from '@/utils/storage'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.newPWD !== '') {
          this.$refs.form.validateField('confirmPWD')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPWD) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var user = getCurrentAccount()
    return {
      position: 'left',
      form: {
        currentPWD: '',
        newPWD: '',
        confirmPWD: '',
        userName: '',
        loginName: user
      },
      rules: {
        newPWD: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPWD: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    handleClose () {
      this.$eventHub.$emit('close-dialog')
    },
    getUserInfo () {
      request({
        url: getUserInfo
      }).then(res => {
        this.form.userName = res.data.data.userName
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url: changePass,
            method: 'POST',
            data: {
              loginName: this.form.loginName,
              newPwd: this.form.newPWD,
              oldPwd: this.form.currentPWD
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$router.push('/login')
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.pass
  background #1E222E
  overflow hidden
  padding 10px
  h2
    text-align center;
    font-size 18px;
    color #9BA3D5
    font-weight 600;
  .form-box
    width 450px
    margin 0 auto
.pass /deep/ .el-form .el-form-item
  &:last-child
    .el-form-item__content
     text-align center
</style>
