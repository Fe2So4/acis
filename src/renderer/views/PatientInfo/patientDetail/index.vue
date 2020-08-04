<template>
  <div class="patient-detail">
    <div class="content">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
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
import { patientDetail } from '@/api/patientList'
import request from '@/utils/requestForMock'
import { mapGetters } from 'vuex'
export default {
  name: 'PatientDetail',
  data () {
    return {
      basicInfo: {},
      opeInfo: {},
      docInfo: {}
    }
  },
  watch: {

  },
  components: {
    BasicInfo, OperationInfo, OperationPersonnel
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  mounted () {
    this.getPatientInfo()
  },
  methods: {
    getPatientInfo () {
      if (this.operationId === '') {
        this.$router.push('/home')
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
    .patient-detail{
      margin-top:20px;
      width: 100%;
      color:#9BA3D5;
      height: calc(100% - 192px);
      // display: flex;
      padding:20px;
      background:#181C27;
      box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
      border-radius:5px;
        .title{
            color:#15428b;
            font-size:14px;
            line-height:30px;
            padding-left:10px;
        }
        .content{
          height:calc(100% - 30px);
        }
    }
</style>
<style lang="scss">
  .patient-detail .scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
  }
</style>
