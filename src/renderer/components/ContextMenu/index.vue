<template lang="pug">
  .menu-list(:style="style" class="clearfix" v-if="drugListVisible" @click.stop="")
    .left
    .right
      el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
        ul
          li(v-for="(item,index) in menuList" :key="index" @click.stop="handleClick(item)")
            span {{item.menuName}}
    //- .mask
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
    drugListVisible: {
      type: Boolean,
      default: false
    },
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
  },
  mounted () {
    const that = this
    document.body.onclick = function () {
      that.$emit('update:drugListVisible', false)
    }
    // if (this.drugListVisible) {
    //   document.body.oncontextmenu = function () {
    //     // console.log('触发')
    //     window.event.returnvalue = false
    //     return false
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme";
  .menu-list{
    position:absolute;
    height:200px;
    width:180px;
    z-index:10;
    @include theme-property('background', $background-dialog);
    @include theme-property('border-color', $dateTimePicker-color-border);
    box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius:5px;
    .left{
      width:30px;
      height:100%;
      float:left;
      @include theme-property('background', $dateTimePicker-color-background);
      // @include theme-property('background', $background-dialog);
      // background #2C3140
      border-radius:5px 0px 0px 5px;
    }
    .right{
      float: right;
      height: 100%;
      width: 148px;
      ul{
        width:100%;
        li{
          width:100%;
          font:12px/24px '';
          text-indent:9px;
          @include theme-property('color', $color-text-regular);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow:hidden;
          cursor:pointer;
          &:last-child{
            border-bottom:0;
          }
          &:hover{
            @include theme-property('color', $color-text-primary);
          }
        }
      }
    }
    .mask{
      position: fixed;
      top: 0;
      bottom:0;
      left: 0;
      right: 0;
      z-index: 9;
    }
  }
</style>
<style lang="stylus">
  .scrollbar .el-scrollbar__wrap
    overflow-x: hidden;
</style>
