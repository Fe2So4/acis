<template lang="pug">
  .menu-list(:style="style")
    ul
      li(v-for="(item,index) in menuList" :key="item.value" @click.stop="handleClick(item)")
        span {{item.menuName}}
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    position: {
      type: Object,
      default: function () {
        return {
          positionX: 0,
          positionY: 0
        }
      }
    },
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    style () {
      return {
        left: this.position.positionX + 'px',
        top: this.position.positionY + 'px'
      }
    }
  },
  methods: {
    handleClick (item) {
      this.$emit('handleClick', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .menu-list
    position absolute
    // height 200px
    width 100px
    z-index 10
    background #fff
    border 1px solid #000
    ul
      // height 100%
      // overflow-y auto
      li
        border-bottom 1px solid #000
        font 12px/26px ''
        text-align center
        cursor pointer
        &:last-child
          border-bottom 0
        &:hover
          background #409EFF
</style>
<style lang="stylus">
  .scrollbar .el-scrollbar__wrap
    overflow-x: hidden;
</style>
