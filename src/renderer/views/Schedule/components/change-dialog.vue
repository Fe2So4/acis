<template>
  <div class="change-dialog">
    <el-dialog
      :title="changeTitle"
      :visible.sync="changeVisible"
      width="40%"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-row>
        {{ changeType !== '2' ? '把该手术重新分配到' : '需要把' }}{{ changeType === '2' ? currentRoom.roomNo + '号手术间的数据与' : '' }}
        <el-select
          v-model="arrangeRoom"
          size="mini"
        >
          <el-option
            v-for="(item,index) in roomNoList"
            :key="index"
            :value="item"
            :label="item"
            :disabled="item == currentRoom.roomNo"
          />
        </el-select>
        号手术间{{ changeType!=='2' ? '' : '的数据进行交换' }}
      </el-row>
      <el-row style="margin:10px 0;">
        <el-checkbox
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </el-row>
      <el-row>
        <el-checkbox-group
          v-model="checkedContent"
          @change="handleCheckedContentChange"
        >
          <el-checkbox
            v-for="item in changeContent"
            :label="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
      <div
        class="option"
        style="display:flex;justify-content:center;margin-top:30px;"
      >
        <el-button
          type="primary"
          @click="submitChangeRoom"
          size="mini"
        >
          确定
        </el-button>
        <el-button
          type="primary"
          @click="handleClose"
          size="mini"
        >
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  roomNoList
} from '@/api/dictionary'
import { changeRoomData, changeTwoRoomData } from '@/api/schedule'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      arrangeRoom: '',
      roomNoList: [],
      currentId: '',
      changeContent: [
        {
          label: '主麻',
          value: 'A'
        },
        {
          label: '副麻1',
          value: 'B'
        },
        {
          label: '副麻2',
          value: 'C'
        },
        {
          label: '副麻3',
          value: 'D'
        },
        {
          label: '洗手1',
          value: 'E'
        },
        {
          label: '洗手2',
          value: 'F'
        },
        {
          label: '巡回1',
          value: 'G'
        },
        {
          label: '巡回2',
          value: 'H'
        }
      ],
      checkedContent: [],
      // changeType: '',
      isIndeterminate: true
    }
  },
  props: {
    changeTitle: {
      type: String,
      default: ''
    },
    changeVisible: {
      type: Boolean,
      default: false
    },
    changeType: {
      type: String,
      required: true
    },
    selectAllocated: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom', 'time'])
  },
  methods: {
    handleCheckAllChange (val) {
      const arr = []
      this.changeContent.forEach(value => {
        arr.push(value.value)
      })
      this.checkedContent = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedContentChange (value) {
      console.log(value.length)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.changeContent.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.changeContent.length
    },
    handleClose () {
      this.$eventHub.$emit('handle-close')
    },
    getRoomData () {
      request({
        url: roomNoList,
        method: 'GET'
      }).then(res => {
        const data = res.data.data
        this.roomNoList = data
      })
    },
    submitChangeRoom () {
      const obj = {}
      obj.oldRoom = this.currentRoom.roomNo
      if (this.changeType === '1') {
        if (this.selectAllocated.operationId) {
          obj.operationId = this.selectAllocated.operationId
          obj.patientId = this.selectAllocated.patientId
        }
      }
      if (this.arrangeRoom !== '') {
        obj.operatingRoomNo = this.arrangeRoom
      } else {
        this.$message({
          message: '请选择需要交换的手术间',
          type: 'warning'
        })
        return
      }
      obj.date = this.time
      let secSupplyNurse = 0
      let firstSupplyNurse = 0
      let secOpeNurse = 0
      let firstOpeNurse = 0
      let firstAnesDoc = 0
      let secAnesDoc = 0
      let thirdAnesDoc = 0
      let anesDoc = 0
      const arr = this.checkedContent
      if (arr.indexOf('A') !== -1) {
        anesDoc = 1
      }
      if (arr.indexOf('B') !== -1) {
        firstAnesDoc = 1
      }
      if (arr.indexOf('C') !== -1) {
        secAnesDoc = 1
      }
      if (arr.indexOf('D') !== -1) {
        thirdAnesDoc = 1
      }
      if (arr.indexOf('E') !== -1) {
        firstOpeNurse = 1
      }
      if (arr.indexOf('F') !== -1) {
        secOpeNurse = 1
      }
      if (arr.indexOf('G') !== -1) {
        firstSupplyNurse = 1
      }
      if (arr.indexOf('H') !== -1) {
        secSupplyNurse = 1
      }
      obj.firstAnesDoc = firstAnesDoc.toString()
      obj.anesDoc = anesDoc.toString()
      obj.secAnesDoc = secAnesDoc.toString()
      obj.thirdAnesDoc = thirdAnesDoc.toString()
      obj.firstOpeNurse = firstOpeNurse.toString()
      obj.secOpeNurse = secOpeNurse.toString()
      obj.firstSupplyNurse = firstSupplyNurse.toString()
      obj.secSupplyNurse = secSupplyNurse.toString()
      obj.thirdOpeNurse = 1
      obj.thirdSupplyNurse = 1
      if (this.changeType === '2') {
        request({
          url: changeRoomData,
          method: 'PUT',
          data: obj
        }).then(res => {
          if (res.data.code === 200) {
            this.$eventHub.$emit('get-allocated')
            this.$eventHub.$emit('get-room')
            this.$eventHub.$emit('get-DocNurse')
            this.$eventHub.$emit('handle-close')
            this.$message({ type: 'success', message: '交换成功' })
          } else {
            this.$message({ type: 'error', message: res.data.msg })
          }
        })
      } else {
        request({
          url: changeTwoRoomData,
          method: 'PUT',
          data: obj
        }).then(res => {
          if (res.data.code === 200) {
            this.$eventHub.$emit('get-allocated')
            this.$eventHub.$emit('get-room')
            this.$eventHub.$emit('get-DocNurse')
            this.$eventHub.$emit('handle-close')
            this.$eventHub.$emit('clearSelectAllocation')
            this.$message({ type: 'success', message: '交换成功' })
          } else {
            this.$message({ type: 'error', message: res.data.msg })
          }
        })
      }
    }
  },
  mounted () {
    this.getRoomData()
    this.handleCheckAllChange()
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/theme";
  .change-dialog {
    height: 100%;
    width: 100%;
    /deep/ .el-dialog__title{
    @include theme-property("color", $color-text-regular);
  }
  }
</style>
