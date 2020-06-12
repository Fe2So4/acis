<template>
  <div class="widgetInput">
    <input
      class="input"
      type="text"
      placeholder="this is input"
    >
  </div>
</template>
<script>
export default {
  name: 'WidgetInput',
  components: {}
}
</script>
<style lang="scss" scoped>
.widgetInput {
  width: 100%;
  height: 100%;
  border: 1px solid #e6e6e6;
  .input {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
  }
}
</style>
