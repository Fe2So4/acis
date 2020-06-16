const pages = {};
(function () {
  const files = require.context('@/views/TemplateDesigner/Configuration', false, /\.vue$/)
  files.keys().forEach(key => {
    pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  })
})()
export { pages }
