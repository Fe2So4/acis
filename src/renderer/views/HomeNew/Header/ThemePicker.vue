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
// import { renderSync, render } from 'sass'

export default {
  name: 'ThemePicker',
  data () {
    return {}
  },
  computed: {
    ...mapState('Base', ['theme', 'themes']),
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
    // this.loadAllThemeStyle().then(res => {
    //   const styleTag = document.getElementById(this.theme)
    //   if (styleTag) {
    //     document.head.appendChild(styleTag)
    //   }
    // })
  },
  methods: {
    ...mapActions('Base', ['setTheme'])
  }
}
</script>
<style lang='scss' scoped>
</style>
