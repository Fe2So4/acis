<template>
  <el-dialog
    title="血气分析"
    :visible="visible"
    @close="onCancel"
    append-to-body
    width="fit-content"
    @open="onOpen"
    class="dialog"
  >
    <BloodGas
      :time.sync="time"
      :items="list"
    />
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
      <el-button
        type="primary"
        @click="onConfirm"
        size="mini"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import {
  getBloodGasAnalysisDict
} from '@/api/blood'
import request from '@/utils/requestForMock'
import BloodGas from '@/components/BloodGas/BloodGas'
export default {
  name: 'DialogAddBloodGas',
  components: { BloodGas },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    defaultTime: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      time: ''
    }
  },
  watch: {
    defaultTime: function (val) {
      this.time = val
    }
  },
  computed: {
    ...mapState('Base', [
      'operationId'
    ])
  },
  created () {
    this.getBloodGasAnalysisDict().then(
      res => {
        this.list = res
      },
      e => {
        this.$message.error(e.message)
      }
    )
  },
  methods: {
    onCancel () {
      this.$emit('update:visible', false)
    },
    onConfirm () {
      const data = {}
      data.analysisTime = this.time
      data.operationId = this.operationId
      data.recordList = this.list
      this.$emit('confirm', data)
    },
    onOpen () {
      this.list.forEach(item => {
        item.bloodValue = ''
      })
    },
    getBloodGasAnalysisDict () {
      return request({
        url: getBloodGasAnalysisDict
      }).then(
        res => {
          if (res.data.success) {
            res.data.data.forEach(item => {
              item.bloodValue = item.bloodValue || ''
            })
            return res.data.data
          } else {
            return Promise.reject(new Error('获取血气分析字典失败'))
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog   ::v-deep {
  .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>
