<template lang="pug">
.post-operative-registration
  el-form.demo-ruleForm(
    :model="form",
    ref="form",
    label-width="100px",
    size="mini",
    :rules="rules"
  )
    el-row
      el-col(:span="6")
        el-form-item(label="患者ID", prop="patient_id")
          el-input(v-model="form.patient_id")
      el-col(:span="6")
        el-form-item(label="住院号", prop="hospital_no")
          el-input(v-model="form.hospital_no")
      el-col(:span="6")
        el-form-item(label="姓名")
          el-input(v-model="form.patient_name")
      el-col(:span="6")
        el-form-item(label="性别")
          el-select(v-model="form.gender", placeholder="请选择")
            el-option(
              v-for="item in genderList",
              :key="item.value",
              :label="item.label",
              :value="item.value"
            )
    el-row
      el-col(:span="6")
        el-form-item(label="出生日期")
          el-date-picker(
            v-model="form.birthday",
            type="date",
            value-format="yyyy-MM-dd HH:mm:ss",
            format="yyyy-MM-dd"
          )
      el-col(:span="6")
        el-form-item(label="床号")
          el-input(v-model="form.bed_id")
      el-col(:span="12")
        el-form-item(label="所在科室")
          SelectDepartment(
            v-model="form.dept_code"
          )
    el-row
      el-col(:span="24")
        el-form-item(label="主要诊断")
          el-select(v-model="form.diagnose_after", placeholder="请选择诊断")
            el-option(
              v-for="item in diagnoseList",
              :key="item.diagCode",
              :label="item.diagName",
              :value="item.diagName"
            )
    el-row
      el-col(:span="24")
        el-form-item(label="病情")
          el-input(v-model="form.memo")
    el-row
      el-col(:span="6")
        el-form-item(label="手术时间")
          el-date-picker(
            v-model="form.ope_schedule_time"
            popper-class="dateTimePicker"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            type="datetime"
            placeholder="选择日期时间"
          )
      el-col(:span="6")
        el-form-item(label="台次")
          el-input(v-model="form.sequence")
      el-col(:span="12")
        el-form-item(label="手术间", prop="ope_room")
          el-select(v-model="form.ope_room", placeholder="请选择手术间")
            el-option(
              v-for="item in roomList",
              :key="item",
              :label="item",
              :value="item"
            )
    el-row
      el-col(:span="6")
        el-form-item(label="隔离")
          el-select(v-model="form.quarantine_state", placeholder="请选择是否隔离")
            el-option(
              v-for="item in quarantineList",
              :key="item.detailCode",
              :label="item.detailName",
              :value="item.detailCode"
            )
      el-col(:span="6")
        el-form-item(label="等级")
          el-select(v-model="form.ope_grade", placeholder="请选择等级")
            el-option(
              v-for="item in opeLevel",
              :key="item.detailCode",
              :label="item.detailName",
              :value="item.detailCode"
            )
      el-col(:span="12")
        el-form-item(label="麻醉方法")
          el-select(v-model="form.anes_method", placeholder="请选择")
            el-option(
              v-for="item in anaesMethod",
              :key="item.anesCode",
              :label="item.anesName",
              :value="item.anesCode"
            )
    el-row
      el-col(:span="6")
        el-form-item(label="切口等级")
          el-input(v-model="form.notch_level")
      el-col(:span="6")
        el-form-item(label="切口个数")
          el-input(v-model="form.notch_num")
      el-col(:span="12")
        el-form-item(label="急诊择期")
          el-select(v-model="form.is_emergency", placeholder="请选择")
            el-option(
              v-for="item in changeTime",
              :key="item.value",
              :label="item.label",
              :value="item.value"
            )
    el-row
      el-col(:span="6")
        el-form-item(label="手术医师")
          SelectDoctorNurse(
            v-model="form.surgeon"
            :type="1"
          )
      el-col(:span="18")
        el-row
          el-col(:span="6")
            el-form-item(label="手术助手")
              SelectDoctorNurse(
                v-model="form.first_assist"
                :type="1"
                :disabledList="[form.second_assist,form.third_assist,form.forth_assist ]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.second_assist"
                :type="1"
                :disabledList="[form.first_assist,form.third_assist,form.forth_assist ]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.third_assist"
                :type="1"
                :disabledList="[form.first_assist,form.second_assist,form.forth_assist ]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.forth_assist"
                :type="1"
                :disabledList="[form.first_assist,form.second_assist,form.third_assist ]"
              )
    el-row
      el-col(:span="6")
        el-form-item(label="输血医生")
          SelectDoctorNurse(
            v-model="form.infuse_doc"
            :type="1"
          )
      el-col(:span="18")
        el-row
          el-col(:span="6")
            el-form-item(label="麻醉医生")
              SelectDoctorNurse(
                v-model="form.anes_doc"
                :type="1"
                :disabledList="[form.first_anes_doc,form.sec_anes_doc,form.third_anes_doc]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.first_anes_doc"
                :type="1"
                :disabledList="[form.anes_doc,form.sec_anes_doc,form.third_anes_doc]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.sec_anes_doc"
                :type="1"
                :disabledList="[form.anes_doc,form.first_anes_doc,form.third_anes_doc]"
              )
          el-col(:span="6")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.third_anes_doc"
                :type="1"
                :disabledList="[form.anes_doc,form.first_anes_doc,form.sec_anes_doc]"
              )
    el-row
      el-col(:span="12")
        el-row
          el-col(:span="12")
            el-form-item(label="洗手护士")
              SelectDoctorNurse(
                v-model="form.first_ope_nurse"
                :type="2"
                :disabledList="[form.sec_ope_nurse]"
              )
          el-col(:span="12")
            el-form-item(label="")
              SelectDoctorNurse(
                v-model="form.sec_ope_nurse"
                :type="2"
                :disabledList="[form.first_ope_nurse]"
              )
      el-col(:span="12")
        el-form-item(label="巡回护士")
          el-row(type="flex", justify="space-between")
            el-col(:span="10")
              SelectDoctorNurse(
                v-model="form.first_supply_nurse"
                :type="2"
                :disabledList="[form.sec_supply_nurse]"
              )
            el-col(:span="10")
              SelectDoctorNurse(
                v-model="form.sec_supply_nurse"
                :type="2"
                :disabledList="[form.first_supply_nurse]"
              )
    el-row
      el-col(:span="24")
        el-form-item(label="手术名称")
          el-select(v-model="form.ope_code_after", placeholder="请选择"
            filterable
            remote
            clearable
            :loading="loadingSelect"
            :remote-method="remoteMethod")
            el-option(
              v-for="item in opeName",
              :key="item.opeCode",
              :label="item.opeName",
              :value="item.opeCode"
            )
    el-row
      el-col(:span="5")
        el-form-item(label="是否交班")
          <el-radio-group v-model="form.is_turn">
            el-radio(label="0") 未换班
            el-radio(label="1") 换班
          </el-radio-group>
      el-col(:span="9")
        el-form-item(label="麻醉满意度")
          <el-radio-group v-model="form.anes_satisfaction">
            el-radio(label="0") 满意
            el-radio(label="1") 不全满意
            el-radio(label="2") 不满意
          </el-radio-group>
      el-col(:span="5")
        el-form-item(label="手术过程顺利")
          <el-radio-group v-model="form.oper_procedure">
            el-radio(label="0") 顺利
            el-radio(label="1") 不顺利
          </el-radio-group>
      el-col(:span="5")
        el-form-item(label="器械清点")
          <el-radio-group v-model="form.equip_count">
            el-radio(label="0") 对数
            el-radio(label="1") 不对数
          </el-radio-group>
    el-row
      el-col(:span="5")
        el-form-item(label="总入量(ml)")
          el-input(v-model="ye_form.blood_transfusion_volume")
      el-col(:span="5")
        el-form-item(label="总出量(ml)")
          el-input(v-model="ye_form.fluid_volume")
      el-col(:span="5")
        el-form-item(label="失血量(ml)")
          el-input(v-model="ye_form.blood_losses")
      el-col(:span="4")
        el-form-item(label="尿量(ml)")
          el-input(v-model="ye_form.urine_volume")
      el-col(:span="5")
        el-form-item(label="其他出量(ml)")
          el-input(v-model="ye_form.amount_other")
  .option
    el-button(size="mini", @click="handleRefresh") 刷新(R)
    el-button(size="mini", @click="submitForm('form')") 保存(S)
