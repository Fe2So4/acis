<template>
  <div class="bottomButtons">
    <div class="leftButtons">
      <div>
        每页显示
        <el-input
          style="width:54px"
          v-model="pageSize"
          size="mini"
        />
        条数据
      </div>
    </div>
    <div class="buttons rightButtons">
      <div class="button">
        <div class="text">
          共{{ totalSize }}条记录 {{ currentPage }}/{{ totalPages }}
        </div>
      </div>
      <div
        class="button"
        @click="changePage(0)"
      >
        <div class="iconfont icon-shouye" />
        <div class="text">
          首页
        </div>
      </div>
      <div
        class="button"
        @click="changePage(-1)"
      >
        <div class="iconfont icon-shangyiye rotate" />
        <div class="text">
          上一页
        </div>
      </div>
      <div
        class="button"
        @click="changePage(1)"
      >
        <div class="iconfont icon-xiayiye rotate" />
        <div class="text">
          下一页
        </div>
      </div>
      <div
        class="button"
        @click="changePage(2)"
      >
        <div class="iconfont icon-last rotate" />
        <div class="text">
          末页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomButtons',
  props: {
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalSize: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      count: '10'
    }
  },
  computed: {},
  methods: {
    changePage (param) {
      this.$emit('changePage', param)
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
  padding: 4px 20px;
  background: rgba(23, 27, 39, 1);
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  color: rgba(154, 163, 212, 1);
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
  }
  .rightButtons {
    float: right;
    & > div {
      border-left: 1px solid #465274;
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
