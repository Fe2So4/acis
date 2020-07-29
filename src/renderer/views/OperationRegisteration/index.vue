<template lang="pug">
  .operation-registeration
    el-form(:model="form" ref="form" label-width="100px" class="demo-ruleForm" size="mini" :rules="rules")
      el-row
        el-col(:span="6")
          el-form-item(label="患者ID" prop="ptId")
            el-input(v-model="form.ptId")
        el-col(:span="6")
          el-form-item(label="住院号" prop="hospitalNo")
            el-input(v-model="form.hospitalNo")
        el-col(:span="6")
          el-form-item(label="姓名")
            el-input(v-model="form.ptId")
        el-col(:span="6")
          el-form-item(label="性别")
            el-input(v-model="form.ptId")
      el-row
        el-col(:span="6")
          el-form-item(label="出生日期")
            el-date-picker(v-model="form.ptId" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd")
        el-col(:span="6")
          el-form-item(label="床号")
            el-input(v-model="form.ptId")
        el-col(:span="12")
          el-form-item(label="所在科室")
            el-select(v-model="form.ptId" placeholder="请选择所在科室")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="24")
          el-form-item(label="主要诊断")
            el-select(v-model="form.ptId" placeholder="请选择诊断")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="24")
          el-form-item(label="病情")
            el-input(v-model="form.ptId")
      el-row
        el-col(:span="6")
          el-form-item(label="手术时间")
            el-input(v-model="form.ptId")
        el-col(:span="6")
          el-form-item(label="台次")
            el-input(v-model="form.ptId")
        el-col(:span="12")
          el-form-item(label="手术间" prop="room")
            el-select(v-model="form.room" placeholder="请选择手术间" )
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="隔离")
            el-select(v-model="form.ptId" placeholder="请选择是否隔离")
              el-option(
                v-for="item in isolation"
                :key="item.value"
                :label="item.label"
                :value="item.value")
        el-col(:span="6")
          el-form-item(label="等级")
            el-select(v-model="form.ptId" placeholder="请选择等级")
              el-option(
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value")
        el-col(:span="12")
          el-form-item(label="麻醉方法")
            el-select(v-model="form.ptId" placeholder="请选择")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="切口等级")
            el-input(v-model="form.ptId")
        el-col(:span="6")
          el-form-item(label="切口个数")
            el-input(v-model="form.ptId")
        el-col(:span="12")
          el-form-item(label="急诊择期")
            el-select(v-model="form.ptId" placeholder="请选择")
              el-option(
                v-for="item in changeTime"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="手术医师")
            el-select(v-model="form.ptId" placeholder="请选择手术间")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
        el-col(:span="18")
          el-row
            el-col(:span="6")
              el-form-item(label="手术助手")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="灌注医生")
            el-select(v-model="form.ptId" placeholder="请选择")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
        el-col(:span="18")
          el-row
            el-col(:span="8")
              el-form-item(label="麻醉医生")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="8")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="8")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
      el-row
        el-col(:span="12")
          el-row
            el-col(:span="12")
              el-form-item(label="洗手护士")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
            el-col(:span="12")
              el-form-item(label="")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
        el-col(:span="12")
          el-form-item(label="巡回护士")
            el-row(type="flex" justify="space-between")
              el-col(:span="10")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
              el-col(:span="10")
                el-select(v-model="form.ptId" placeholder="请选择")
                  el-option(
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value")
      el-row
        el-col(:span="24")
          el-form-item(label="手术名称")
            el-select(v-model="form.ptId" placeholder="请选择")
              el-option(
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value")
    .option
      el-button(size="mini" @click="resetForm('form')") 刷新(R)
      el-button(size="mini" @click="submitForm('form')") 保存(S)
</template>

<script>
export default {
  name: 'EmergencyTreatment',
  data () {
    return {
      form: {
        ptId: '',
        hospitalNo: '',
        room: ''
      },
      rules: {
        ptId: [
          { required: true, message: '请输入患者ID', trigger: 'change' }
        ],
        hospitalNo: [{ required: true, message: '请输入住院号', trigger: 'change' }],
        room: [{ required: true, message: '请选择手术间', trigger: 'change' }]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      level: [{ value: '0', label: '特' }, { value: '1', label: '大' }, { value: '2', label: '中' }, { value: '3', label: '小' }],
      isolation: [{ value: '0', label: '正常' }, { value: '1', label: '隔离' }, { value: '2', label: '放射' }],
      changeTime: [{ value: '0', label: '急诊' }, { value: '1', label: '择期' }]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .operation-registeration
    // background #fff
    .el-select
      width 100%
    .el-date-editor.el-input, .el-date-editor.el-input__inner
      width 100%
    .option
      text-align right
</style>
