<template>
  <div class="widgetLine">
    <hr class="line">
  </div>
</template>
<script>
export default {
  name: 'WidgetInput',
  components: {}
}
</script>
<style lang="scss" scoped>
.widgetLine {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .line {
    width: 100%;
    height: 1px;
    background: black;
  }
}
</style>
