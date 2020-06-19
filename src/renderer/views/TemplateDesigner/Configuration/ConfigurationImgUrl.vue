<template>
  <div>
    <el-form-item label="图片路径">
      <el-select
        :value="value"
        placeholder=""
        @change="onChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationSingleSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: [
        { label: '冬雷脑科医院', value: 'http://47.103.105.200/htmlFile/056a0b71-b085-4947-a71f-6df7d0529e50_100000000.jpg' }
      ]
    }
  },
  methods: {
    onChange (currentValue, oldValue) {
      this.$emit('change', {
        imgUrl: currentValue
      })
    },
    // 获取图片列表
    getImgList () {
      this.$http({
        url: 'http://localhost:3334/mock/imageList'
      }).then(res => {
        const data = res.data
        this.options = data.data
      })
    }
  },
  mounted () {
    this.getImgList()
  }
}
</script>
<style lang="scss" scoped>
</style>
