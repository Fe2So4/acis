<template>
  <div
    class="widgetLine"
    :class="{'horizontal':direction==='2' ? true:''}"
  >
    <hr
      class="line"
      :class="{'vertical':direction==='2' ? true:''}"
    >
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('PageTemplateDesigner')
export default {
  name: 'WidgetInput',
  components: {},
  computed: {
    ...mapState({
      direction: state => state.direction
    })
  },
  watch: {
    direction (newVal, old) {
      return newVal
    }
  }
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
    margin:unset;
    border: unset;
  }
  .vertical{
    width: 1px;
    height: 100%;
  }
}
.horizontal{
  flex-direction: row;
}
</style>
