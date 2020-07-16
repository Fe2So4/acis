import axios from 'axios'
import { Message } from 'element-ui'
function request (options) {
  return axios(options)
    .then(res => {
      return res
    })
    .catch(err => {
      Message({
        type: 'error',
        message: err
      })
    })
}
export default request
