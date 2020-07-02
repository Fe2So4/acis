<template>
  <div class="header">
    <i class="el-icon-minus" />
    <i class="el-icon-minus" />
    <i class="el-icon-close" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: -1
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.header {
  line-height:32px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  height:100%;
  align-items: center;
  i{
    font-size:18px;
    font-weight: bold;
    color:#0094ff;
    margin-right:20px;
    cursor: pointer;
  }
}
</style>
