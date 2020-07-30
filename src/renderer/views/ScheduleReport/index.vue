<template lang="pug">
  .report
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="手术排班表" name="first">手术排班表</el-tab-pane>
      <el-tab-pane label="手术通知单" name="second">手术通知单</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
<style lang="stylus" scoped>
  .report {
    color:#fff;
  }
</style>
