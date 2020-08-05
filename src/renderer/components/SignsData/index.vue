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
import {
  getSocketData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import io from 'socket.io-client'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      signsList: [],
      // signsList: [{ itemName: '心率', unit: 'bpm', value: '87', color: '#18B24E' },
      //   { itemName: 'PULSE', unit: 'bpm', value: '70', color: '#18B24E' },
      //   { itemName: '动脉平均压', unit: 'bpm', value: '70', color: '#18B24E' },
      //   { itemName: '呼吸', unit: '次/分', value: '18', color: '#5BB9F5' },
      //   { itemName: '动脉压', unit: 'mmHg', value: '114/56', color: '#F0E34E' },
      //   { itemName: '无创压', unit: 'mmHg', value: '90/63', color: '#F0E34E' },
      //   { itemName: '体温', unit: '℃', value: '36.3', color: '#5BB9F5' },
      //   { itemName: 'ETCO2', unit: '次/分', value: '33', color: '#F0E34E' },
      //   { itemName: 'FiO2', unit: 'L/min', value: '26', color: '#F73D3D' }
      // ],
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      socket: null
    }
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  beforeDestroy () {
    console.log('socket close')
    if (this.socket) {
      this.socket.close()
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
      // const loginUserNum = 'b0f9d8bda9244397a44cb8ff278937d9'
      // console.log(getSocketData)
      const loginUserNum = this.operationId
      this.socket = io(getSocketData, {
        query: {
          loginUserNum
        }
      })
      this.socket.on('connect', () => {
        console.log('socket.io connected')
      })
      this.socket.on('reconnect_error', e => {
        console.error(e)
      })
      this.socket.on('disconnect', () => {
        console.log('socket.io disconnect')
      })
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
