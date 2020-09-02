<template>
  <div>
    <el-dialog
      title="复苏床位"
      :visible="visible"
      @close="onCancel"
      width="80%"
    >
      <div class="content">
        <bed-list
          :list="bedList"
          @select-bed="onSelectBed"
        />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="onCancel"
          size="mini"
        >
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BedList from './BedList'
import request from '@/utils/requestForMock'
import { getResuscitationBedList, selectResuscitationBed, addMonitorInfo } from '@/api/resuscitation'
import { mapState } from 'vuex'

export default {
  name: 'DialogResuscitationBed',
  components: {
    BedList
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      bedList: []
    }
  },
  computed: {
    ...mapState('Base', ['patientId', 'operationId'])
  },
  created () {
    this.getResuscitationBedList()
  },
  methods: {
    onCancel () {
      this.$emit('update:visible', false)
    },
    onSelectBed (item) {
      this.$confirm(`床位号为${item.bedNum}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'messageBox'
      }).then(() => {
        this.selectResuscitationBed(item.bedNum)
      }).catch(() => {
      })
    },
    // 获取复苏床位列表
    getResuscitationBedList () {
      return request({
        url: getResuscitationBedList,
        method: 'post'
      }).then(res => {
        if (res.data && res.data.success) {
          if (Array.isArray(res.data.data)) {
            this.bedList = res.data.data
          }
        }
      })
    },
    // 选中床位
    selectResuscitationBed (bedNumber) {
      return request({
        method: 'post',
        url: selectResuscitationBed,
        params: {
          patientId: this.patientId,
          operationId: this.operationId,
          roomNumber: '605',
          bedNumber: bedNumber
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$emit('update:visible', false)
            return this.addMonitorInfo(bedNumber)
          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
          this.$message({
            type: 'error',
            message: '选择床位失败'
          })
        }
      )
    },
    // 增加设备信息
    addMonitorInfo (bedNumber) {
      return request({
        method: 'post',
        url: addMonitorInfo,
        data: [{
          operationId: this.operationId,
          roomNo: bedNumber
        }]
      }).then(
        res => {
          if (res.data && res.data.success) {

          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
        }
      )
    }
  }
}
</script>
<style lang='scss' scoped>
  .content {
    height: 60vh;
  }
</style>
