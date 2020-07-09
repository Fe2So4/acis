<template>
  <div class="insert-signdata">
    <el-form
      :inline="true"
      ref="ruleForm"
      label-width="100px"
      :model="form"
      size="mini"
    >
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          style="width:178px;"
          type="datetime"
          placeholder=""
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          style="width:178px;"
          v-model="form.endTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="时间间隔">
        <el-input v-model="form.timeInterval" />
      </el-form-item>
      <el-form-item label="心率">
        <el-input v-model="form.heartRate" />
      </el-form-item>
      <el-form-item label="PULSE">
        <el-input v-model="form.pulse" />
      </el-form-item>
      <el-form-item label="动脉收缩压">
        <el-input v-model="form.sbp" />
      </el-form-item>
      <el-form-item label="动脉舒张压">
        <el-input v-model="form.adbp" />
      </el-form-item>
      <el-form-item label="中心静脉压">
        <el-input v-model="form.cvp" />
      </el-form-item>
      <el-form-item label="呼吸">
        <el-input v-model="form.breathing" />
      </el-form-item>
      <el-form-item label="SpO2">
        <el-input v-model="form.spo2" />
      </el-form-item>
      <el-form-item label="ETCO2">
        <el-input v-model="form.etco2" />
      </el-form-item>
      <el-form-item label="FIO2">
        <el-input v-model="form.fio2" />
      </el-form-item>
      <el-form-item label="无创收缩压">
        <el-input v-model="form.noShrink" />
      </el-form-item>
      <el-form-item label="无创舒张压">
        <el-input v-model="form.noRelease" />
      </el-form-item>
    </el-form>
    <div class="option">
      <el-button size="mini">
        确定
      </el-button>
      <el-button
        size="mini"
        @click="handleClose"
      >
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        startTime: '',
        endTime: '',
        timeInterval: '',
        heartRate: '',
        pulse: '',
        sbp: '',
        adbp: '',
        noRelease: '',
        noShrink: '',
        fio2: '',
        etco2: '',
        spo2: '',
        breathing: ''
      }
    }
  },
  methods: {
    handleClose () {
      // this.$parent.handleClose()
      console.log(123)
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  .insert-signdata{
    width: 600px;
    .option{
      text-align: center;
    }
  }
</style>
