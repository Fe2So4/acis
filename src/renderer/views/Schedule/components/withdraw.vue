<template>
  <div class="page-withdraw">
    <div
      class="box"
      @contextmenu="showMenu2"
    >
      <div
        class="box-item"
        v-for="item in recordsList"
        :key="item.sysno"
        @dblclick="handleWithdraw(item.sysno)"
      >
        {{ item.message }}
      </div>
      <vue-context-menu
        :context-menu-data="contextMenuData2"
      />
      <!-- @handlerClearList="handlerClearList" -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contextMenuData2: {
        menuName: 'demo1',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '清空',
          fnHandler: 'handlerClearList'
        }]
      }
    }
  },
  props: {
    recordsList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    showMenu2 () {
      // this.transferIndex1 = index // tranfer index to child component
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      this.contextMenuData2.axis = {
        x,
        y
      }
    },
    handleWithdraw (sysno) {
      this.$emit('handleWithdraw', sysno)
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-withdraw{
    height: 100px;
    background: #f3f6f9;
    overflow-y: auto;
    .box {
        height: 100%;
        .box-item {
          font: 14px/28px '';
          cursor: pointer;
        }
    }
  }
</style>
