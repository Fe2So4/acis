const { ipcRenderer } = require('electron')
ipcRenderer.on('print-page-ready-reply-test', (e, html, css, options) => {
  const link = document.querySelector('link')
  link.href = css
  document.getElementById('printContent').innerHTML = html
  utilsDebounce(() => {
    let title = ''
    if (css.includes('jichu')) {
      title = '护理记录单单据(基础)'
    }
    if (css.includes('teshu')) {
      title = '护理记录单单据(特殊)'
    }
    if (css.includes('two')) {
      title = '护理记录单(二)'
    }
    if (css.includes('security-check')) {
      title = '安全核查记录单'
    }
    if (css.includes('transit-transfer')) {
      title = '转运交接单'
    }
    ipcRenderer.send('did-finish-load', options, title)
  }, 500)
})
ipcRenderer.send('print-page-ready-test')
console.log(11111111)
let timeout = null
function utilsDebounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}
