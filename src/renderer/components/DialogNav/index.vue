<template lang="pug">
  .dialog(@click.stop="()=>{}")
    //- .dialog-mask
    .dialog-content
      .dialog-title
       span {{title}}
       i(class="el-icon-close" @click="handleClose")
      .dialog-body
        //- component(:is="componentName")
        //- OperationOverview
        //- Event
        //- <operation-handover/>
        //- Hemodynamics
        //- IntraoperativePatients
        //- PostoperativeRegistration
        //- IntraoperativeRegistration
        //- PatientDetail
        //- DeviceGather
        //- StateMaintain
        //- ResuscitationBed
        //- RealtimeStatus
        //- PacuStatus
        AnaesScore
        //- InspectionInformation
        //- PatientWarning
        //- MedicalOrderInformation
        //- InspectionResult
        //- MedicalRecordCourse
        //- EmergencyTreatment
        //- OperationLevel
        //- OperationArrangement
        //- About
        //- TemplateDisplayer
    //- .dialog-footer
</template>
<script>
import Hemodynamics from '@/views/Hemodynamics/index'
import ChangePass from '@/views/ChangePassword/index'
import Event from '@/views/Event/index'
import TemplateManagement from '@/views/TemplateManagement/index'
import TemplateDesigner from '@/views/TemplateDesigner/index'
import TemplateDisplayer from '@/views/TemplateDisplayer/index'
import ConfigurationSystem from '@/views/ConfigurationSystem/index'
import OperationHandover from '@/views/OperationHandover/index'
import IntraoperativePatients from '@/views/IntraoperativePatients/index'
import IntraoperativeRegistration from '@/views/IntraoperativeRegistration/index'
import PatientDetail from '@/views/PatientDetail/index'
import DeviceGather from '@/views/DeviceGather/index'
import OperationCancel from '@/views/OperationCancel/index'
import StateMaintain from '@/views/StateMaintain/index'
import ResuscitationBed from '@/views/ResuscitationBed/index'
import RealtimeStatus from '@/views/RealtimeStatus/index'
import PacuStatus from '@/views/PacuStatus/index'
import Dictionary from '@/views/Dictionary/index'
import AnaesScore from '@/views/AnaesScore/index'
import InspectionInformation from '@/views/InspectionInformation/index'
import PatientWarning from '@/views/PatientWarning/index'
import MedicalOrderInformation from '@/views/MedicalOrderInformation/index'
import InspectionResult from '@/views/InspectionResult/index'
import MedicalRecordCourse from '@/views/MedicalRecordCourse/index'
import EmergencyTreatment from '@/views/EmergencyTreatment/index'
import OperationLevel from '@/views/OperationLevel/index'
import OperationArrangement from '@/views/OperationArrangement/index'
import About from '@/views/About/index'
import OperationOverview from '@/views/OperationOverview/index'
import PostoperativeRegistration from '@/views/PostoperativeRegistration/index'
export default {
  name: 'DialogNav',
  data () {
    return {
      // componentName: 'ChangePass'
    }
  },
  props: {
    componentName: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    }
  },
  components: {
    ChangePass,
    Hemodynamics,
    Event,
    TemplateManagement,
    TemplateDesigner,
    ConfigurationSystem,
    OperationHandover,
    IntraoperativePatients,
    IntraoperativeRegistration,
    PatientDetail,
    DeviceGather,
    OperationCancel,
    StateMaintain,
    ResuscitationBed,
    RealtimeStatus,
    PacuStatus,
    Dictionary,
    AnaesScore,
    TemplateDisplayer,
    InspectionInformation,
    PatientWarning,
    MedicalOrderInformation,
    InspectionResult,
    MedicalRecordCourse,
    EmergencyTreatment,
    OperationLevel,
    OperationArrangement,
    About,
    OperationOverview,
    PostoperativeRegistration
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .dialog
    -webkit-app-region:no-drag;
    font-size 14px
    position fixed
    width 100vw
    height 100vh
    left 0
    top 0
    z-index 2
    display flex
    justify-content center
    align-items center
    .dialog-content
      padding 0px 20px 20px
      background #181C27
      box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
      border-radius 10px
      .dialog-title
        line-height 32px
        display flex
        color #0094FF
        justify-content space-between
        i
          font-size 18px
          margin-top 7px
          font-weight bold
          cursor pointer
          transition all ease 0.3
          &:hover
            transform scale(1.2)
    // .dialog-body
</style>
