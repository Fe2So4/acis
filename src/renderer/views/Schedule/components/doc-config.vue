<template>
  <div class="doc">
    <el-dialog :title="configTitle" :visible.sync="configVisible" width="30%">
      <div class="config">
        <!-- <h3>医生配置</h3> -->
        <el-form :label-position="labelPosition" width="30%" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="configForm.name" disabled />
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="configForm.no" />
          </el-form-item>
          <el-form-item label="最大手术间">
            <el-input v-model="configForm.max" />
          </el-form-item>
          <el-form-item label="默认手术间">
            <el-select v-model="configForm.room">
              <el-option
                v-for="(item,index) in roomNoList"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="option" style="display:flex;justify-content:center;">
          <el-button type="primary" @click="submitConfig" size="mini">确定</el-button>
          <el-button type="primary" size="mini" @click="configVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      roomNoList: [],
      // configForm: {},
    };
  },
  props: ["configVisible", "configForm"],
  methods:{
    submitConfig(){
      
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
