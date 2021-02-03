<template lang="pug">
  .about
    .img
      img(:src="logoSource" alt="蓝想数科")
    .title 临床麻醉信息系统
    //- .title Dandelion手术中心麻醉临床信息系统
    .option
      el-button(size="mini" @click="handleClose") 确定
    .copy-right copyright&copy;蓝想数科版权所有
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapState('Base', ['theme']),
    logoSource () {
      return require(`@/assets/lan_${this.theme}.png`)
    }
  },
  methods: {
    handleClose () {
      this.$eventHub.$emit('close-dialog')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/theme";
  .about{
    text-align:center;
    @include theme-property("color", $color-text-regular);
    width:430px;
    .img{
      img{
        display: block;
        margin: 0 auto;
      }
    }
    .title{
      line-height:28px;
      margin:20px 0 30px;
    }
    // .option
    .copy-right{
      font-size:12px;
      margin-top:20px;
    }
  }
</style>
