<template>
  <div class="widgetTextArea">
    <textarea />
  </div>
</template>
<script>
export default {
  name: 'WidgetTextArea',
  components: {}
}
</script>
<style lang="scss" scoped>
.widgetTextArea {
  width: 100%;
  height: 100%;
  textarea {
    width: 100% !important;
    height: 100% !important;
    // line-height: 26px;
    background: transparent;
    margin:unset;
  }
}
</style>
