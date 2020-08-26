<template>
  <div>
    <el-radio-group v-model="colorTheme">
      <el-radio
        v-for="_theme in themes"
        :key="_theme.value"
        :label="_theme.value"
      >
        {{ _theme.name }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { renderSync, render } from 'sass'
export default {
  name: 'ThemePicker',
  data () {
    const themes = Object.freeze([
      {
        name: '深蓝',
        value: 'dark-blue'
      },
      {
        name: '深灰',
        value: 'dark-gray'
      }
    ])
    return {
      themes
    }
  },
  computed: {
    ...mapState('Base', ['theme']),
    colorTheme: {
      get () {
        return this.theme
      },
      set (value) {
        this.setTheme(value)
      }
    }
  },
  watch: {
    theme: {
      handler (value) {
        const styleTag = document.getElementById(value)
        if (styleTag) {
          document.head.appendChild(styleTag)
        }
      }
    }
  },
  created () {
    this.loadAllThemeStyle().then(res => {
      const styleTag = document.getElementById(this.theme)
      if (styleTag) {
        document.head.appendChild(styleTag)
      }
    })
  },
  methods: {
    ...mapActions('Base', ['setTheme']),
    getCSSString (theme) {
      return new Promise((resolve, reject) => {
        const themeFilePath = require('path').resolve(
          __static,
          '../src/renderer/styles'
        )
        const result = renderSync({
          file: `${themeFilePath}/element-variables-${theme}.scss`
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
<style>
</style>
