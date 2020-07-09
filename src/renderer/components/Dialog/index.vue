<template lang="pug">
  .dialog
    //- .dialog-mask
    .dialog-content
      .dialog-title
       span {{title}}
       i(class="el-icon-close" @click="handleClose")
      .dialog-body
        component(:is="componentName")
        //- <operation-handover/>
        //- <hemody-namics />
        //- IntraoperativePatients
        //- IntraoperativeRegistration
        //- PatientDetail
        //- DeviceGather
    //- .dialog-footer
</template>
<script>
import Hemodynamics from '@/views/Hemodynamics/index'
import ChangePass from '@/views/ChangePassword/index'
import Event from '@/views/Event/index'
import TemplateManagement from '@/views/TemplateManagement/index'
import TemplateDesigner from '@/views/TemplateDesigner/index'
import ConfigurationSystem from '@/views/ConfigurationSystem/index'
import OperationHandover from '@/views/OperationHandover/index'
import IntraoperativePatients from '@/views/IntraoperativePatients/index'
import IntraoperativeRegistration from '@/views/IntraoperativeRegistration/index'
import PatientDetail from '@/views/PatientDetail/index'
import DeviceGather from '@/views/DeviceGather/index'
import OperationCancel from '@/views/OperationCancel/index'
export default {
  name: 'Dialog',
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
    OperationCancel
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
      padding 0px 20px 40px
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
