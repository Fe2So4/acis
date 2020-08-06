<template>
  <transition
    name="el-message-fade"
  >
    <div
      class="tooltip"
      ref="tooltip"
      :style="positionStyle"
    >
      <slot>
        <p
          v-if="!dangerouslyUseHTMLString"
        >
          {{ message }}
        </p>
        <p
          v-else
          v-html="message"
        />
      </slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Tooltip',
  data () {
    return {
      message: '',
      dangerouslyUseHTMLString: false,
      positionX: 0,
      positionY: 0
    }
  },
  computed: {
    positionStyle () {
      return {
        left: `${this.positionX}px`,
        top: `${this.positionY}px`
      }
    }
  }
}

</script>
<style lang='scss' scoped>
.tooltip{
  position: absolute;
  padding: 10px;
  border-radius: 4px;
  background: rgba(0,0,0,0.8);
  color: white;
  p {
    margin: 0;
    font-size: 12px;
  }
}
</style>
