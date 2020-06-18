const pages = {}
const controls = {};
(function () {
  const files = require.context('@/views/TemplateDesigner/Configuration', false, /\.vue$/)
  files.keys().forEach(key => {
    pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  })
})();
(function () {
  const files = require.context('@/views/TemplateDesigner/Control', false, /\.vue$/)
  files.keys().forEach(key => {
    controls[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  })
})()
export { pages, controls }
