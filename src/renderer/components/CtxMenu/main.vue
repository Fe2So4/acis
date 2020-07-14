<template>
  <transition name="fade">
    <div
      class="mask"
      v-show="visible"
      @click.self="close"
    >
      <div
        class="contextMenu"
        :style="positionStyle"
      >
        <el-scrollbar
          :wrap-style="wrapStyle"
        >
          <div class="content">
            <div class="iconContent" />
            <div class="labelContent">
              <div
                class="label"
                v-for="(item, index) in list"
                :key="index"
                @click="selectMenuItem(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      posX: 0,
      posY: 0,
      visible: false,
      wrapStyle: [
        {
          'max-height': '150px'
        }
      ]
    }
  },
  computed: {
    positionStyle () {
      return {
        left: this.posX + 'px',
        top: this.posY + 'px'
      }
    }
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    selectMenuItem (item) {
      this.onSelectMenuItem(item)
    },
    close () {
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
}
.contextMenu {
  position: relative;
  border: 1px solid #39425c;
  border-radius: 4px;
  width: 180px;
  overflow: auto;
  .content {
    display: flex;
    .iconContent {
      flex: 1 1 30px;
      background: #2c3140;
      padding: 2px 0;
    }
    .labelContent {
      flex: 1 1 150px;
      background: #1e222e;
      padding: 2px 0;

      .label {
        cursor: pointer;
        line-height: 24px;
        font-size: 12px;
        height: 24px;
        color: #9ba3d5;
        text-indent: 8px;
        white-space: nowrap;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          color: #388ff7;
        }
      }
    }
  }
}
.fade-enter-active {
  animation: fade 0.3s;
}
.fade-leave-active {
  animation: fade 0.1s reverse;
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
