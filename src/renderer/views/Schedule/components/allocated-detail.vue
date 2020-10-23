<template>
  <div class="allocated-detail">
    <el-dialog
      title="手术详细信息"
      :visible.sync="detailVisible"
      width="50%"
      @before-close="handleClose"
    >
      <div class="detail">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          size="mini"
        >
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="手术间号">
                <el-input
                  v-model="currentRoom.roomNo"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="台次">
                <el-input v-model="detailApply.sequence" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="申请时间">
                <el-date-picker
                  v-model="detailApply.opeScheduleTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="手术名称"
                disabled
              >
                <el-input
                  v-model="detailApply.operationName"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="手术医师">
                <el-input
                  v-model="detailApply.surgeon"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="麻醉方法">
                <el-select
                  v-model="detailApply.anaesthesiaCode"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in anaesList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="主麻">
                <el-select
                  v-model="detailApply.anesDocId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in doctorList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="副麻1">
                <el-select
                  v-model="detailApply.firstDoctorCode"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in doctorList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="副麻2">
                <!-- <Select
              :data-list="doctorList"
              @changeValue="changeValue(3)"
              :current-value="detailApply.secAnesDocId"
              @selectOperaion="selectOperaion(3)"
                />-->
                <el-select
                  v-model="detailApply.secAnesDocId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in doctorList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="副麻3">
                <!-- <Select
              :data-list="doctorList"
              @changeValue="changeValue(4)"
              :current-value="detailApply.thirdDoctorCode"
              @selectOperaion="selectOperaion(4)"
                />-->
                <el-select
                  v-model="detailApply.thirdDoctorCode"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in doctorList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="洗手护士1">
                <el-select
                  v-model="detailApply.firstOpeNurseId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in nurseList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="洗手护士2">
                <el-select
                  v-model="detailApply.secOpeNurseId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in nurseList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="10">
              <el-form-item label="巡回护士1">
                <el-select
                  v-model="detailApply.firstSupplyNurseId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in nurseList"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="巡回护士2">
                <el-select
                  v-model="detailApply.secSupplyNurseId"
                  placeholder="请选择"
                  filterable
                >
                  <!-- @change="changeValue" -->
                  <el-option
                    v-for="(item,index) in nurseList"
                    :disabled="detailApply.firstOpeNurseId === item.userId"
                    :key="index"
                    :label="item.userName"
                    :value="item.userId"
                  >
                    <div class="content">
                      <span>{{ item.userId }}</span>
                      <span>{{ item.userName }}</span>
                      <span>{{ item.inputCode }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="space-between"
          >
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  rows="2"
                  v-model="detailApply.memo"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div
          class="option"
          style="display:flex;justify-content:center;"
        >
          <el-button
            type="primary"
            @click="updateSimpleApply"
            size="mini"
          >
            确定
          </el-button>
          <el-button
            size="mini"
            type="primary"
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
// import Select from './select'
import { mapGetters } from 'vuex'
import {
  getDetailDocList,
  getDetailNurseList,
  getAnaesMethod,
  updateSimpleApply
} from '@/api/schedule'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      labelPosition: 'right',
      roomNoList: [],
      configForm: {},
      detailForm: {},
      doctorList: [],
      loading: false,
      nurseList: [],
      anaesList: [],
      detailApply: JSON.parse(JSON.stringify(this.detail))
    }
  },
  watch: {
    detail: {
      handler (newVal) {
        this.detailApply = newVal
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom'])
    // detailApply () {
    //   return JSON.parse(JSON.stringify(this.detail))
    // },
  },
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleChangeDetail () {},
    // filterNurse (query) {
    //   this.getNurseList(query)
    // },
    getDocList () {
      request({
        url: getDetailDocList
      }).then((res) => {
        this.doctorList = res.data.data
      })
    },
    getNurseList () {
      request({
        url: getDetailNurseList
      }).then((res) => {
        this.nurseList = res.data.data
      })
    },
    getAnaesMethod () {
      request({
        url: getAnaesMethod
      }).then((res) => {
        const data = res.data.data
        data.forEach((item) => {
          item.userName = item.anesName
          item.userId = item.anesCode
        })
        this.anaesList = data
      })
    },
    selectOperaion (param) {},
    updateSimpleApply () {
      const obj = {}
      obj.anesMethod = this.detailApply.anaesthesiaCode
      obj.anesDoc = this.detailApply.anesDocId
      obj.firstAnesDoc = this.detailApply.firstDoctorCode
      obj.secAnesDoc = this.detailApply.secAnesDocId
      obj.thirdAnesDoc = this.detailApply.thirdAnesDocId
      obj.sequence = this.detailApply.sequence
      obj.opeScheduledTime = this.detailApply.opeScheduledTime
      obj.operationId = this.detailApply.operationId
      obj.firstOpeNurse = this.detailApply.firstOpeNurseId
      obj.secOpeNurse = this.detailApply.secOpeNurseId
      obj.firstSupplyNurse = this.detailApply.firstSupplyNurseId
      obj.secSupplyNurse = this.detailApply.secSupplyNurseId
      obj.thirdOpeNurse = this.detailApply.thirdOpeNurseId
      obj.thirdSupplyNurse = this.detailApply.thirdSupplyNurseId
      request({
        url: updateSimpleApply,
        method: 'PUT',
        data: obj
      }).then((res) => {
        this.$eventHub.$emit('get-allocated')
        this.$emit('close')
      })
    }
  },
  created () {
    this.getDocList()
    this.getNurseList()
    this.getAnaesMethod()
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.detail {
  .el-input {
    // width: 178px;
    .el-input__inner {
      // width: 178px;
    }
  }
  .el-select {
    width: 100%;
  }
  .el-date-picker {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.allocated-detail {
  .content {
    display: flex;
    span {
      display: block;
      flex: 1;
    }
  }
}
// .select /deep/ .el-select .el-select-dropdown,.el-select-dropdown{
//     width:400px;
// }
.allocated-detail /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .content {
  display: flex;
  border-left: 1px solid #1A2131;
  border-bottom: 1px solid #1A2131;
  span {
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid #1A2131;
    border-top: 1px solid #1A2131;
    box-sizing: border-box;
  }
}
.allocated-detail /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item {
  padding: 0;
  width: 400px;
}
.allocated-detail /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item.is-disabled {
  background: #f3f6f9;
  cursor: auto;
  color: #000;
}
</style>
