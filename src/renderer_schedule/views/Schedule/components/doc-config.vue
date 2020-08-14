<template>
  <div class="doc">
    <el-dialog
      :title="configTitle"
      :visible.sync="configVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="config">
        <!-- <h3>医生配置</h3> -->
        <el-form
          :label-position="labelPosition"
          width="30%"
          label-width="120px"
          size="mini"
        >
          <el-form-item label="姓名">
            <el-input
              v-model="configForm.name"
              disabled
            />
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model="configForm.userId" />
          </el-form-item>
          <el-form-item label="最大台数">
            <el-input v-model="configForm.max" />
          </el-form-item>
          <el-form-item label="默认手术间">
            <el-select
              v-model="configForm.room"
              multiple
            >
              <el-option
                v-for="(item,index) in roomNoList"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div
          class="option"
          style="display:flex;justify-content:center;"
        >
          <el-button
            type="primary"
            @click="submitConfig"
            size="mini"
            style="margin-right:20px;"
          >
            确定
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleClose"
          >
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  roomNoList
} from '@/api/dictionary'
import { updateDocNurseConfig } from '@/api/schedule'
import request from 'src/common/utils/requestForMock'
export default {
  data () {
    return {
      labelPosition: 'left',
      roomNoList: []
      // configForm: {},
    }
  },
  props: ['configVisible', 'configForm', 'configTitle'],
  methods: {
    submitConfig () {
      const obj = {}
      obj.userId = this.configForm.userId
      obj.maxOperoomCount = this.configForm.max
      obj.defaultOperoomNo = (this.configForm.room).join(',')
      request({
        url: updateDocNurseConfig,
        method: 'PUT',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '修改成功' })
          this.$eventHub.$emit('get-DocNurse')
          this.$eventHub.$emit('handle-close')
        } else {
          this.$message({ type: 'error', message: '修改失败' })
        }
      })
    },
    getRoomData () {
      request({
        url: roomNoList,
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.roomNoList = data
      })
    },
    handleClose () {
      console.log(123)
      this.$eventHub.$emit('handle-close')
      // this.$emit('handleClose')
    }
  },
  mounted () {
    this.getRoomData()
  }
}
</script>
<style lang="scss" scoped>
</style>
