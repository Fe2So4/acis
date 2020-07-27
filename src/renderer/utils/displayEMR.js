const fs = require('fs')
const { ipcRenderer } = require('electron')

export default (name, htmlStr) => {
  htmlStr = htmlStr.replace(/charset=gb2312/g, 'charset=utf-8')
  fs.writeFile(`${__static}/EMR/${name}.html`, htmlStr, 'utf8', function (
    error
  ) {
    if (error) {
      console.log(error)
      return false
    }
    console.log('写入成功')
    ipcRenderer.send('show-EMR', name)
  })
}
