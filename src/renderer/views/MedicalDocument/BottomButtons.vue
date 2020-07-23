<template>
  <div class="bottomButtons">
    <div
      class="buttons leftButtons"
      v-if="hasPagination"
    >
      <div>第{{ +pageIndex + 1 }}页</div>
      <div>共{{ totalPage }}页</div>
      <div
        class="button"
        @click="$emit('changePage', 0)"
      >
        <span class="iconfont icon-shouye" />首页
      </div>
      <div
        class="button"
        @click="pageUp"
      >
        <span class="iconfont icon-shangyiye" />上一页
      </div>
      <div
        class="button"
        @click="pageDown"
      >
        <span class="iconfont icon-xiayiye" />下一页
      </div>
      <div
        class="button"
        @click="$emit('changePage', totalPage - 1)"
      >
        <span class="iconfont icon-last" />末页
      </div>
    </div>
    <div class="buttons rightButtons">
      <div
        class="button red"
        v-if="hasSwitchRescueModeButton && !isRescueMode"
        @click="$emit('changeRescueMode', true)"
      >
        抢救模式
      </div>
      <div
        class="button"
        v-if="hasSwitchRescueModeButton && isRescueMode"
        @click="$emit('changeRescueMode', false)"
      >
        普通模式
      </div>
      <div
        class="button"
        @click="$emit('printAll')"
      >
        集中打印
      </div>
      <div
        class="button"
        @click="$emit('print')"
      >
        打印
      </div>
      <div
        class="button"
        @click="$emit('refresh')"
      >
        刷新
      </div>
      <div
        class="button"
        @click="$emit('save')"
      >
        保存
      </div>
      <div
        class="button"
        @click="$emit('configure')"
      >
        配置
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomButtons',
  props: {
    rescueMode: {
      type: [String, Number],
      default: ''
    },
    pageInfo: {
      type: [String, Number],
      default: ''
    },
    isRescueMode: {
      type: Boolean,
      default: false
    },
    totalPage: {
      type: Number || String,
      default: 1
    },
    pageIndex: {
      type: Number || String,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    // 是否可以开启抢救模式
    hasSwitchRescueModeButton () {
      return !!+this.rescueMode
    },
    hasPagination () {
      return !!+this.pageInfo
    }
  },
  methods: {
    pageUp () {
      const pageIndex = +this.pageIndex
      if (pageIndex > 0) {
        this.$emit('changePage', pageIndex - 1)
      }
    },
    pageDown () {
      const pageIndex = +this.pageIndex
      if (pageIndex < this.totalPage - 1) {
        this.$emit('changePage', pageIndex + 1)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import url("./iconfont/iconfont.css");
.bottomButtons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  padding: 4px 0;
  background: rgba(23, 27, 39, 1);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  // display: flex;
  // justify-content: space-between;
  color: rgba(154, 163, 212, 1);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  // flex-direction: row-reverse;
  .buttons {
    display: flex;
    & > div {
      line-height: 28px;
      padding: 0 20px;
      &.button {
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
      &.red {
        color: #ff3f5a;
        // &:hover {
        //   color: #ff0000;
        // }
      }
    }
  }

  .leftButtons {
    float: left;
    & > div {
      border-right: 1px solid #465274;
    }
  }
  .rightButtons {
    float: right;
    & > div {
      border-left: 1px solid #465274;
    }
  }
  .iconfont {
    margin-right: 4px;
  }
}
</style>
