<template lang="pug">
.operation-handover
  .doc
    h3 医生交接班
    el-form(size="mini", label-width="100px")
      el-form-item(label="交班时间")
        el-date-picker(
          v-model="surgeonExchangeTime",
          type="datetime",
          placeholder="",
          style="width:170px",
          format="yyyy-MM-dd HH:mm:ss",
          value-format="yyyy-MM-dd HH:mm:ss"
        )
      el-form-item(label="交班医生")
        el-input(v-model="surgeon", readonly)
        el-input(v-model="anesDoc", readonly, style="margin-left:10px;")
      el-form-item(label="接班医生")
        el-select(v-model="newSurgeon", filterable, placeholder="请选择")
          el-option(
            v-for="item in surgeonLlist",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
        el-select(
          v-model="newAnesDoc",
          filterable,
          placeholder="请选择",
          style="margin-left:10px;"
        )
          el-option(
            v-for="item in surgeonLlist",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
  el-divider
  .nurse
    h3 护士交接班
    el-form(size="mini", label-width="100px")
      el-form-item(label="交班时间")
        el-date-picker(
          v-model="nurseExchangeTime",
          type="datetime",
          placeholder="",
          style="width:170px",
          format="yyyy-MM-dd HH:mm:ss",
          value-format="yyyy-MM-dd HH:mm:ss"
        )
      el-form-item(label="交班洗手护士")
        el-input(v-model="firstOpeNurse", readonly)
        el-input(v-model="secOpeNurse", readonly, style="margin-left:10px;")
      el-form-item(label="接班洗手护士")
        el-select(v-model="newFirstOpeNurse", filterable, placeholder="请选择")
          el-option(
            v-for="item in nurseList",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
        el-select(
          v-model="newSecOpeNurse",
          filterable,
          placeholder="请选择",
          style="margin-left:10px;"
        )
          el-option(
            v-for="item in nurseList",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
      el-form-item(label="交班巡回护士")
        el-input(v-model="firstSupplyNurse", readonly)
        el-input(v-model="secSupplyNurse", readonly, style="margin-left:10px;")
      el-form-item(label="接班巡回护士")
        el-select(v-model="newFirstSupplyNurse", filterable, placeholder="请选择")
          el-option(
            v-for="item in nurseList",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
        el-select(
          v-model="newSecSupplyNurse",
          filterable,
          placeholder="请选择",
          style="margin-left:10px;"
        )
          el-option(
            v-for="item in nurseList",
            :key="item.userId",
            :label="item.userName",
            :value="item.userId"
          )
  .option
    el-button(size="mini", type="primary", @click="onConfirm") 确定
    el-button(size="mini", @click="onCancel") 取消
</template>
<script>
import {
  getExchangeInfo,
  getDoctorNurseList,
  saveExchangeInfo
} from '@/api/intraoperative'
import request from '@/utils/requestForMock'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'OperationHandover',
  data () {
    return {
      surgeon: '',
      surgeonNo: '',
      anesDoc: '',
      anesDocNo: '',
      firstOpeNurse: '',
      firstOpeNurseNo: '',
      secOpeNurse: '',
      secOpeNurseNo: '',
      firstSupplyNurse: '',
      firstSupplyNurseNo: '',
      secSupplyNurse: '',
      secSupplyNurseNo: '',
      surgeonExchangeTime: '',
      nurseExchangeTime: '',
      newSurgeon: '',
      newAnesDoc: '',
      newFirstOpeNurse: '',
      newSecOpeNurse: '',
      newFirstSupplyNurse: '',
      newSecSupplyNurse: '',
      surgeonLlist: [],
      nurseList: []
    }
  },
  computed: {
    ...mapState(['operationId']),
    newSurgeons () {
      return [this.newSurgeon, this.newAnesDoc]
    },
    newNurses () {
      return [
        this.newFirstOpeNurse,
        this.newSecOpeNurse,
        this.newFirstSupplyNurse,
        this.newSecSupplyNurse
      ]
    }
  },
  created () {
    this.getExchangeInfo()
    this.getDoctorNurseList(1).then((list) => {
      this.surgeonLlist = list
    })
    this.getDoctorNurseList(2).then((list) => {
      this.nurseList = list
    })
  },
  methods: {
    onConfirm () {
      let newSurgeons = this.newSurgeons.filter((val) => val)
      let newNurses = this.newNurses.filter((val) => val)
      if (newSurgeons.length) {
        if (!this.surgeonExchangeTime) {
          this.$message({
            type: 'warning',
            message: '请输入时间'
          })
          return
        }
      }
      if (newNurses.length) {
        if (!this.nurseExchangeTime) {
          this.$message({
            type: 'warning',
            message: '请输入时间'
          })
          return
        }
      }
      newSurgeons = newSurgeons.map((item) => {
        return {
          operationExchangeTime: this.surgeonExchangeTime,
          operationId: this.operationId,
          operationUserCode: item
        }
      })
      newNurses = newNurses.map((item) => {
        return {
          operationExchangeTime: this.nurseExchangeTime,
          operationId: this.operationId,
          operationUserCode: item
        }
      })
      const list = [...newSurgeons, ...newNurses]
      if (list.length) {
        this.saveExchangeInfo(list)
      }
    },
    onCancel () {
      this.$eventHub.$emit('close-dialog')
    },
    getExchangeInfo () {
      return request({
        method: 'post',
        url: getExchangeInfo,
        data: {
          operationId: this.operationId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          ({
            surgeon: this.surgeon,
            surgeonNo: this.surgeonNo,
            anesDoc: this.anesDoc,
            anesDocNo: this.anesDocNo,
            firstOpeNurse: this.firstOpeNurse,
            firstOpeNurseNo: this.firstOpeNurseNo,
            secOpeNurse: this.secOpeNurse,
            secOpeNurseNo: this.secOpeNurseNo,
            firstSupplyNurse: this.firstSupplyNurse,
            firstSupplyNurseNo: this.firstSupplyNurseNo,
            secSupplyNurse: this.secSupplyNurse,
            secSupplyNurseNo: this.secSupplyNurseNo
          } = res.data.data)
        }
      })
    },
    getDoctorNurseList (code) {
      return request({
        url: `${getDoctorNurseList}/${code}`,
        method: 'get'
      })
        .then((res) => {
          if (res.data && res.data.success) {
            return res.data.data
          } else {
            return []
          }
        })
        .catch((e) => {
          return []
        })
    },
    saveExchangeInfo (list) {
      return request({
        method: 'post',
        url: saveExchangeInfo,
        data: list
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$eventHub.$emit('close-dialog')
          } else {
            return Promise.reject(new Error(res.msg))
          }
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
 @import "@/styles/theme";
.operation-handover {
  border-radius: 10px;
  padding: 20px 40px;
  @include theme-property("background", $background-dialog-content);
  .el-input, .el-select {
    width: 80px;
  }

  h3 {
    font-size: 14px;
    margin: unset;
    @include theme-property("color", $color-text-regular);
    line-height: 28px;
    font-weight: 400;
  }

  .option {
    text-align: right;
  }
}
</style>
