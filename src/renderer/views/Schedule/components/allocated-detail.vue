<template>
  <div class="allocated-detail">
    <el-dialog
      title="手术详细信息"
      :visible.sync="detailVisible"
      width="80%"
    >
      <div class="detail">
        <el-form
          :inline="true"
          :label-position="labelPosition"
          label-width="80px"
        >
          <el-form-item label="手术间号">
            <el-input
              v-model="currentId"
              disabled
            />
          </el-form-item>
          <el-form-item label="台次">
            <el-input v-model="detailForm.sequence" />
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="detailTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item
            label="手术名称"
            disabled
          >
            <el-input
              v-model="detailForm.operationName"
              disabled
            />
          </el-form-item>
          <el-form-item label="手术医师">
            <el-input
              v-model="detailForm.surgeon"
              disabled
            />
          </el-form-item>
          <el-form-item label="麻醉方法">
            <Select
              :data-list="anaesList"
              @changeValue="changeAnaesMethods"
              :current-value="detailForm.anaesthesiaCode"
              @selectOperaion="selectOperaion1"
            />
          </el-form-item>
          <el-form-item label="主麻">
            <Select
              :data-list="doctorList"
              @changeValue="changeMainDoc"
              :current-value="detailForm.doctorCode"
              @selectOperaion="selectOperaion2"
            />
          </el-form-item>
          <el-form-item label="副麻1">
            <Select
              :data-list="doctorList"
              @changeValue="changeSubDoc1"
              :current-value="detailForm.firstDoctorCode"
              @selectOperaion="selectOperaion3"
            />
          </el-form-item>
          <el-form-item label="副麻2">
            <Select
              :data-list="doctorList"
              @changeValue="changeSubDoc2"
              :current-value="detailForm.secondDoctorCode"
              @selectOperaion="selectOperaion4"
            />
          </el-form-item>
          <el-form-item label="副麻3">
            <Select
              :data-list="doctorList"
              @changeValue="changeSubDoc3"
              :current-value="detailForm.thirdDoctorCode"
              @selectOperaion="selectOperaion5"
            />
          </el-form-item>
          <el-form-item label="洗手护士1">
            <Select
              :data-list="nurseList"
              @changeValue="changeWashNurse1"
              :current-value="detailForm.washFirstNurseCode"
              @selectOperaion="selectOperaion6"
            />
          </el-form-item>
          <el-form-item label="洗手护士2">
            <Select
              :data-list="nurseList"
              @changeValue="changeWashNurse2"
              :current-value="detailForm.washSecondNurseCode"
              @selectOperaion="selectOperaion7"
            />
          </el-form-item>
          <el-form-item label="巡回护士1">
            <Select
              :data-list="nurseList"
              @changeValue="changeHangNurse1"
              :current-value="detailForm.runFirstDoctorCode"
              @selectOperaion="selectOperaion8"
            />
          </el-form-item>
          <el-form-item label="巡回护士2">
            <Select
              :data-list="nurseList"
              @changeValue="changeHangNurse2"
              :current-value="detailForm.runSecondDoctorCode"
              @selectOperaion="selectOperaion9"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              rows="2"
              v-model="remarks"
            />
          </el-form-item>
        </el-form>
        <div
          class="option"
          style="display:flex;justify-content:center;"
        >
          <el-button
            type="primary"
            @click="handleChangeDetail"
          >
            确定
          </el-button>
          <el-button
            type="primary"
            @click="detailVisible = false"
          >
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Select from './select'
export default {
  data () {
    return {
      labelPosition: 'left',
      roomNoList: [],
      configForm: {

      },
      detailForm: {},
      doctorList: [],
      nurseList: [],
      anaesList: []
    }
  },
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    }
  },
  components: { Select }
}
</script>
<style lang="scss" scoped>
</style>
