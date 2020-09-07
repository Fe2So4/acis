<template>
  <div class="list">
    <el-scrollbar
      style="height:100%;"
      class="scrollbar"
    >
      <div
        class="list-all"
        @contextmenu="showMenu()"
      >
        <div
          class="list-item"
          :class="{'active':activeIndex == index}"
          v-for="(item,index) in dataList"
          :key="index"
          @click="handleCurrent(item,index)"
          @dblclick="handledbClick(item,index)"
          @contextmenu="handleCurrent(item,index)"
        >
          {{ item.result }}
        </div>
      </div>
    </el-scrollbar>
    <vue-context-menu
      :context-menu-data="contextMenuData"
      @handleDocConfig="handleDocConfig"
    />
  </div>
</template>
<script>
export default {
  name: 'List',
  data () {
    return {
      contextMenuData1: {
        axis: {
          x: null,
          y: null
        },
        menulists: [{ btnName: '医生设置' }]
      },
      activeIndex: 0,
      selectItem: {}
    }
  },
  props: ['dataList', 'contextMenuData'],
  computed: {},
  watch: {
    dataList: {
      handler (newValue, old) {
        return newValue
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleCurrent (item, i) {
      this.activeIndex = i
      this.selectItem = item
    },
    handleDocConfig () {
      console.log(123)
      this.$emit('handleDocConfig', this.selectItem)
    },
    showMenu () {
      // this.transferIndex1 = index // tranfer index to child component
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      this.contextMenuData.axis = {
        x,
        y
      }
    },
    handledbClick (item, i) {
      // console.log(i)
      if (parseInt(item.count) < parseInt(item.maxOperoomCount)) {
        this.$emit('handleDistribute', item)
      } else {
        if (item.userJob === '1') {
          this.$message({ type: 'warning', message: '该医生已达到最大台数' })
        } else {
          this.$message({ type: 'warning', message: '该护士已达到最大台数' })
        }
      }
    }
  },
  mounted () {
    // console.log(this.f_height,'height')
  }
}
</script>
<style lang="scss">
.list {
  height:100%;
  // height: 500px;
  .list-all {
    // position: relative;
    height: 100%;
    // overflow-y:auto;
    .list-item {
      font: 12px/30px "";
      padding-left: 10px;
      border-bottom: 1px dashed #f3f6f9;
      &:hover{
        background: #f1f3f6;
      }
    }
    .active {
      background: #f1f3f6;
    }
  }
}
</style>
<style>
.list .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
