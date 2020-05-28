<template>
  <div class="basic-info">
    <div class="title">
      基本信息
    </div>
  </div>
</template>
<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
    .basic-info{
        height: 100%;
        flex:1;
        .title{
            font-size:14px;
            line-height:26px;
            color:#15428b;
        }
    }
</style>
