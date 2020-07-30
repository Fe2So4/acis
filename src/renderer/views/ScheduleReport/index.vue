<template lang="pug">
.report
  el-tabs(v-model="activeName", @tab-click="handleClick")
    el-tab-pane(label="手术排班表", name="first") 手术排班表
    el-tab-pane(label="手术通知单", name="second")
      Notice
</template>
<script>
import Notice from "./components/notice";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: { Notice },
  methods: {
    handleClick() {},
  },
};
</script>
<style lang="stylus" scoped>
.report {
  color: #fff;
}
</style>
