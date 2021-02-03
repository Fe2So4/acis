import io from 'socket.io-client'
import { getSocketData, getSocketRoom } from '@/api/medicalDocument'

export const Socket = {
  instance: null,
  create (loginUserNum) {
    const operationId = `1_${loginUserNum}`
    this.instance = io(getSocketData, {
      query: {
        loginUserNum: operationId
      }
    })
    this.instance.on('connect', () => {
      console.log('socket.io connected')
    })
    this.instance.on('reconnect_error', e => {
      console.error(e)
    })
    this.instance.on('disconnect', () => {
      console.log('socket.io disconnect')
    })
  },
  getInstance () {
    return this.instance
  },
  close () {
    this.instance.close()
    this.instance = null
  }
}
export const SocketRoom = {
  instance: null,
  create (loginUserNum) {
    const operationId = `2_${loginUserNum}`
    this.instance = io(getSocketRoom, {
      query: {
        loginUserNum: operationId
      }
    })
    this.instance.on('connect', () => {
      console.log('socket.io connected room')
    })
    this.instance.on('reconnect_error', e => {
      console.error(e)
    })
    this.instance.on('disconnect', () => {
      console.log('socket.io disconnect room')
    })
  },
  getInstance () {
    return this.instance
  },
  close () {
    this.instance.close()
    this.instance = null
  }
}
