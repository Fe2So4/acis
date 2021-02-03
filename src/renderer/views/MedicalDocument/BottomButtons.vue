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
        @click="$emit('change-page', 0)"
      >
        <div class="iconfont icon-shouye" />
        <div class="text">
          首页
        </div>
      </div>
      <div
        class="button"
        @click="pageUp"
      >
        <div class="iconfont icon-shangyiye rotate" />
        <div class="text">
          上一页
        </div>
      </div>
      <div
        class="button"
        @click="pageDown"
      >
        <div class="iconfont icon-xiayiye rotate" />
        <div class="text">
          下一页
        </div>
      </div>
      <div
        class="button"
        @click="$emit('change-page', totalPage - 1)"
      >
        <div class="iconfont icon-last rotate" />
        <div class="text">
          末页
        </div>
      </div>
    </div>
    <div class="buttons rightButtons">
      <!--      <div
        class="button red"
        v-if="hasSwitchRescueModeButton && !isRescueMode"
        @click="$emit('change-rescue-mode', true)"
      >
        抢救模式
      </div>
      <div
        class="button"
        v-if="hasSwitchRescueModeButton && isRescueMode"
        @click="$emit('change-rescue-mode', false)"
      >
        普通模式
      </div>-->
      <!-- <div
        class="button"
        @click="$emit('print-all')"
      >
        集中打印
      </div> -->
      <div
        class="button"
        @click="$emit('print')"
        v-show="displayedButtons.includes('PRINT')"
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
        v-show="displayedButtons.includes('SAVE')"
      >
        保存
      </div>
      <div
        class="button"
        @click="$emit('configure')"
        v-show="displayedButtons.includes('CONFIG')"
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
      type: [Number, String],
      default: 1
    },
    pageIndex: {
      type: [Number, String],
      default: 0
    },
    displayedButtons: {
      type: Array,
      required: true
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
        this.$emit('change-page', pageIndex - 1)
      }
    },
    pageDown () {
      const pageIndex = +this.pageIndex
      if (pageIndex < this.totalPage - 1) {
        this.$emit('change-page', pageIndex + 1)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import url("./iconfont/iconfont.css");
@import "@/styles/theme";
$background:(
  dark-blue:#181C28,
  dark-gray:#363638,
  light-white: #F8F8F8
);
.bottomButtons {
  position: absolute;
  bottom: 0;
  left: -20px;
  right: -20px;
  height: 36px;

  padding: 4px 0;
  @include theme-property("background", $background);
  @include theme-property("box-shadow", $box-shadow-card);
  @include theme-property("color", $color-text-regular);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  vertical-align: baseline;

  .buttons {
    display: flex;
    & > div {
      line-height: 28px;
      padding: 0 20px;
      &.button {
        cursor: pointer;
        &:hover {
         @include theme-property('color', $color-regular-light);
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
      border-right: 1px solid ;
      @include theme-property("border-color", $border-color-basic);
    }
  }
  .rightButtons {
    float: right;
    & > div {
      border-left: 1px solid;
      @include theme-property("border-color", $border-color-basic);
    }
  }
  .iconfont {
    display: inline-block;
    position: relative;
    top: 2px;
    &.rotate {
      transform: rotate(90deg);
    }
  }
  .text {
    display: inline-block;
  }
}
</style>
