<template lang="pug">
  .drug-list(:style="style")
    ul
      el-scrollbar(style="height:100%;" class="scrollbar")
        li(v-for="(item,index) in list" :key="item.code" @click.stop="handleAddDrug(item)")
          span {{item.name}}
</template>

<script>
export default {
  data () {
    return {
      list: [{ name: '利多卡因', code: '0' }, { name: '利多卡因', code: '1' }, { name: '利多卡因', code: '2' }, { name: '利多卡因', code: '3' }]
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
    handleAddDrug (item) {
      this.$emit('handleAddDrug', item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .drug-list
    position absolute
    height 200px
    width 100px
    z-index 10
    background #fff
    border 1px solid #000
    ul
      height 100%
      overflow-y auto
      li
        border-bottom 1px solid #000
        font 12px/26px ''
        text-align center
        cursor pointer
        &:hover
          background #409EFF
</style>
<style lang="stylus">
  .scrollbar .el-scrollbar__wrap
    overflow-x: hidden;
</style>
