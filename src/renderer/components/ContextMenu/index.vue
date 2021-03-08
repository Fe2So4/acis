<template lang="pug">
  .menu-list(v-if="drugListVisible" :style="style" class="clearfix")
    .left
    .right
      el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
        ul
          li
            el-input(size="mini" placeholder="输入内容,回车查询" class="searchInput" v-model="searchName" ref="searchName" @keyup.enter.native="enterInput")
          li(v-for="(item,index) in menuList" :key="index" @click.stop="handleClick(item)")
            span {{item.menuName}}
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
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
    drugListVisible: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: ''
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
  watch: {
    drugListVisible (val) {
      console.log(val)
      if (val === true) {
        this.$refs.searchName.focus()
      } else {
        this.searchName = ''
      }
    }
  },
  methods: {
    enterInput () {
      if (this.type === '0') {
        this.$emit('emitgetDrug', this.searchName)
      } else {
        this.$emit('emitgetinfusion', this.searchName)
      }
      console.log(this.type, this.searchName)
    },
    handleClick (item) {
      this.$emit('handleClick', item)
    },
    handleMask () {
      var mask = document.createElement('div')
      mask.style.position = 'fixed'
      mask.style.width = 100 + 'vw'
      mask.style.height = 100 + 'vh'
      mask.style.top = 0
      mask.style.left = 0
      mask.style.zIndex = 9999
      mask.style.overflow = 'hidden'
      mask.ondblclick = function (e) {
        e.stopPropagation()
      }
      mask.setAttribute('class', 'drug-mask')
      document.body.appendChild(mask)
    }
  },
  beforeDestroy () {
    var mask = document.querySelector('.drug-mask')
    document.body.removeChild(mask)
  },
  mounted () {
    const that = this
    document.body.onclick = function (e) {
      if (e.target.className.includes('input')) {
      } else {
        that.$emit('update:drugListVisible', false)
      }
    }
    if (this.type === '0') {
      this.$emit('emitgetDrug', '')
    } else {
      this.$emit('emitgetinfusion', '')
    }
    this.handleMask()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme';
.menu-list {
  position: absolute;
  height: 200px;
  width: 180px;
  z-index: 10000;
  overflow: hidden;
  @include theme-property('background', $background-dialog);
  @include theme-property('border-color', $dateTimePicker-color-border);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  .left {
    width: 30px;
    height: 100%;
    float: left;
    @include theme-property('background', $dateTimePicker-color-background);
    // @include theme-property('background', $background-dialog);
    // background #2C3140
    border-radius: 5px 0px 0px 5px;
    overflow: hidden;
  }
  .right {
    float: right;
    height: 100%;
    width: 148px;
    overflow: hidden;
    ul {
      width: 100%;
      li {
        width: 100%;
        font: 12px/24px '';
        @include theme-property('color', $color-text-regular);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:last-child {
          border-bottom: 0;
        }
        &:hover {
          @include theme-property('color', $color-text-primary);
        }
      }
    }
  }
}
</style>
<style lang="stylus">
.scrollbar .el-scrollbar__wrap
  overflow-x: hidden;
</style>
