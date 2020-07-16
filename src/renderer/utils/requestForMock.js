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
        message: JSON.stringify(err, '', 2)
      })
    })
}
export default request
