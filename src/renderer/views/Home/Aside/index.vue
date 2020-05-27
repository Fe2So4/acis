<template>
  <div class="aside">
    aside123456
    <button @click="onClick">系统配置</button>
  </div>
</template>
<script>

export default {
  name: 'Aside',
  data () {
    return {}
  },
  methods: {
    onClick () {
      this.$electron.ipcRenderer.send('open-new-window', 'ConfigurationSystem', '系统配置')
    }
  }
}
</script>
<style lang="scss" scoped>
.aside {
}
</style>
