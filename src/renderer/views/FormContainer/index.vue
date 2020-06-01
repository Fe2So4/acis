<template>
  <div class="form-container">
    {{ test }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      test: ''
    }
  },
  watch: {
    $route: {
      handler (newVal, old) {
        this.test = newVal.query.id
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
    .form-container{
        height:100%;
        width:100%;
    }
</style>
