<template>
  <div class="common-layout-container">
    <el-container>
      <el-header height="90px">
        <Header @lock="lock" />
      </el-header>
      <el-container>
        <!-- <transition name="fade">
          <el-aside
            v-show="hasNavs"
            width="200px"
          >
            <Navs />
          </el-aside>
        </transition> -->
        <el-main :class="{ 'no-border': noBorder }">
          <transition
            name="fade"
            mode="out-in"
          >
            <!-- <keep-alive include="scheduling"> -->
            <router-view />
            <!-- </keep-alive> -->
          </transition>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="760px"
      top="25vh"
      custom-class="lock-dialog"
    >
      <div class="unlock-container">
        <div class="logo-box">
          <img
            src="../../assets/tongqian.png"
            alt=""
          >
        </div>
        <el-form :inline="true">
          <el-form-item label="用户名称">
            <el-input
              v-model="username"
              disabled
              style="width: 209px;"
            />
          </el-form-item>

          <el-form-item label="解锁密码">
            <el-input
              v-model="password"
              @keydown.native="enter"
              style="width: 209px;"
              type="password"
            />
          </el-form-item>

          <el-form-item style="text-align: center; width: 100%;">
            <el-button
              type="primary"
              @click="login"
              style="padding: 9px 20px;"
            >
              确 定
            </el-button>
            <el-button
              style="padding: 9px 20px;"
              @click="$router.push('/')"
            >
              切 换
            </el-button>
            <el-button
              @click="close"
              style="padding: 9px 20px;"
            >
              退 出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from './Header/index'
// import UserInfo from './UserInfo/index'
// import Navs from './navs'
import { debounce } from '../../utils/index'
import { login } from '../../api/login'
import { getCurrentAccount } from '../../utils/storage'
const { BrowserWindow } = require('electron').remote
const win = BrowserWindow.getAllWindows()[0]

export default {
  name: 'AppMain',
  data () {
    return {
      hasNavs: true,
      noBorder: false,
      dialogVisible: false,
      username: getCurrentAccount(),
      password: ''
    }
  },
  computed: {
    // key () {
    //   return this.$route.path
    // }
  },
  watch: {
    $route: {
      handler (route) {
        if (route.meta && route.meta.noNavs) {
          this.hasNavs = false
        } else {
          this.hasNavs = true
        }

        if (route.meta && route.meta.noBorder) {
          this.noBorder = true
        } else {
          this.noBorder = false
        }
      },
      immediate: true
    }
  },
  components: {
    Header
    // UserInfo,
    // Navs
  },
  mounted () {
    const time = 10 * 60 * 1000
    let timer
    const lock = debounce(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.dialogVisible = true
      }, time)
    }, 5000)

    document.body.addEventListener('mousemove', () => {
      lock()
    })
  },
  methods: {
    login () {
      login({
        loginName: this.username,
        loginPwd: this.password
      }).then(res => {
        this.dialogVisible = false
        this.password = ''
      })
    },
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    close () {
      win.close()
    },
    lock () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}

.el-main {
  padding: 0;
  height: calc(100vh - 90px);
  border: 10px solid #000;
  overflow: auto;
  background: #000;

  &.no-border {
    border: none;
  }
}

.el-aside {
  background: #263754;
  width:200px;
}

.el-dialog__wrapper {

  /deep/ .lock-dialog {
    height: 420px;
    background: url('../../assets/lock_bg.png') no-repeat center;
    box-shadow: none;
  }

  .unlock-container {
    margin: 0 150px 59px;
    padding: 24px 50px 15px;
    background: #fff;
    border-radius: 8px;

    .el-form {
      margin-top: 20px;

      /deep/ .el-form-item__label {
        font-size: 16px;
      }

      /deep/ input {
        height: 40px;
        line-height: 40px;
      }

      .el-button {
        font-size: 16px;
        padding: 9px 40px;
      }
    }
  }
}
.common-layout-container /deep/ .el-dialog__wrapper{
  // backdrop-filter:saturate(180%) blur(20px);
}
.common-layout-container{

}
</style>