</template>

<script>
// 术后登记
import {
  register,
  getRegisterData,
  getPostoperativeFluidRegistration,
  updatePostoperativeFluidRegistration
} from '@/api/register'
import {
  commonTermsDetail,
  anaesMethodDetail,
  roomNoList,
  diagnoseData,
  opeNameData
} from '@/api/dictionary'
import request from '@/utils/requestForMock'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import SelectDoctorNurse from '@/components/Dictionary/SelectDoctorNurse'
import SelectDepartment from '@/components/Dictionary/SelectDepartment'
import $bus from '@/utils/bus'
export default {
  name: 'PostoperativeRegistration',
  components: {
    SelectDoctorNurse,
    SelectDepartment
  },
  data () {
    return {
      yetiValue: [],
      ye_form: {
        blood_transfusion_volume: '',
        fluid_volume: '',
        blood_losses: '',
        urine_volume: '',
        amount_other: ''
      },
      form: {
        patient_id: '',
        hospital_no: '',
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
        quarantine_state: '',
        ope_grade: '',
        anes_method: '',
        notch_level: '',
        notch_num: '',
        is_emergency: '',
        infuse_doc: '',
        first_supply_nurse: '',
        sec_supply_nurse: '',
        anes_doc: '',
        surgeon: '',
        sec_anes_doc: '',
        first_anes_doc: '',
        third_anes_doc: '',
        first_ope_nurse: '',
        sec_ope_nurse: '',
        ope_name_before: '',
        ope_code_before: '',
        hospitalNo: '',
        room: '',
        first_assist: '',
        second_assist: '',
        third_assist: '',
        forth_assist: '',
        ope_code_after: '',
        is_turn: '',
        anes_satisfaction: '',
        oper_procedure: '',
        equip_count: ''
      },
      loadingSelect: false,
      rules: {
        patient_id: [
          { required: true, message: '请输入患者ID', trigger: 'change' }
        ],
        visit_id: [
          { required: true, message: '请输入住院号', trigger: 'change' }
        ],
        ope_room: [
          { required: true, message: '请选择手术间', trigger: 'change' }
        ]
      },
      level: [
        { value: '0', label: '特' },
        { value: '1', label: '大' },
        { value: '2', label: '中' },
        { value: '3', label: '小' }
      ],
      isolation: [
        { value: '0', label: '正常' },
        { value: '1', label: '隔离' },
        { value: '2', label: '放射' }
      ],
      changeTime: [
        { value: '0', label: '急诊' },
        { value: '1', label: '择期' }
      ],
      list: [],
      opeLevel: [],
      anaesMethod: [],
      emergencyList: [],
      quarantineList: [],
      roomList: [],
      diagnoseList: [],
      opeName: [],
      genderList: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ]
    }
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  watch: {
    'form.ope_code_after': {
      handler (newVal) {
        var arr = this.opeName.filter(function (item) {
          return item.opeCode === newVal
        })
        this.form.ope_name_after = arr[0].opeName
      }
    }
  },
  methods: {
    ...mapActions('Base', ['setPatientCardInfo']),
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updataData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRefresh () {
      $bus.$emit('getPatientInfoData')
      this.setPatientCardInfo({
        roomNo: this.form.ope_room + '-' + this.form.sequence,
        ptName: this.form.patient_name,
        gender: this.form.gender === '1' ? '男' : '女',
        ptId: this.form.patient_id
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getData () {
      request({
        url: getPostoperativeFluidRegistration + `/${this.operationId}`,
        method: 'GET'
      }).then(res => {
        if (res.data.code === 200) {
          this.yetiValue = res.data.data
          this.yetiValue.forEach(item => {
            console.log(item)
            if (item.tag_Name === '总入量') {
              this.ye_form.blood_transfusion_volume =
                item.template_select_elements_value || ''
            } else if (item.tag_Name === '总出量') {
              this.ye_form.fluid_volume =
                item.template_select_elements_value || ''
            } else if (item.tag_Name === '失血量') {
              this.ye_form.blood_losses =
                item.template_select_elements_value || ''
            } else if (item.tag_Name === '尿量') {
              this.ye_form.urine_volume =
                item.template_select_elements_value || ''
            } else if (item.tag_Name === '其他') {
              this.ye_form.amount_other =
                item.template_select_elements_value || ''
            }
          })
          // this.$message({ type: 'success', message: res.data.msg })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
      request({
        method: 'GET',
        url: getRegisterData + `/${this.operationId}`
      }).then(res => {
        const data = res.data.data
        console.log(data)
        this.form = data
        if (data.is_quarantine === '1') {
          this.form.quarantine_state = '2'
        } else if (data.is_radiate === '1') {
          this.form.quarantine_state = '3'
        } else {
          this.form.quarantine_state = '1'
        }
        this.form.surgeon = data.surgeon_code
        this.form.first_assist = data.first_assist_code
        this.form.second_assist = data.second_assist_code
        this.form.third_assist = data.third_assist_code
        this.form.forth_assist = data.forth_assist_code
        this.form.infuse_doc = data.infuse_doc_code
        this.form.anes_doc = data.anes_doc_code
        this.form.first_anes_doc = data.first_anes_doc_code
        this.form.sec_anes_doc = data.sec_anes_doc_code
        this.form.third_anes_doc = data.third_anes_doc_code
        this.form.first_ope_nurse = data.first_ope_nurse_code
        this.form.sec_ope_nurse = data.sec_ope_nurse_code
        this.form.first_supply_nurse = data.first_supply_nurse_code
        this.form.sec_supply_nurse = data.sec_supply_nurse_code
        this.form.ope_code_before = data.ope_code_before
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
    remoteMethod: _.debounce(function (query) {
      this.loadingSelect = true
      this.getOpeName(query)
    }, 200),
    getOpeName (query = '') {
      request({
        url: opeNameData,
        params: {
          size: 10,
          start: 1,
          content: query
        }
      }).then(res => {
        const data = res.data.data
        this.loadingSelect = false
        this.opeName = data.list
      })
    },
    updataData () {
      // console.log(this.form)
      this.yetiValue.forEach(item => {
        item.operation_id = this.operationId
        item.patient_id = this.form.patient_id
        if (item.tag_Name === '总入量') {
          item.template_select_elements_value = this.ye_form.blood_transfusion_volume
        } else if (item.tag_Name === '总出量') {
          item.template_select_elements_value = this.ye_form.fluid_volume
        } else if (item.tag_Name === '失血量') {
          item.template_select_elements_value = this.ye_form.blood_losses
        } else if (item.tag_Name === '尿量') {
          item.template_select_elements_value = this.ye_form.urine_volume
        } else if (item.tag_Name === '其他') {
          item.template_select_elements_value = this.ye_form.amount_other
        }
      })
      request({
        url: updatePostoperativeFluidRegistration,
        method: 'POST',
        data: this.yetiValue
      }).then(res => {
        if (res.data.code === 200) {
          request({
            url: register + `?operationId=${this.operationId}`,
            method: 'POST',
            data: this.form
          }).then(res => {
            if (res.data.code === 200) {
              this.getData()
              this.$message({ type: 'success', message: res.data.msg })
            } else {
              this.$message({ type: 'error', message: res.data.msg })
            }
          })
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
      // for (var i in this.form) {
      //   this.list.forEach(item => {
      //     if (item.className === i) {
      //       const dict = [
      //         'anes_method',
      //         'surgeon',
      //         'first_supply_nurse',
      //         'sec_supply_nurse',
      //         'first_ope_nurse',
      //         'sec_ope_nurse',
      //         'ope_name_after',
      //         'nurse_shift_record',
      //         'anesthesia_satisfaction',
      //         'operative_process',
      //         'equipment_inventory',
      //         'first_assist',
      //         'second_assist',
      //         'third_assist',
      //         'forth_assist',
      //         'infuse_doc',
      //         'anes_doc',
      //         'first_anes_doc',
      //         'sec_anes_doc',
      //         'third_anes_doc'
      //       ]
      //       if (item.value === '' && !dict.includes(item.className)) {
      //         item.label = this.form[i]
      //       } else {
      //         item.value = this.form[i]
      //         item.label = ''
      //       }
      //     }
      //   })
      // }
      // // console.log(this.list)
      // const obj = {}
      // const sheel1 = ['patient_id', 'patient_name', 'gender', 'birthday']
      // const sheel2 = [
      //   'visit_id',
      //   'bed_id',
      //   'dept_code',
      //   'memo',
      //   'ope_schedule_time',
      //   'ope_grade',
      //   'anes_method',
      //   'surgeon',
      //   'first_assist',
      //   'second_assist',
      //   'third_assist',
      //   'forth_assist'
      // ]
      // const sheel3 = [
      //   'diagnose_after',
      //   'sequence',
      //   'ope_room',
      //   'is_quarantine',
      //   'notch_level',
      //   'notch_num',
      //   'is_emergency',
      //   'infuse_doc',
      //   'anes_doc',
      //   'first_anes_doc',
      //   'sec_anes_doc',
      //   'third_anes_doc',
      //   'first_ope_nurse',
      //   'sec_ope_nurse',
      //   'first_supply_nurse',
      //   'sec_supply_nurse',
      //   'ope_name_after'
      // ]
      // const sheel4 = [
      //   'nurse_shift_record',
      //   'anesthesia_satisfaction',
      //   'operative_process',
      //   'equipment_inventory',
      //   'blood_transfusion_volume',
      //   'fluid_volume',
      //   'blood_losses',
      //   'urine_volume',
      //   'amount_other'
      // ]
      // obj.acis_pat_master_index = []
      // obj.acis_ope_apply_info = []
      // obj.acis_ope_schedule_info = []
      // obj.acis_amount_record = []
      // this.list.forEach(item => {
      //   if (item.className === 'patient_gender') {
      //     obj.acis_pat_master_index.push({
      //       value: this.form.gender,
      //       className: 'gender',
      //       label: ''
      //     })
      //   } else {
      //     sheel1.forEach(_item1 => {
      //       if (_item1 === item.className) {
      //         obj.acis_pat_master_index.push(item)
      //       }
      //     })
      //   }
      //   sheel2.forEach(_item2 => {
      //     if (_item2 === item.className) {
      //       obj.acis_ope_apply_info.push(item)
      //     }
      //   })
      //   sheel3.forEach(_item3 => {
      //     if (_item3 === item.className) {
      //       obj.acis_ope_schedule_info.push(item)
      //     }
      //   })
      //   sheel4.forEach(_item4 => {
      //     if (_item4 === item.className) {
      //       obj.acis_amount_record.push(item)
      //     }
      //   })
      // })
      // console.log(obj)
    }
  },
  created () {
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
    // 获取手术名称
    this.getOpeName()
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
.post-operative-registration {
  // background #fff
  .el-select {
    width: 100%;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .option {
    text-align: right;
  }
}
</style>
