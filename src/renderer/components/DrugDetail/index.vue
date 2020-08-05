<template lang="pug">
el-dialog(
  title="药品详情",
  :visible.sync="drugDetailVisible",
  width="30%",
  :before-close="handleClose",
  v-dialogDrag="true",
  :append-to-body="true"
)
  h3 {{ drugName }}
  el-form(
    ref="form",
    :model="form",
    label-width="80px",
    size="mini",
    :rules="rules"
  )
    el-form-item(label="起始时间")
      el-date-picker(
        v-model="form.startTime",
        type="datetime",
        placeholder="选择开始时间",
        format="yyyy-MM-dd HH:mm",
        value-format="yyyy-MM-dd HH:mm"
      )
    el-form-item(label="结束时间", prop="endTime")
      el-date-picker(
        v-model="form.endTime",
        type="datetime",
        placeholder="选择结束时间",
        :disabled="!form.continue",
        format="yyyy-MM-dd HH:mm",
        value-format="yyyy-MM-dd HH:mm"
      )
    el-form-item(label="持续用药")
      el-switch(
        v-model="form.continue",
        active-color="#13ce66",
        inactive-color="#ff4949"
      )
    el-form-item(label="途径")
      el-select(v-model="form.channel", placeholder="请选择途径")
        el-option(
          v-for="item in channelList",
          :label="item.detail_name",
          :value="item.detail_code",
          :key="item.detail_code"
        )
    el-form-item(label="浓度")
      el-input(v-model="form.concentration")
      el-select.unit(v-model="form.concentrationUnit", placeholder="请选择单位")
        el-option(
          v-for="item in conUnitList",
          :label="item.detail_name",
          :value="item.detail_code",
          :key="item.detail_code"
        )
    el-form-item(label="速度")
      el-input(v-model="form.speed")
      el-select.unit(v-model="form.speedUnit", placeholder="请选择单位")
        el-option(
          v-for="item in speedUnitList",
          :label="item.detail_name",
          :value="item.detail_code",
          :key="item.detail_code"
        )
    el-form-item(label="剂量")
      el-input(v-model="form.dose")
      el-select.unit(v-model="form.doseUnit", placeholder="请选择单位")
        el-option(
          v-for="item in doseUnitList",
          :label="item.detail_name",
          :value="item.detail_code",
          :key="item.detail_code"
        )
  span.dialog-footer(slot="footer")
    el-button(type="primary", @click="handleSubmit('form')", size="mini") 确定
    el-button(type="primary", @click="handleClose", size="mini") 取消
</template>
<script>
import moment from 'moment'
import {
  getDoseUnit,
  getConUnit,
  getSpeedUnit,
  getDrugChannel
} from '@/api/anaesDrug'
import request from '@/utils/requestForMock'
export default {
  name: 'DrugListDetail',
  data () {
    var validateTime = (rule, value, callback) => {
      if (value === '' && this.form.continue) {
        callback(new Error('请输入结束时间'))
      }
    }
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
      },
      rules: {
        endTime: [{ validator: validateTime, trigger: 'blur' }]
      },
      doseUnitList: [],
      speedUnitList: [],
      conUnitList: [],
      channelList: []
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
    },
    drugName: {
      type: String,
      required: true
    }
  },
  watch: {
    startTime: {
      handler (newVal, old) {
        this.form.startTime =
          moment(new Date()).format('yyyy-MM-DD') +
          ' ' +
          moment(newVal).format('HH:mm')
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
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.form)
        } else {
          return false
        }
      })
    },
    getDoseUnit () {
      request({
        url: getDoseUnit
      }).then((res) => {
        this.doseUnitList = res.data.data
      })
    },
    getConUnit () {
      request({
        url: getConUnit
      }).then((res) => {
        this.conUnitList = res.data.data
      })
    },
    getSpeedUnit () {
      request({
        url: getSpeedUnit
      }).then((res) => {
        this.speedUnitList = res.data.data
      })
    },
    getDrugChannel () {
      request({
        url: getDrugChannel
      }).then((res) => {
        this.channelList = res.data.data
      })
    }
  },
  mounted () {
    this.getDrugChannel()
    this.getDoseUnit()
    this.getSpeedUnit()
    this.getConUnit()
  }
}
</script>
<style lang="stylus" scoped>
h3 {
  margin: 0;
  margin-bottom: 18px;
}

.el-input {
  max-width: 217px;
}

.unit {
  margin-left: 10px;
}
</style>
