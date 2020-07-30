<template>
  <div class="notice">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <!-- <el-time-picker></el-time-picker> -->
      </el-form-item>
      <el-form-item>
        <el-button>搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button>打印</el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <h3>手术通知单</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "Notice",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.notice {
}
</style>
