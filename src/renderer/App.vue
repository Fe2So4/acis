<template>
  <div
    id="app"
    ref="app"
    @click="hanldeClick"
  >
    <router-view />
  </div>
</template>

<script>
// import '@/mock/mockData'
import { mapState } from 'vuex'
import { renderSync, render } from 'sass'
import $bus from '@/utils/bus'
import { getUserToken } from './utils/storage'
import { ipcRenderer } from 'electron'
import { ftpUploadAnesPDF } from '@/api/blood'
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
    this.$electron.ipcRenderer.on('reply', (e, data) => {
      var xhr = new XMLHttpRequest()

      xhr.open(
        'POST',
        ftpUploadAnesPDF +
          `/${this.$router.currentRoute.params.operationId}/${this.$router.currentRoute.params.flag}`
      )
      xhr.setRequestHeader('Authorization', getUserToken())

      xhr.overrideMimeType('application/octet-stream')
      // 直接发送二进制数据
      xhr.onreadystatechange = function (data) {
        // 判断是否服务器响应
        if (xhr.readyState === 4 && xhr.status === 200) {
          const res = JSON.parse(data.currentTarget.response)
          if (res.code === 200) {
            console.log('上传成功')
            ipcRenderer.send('upLoadSuccess', '1')
          } else {
            console.log('上传失败')
            ipcRenderer.send('upLoadSuccess', '2')
          }
        }
      }
      if (xhr.sendAsBinary) {
        xhr.sendAsBinary(data)
      } else {
        xhr.send(data)
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
          `themes/${theme}/index-${process.env.NODE_ENV}.scss`
        )

        const result = renderSync({
          file: themeFilePath
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
      return Promise.all(
        this.themes.map(theme => {
          return this.getCSSString(theme.value)
        })
      ).then(strings => {
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
    },
    hanldeClick () {
      $bus.$emit('hidenMenu')
    }
  }
}
</script>

<style lang="scss"></style>
