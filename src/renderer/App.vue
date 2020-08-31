<template>
  <div
    id="app"
  >
    <router-view />
  </div>
</template>

<script>
// import '@/mock/mockData'
import { mapState } from 'vuex'
import { renderSync, render } from 'node-sass'
export default {
  name: 'Acis',
  computed: {
    ...mapState('Base', ['theme', 'themes'])
  },
  watch: {
    theme: {
      handler: function (val) {
        this.themes.forEach(({ value }) => {
          document.body.classList.remove(value)
        })
        document.body.classList.add(val)
      },
      immediate: true
    }
  },
  created () {
    this.$electron.ipcRenderer.on('route', (e, locationName) => {
      if (locationName) {
        this.$router.push({
          name: locationName
        })
      }
    })
    this.$electron.ipcRenderer.on('printRoute', (e, printRoute) => {
      if (printRoute) {
        this.$router.push(printRoute)
      }
    })
    // 加载所有css并默认调整一次
    this.loadAllThemeStyle().then(res => {
      const styleTag = document.getElementById(this.theme)
      if (styleTag) {
        document.head.appendChild(styleTag)
      }
    })
  },
  methods: {
    getCSSString (theme) {
      return new Promise((resolve, reject) => {
        const themeFilePath = require('path').resolve(
          __static,
          '../src/renderer/styles/themes'
        )
        const result = renderSync({
          file: `${themeFilePath}/${theme}.scss`
        })
        resolve(result.css.toString())
      })
    },
    // 加载所有样式文件
    loadAllThemeStyle () {
      // this.themes.forEach(async (theme) => {
      //   let styleTag = document.getElementById(theme.value)
      //   if (!styleTag) {
      //     const string = await this.getCSSString(theme.value)
      //     styleTag = document.createElement('style')
      //     styleTag.setAttribute('id', theme.value)
      //     styleTag.innerText = string
      //     document.head.appendChild(styleTag)
      //   }
      // })
      return Promise.all(this.themes.map(theme => {
        return this.getCSSString(theme.value)
      })).then(strings => {
        this.themes.forEach((theme, index) => {
          const styleTag = document.createElement('style')
          styleTag.setAttribute('id', theme.value)
          styleTag.innerText = strings[index]
          document.head.appendChild(styleTag)
        })
      })
    },
    // 异步获取css字符串
    getCssStringAsync (theme) {
      return new Promise((resolve, reject) => {
        const themeFilePath = require('path').resolve(
          __static,
          '../src/renderer/styles'
        )
        render(
          {
            file: `${themeFilePath}/element-variables-${theme}.scss`
          },
          (err, result) => {
            if (err) {
              reject(err)
            }
            resolve(result.css.toString())
          }
        )
      })
    }
  }
}
</script>

<style lang="scss">

</style>
