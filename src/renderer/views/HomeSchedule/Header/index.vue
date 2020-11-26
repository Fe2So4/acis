<template>
  <div class="common-header-container">
    <div class="logo-container">
      <div class="title">
        <p>Dandelion智慧手术中心<i />智能排班</p>
      </div>
      <div class="logo-img">
        <img
          src="@/assets/hs_logo.png"
          alt=""
        >
      </div>
    </div>
    <div class="header-navs">
      <ul class="navs">
        <li
          @click="handleChange(item)"
          v-for="item in navs"
          :key="item.index"
          :class="{'active':activeIndex===item.index}"
        >
          <div class="icon">
            <div class="IconF">
              <div class="IconS">
                <div
                  class="IconT"
                >
                  {{ item.index }}
                </div>
              </div>
            </div>
          </div>
          <div class="nav-title">
            {{ item.title }}
          </div>
        </li>
        <el-button
          @click="handleAsync"
          type="primary"
          size="mini"
          icon="el-icon-refresh"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-background="rgba(255, 255, 255, 0.5)"
          element-loading-text="数据同步中"
        >
          HIS同步
        </el-button>
      </ul>
    </div>
    <div class="options">
      <theme-picker />
      <i
        class="el-icon-minus"
        @click="miniWindow"
      />
      <i
        class="iconfont icon-icon_min"
        :class="iconMax"
        @click="maxWindow"
      />
      <i
        class="el-icon-close"
        @click="closeWindow"
      />
    </div>
  </div>
</template>

<script>
import ThemePicker from './ThemePicker'
import { synchroApply } from '@/api/schedule'
import request from '@/utils/requestForMock'
import throttle from 'lodash/throttle'
import $bus from '@/utils/bus'
const {
  BrowserWindow, dialog
} = require('electron').remote

const win = BrowserWindow.getAllWindows()[0]

export default {
  components: {
    ThemePicker
  },
  data () {
    win.on('maximize', () => {
      this.isMax = true
    })
    win.on('unmaximize', () => {
      this.isMax = false
    })
    return {
      active: 0,
      fullscreenLoading: false,
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
          index: 1
        },
        {
          title: '手术排班表',
          icon: 'el-icon-s-data',
          route: '/schedule-home/report',
          name: 'ScheduleReport',
          index: 2
        }
        // {
        //   title: 'HIS同步',
        //   icon: 'el-icon-s-data',
        //   route: '/schedule-home/report',
        //   name: 'ScheduleReport',
        //   index: 3
        // }
      ],
      activeIndex: 1,
      iconMax: 'icon-icon_max'
    }
  },
  props: {
    lock: {
      type: Boolean
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
  },
  mounted () {
    this.synchro()
  },
  methods: {
    synchro () {
      this.fullscreenLoading = true
      request({
        url: synchroApply,
        params: {
          start: 5,
          end: 5
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.fullscreenLoading = false
          this.$confirm('同步成功', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            customClass: 'messageBox',
            confirmButtonClass: 'el-button--mini',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false
          }).then(() => {
            $bus.$emit('getApplyData')
          })
        } else {
          this.$confirm('同步失败', '提示', {
            confirmButtonText: '确定',
            type: 'error',
            customClass: 'messageBox',
            confirmButtonClass: 'el-button--mini',
            showCancelButton: false,
            showClose: false,
            closeOnClickModal: false
          }).then(() => {
          })
        }
      })
    },
    handleAsync: throttle(function () {
      this.synchro()
    }, 5000, {
      leading: true,
      trailing: false
    }),
    handleChange (item) {
      this.activeIndex = item.index
      if (item.index === 1) {
        this.$router.push('/schedule-home/schedule')
      }
      if (item.index === 2) {
        this.$router.push('/schedule-home/report')
      }
    },
    miniWindow () {
      // 最小化窗口
      win.minimize()
    },
    maxWindow () {
      const isMax = win.isMaximized()
      if (isMax) {
        win.unmaximize()
        this.iconMax = 'icon-icon_min2'
      } else {
        win.maximize()
        this.iconMax = 'icon-icon_max'
      }
    },
    closeWindow () {
      dialog.showMessageBox({
        type: 'warning',
        // 按钮文字
        buttons: ['确认', '取消'],
        // 默认选择的按钮索引值
        defaultId: 1,
        title: '警告',
        message: '是否确认退出当前程序',
        // 触发退出的索引值
        cancelId: 1
      }).then(
        res => {
          if (res.response === 0) {
            win.close()
          }
        }
      )
    },
    jumpstatistics (item, i) {
      this.activeIndex = i
      if (item.index === 1) {
        this.$router.push('/schedule-home/schedule')
      }
      if (item.index === 2) {
        this.$router.push('/schedule-home/report')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/theme";
  .common-header-container {
    display: flex;
    position: relative;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    @include theme-property("background", $color-background-aside);
    @include theme-property("box-shadow", $box-shadow-aside);
    .logo-container {
      padding-left:10px;
      width:354px;
      .logo-img {
        height:40px;
        width:152px;
        margin-top: 10px;
        img{
          width:100%;
          height:100%;
        }
      }
      .title {
        font-size: 12px;
        @include theme-property("color", $color-text-primary);
        line-height: 24px;
        p{
          margin:0;
          i{
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            vertical-align: middle;
            @include theme-property("background", $color-primary);
            margin:0 4px;
          }
        }
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
        margin-right:80px;
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        .icon{
          // width: 30px;
          // height: 34px;
          .IconF,.IconS,.IconT{
            width: 60px;
            height: 30px;
            overflow: hidden;
            margin: 0 auto;
          }
          .IconF{
            transform: rotate(120deg);
            -ms-transform: rotate(120deg);
            -moz-transform: rotate(120deg);
            -webkit-transform: rotate(120deg);
            // border:1px solid #fff;
          }
          .IconS{
            // border:1px solid #fff;
            transform: rotate(-60deg);
            -ms-transform: rotate(-60deg);
            -moz-transform: rotate(-60deg);
            -webkit-transform: rotate(-60deg);
          }
          .IconT{
            // border:1px solid #fff;
            transform: rotate(-60deg);
            -ms-transform: rotate(-60deg);
            -moz-transform: rotate(-60deg);
            -webkit-transform: rotate(-60deg);
            @include theme-property("background", $color-primary);
            color:#fff;
            font-size: 18px;
            line-height:30px;
            text-align: center;
          }
        }
        .nav-title{
          // color:#9BA3D5;
          @include theme-property("color",  $color-text-regular);
          font-size:16px;
          line-height: 30px;
          // margin-left:10px;
          // line-height: 28px;
        }
      }
      li.active {
        .nav-title{
          color:#388FF7;
          @include theme-property("color", $background-hover-event-list);
        }
      }
      li:hover{
        .nav-title{
          @include theme-property("color", $background-hover-event-list);
        }
      }
    }
    .options{
      position: absolute;
      right: 0;
      top: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        -webkit-app-region: no-drag;
        font-size:18px;
        font-weight: bold;
        @include theme-property("color", $color-primary);
        margin-right:20px;
        cursor: pointer;
        &:nth-last-child(3){
          margin-left: 20px;
        }
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
<style>
  .messageBox{
    width: 220px !important;
  }
</style>
