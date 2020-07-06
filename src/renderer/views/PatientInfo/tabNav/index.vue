<template lang="pug">
  .tab-nav
    ul
      li(v-for="(item,index) in navList" :key="item.index" :class="{'isActive': index === navIndex}" @click="handleClick(index)") {{item.label}}
</template>
<script>
export default {
  data () {
    return {
      navList: [
        { label: '患者详情', index: '123' },
        { label: '麻醉记录单', index: '456' },
        { label: '麻醉恢复单', index: '789' }
      ],
      navIndex: 0
    }
  },
  methods: {
    handleClick (index) {
      this.navIndex = index
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-nav
  margin-top 18px
  box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
  border-radius 5px
  background #181C27
  color #9BA3D5
  height 40px
  overflow hidden
  ul
    display flex
    margin-top 4px
    padding-left 15px
    li
      line-height 30px
      cursor pointer
      padding: 0 5px
      font-size 14px
      // transition all 0.3s
      &.isActive
        color #0094ff
        border-bottom 2px solid #0094ff
</style>
