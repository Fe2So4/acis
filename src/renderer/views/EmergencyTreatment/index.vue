<template lang="pug">
  .emergency-treatment
    el-form(:model="form" ref="form" label-width="100px" class="demo-ruleForm" size="mini" :rules="rules")
      el-row
        el-col(:span="6")
          el-form-item(label="患者ID" prop="patient_id")
            el-input(v-model="form.patient_id" @blur="getData")
        el-col(:span="6")
          el-form-item(label="住院号" prop="visit_id")
            el-input(v-model="form.visit_id")
        el-col(:span="6")
          el-form-item(label="姓名")
            el-input(v-model="form.patient_name")
        el-col(:span="6")
          el-form-item(label="性别")
            el-select(v-model="form.gender" placeholder="请选择")
              el-option(
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="出生日期")
            el-date-picker(v-model="form.birthday" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd")
        el-col(:span="6")
          el-form-item(label="床号")
            el-input(v-model="form.bed_id")
        el-col(:span="12")
          el-form-item(label="所在科室")
            el-select(v-model="form.dept_code" placeholder="请选择所在科室")
              el-option(
                v-for="item in deptList"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode")
      el-row
        el-col(:span="24")
          el-form-item(label="主要诊断")
            el-select(v-model="form.diagnose_after" placeholder="请选择诊断")
              el-option(
                v-for="item in diagnoseList"
                :key="item.diagCode"
                :label="item.diagName"
                :value="item.diagCode")
      el-row
        el-col(:span="24")
          el-form-item(label="病情")
            el-input(v-model="form.memo")
      el-row
        el-col(:span="6")
          el-form-item(label="手术时间")
            el-input(v-model="form.ope_schedule_time")
        el-col(:span="6")
          el-form-item(label="台次")
            el-input(v-model="form.sequence")
        el-col(:span="12")
          el-form-item(label="手术间" prop="ope_room")
            el-select(v-model="form.ope_room" placeholder="请选择手术间" )
              el-option(
                v-for="item in roomList"
                :key="item"
                :label="item"
                :value="item")
      el-row
        el-col(:span="6")
          el-form-item(label="隔离")
            el-select(v-model="form.is_quarantine" placeholder="请选择是否隔离")
              el-option(
                v-for="item in quarantineList"
                :key="item.detailCode"
                :label="item.detailName"
                :value="item.detailCode")
        el-col(:span="6")
          el-form-item(label="等级")
            el-select(v-model="form.ope_grade" placeholder="请选择等级")
              el-option(
                v-for="item in opeLevel"
                :key="item.detailCode"
                :label="item.detailName"
                :value="item.detailCode")
        el-col(:span="12")
          el-form-item(label="麻醉方法")
            el-select(v-model="form.anes_method" placeholder="请选择")
              el-option(
                v-for="item in anaesMethod"
                :key="item.anesCode"
                :label="item.anesName"
                :value="item.anesCode")
      el-row
        el-col(:span="6")
          el-form-item(label="切口等级" )
            el-input(v-model="form.notch_level")
        el-col(:span="6")
          el-form-item(label="切口个数" )
            el-input(v-model="form.notch_num")
        el-col(:span="12")
          el-form-item(label="急诊择期")
            el-select(v-model="form.is_emergency" placeholder="请选择")
              el-option(
                v-for="item in changeTime"
                :key="item.value"
                :label="item.label"
                :value="item.value")
      el-row
        el-col(:span="6")
          el-form-item(label="手术医师")
            el-select(v-model="form.surgeon" placeholder="请选择手术间")
              el-option(
                v-for="item in doctorList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId")
        el-col(:span="18")
          el-row
            el-col(:span="6")
              el-form-item(label="手术助手")
                el-select(v-model="form.first_assist" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.second_assist" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.third_assist" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="6")
              el-form-item(label="")
                el-select(v-model="form.forth_assist" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
      el-row
        el-col(:span="6")
          el-form-item(label="灌注医生")
            el-select(v-model="form.infuse_doc" placeholder="请选择")
              el-option(
                v-for="item in doctorList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId")
        el-col(:span="18")
          el-row
            el-col(:span="8")
              el-form-item(label="麻醉医生")
                el-select(v-model="form.first_anes_doc" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="8")
              el-form-item(label="")
                el-select(v-model="form.sec_anes_doc" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="8")
              el-form-item(label="")
                el-select(v-model="form.third_anes_doc" placeholder="请选择")
                  el-option(
                    v-for="item in doctorList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
      el-row
        el-col(:span="12")
          el-row
            el-col(:span="12")
              el-form-item(label="洗手护士")
                el-select(v-model="form.first_ope_nurse" placeholder="请选择")
                  el-option(
                    v-for="item in nurseList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
            el-col(:span="12")
              el-form-item(label="")
                el-select(v-model="form.sec_ope_nurse" placeholder="请选择")
                  el-option(
                    v-for="item in nurseList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
        el-col(:span="12")
          el-form-item(label="巡回护士")
            el-row(type="flex" justify="space-between")
              el-col(:span="10")
                el-select(v-model="form.first_supply_nurse" placeholder="请选择")
                  el-option(
                    v-for="item in nurseList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
              el-col(:span="10")
                el-select(v-model="form.sec_supply_nurse" placeholder="请选择")
                  el-option(
                    v-for="item in nurseList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId")
      el-row
        el-col(:span="24")
          el-form-item(label="手术名称")
            el-select(v-model="form.ope_name_after" placeholder="请选择")
              el-option(
                v-for="item in opeName"
                :key="item.opeCode"
                :label="item.opeName"
                :value="item.opeCode")
    .option
      el-button(size="mini" @click="resetForm('form')") 刷新(R)
      el-button(size="mini" @click="updataData") 保存(S)
</template>

<script>
import {
  getEmergencyInfo,
  saveEmergencyInfo
} from '@/api/register'
import {
  commonTermsDetail,
  anaesMethodDetail,
  roomNoList,
  diagnoseData,
  doctorData,
  opeNameData,
  deptList
} from '@/api/dictionary'
import request from '@/utils/requestForMock'
export default {
  name: 'EmergencyTreatment',
  data () {
    return {
      form: {
        patient_id: '',
        visit_id: '',
        patient_name: '',
        gender: '',
        birthday: '',
        bed_id: '',
        dept_code: '',
        diagnose_after: '',
        memo: '',
        ope_schedule_time: '',
        sequence: '',
        ope_room: '',
        is_quarantine: '',
        ope_grade: '',
        anes_method: '',
        notch_level: '',
        notch_num: '',
        is_emergency: '',
        infuse_doc: '',
        anes_doc: '',
        surgeon: '',
        sec_anes_doc: '',
        third_anes_doc: '',
        first_ope_nurse: '',
        sec_ope_nurse: '',
        ope_name_after: '',
        hospitalNo: '',
        room: '',
        first_assist: '',
        second_assist: '',
        third_assist: '',
        forth_assist: '',
        nurse_shift_record: '',
        anesthesia_satisfaction: '',
        operative_process: '',
        equipment_inventory: '',
        blood_transfusion_volume: '',
        fluid_volume: '',
        blood_losses: '',
        urine_volumn: '',
        amount_other: ''
      },
      rules: {
        ptId: [
          { required: true, message: '请输入患者ID', trigger: 'change' }
        ],
        hospitalNo: [{ required: true, message: '请输入住院号', trigger: 'change' }],
        ope_room: [{ required: true, message: '请选择手术间', trigger: 'change' }]
      },
      level: [{ value: '0', label: '特' }, { value: '1', label: '大' }, { value: '2', label: '中' }, { value: '3', label: '小' }],
      isolation: [{ value: '0', label: '正常' }, { value: '1', label: '隔离' }, { value: '2', label: '放射' }],
      changeTime: [{ value: '0', label: '急诊' }, { value: '1', label: '择期' }],
      opeLevel: [],
      anaesMethod: [],
      emergencyList: [],
      quarantineList: [],
      roomList: [],
      diagnoseList: [],
      doctorList: [],
      nurseList: [],
      opeName: [],
      deptList: [],
      list: [],
      genderList: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          return false
        }
      })
    },
    getData () {
      request({
        url: getEmergencyInfo,
        method: 'POST',
        params: {
          patientInfo: this.form.patient_id
        }
      }).then(res => {
        const data = res.data.data
        for (var i in this.form) {
          data.info.forEach(item => {
            if (item.className === i) {
              if (item.value === '') {
                this.form[i] = item.label
              } else {
                this.form[i] = item.value
              }
            }
          })
        }
        this.list = data.info
      })
    },
    getLevelData (param) {
      request({
        url: commonTermsDetail + '/' + 'D010',
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.opeLevel = data
      })
    },
    getMethodData () {
      request({
        url: anaesMethodDetail,
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.anaesMethod = data
      })
    },
    getEmergencyData () {
      request({
        url: commonTermsDetail + '/' + 'D019',
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.emergencyList = data
      })
    },
    getQuarantineData () {
      request({
        url: commonTermsDetail + '/' + 'D018',
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.quarantineList = data
      })
    },
    getRoomData () {
      request({
        url: roomNoList,
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.roomList = data
      })
    },
    getDiagnoseList () {
      request({
        url: diagnoseData
      }).then(res => {
        const data = res.data.data
        this.diagnoseList = data
      })
    },
    getDoctorList () {
      request({
        url: doctorData + '/1',
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.doctorList = data
      })
    },
    getNurseList () {
      request({
        url: doctorData + '/2',
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.nurseList = data
      })
    },
    getDeptList () {
      request({
        url: deptList
      }).then(res => {
        this.deptList = res.data.data
      })
    },
    getOpeName () {
      request({
        url: opeNameData
      }).then(res => {
        const data = res.data.data
        this.opeName = data
      })
    },
    updataData () {
      const obj = {}
      const sheel1 = [{ className: 'patient_id', dict: false }, { className: 'patient_name', dict: false }, { className: 'gender', dict: true }, { className: 'birthday', dict: false }]
      const sheel2 = [{ className: 'visit_id', dict: false }, { className: 'bed_id', dict: false }, { className: 'dept_code', dict: true },
        { className: 'memo', dict: false }, { className: 'ope_schedule_time', dict: false }, { className: 'ope_grade', dict: true },
        { className: 'anes_method', dict: true }, { className: 'surgeon', dict: true },
        { className: 'first_assist', dict: true }, { className: 'second_assist', dict: true }, { className: 'third_assist', dict: true }, { className: 'forth_assist', dict: true }]
      const sheel3 = [{ className: 'diagnose_after', dict: false }, { className: 'sequence', dict: false },
        { className: 'ope_room', dict: true },
        { className: 'is_quarantine', dict: true },
        { className: 'notch_level', dict: false },
        { className: 'notch_num', dict: false },
        { className: 'is_emergency', dict: true },
        { className: 'infuse_doc', dict: true },
        { className: 'anes_doc', dict: true },
        { className: 'first_anes_doc', dict: true },
        { className: 'sec_anes_doc', dict: true },
        { className: 'third_anes_doc', dict: true },
        { className: 'first_ope_nurse', dict: true },
        { className: 'sec_ope_nurse', dict: true },
        { className: 'first_supply_nurse', dict: true },
        { className: 'sec_supply_nurse', dict: true }
      ]
      const sheel4 = [
        { className: 'nurse_shift_record', dict: true },
        { className: 'anesthesia_satisfaction', dict: true },
        { className: 'operative_process', dict: true },
        { className: 'equipment_inventory', dict: true },
        { className: 'blood_transfusion_volume', dict: false },
        { className: 'fluid_volume', dict: false },
        { className: 'blood_losses', dict: false },
        { className: 'urine_volumn', dict: false },
        { className: 'amount_other', dict: false }]
      // const dict = ['gender', 'dept_code', 'diagnose_after',
      //   'ope_room', 'is_quarantine', 'ope_grade', 'anes_method', 'is_emergency',
      //   'surgeon', 'first_assist', 'second_assist', 'third_assist', 'forth_assist',
      //   'infuse_doc', 'first_anes_doc', 'sec_anes_doc', 'third_anes_doc', 'first_ope_nurse', 'sec_ope_nurse',
      //   'first_supply_nurse', 'sec_supply_nurse', 'ope_name_after']
      obj.acis_pat_master_index = []
      obj.acis_ope_apply_info = []
      obj.acis_ope_schedule_info = []
      obj.acis_amount_record = []
      for (var item in this.form) {
        sheel1.forEach(_item1 => {
          if (_item1.className === item) {
            if (_item1.dict === true) {
              obj.acis_pat_master_index.push({ className: item, value: this.form[item], label: '' })
            } else {
              obj.acis_pat_master_index.push({ className: item, value: '', label: this.form[item] })
            }
          }
        })
        sheel2.forEach(_item2 => {
          if (_item2.className === item) {
            if (_item2.dict === true) {
              obj.acis_ope_apply_info.push({ className: item, value: this.form[item], label: '' })
            } else {
              obj.acis_ope_apply_info.push({ className: item, value: '', label: this.form[item] })
            }
          }
        })
        sheel3.forEach(_item3 => {
          if (_item3.className === item) {
            if (_item3.dict === true) {
              obj.acis_ope_schedule_info.push({ className: item, value: this.form[item], label: '' })
            } else {
              obj.acis_ope_schedule_info.push({ className: item, value: '', label: this.form[item] })
            }
          }
        })
        sheel4.forEach(_item4 => {
          if (_item4.className === item) {
            if (_item4.dict === true) {
              obj.acis_amount_record.push({ className: item, value: this.form[item], label: '' })
            } else {
              obj.acis_amount_record.push({ className: item, value: '', label: this.form[item] })
            }
          }
        })
      }
      request({
        url: saveEmergencyInfo,
        method: 'POST',
        data: obj
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '增加急诊成功' })
        } else {
          this.$message({ type: 'error', message: '增加急诊失败' })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    // this.getData()
    // 获取手术方法
    this.getMethodData()
    // 获取手术等级
    this.getLevelData()
    // 获取隔离方式
    this.getQuarantineData()
    // 获取急诊择期
    this.getEmergencyData()
    // 获取房间号
    this.getRoomData()
    // 获取诊断列表
    this.getDiagnoseList()
    // 获取手术医生列表
    this.getDoctorList()
    // 获取护士列表
    this.getNurseList()
    // 获取手术名称
    this.getOpeName()
    // 获取科室列表
    this.getDeptList()
  }
}
</script>

<style lang="stylus" scoped>
  .emergency-treatment
    // background #fff
    .el-select
      width 100%
    .el-date-editor.el-input, .el-date-editor.el-input__inner
      width 100%
    .option
      text-align right
</style>
