<template>
  <div class="common-header-container">
    <div class="logo-container">
      <div class="logo-img">
        <img
          src="../../../assets/tq-logo.svg"
          alt=""
        >
      </div>
      <div class="title">
        <span>Dandelion手术中心</span>
        <span>手术麻醉排班系统</span>
        <!-- Dandelion门诊手术信息系统 -->
      </div>
    </div>

    <div class="header-navs">
      <ul class="navs">
        <li
          v-for="(item, i) in navs"
          :key="i"
          :class="{ 'active': activeIndex == i }"
          @click="jumpstatistics(item,i)"
        >
          <div class="img">
            <i
              class="iconfont"
              :class="item.icon"
            />
          </div>
          <div class="i-title">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </div>

    <div class="handle-container">
      <div class="window-handle">
        <i
          class="iconfont iconyincang-"
          @click="miniWindow"
        />
        <i
          class="iconfont iconsuoxiao-"
          v-show="isMax"
          @click="maxWindow"
        />
        <i
          class="iconfont iconfangdasuoxiao-"
          v-show="!isMax"
          @click="maxWindow"
        />
        <i
          class="iconfont iconguanbi-"
          @click="closeWindow"
        />
      </div>
      <div class="user-info">
        <i class="iconfont icon-yonghu" />
        <span>用户：dyw </span>
        <span
          class="lock"
          @click="$emit('lock')"
        >
          <i class="el-icon-lock" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const {
  BrowserWindow
} = require('electron').remote

const win = BrowserWindow.getAllWindows()[0]

export default {
  data () {
    win.on('maximize', () => {
      this.isMax = true
    })
    win.on('unmaximize', () => {
      this.isMax = false
    })
    return {
      active: 0,
      isMax: win.isMaximized(),
      parentInfo: {
        secMenus: []
      },
      navs: [
        {
          title: '手术排班',
          icon: 'el-icon-s-order',
          route: '/schedule-home/schedule',
          name: 'Schedule',
          index: 0
        },
        {
          title: '手术排班表',
          icon: 'el-icon-s-data',
          route: '/schedule-home/report',
          name: 'ScheduleReport',
          index: 1
        }
      ],
      activeIndex: 0
    }
  },
  props: ['lock'],
  watch: {
    // $route: {
    //   handler (route) {
    //     console.log(route.meta.parent, 'parent')
    //     const index = this.navs.findIndex(item => {
    //       return route.meta.parent === item.name
    //     })
    //     this.active = index
    //   },
    //   immediate: true
    // }
    // menus: {
    //   handler (menus) {
    //     const title = this.navs[this.active].title
    //     console.log(title, 'title')
    //     const name = this.navs[this.active].name
    //     this.parentInfo = this.$store.getters.menus.find(menu => menu.moduleName === title) || {}
    //     const routes = this.$router.options.routes
    //     const current = routes.find(item => {
    //       return name === item.name
    //     })
    //     const navs = current.children.filter(nav => {
    //       return this.parentInfo.secMenus && this.parentInfo.secMenus.find(child => child.perName === nav.meta
    //         .title)
    //     })
    //     if (navs) {
    //       this.$store.dispatch('navs/setNavsItems', navs)
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    // username () {
    //   return this.$store.getters.userinfo.userName
    // },
    // menus () {
    //   const _navs = this.navs.filter(item => {
    //     return this.$store.getters.menus.find(nav => item.title === nav.moduleName)
    //   })
    //   return _navs
    // }
  },
  created () {
    // this.$store.dispatch('user/getCurrentUserInfo')
  },
  methods: {
    miniWindow () {
      // 最小化窗口
      win.minimize()
    },
    maxWindow () {
      const isMax = win.isMaximized()

      if (isMax) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },
    closeWindow () {
      win.close()
    },
    jumpstatistics (item, i) {
      this.activeIndex = i
      if (item.index === 0) {
        this.$router.push('/schedule-home/schedule')
      }
      if (item.index === 1) {
        this.$router.push('/schedule-home/report')
      }
    },
    jump (item, i) {
      this.active = i
      const parentInfo = this.$store.getters.menus.find(menu => menu.moduleName === item.title)
      this.parentInfo = parentInfo
      const routes = this.$router.options.routes
      const current = routes.find(route => {
        return item.name === route.name
      })
      const navs = current.children.filter(nav => {
        return this.parentInfo.secMenus && this.parentInfo.secMenus.find(child => child.perName === nav.meta
          .title)
      })
      if (navs) {
        // console.log(navs, 'dyw')
        this.$store.dispatch('navs/setNavsItems', navs)
      }
      if (this.$store.state.navs.items.length > 0) {
        const name = this.$store.state.navs.items[0].name
        this.$router.push({
          name
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .common-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background: #144177;

    .logo-container {
      flex: 0 0 260px;
      // width:260px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo-img {
        // flex: 1;
        height:69px;
        width:102px;
        // text-align: center;
        // padding: 10px 0 0 10px;
        img{
          // width:100%;
          padding:10px;
          height:100%;
        }
      }

      .title {
        flex:1;
        font-size: 14px;
        display: flex;
        flex-direction: column;
      }
    }

    .header-navs {
      flex: 1;
      font-size: 12px;

      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      li {
        width: 98px;
        height: 70px;
        text-align: center;
        margin-right: 6px;
        position: relative;
        cursor: pointer;
        background:rgba(64,153,240,.7);
        &.active {
          &::after {
            content: '';
            position: absolute;
            left: 41px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid #fff;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
          }
        }

        .img {
          padding-top: 14px;
        }

        i {
          font-size: 24px;
        }

        .i-title {
          margin-top: 12px;
        }
      }
      li.active {
        background:#409EFF;
      }
    }

    .handle-container {
      flex: 1;
      height: 69px;
      position: relative;

      .window-handle {
        text-align: right;
        margin: 4px 16px 0 0;

        .iconfont {
          font-size: 12px;
          margin: 0 4px;
          cursor: pointer;

          &:hover {
            opacity: 0.3;
          }
        }
      }

      .user-info {
        font-size: 12px;
        width: 150px;
        position: absolute;
        bottom: 16px;
        right: 16px;
        text-align: right;

        >i {
          margin-right: 6px;
        }

        .lock {
          margin-left: 10px;
          cursor: pointer;

          i {
            transform: scale(1.5);
          }
        }
      }
    }
  }
</style>
