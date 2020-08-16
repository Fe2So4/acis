<template>
  <div class="bottomButtons">
    <div class="leftButtons">
      <div>
        每页显示
        <el-input style="width:34px" :value="10" size="mini"></el-input>条数据
      </div>
    </div>
    <div class="buttons rightButtons">
      <div class="button">
        <div class="text">共100条记录 1/8</div>
      </div>
      <div class="button">
        <div class="iconfont icon-shouye" />
        <div class="text">首页</div>
      </div>
      <div class="button" @click="pageUp">
        <div class="iconfont icon-shangyiye rotate" />
        <div class="text">上一页</div>
      </div>
      <div class="button" @click="pageDown">
        <div class="iconfont icon-xiayiye rotate" />
        <div class="text">下一页</div>
      </div>
      <div class="button">
        <div class="iconfont icon-last rotate" />
        <div class="text">末页</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomButtons",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    pageUp() {},
    pageDown() {},
  },
};
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
