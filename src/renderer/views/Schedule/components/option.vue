<template>
  <div class="option">
    <span>共0台</span>
    <span>
      <el-button type="text" size="mini" @click="showPreview">提交前预览</el-button>
      <el-button type="text" size="mini">刷新</el-button>
      <el-button type="text" size="mini">切换</el-button>
      <el-button type="text" size="mini">提交</el-button>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    showPreview() {
      this.$emit("showPreview");
    },
  },
};
</script>
<style lang="scss" scoped>
.option {
  padding: 0 20px;
  background: #181c27;
  display: flex;
  color: #9ba3d5;
  font-size: 14px;
  line-height: 28px;
  justify-content: space-between;
  border-radius: 0px 0px 5px 5px;
}
.option /deep/ .el-button--text {
  color: #9ba3d5;
}
</style>
