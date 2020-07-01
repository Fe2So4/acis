<template lang="pug">
    el-dialog(title="药品详情" :visible.sync="drugDetailVisible" width="30%" :before-close="handleClose" v-dialogDrag="true" :append-to-body='true')
      h3 去甲肾上腺素
      el-form(ref="form" :model="form" label-width="80px" size="mini")
        el-form-item(label="起始时间")
          el-date-picker(v-model="form.startTime" type="datetime" placeholder="选择开始时间" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm")
        el-form-item(label="结束时间")
          el-date-picker(v-model="form.endTime" type="datetime" placeholder="选择结束时间" :disabled="!form.continue" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm")
        el-form-item(label="持续用药")
          el-switch(v-model="form.continue" active-color="#13ce66" inactive-color="#ff4949")
        el-form-item(label="途径")
          el-select(v-model="form.channel" placeholder="请选择途径")
            el-option(label="点滴" value="1")
            el-option(label="注射" value="2")
            el-option(label="泵入" value="3")
        el-form-item(label="浓度")
          el-input(v-model="form.concentration")
          el-select(v-model="form.concentrationUnit" placeholder="请选择单位" class="unit")
            el-option(label="%1" value="1")
            el-option(label="%2" value="2")
            el-option(label="%3" value="3")
        el-form-item(label="速度")
          el-input(v-model="form.speed")
          el-select(v-model="form.speedUnit" placeholder="请选择单位" class="unit")
            el-option(label="mg/h" value="1")
            el-option(label="ml/h" value="2")
            el-option(label="g/h" value="3")
        el-form-item(label="剂量")
          el-input(v-model="form.dose")
          el-select(v-model="form.doseUnit" placeholder="请选择单位" class="unit")
            el-option(label="mg" value="1")
            el-option(label="ml" value="2")
            el-option(label="g" value="3")
      span(slot="footer" class="dialog-footer")
       el-button(type="primary" @click="handleSubmit" size="mini") 确定
       el-button(type="primary" @click="handleClose" size="mini") 取消
</template>
<script>
import moment from 'moment'
export default {
  name: 'DrugListDetail',
  data () {
    return {
      form: {
        startTime: '',
        endTime: '',
        continue: true,
        channel: '',
        concentration: '',
        speed: '',
        dose: '',
        speedUnit: '',
        concentrationUnit: '',
        doseUnit: ''
      }
    }
  },
  props: {
    drugDetailVisible: {
      type: Boolean,
      default: false
    },
    startTime: {
      type: Number,
      default: null
    }
  },
  watch: {
    startTime: {
      handler (newVal, old) {
        this.form.startTime = moment(new Date()).format('yyyy-MM-DD') + ' ' + moment(newVal).format('HH:mm')
        console.log(newVal)
      },
      immediate: true
    },
    form: {
      handler (newVal, old) {
        return newVal
      },
      deep: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleSubmit () {
      this.$emit('handleSubmit', this.form)
    }
  }
}
</script>
<style lang="stylus" scoped>
  h3
   margin 0
   margin-bottom 18px
  .el-input
    max-width 217px
  .unit
    margin-left 10px
</style>
