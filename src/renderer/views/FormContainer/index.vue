<template>
  <div class="form-container">
    <div class="signs">
      <signs-data />
    </div>
  </div>
</template>
<script>
import SignsData from '@/components/SignsData/index'
export default {
  data () {
    return {
      test: '',
      path: 'ws://192.168.1.157:8081/imserver/10',
      socket: '',
      message: ''
    }
  },
  watch: {
    $route: {
      handler (newVal, old) {
        if (newVal.query.id) {
          this.test = newVal.query.id
        }
      },
      immediate: true
    }
  },
  components: {
    SignsData
  },
  methods: {
    init: function () {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      console.log(msg.data)
      this.message = msg.data
    },
    send: function (params) {
      this.socket.send(params)
    },
    close: function () {
      console.log('socket已经关闭')
    }
  },
  mounted () {
    // 初始化
    // this.init()
  },
  destroyed () {
    // 销毁监听
    // this.socket.onclose = this.close
  }
}
</script>
<style lang="scss" scoped>
    .form-container{
        height:100%;
        width:100%;
        position: relative;
        .signs{
          position: absolute;
          right: 0;
          top:0;
          width: 200px;
          height: 100%;
        }
    }
</style>
