<template>
  <div class="allocated-detail">
    <el-dialog
      title="手术详细信息"
      :visible.sync="batchVisible"
      width="50%"
      :before-close="handleClose"
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
              <el-form-item label="主麻">
                <el-select
                  v-model="detailApply.anesDoc"
                  placeholder="请选择"
                  filterable
                >
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
                  v-model="detailApply.firstAnesDoc"
                  placeholder="请选择"
                  filterable
                >
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
                <el-select
                  v-model="detailApply.secAnesDoc"
                  placeholder="请选择"
                  filterable
                >
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
                <el-select
                  v-model="detailApply.thirdAnesDoc"
                  placeholder="请选择"
                  filterable
                >
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
                  v-model="detailApply.firstOpeNurse"
                  placeholder="请选择"
                  filterable
                >
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
                  v-model="detailApply.secOpeNurse"
                  placeholder="请选择"
                  filterable
                >
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
                  v-model="detailApply.firstSupplyNurse"
                  placeholder="请选择"
                  filterable
                >
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
                  v-model="detailApply.secSupplyNurse"
                  placeholder="请选择"
                  filterable
                >
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
  updateScheduledInfo
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
      detailApply: {
        anesDoc: '',
        firstAnesDoc: '',
        secAnesDoc: '',
        thirdAnesDoc: '',
        firstOpeNurse: '',
        secOpeNurse: '',
        firstSupplyNurse: '',
        secSupplyNurse: ''
      }
    }
  },
  watch: {
    // detail: {
    //   handler (newVal) {
    //     this.detailApply = newVal
    //   },
    //   deep: true
    // }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom'])
  },
  props: {
    batchVisible: {
      type: Boolean,
      default: false
    },
    checkList: {
      type: Array,
      required: true
    }
    // detail: {
    //   type: Object,
    //   required: true
    // }
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
        })
        this.anaesList = data
      })
    },
    selectOperaion (param) {},
    updateSimpleApply () {
      const operationIds = []
      this.checkList.forEach(item => {
        operationIds.push(item.operationId)
      })
      const obj = {}
      obj.operationIds = operationIds
      obj.anesDoc = this.detailApply.anesDoc
      obj.firstAnesDoc = this.detailApply.firstAnesDoc
      obj.secAnesDoc = this.detailApply.secAnesDoc
      obj.thirdAnesDoc = this.detailApply.thirdAnesDoc
      obj.firstOpeNurse = this.detailApply.firstOpeNurse
      obj.secOpeNurse = this.detailApply.secOpeNurse
      obj.firstSupplyNurse = this.detailApply.firstSupplyNurse
      obj.secSupplyNurse = this.detailApply.secSupplyNurse
      request({
        url: updateScheduledInfo,
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
@import "@/styles/theme";
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
  /deep/ .el-dialog__title{
    @include theme-property("color", $color-text-regular);
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
