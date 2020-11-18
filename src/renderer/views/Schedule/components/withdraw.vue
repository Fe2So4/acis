<template>
  <div class="page-withdraw">
    <el-scrollbar
      style="height:100%;"
      class="scrollbar"
      ref="scrollContainer"
      @wheel.native.prevent="handleScroll"
    >
      <div
        class="box"
        @contextmenu="showMenu2"
      >
        <div
          class="box-item"
          v-for="item in recordsList"
          :key="item.id"
          @dblclick="handleWithdraw(item.id)"
        >
          {{ item.message }}
        </div>
        <vue-context-menu
          :context-menu-data="contextMenuData2"
          @handlerClearList="handlerClearList"
        />
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { getRecord } from '@/api/schedule'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      contextMenuData2: {
        menuName: 'demo1',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '清空',
            fnHandler: 'handlerClearList'
          }
        ]
      },
      recordsList: []
    }
  },
  props: {},
  computed: {
    ...mapGetters('Schedule', ['time'])
  },
  mounted () {
    this.getData()
    this.$eventHub.$on('get-records', () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      request({
        url: getRecord + `/${this.time}`
      }).then((res) => {
        this.recordsList = res.data.data
      })
    },
    handlerClearList () {
      this.recordsList = []
    },
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
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      $scrollWrapper.scrollTop = $scrollWrapper.scrollTop - eventDelta / 4
    },
    handleWithdraw (sysno) {
      this.$emit('handleWithdraw', sysno)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.page-withdraw {
  height: 100%;
  width: 100%;
  // background: #f3f6f9;
  // overflow-y: auto;
  .box {
    width: 100%;
    height: 100%;
    .box-item {
      font: 14px/28px "";
      width: calc(100% - 17px);
      box-sizing: border-box;
      padding: 0 10px;
      cursor: pointer;
      @include theme-property("color", $color-text-regular);
      &:hover {
        @include theme-property("background", $color-background-card-hover);
      }
    }
  }
}
</style>
<style>
.page-withdraw .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
