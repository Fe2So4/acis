<template lang="pug">
  .pass
    h2 密码修改
    .form-box
      el-form(ref="form" :model="form" label-width="100px" :label-position="position" size="mini")
        el-form-item(label="用户名称")
          el-input(v-model="userinfo.userName" disabled)
        el-form-item(label="登录名称")
          el-input(v-model="userinfo.loginName" disabled)
        el-form-item(label="当前密码")
          el-input(v-model="form.currentPWD" type="password")
        el-form-item(label="新密码")
          el-input(v-model="form.newPWD" type="password")
        el-form-item(label="确认新密码")
          el-input(v-model="form.confirmPWD" type="pasword")
        el-form-item
          el-button(type="primary" @click="onSubmit") 确定
          el-button 取消
</template>
<script>
export default {
  data () {
    return {
      position: 'left',
      form: {
        currentPWD: '',
        newPWD: '',
        confirmPWD: ''
      },
      userinfo: {
        userName: '',
        loginName: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(123)
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
    font-weight 600;
  .form-box
    width 450px
    margin 0 auto
.pass /deep/ .el-form .el-form-item
  &:last-child
    .el-form-item__content
     text-align center
</style>
