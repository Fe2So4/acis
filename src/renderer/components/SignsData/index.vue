<template>
  <div class="signs-data">
    <div class="title">
      体征数据
    </div>
    <ul>
      <el-scrollbar
        style="height: 100%"
        :wrap-style="wrapStyle"
      >
        <li
          v-for="(item,index) in signsList"
          :key="index"
        >
          <p :style="{color:item.itemColor}">
            <span>{{ item.itemName }}</span>
            <span>{{ item.itemUnit }}</span>
          </p>
          <p :style="{color:item.itemColor}">
            {{ item.itemValue==='' ? '-' : item.itemValue }}
          </p>
        </li>
      </el-scrollbar>
    </ul>
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
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.itemValue = ''
        })
        this.signsList = data
      })
    },
    getSocket () {
      const loginUserNum = this.operationId
      this.socket = Socket.getInstance()
      // 体征数据
      const that = this
      this.socket.on('push_monitor_event_realtime', res => {
        if (Array.isArray(res)) {
          // 回应socket.io
          that.socket.emit('push_monitor_event_realtime', {
            loginUserNum,
            content: res
          })
          res.forEach(item => {
            this.signsList.forEach(_item => {
              if (_item.itemCode === item.itemCode) {
                _item.itemValue = item.itemValue
              }
            })
          })
        }
      })
    }
  },
  mounted () {
    this.getList()
    if (this.operationId !== '') {
      this.getSocket()
    }
  }
}
</script>
<style lang="scss" scoped>
    .signs-data{
        width: 100%;
        height: 100%;
        background: #121421;
        box-shadow:-5px 1px 5px 0px rgba(0, 0, 0, 0.4);
        .title{
            font-size: 14px;
            line-height: 26px;
            padding-left: 5px;
            color:#FEFEFF;
        }
        ul {
            height: calc(100% - 26px);
            padding-top: 10px;
            li{
                margin-bottom:5px;
                p{
                    font-size: 16px;
                    font-weight: 600;
                    margin:0;
                    line-height: 26px;
                    display: flex;
                    justify-content: space-between;
                    padding:0 10px;
                    line-height:28px;
                    &:first-child{
                      text-align: left;
                    }
                    &:last-child{
                      justify-content: end;
                      text-align: right;
                      font-size: 40px;
                      line-height:50px;
                    }
                }
            }
        }
    }
</style>
