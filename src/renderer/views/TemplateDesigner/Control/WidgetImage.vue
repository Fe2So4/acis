<template lang="pug">
    div.image
     img(:src="imgUrl")
</template>
<script>
export default {
  data () {
    return {
    //   imgUrl: 'http://47.103.105.200/htmlFile/056a0b71-b085-4947-a71f-6df7d0529e50_100000000.jpg'
    }
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({
        imgUrl: 'http://47.103.105.200/htmlFile/056a0b71-b085-4947-a71f-6df7d0529e50_100000000.jpg'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
    .image
        width:100%
        height:100%
        img
            width:100%
            height:100%
</style>
