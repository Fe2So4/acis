<template>
  <div class="change-dialog">
    <el-dialog
      :title="changeTitle"
      :visible.sync="changeVisible"
      width="60%"
    >
      <el-row>
        {{ changeType != 2 ? '把该手术重新分配到' : '需要把' }}{{ changeType == 2 ? currentId + '号手术间的数据与' : '' }}
        <el-select v-model="arrangeRoom">
          <el-option
            v-for="(item,index) in roomNoList"
            :key="index"
            :value="item"
            :label="item"
            :disabled="item == currentId"
          />
        </el-select>
        号手术间{{ changeType!=2 ? '' : '的数据进行交换' }}
      </el-row>
      <el-row style="margin:10px 0;">
        <el-checkbox
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </el-row>
      <el-row>
        <el-checkbox-group
          v-model="checkedContent"
          @change="handleCheckedContentChange"
        >
          <el-checkbox
            v-for="item in changeContent"
            :label="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
      <div
        class="option"
        style="display:flex;justify-content:center;margin-top:30px;"
      >
        <el-button
          type="primary"
          @click="submitChangeRoom"
        >
          确定
        </el-button>
        <el-button
          type="primary"
          @click="changeVisible=false"
        >
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      arrangeRoom: '',
      roomNoList: [],
      currentId: '',
      changeContent: [],
      checkedContent: [],
      changeType: ''
    }
  },
  props: {
    changeTitle: {
      type: String,
      default: ''
    },
    changeVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitChangeRoom () {

    },
    handleCheckAllChange () {

    },
    handleCheckedContentChange () {}
  }
}
</script>
<style lang="scss" scoped>
  .switch {
    height: 100%;
    width: 100%;
  }
</style>
