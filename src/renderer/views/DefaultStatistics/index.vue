<template>
  <div class="default-statistics">
    <div class="welcome">
      欢迎进入查询系统
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .default-statistics{
    height: 100%;
    width: calc(100% + 40px);
    position: relative;
    left: -20px;
    background: url('../../assets/statistics_default.png') no-repeat;
    .welcome{
      position: absolute;
      top:280px;
      right: 366px;
      line-height:50px;
      font-size:48px;
      font-weight:bold;
      color:rgba(254,254,254,1);
      text-shadow:0px 1px 3px rgba(0, 0, 0, 0.5);
    }
  }
</style>
