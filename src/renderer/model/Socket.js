import io from 'socket.io-client'
import { getSocketData } from '@/api/medicalDocument'

export const Socket = {
  instance: null,
  create (loginUserNum) {
    this.instance = io(getSocketData, {
      query: {
        loginUserNum
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
