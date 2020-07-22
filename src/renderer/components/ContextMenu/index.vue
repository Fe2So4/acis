<template lang="pug">
  .menu-list(:style="style" class="clearfix")
    .left
    .right
      el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
        ul
          li(v-for="(item,index) in menuList" :key="index" @click.stop="handleClick(item)")
            span {{item.menuName}}
</template>

<script>
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ]
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
    height 200px
    width 180px
    z-index 10
    background:rgba(30,34,46,1);
    border:1px solid rgba(57, 66, 92, 1);
    box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius:5px;
    .left
      width 30px
      height 100%
      float left
      background #2C3140
      border-radius:5px 0px 0px 5px;
    .right
      float right
      height 100%
      width 148px
      ul
        width 100%
        li
          width 100%
          font 12px/24px ''
          text-indent 9px
          color #9BA3D5
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow hidden
          cursor pointer
          &:last-child
            border-bottom 0
          &:hover
            color #388FF7
</style>
<style lang="stylus">
  .scrollbar .el-scrollbar__wrap
    overflow-x: hidden;
</style>
