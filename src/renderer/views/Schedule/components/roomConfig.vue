<template>
  <div class="room-config">
    <el-dialog
      title="手术间配置"
      :visible.sync="roomVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="roomConfig">
        <el-form
          ref="form"
          label-width="100px"
          size="mini"
        >
          <el-form-item label="手术间号">
            <el-input
              v-model="roomNo"
              disabled
            />
          </el-form-item>
          <el-form-item label="最大手术台数">
            <el-input v-model="maxCount" />
          </el-form-item>
          <el-form-item label="科室">
            <el-select
              v-model="dept"
              placeholder="请选择科室"
            >
              <el-option
                v-for="(item,index) in deptList"
                :key="index"
                :value="item.deptCode"
                :label="item.deptName"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div
          class="option"
          style="display:flex;justify-content:center;"
        >
          <el-button
            type="primary"
            @click="updataData"
            size="mini"
            style="margin-right:20px;"
          >
            确定
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleClose"
          >
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { getConfigByRoomNo, changeConfigByRoomNo } from '@/api/schedule'
import { deptList } from '@/api/dictionary'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      contextMenuData2: {
        menuName: 'demo1',
        axis: {
          x: null,
          y: null
        },
        menulists: [
          {
            btnName: '清空',
            fnHandler: 'handlerClearList'
          }
        ]
      },
      deptList: [],
      maxCount: '',
      dept: '',
      roomNo: ''
    }
  },
  props: {
    roomVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom'])
  },
  methods: {
    submitRoomConfig () {},
    getConfigData () {
      request({
        url: getConfigByRoomNo + '/' + this.currentRoom.roomNo
      }).then((res) => {
        const data = res.data.data
        this.maxCount = data.maxOperationNum
        this.deptCode = data.deptCode
        this.roomNo = data.roomNo
      })
    },
    updataData () {
      const obj = {}
      obj.maxNo = this.maxCount
      obj.deptCode = this.deptCode
      obj.roomNo = this.roomNo
      request({
        url: changeConfigByRoomNo,
        method: 'POST',
        params: obj
      }).then((res) => {
        if (res.data.code === 200) {
          this.$eventHub.$emit('get-room')
          this.$eventHub.$emit('handle-close')
          this.$message({ type: 'success', message: '提交成功' })
        } else {
          this.$message({ type: 'error', message: '提交失败' })
        }
      })
    },
    getDeptList () {
      request({
        url: deptList,
        method: 'GET'
      }).then(res => {
        this.deptList = res.data.data
      })
    },
    handleClose () {
      this.$eventHub.$emit('handle-close')
    }
  },
  mounted () {
    this.getConfigData()
    this.getDeptList()
  }
}
</script>
<style lang="scss" scoped>
.room-config {
}
</style>
