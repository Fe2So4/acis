const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let dataName = key.replace(/(\.\/|\.js)/g, '')
  dataName = dataName.split('_').map((str, index) => {
    if (index) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    return str
  }).join('')
  modules[dataName] = files(key).default
})

export default modules
