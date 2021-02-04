<template>
  <div class="signs-data">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
      <div class="list">
        <template v-for="(item,index) in signsList">
          <div
            :style="{color:item.itemColor}"
            :key="index+item.itemName"
            class="name"
          >
            {{ item.itemName }}
          </div>
          <div
            :style="{color:item.itemColor}"
            :key="index+item.itemUnit"
            class="unit"
          >
            {{ item.itemUnit }}
          </div>
          <div
            class="value"
            :style="{color:item.itemColor,fontSize:/\//g.test(item.itemValue) ? '30px' : '40px'}"
            :key="index+item.itemValue"
          >
            {{ item.itemValue==='' ? '--' : item.itemValue }}
          </div>
        </template>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { getSignItemList } from '@/api/signData'
import request from '@/utils/requestForMock'
import { mapGetters } from 'vuex'
import { Socket } from '@/model/Socket'
export default {
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      signsList: [],
      wrapStyle,
      socket: null
    }
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  beforeDestroy () {
    if (this.socket) {
      this.socket = null
    }
  },
  methods: {
    getList () {
      request({
        url: getSignItemList
      }).then((res) => {
        const data = res.data.data
        data.forEach((item) => {
          item.itemValue = ''
        })
        this.signsList = data
      })
    },
    getSocket () {
      const loginUserNum = this.operationId
      this.socket = Socket.getInstance()
      console.log('触发', 'sign2')
      if (!this.socket) return
      // 体征数据
      const that = this
      console.log('触发', 'sign')
      this.socket.on('push_monitor_event_realtime', (res) => {
        console.log(res)
        if (Array.isArray(res)) {
          // 回应socket.io
          that.socket.emit('push_monitor_event_realtime', {
            loginUserNum,
            content: res
          })
          res.forEach((item) => {
            this.signsList.forEach((_item) => {
              if (_item.itemCode === item.itemCode) {
                _item.itemValue = item.itemValue
              }
            })
          })
        }
      })
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    if (this.operationId !== '') {
      this.getSocket()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
$box-shadow-signs: (
  "dark-gray": -5px 1px 5px 0px rgba(0, 0, 0, 0.4),
  "dark-blue": -5px 1px 5px 0px rgba(0, 0, 0, 0.4),
  "light-white": -4px 2px 5px 0px rgba(0, 0, 0, 0.1),
);
$color-background-signs: (
  "dark-gray": #363638,
  "dark-blue": #121421,
  "light-white": #454546,
);
@media all and (orientation: portrait) {
  .signs-data {
    .el-scrollbar {
      width: 100%;
      .list {
        grid-auto-flow: column;
        grid-template-rows: 1fr 1fr;
        .value {
          grid-row: 1 / span 2;
          grid-column: unset;
          padding: 0 30px 0 10px;
          height: 60px;
        }
      }
    }
  }
}
.signs-data {
  width: 100%;
  height: 100%;
  background: #121421;
  @include theme-property("box-shadow", $box-shadow-signs);
  @include theme-property("background", $color-background-signs);
  .list {
    display: grid;
    height: calc(100% - 26px);
    padding: 20px;
    grid-template-columns: 1fr 1fr;
    text-align: right;
    .name,
    .unit {
      font-size: 14px;
      white-space: nowrap;
    }
    .value {
      font-weight: bold;
      grid-column: 1 / span 2;
      padding-bottom: 10px;
      white-space: nowrap;
    }
  }
}
</style>
