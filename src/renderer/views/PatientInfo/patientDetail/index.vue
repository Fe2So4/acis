<template>
  <div class="patient-detail">
    <div class="content">
      <el-scrollbar
        style="height:100%;"
        :wrap-style="wrapStyle"
      >
        <basic-info :basic-info="basicInfo" />
        <operation-info :ope-info="opeInfo" />
        <operation-personnel :doc-info="docInfo" />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import BasicInfo from './BasicInfo/index'
import OperationInfo from './OperationInfo/index'
import OperationPersonnel from './OperationPersonnel/index'
import { patientDetail, EjectDeviceAcquisition } from '@/api/patientList'
import request from '@/utils/requestForMock'
import $bus from '@/utils/bus'
import { mapGetters } from 'vuex'
export default {
  name: 'PatientDetail',
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      basicInfo: {},
      opeInfo: {},
      docInfo: {},
      wrapStyle
    }
  },
  watch: {},
  components: {
    BasicInfo,
    OperationInfo,
    OperationPersonnel
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  mounted () {
    this.getPatientInfo()
    this.getEjectDeviceAcquisition()
    $bus.$on('getPatientInfoData', this.getPatientInfo)
  },
  beforeDestroy () {
    $bus.$off('getPatientInfoData')
  },
  methods: {
    // 获取患者是否绑定监护仪
    getEjectDeviceAcquisition () {
      if (this.operationId === '') {
        return
      }
      request({
        method: 'GET',
        url: EjectDeviceAcquisition + '/' + this.operationId
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.warning('该患者尚未绑定监护仪,请先绑定')
          const data = res.data.data
          data.temType = '1'
          this.$eventHub.$emit('show-dialog', data)
        }
      })
    },
    // 获取患者详情
    getPatientInfo () {
      if (this.operationId === '') {
        return
      }
      request({
        method: 'GET',
        url: patientDetail + '/' + this.operationId
      }).then(res => {
        const data = res.data.data
        this.basicInfo = data.basicInfo
        this.opeInfo = data.opeInfo
        this.docInfo = data.docInfo
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme';
.patient-detail {
  margin-top: 20px;
  width: 100%;
  height: calc(100% - 192px);
  padding: 20px;
  @include theme-property('background', $color-background-navigation);
  @include theme-property('box-shadow', $box-shadow-card);
  border-radius: 5px;
  .content {
    height: 100%;
  }
}
</style>
