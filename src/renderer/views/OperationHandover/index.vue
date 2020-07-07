<template lang="pug">
  .operation-handover
    .doc
      h3 医生交接班
      el-form(size="mini" :model="docForm" label-width="100px")
        el-form-item(label="交班时间")
          el-date-picker(v-model="docForm.handTime" type="datetime" placeholder="选择日期时间")
        el-form-item(label="交班医生")
          el-input(v-model="docForm.handDoc1")
          el-input(v-model="docForm.handDoc2" style="margin-left:10px;")
        el-form-item(label="接班医生")
          el-input(v-model="docForm.succeedDoc1")
          el-input(v-model="docForm.succeedDoc2" style="margin-left:10px;")
    .nurse
      h3 护士交接班
      el-form(size="mini" :model="nurseForm" label-width="100px")
        el-form-item(label="交班时间")
          el-date-picker(v-model="nurseForm.handTime" type="datetime" placeholder="选择日期时间")
        el-form-item(label="交班洗手护士")
          el-input(v-model="nurseForm.handNurse1")
          el-input(v-model="nurseForm.handNurse2" style="margin-left:10px;")
        el-form-item(label="接班洗手护士")
          el-input(v-model="nurseForm.succeedNurse1")
          el-input(v-model="nurseForm.succeedNurse2" style="margin-left:10px;")
        el-form-item(label="交班洗手护士")
          el-input(v-model="nurseForm.handNurse1")
          el-input(v-model="nurseForm.handNurse2" style="margin-left:10px;")
        el-form-item(label="接班洗手护士")
          el-input(v-model="nurseForm.succeedNurse1")
          el-input(v-model="nurseForm.succeedNurse2" style="margin-left:10px;")
</template>
<script>
export default {
  name: 'OperationHandover',
  data () {
    return {
      docForm: {
        handTime: '',
        handDoc1: '',
        handDoc2: '',
        succeedDoc1: '',
        succeedDoc2: ''
      },
      nurseForm: {
        handTime: '',
        handNurse1: '',
        handNurse2: '',
        succeedNurse1: '',
        succeedNurse2: ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .operation-handover
    background #1E222E
    border-radius 10px
    padding 20px 10px
    .el-input
      width 210px
    h3
      font-size 14px
      margin unset
      color #9BA3D5
      line-height 28px
      font-weight 400
</style>
