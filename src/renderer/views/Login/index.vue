<template>
  <div class="icu-login-container">
    <div class="left-logo-detail">
      <div>
        <img
          src="../../assets/login-logo.png"
          alt=""
        >
      </div>
      <div
        class="sub-title"
        style="text-align:left;"
      >
        Dandelion
      </div>
      <div class="sub-title">
        手麻临床信息系统
      </div>
    </div>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
      <div class="title">
        用户登录
      </div>
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input v-model="form.username" />
      </el-form-item>

      <el-form-item
        label="密码"
        style="margin-top: 38px"
        prop="password"
      >
        <el-input
          v-model="form.password"
          @keydown.native="enter"
          type="password"
        />
      </el-form-item>

      <el-form-item style="text-align: center;">
        <el-button
          class="login-btn"
          @click="login"
        >
          登录
        </el-button>
      </el-form-item>

      <div
        class="img"
        @click="close"
      >
        <img
          src="../../assets/close.png"
          alt=""
        >
      </div>
    </el-form>

    <div class="version">
      v1.0.0
    </div>
  </div>
</template>

<script>
const { BrowserWindow } = require('electron').remote
const win = BrowserWindow.getAllWindows()[0]

// import { login } from '../../api/login'
// import { setUserToken, setCurrentAccount } from '../../utils/storage'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请正确填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请正确填写密码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // win.setSize(1366, 768)
    // win.setBounds({ width: 1366, height: 768 })
    win.unmaximize()
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // login({
          //   loginName: this.form.username,
          //   loginPwd: this.form.password
          // }).then(res => {
          //   setUserToken(res)
          //   setCurrentAccount(this.form.username)
          //   // this.$router.push('/statistics/operation-quantity')
          //   this.$router.push('/apply/index')

          win.maximize()
          // })
        } else {
          return false
        }
      })
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    close () {
      win.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.icu-login-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/desk.png') no-repeat;
  position: relative;

  .left-logo-detail {
    position: absolute;
    top: 220px;
    left: 320px;
    color: #fff;
    text-align: center;

    img {
      width: 164px;
    }

    .sub-title {
      margin-top: 34px;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .el-form {
    width: 320px;
    height: 510px;
    position: absolute;
    left: 730px;
    top: 200px;

    .title {
      font-size: 28px;
      color: #348BFF;
      margin-bottom: 50px;
    }

    /deep/.el-form-item__label {
      font-size: 24px;
      color: #7E8FA5;
    }

    /deep/.el-input__inner {
      font-size: 20px;
      border: none;
      border-bottom: 1px solid #D5DCE7;
      border-radius: 0;
    }

    .login-btn {
      width: 200px;
      font-size: 24px;
      color: #fff;
      background:rgba(52,139,255,1);
      box-shadow: 3px 6px 23px -2px rgba(51, 138, 255, 0.7);
      border-radius:20px;
      border: none;
      padding: 9px 16px;
      margin-top: 40px;
    }

    .img {
      position: absolute;
      top: -45px;
      right: -40px;
      cursor: pointer;
    }
  }
  .version{
    position:absolute;
    left:450px;
    bottom:200px;
    color:#fff;
    font-size:18px;
  }
}
</style>
