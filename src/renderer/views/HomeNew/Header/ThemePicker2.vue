<template>
  <div>
    <el-radio-group
      v-model="colorTheme"
    >
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
export default {
  name: 'ThemePicker',
  data () {
    const themes = Object.freeze([
      {
        name: '深蓝',
        value: 'dark-blue',
        color: '#0093ff'
      },
      {
        name: '深灰',
        value: 'dark-gray',
        color: '#fb6715'
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
        import(`@/styles/element-variables-${value}.scss`).then(
          module => {
            console.log(module)
            for (var a in module) {
              console.log(a)
            }
          }
        )
      }
    }
  },
  methods: {
    ...mapActions('Base', ['setTheme'])
  }

}

</script>
<style lang='scss' scoped>
</style>
