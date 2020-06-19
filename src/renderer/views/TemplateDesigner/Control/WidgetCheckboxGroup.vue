<template>
  <div class="checkbox-group">
    <el-checkbox-group
      v-model="checkedOptions"
    >
      <el-checkbox
        v-for="option in configuration.collections"
        :label="option.label"
        :key="option.value"
        @change="handleChange"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'WidgetCheckboxGroup',
  data () {
    return {
      // options: [{ label: '正常', value: '1' }, { label: '松动', value: '2' }, { label: '假牙', value: '3' }, { label: '缺牙', value: '4' }],
      checkedOptions: []
      // singleSelect: true
    }
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({
        collections: [{ label: '项目1', value: '1' }, { label: '项目2', value: '2' }],
        singleSelect: '1'
      })
    }
  },
  methods: {
    handleChange (arr) {
      if (this.configuration.singleSelect === '1') {
        this.checkedOptions.length > 1 && this.checkedOptions.shift()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .checkbox-group{
        height: 100%;
        width: 100%;
        background: #fff;
    }
</style>
<style lang="scss" scoped>
.checkbox-group /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#fff;
  border-color: #000;
}
.checkbox-group /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #000;
}
.checkbox-group /deep/ .el-checkbox.is-bordered.is-checked{
  border-color: #000;
}
.checkbox-group /deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #000;
}
.checkbox-group /deep/ .el-checkbox__inner{
  border-color: #000;
  &::after{
    border-color:#000;
  }
}
</style>
