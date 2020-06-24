<template>
  <div class="select">
    <el-select
      v-model="value"
      placeholder="请选择"
      filterable
      @change="changeValue"
    >
      <el-option
        v-for="(item,index) in list"
        :key="index"
        :label="item.userName"
        :value="item.userId"
        :disabled="index == 0"
      >
        <div class="content">
          <span>{{ item.userId }}</span>
          <span>{{ item.userName }}</span>
          <span>{{ item.inputCode }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      selectList: []
    }
  },
  props: ['selectValue', 'dataList', 'currentValue'],
  computed: {
    list () {
      const res = Object.assign([], this.dataList)
      res.unshift({ userId: '编号', userName: '姓名', inputCode: '输入码' })
      return res
    }
  },
  watch: {
    dataList: {
      handler (newValue, old) {
        return newValue
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeValue () {
      console.log('zzz')
      // this.value
      this.$emit('selectOperaion', this.value)
    }
  },
  mounted () {
    this.value = this.currentValue
    // this.initData();
  }
}
</script>
<style lang="scss" scoped>
    .select{
        .content{
            display:flex;
            span{
                display:block;
                flex:1;
            }
        }
    }
    // .select /deep/ .el-select .el-select-dropdown,.el-select-dropdown{
    //     width:400px;
    // }
    .select /deep/ .el-select .el-select-dropdown,.el-select-dropdown .content{
        display:flex;
        border-left:1px solid #f3f6f9;
        border-bottom:1px solid #f3f6f9;
        span{
            display:block;
            flex:1;
            text-align: center;
            border-right:1px solid #f3f6f9;
            border-top:1px solid #f3f6f9;
            box-sizing: border-box;
        }
    }
    .select /deep/ .el-select .el-select-dropdown,.el-select-dropdown .el-select-dropdown__item{
        padding:0;
        width:400px;
    }
    .select /deep/ .el-select .el-select-dropdown,.el-select-dropdown .el-select-dropdown__item.is-disabled{
        background:#f3f6f9;
        cursor: auto;
        color:#000;
    }
</style>
