<template>
  <div class="common-header-container">
    <div class="logo-container">
      <div class="title">
        <p>Dandelion智慧手术中心<i />智能排班</p>
      </div>
      <div class="logo-img">
        <img
          src="@/assets/tq.png"
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
                  style="background:#2E96F7;"
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
      </ul>
    </div>
    <div class="options">
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
import { synchroApply, synchroPatient } from '@/api/schedule'
import request from '@/utils/requestForMock'
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
          index: 1
        },
        {
          title: '手术排班表',
          icon: 'el-icon-s-data',
          route: '/schedule-home/report',
          name: 'ScheduleReport',
          index: 2
        },
        {
          title: 'HIS同步',
          icon: 'el-icon-s-data',
          route: '/schedule-home/report',
          name: 'ScheduleReport',
          index: 3
        }
      ],
      activeIndex: 1,
      iconMax: 'icon-icon_min2'
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
  methods: {
    async synchro () {
      await request({
        url: synchroApply,
        params: {
          start: 10,
          end: 10
        }
      })
      //
      request({
        url: synchroPatient,
        params: {
          start: 10,
          end: 10
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '同步成功' })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    handleChange (item) {
      this.activeIndex = item.index
      if (item.index === 1) {
        this.$router.push('/schedule-home/schedule')
      }
      if (item.index === 2) {
        this.$router.push('/schedule-home/report')
      }
      if (item.index === 3) {
        this.synchro()
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
      } else {
        win.maximize()
      }
    },
    closeWindow () {
      win.close()
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

  .common-header-container {
    display: flex;
    position: relative;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    // background: #144177;
    background:rgba(18,20,33,1);
    box-shadow:4px 3px 5px 0px rgba(0, 0, 0, 0.4);
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
        color:#0094FF;
        line-height: 24px;
        p{
          margin:0;
          i{
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #388FF7;
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
            color:#fff;
            font-size: 18px;
            line-height:30px;
            text-align: center;
          }
        }
        .nav-title{
          color:#9BA3D5;
          font-size:16px;
          line-height: 30px;
          // margin-left:10px;
          // line-height: 28px;
        }
      }
      li.active {
        .nav-title{
          color:#388FF7;
        }
      }
      li:hover{
        .nav-title{
          color:#388FF7;
        }
      }
    }
    .options{
      position: absolute;
      right: 0;
      top: 5px;
      i{
        -webkit-app-region: no-drag;
        font-size:18px;
        font-weight: bold;
        color:#0094ff;
        margin-right:20px;
        cursor: pointer;
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
