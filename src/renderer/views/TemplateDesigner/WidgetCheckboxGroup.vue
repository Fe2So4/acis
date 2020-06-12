<template>
  <div class="checkbox-group">
    <el-checkbox-group
      v-model="checkedOptions"
    >
      <el-checkbox
        v-for="option in options"
        :label="option"
        :key="option"
      >
        {{ city }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data () {
      options: cityOptions,
      checkedOptions:[]
  }
}
</script>
<style lang="scss" scoped>
    .checkbox-group{

    }
</style>
