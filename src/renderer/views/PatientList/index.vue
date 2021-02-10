<template>
  <div class="patient-info">
    <div class="search">
      <el-scrollbar class="rowScrollbar">
        <el-row>
          <el-form
            :inline="true"
            size="mini"
          >
            <el-form-item>
              <el-radio-group
                v-model="opeState"
                style="margin-bottom: 30px;"
                size="mini"
              >
                <el-radio-button
                  v-for="item in filterList"
                  :key="item.label"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
              <el-checkbox-group
                v-model="operationStatus"
                style="display:inline-block;margin-left:14px;"
                size="mini"
                @change="handleChange"
              >
                <el-checkbox
                  v-for="status in statusList"
                  :label="status.value"
                  :value="status.value"
                  :key="status.value"
                >
                  {{ status.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手术间">
              <el-select
                v-model="opeRoom"
                size="mini"
                placeholder
                @change="handleRoomChange"
                clearable
                style="width:160px;"
              >
                <el-option
                  v-for="item in roomList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                @click="getPatientList('')"
              >
                搜索
              </el-button>
              <el-button
                size="mini"
                @click="hanldeSearchMore"
              >
                <i
                  class="el-icon-d-arrow-right"
                  :style="{'transform':showMore?'rotate(90deg)':''}"
                />
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form
            :model="searchForm"
            :inline="true"
            size="mini"
          >
            <el-form-item label="ID">
              <el-input
                v-model="searchForm.id"
                style="width:130px;"
              />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="searchForm.name"
                style="width:130px;"
              />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                style="width:130px"
                v-model="searchForm.date"
                type="date"
                :clearable="false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                popper-class="dateTimePicker"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleRegister(1)">
                急诊登记
              </el-button>
              <el-button @click="handleChangeList(1)">
                今天列表
              </el-button>
              <el-button @click="handleChangeList(2)">
                明天列表
              </el-button>
              <el-button @click="handleRegister(2)">
                手术排台
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-scrollbar>
      <div
        class="other-search"
        v-show="showMore"
      >
        <el-row>
          <el-form
            :inline="true"
            :model="searchForm"
            size="mini"
          >
            <el-form-item label="麻醉方法">
              <!-- <el-input v-model="searchForm.anaesMethod" /> -->
              <el-select
                v-model="searchForm.anaesMethod"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in anaesMethod"
                  :key="item.anesCode"
                  :label="item.anesName"
                  :value="item.anesCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="麻醉医生">
              <SelectDoctorNurse
                v-model="searchForm.anaesDoc"
                :type="1"
              />
            </el-form-item>
            <el-form-item label="终止日期">
              <el-date-picker
                v-model="searchForm.endDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="searchForm.status" />
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form
            :inline="true"
            :model="searchForm"
            size="mini"
          >
            <el-form-item label="住院科室">
              <SelectDepartment v-model="searchForm.dept" />
            </el-form-item>
            <el-form-item label="手术名称">
              <el-select
                v-model="searchForm.opeName"
                placeholder="请选择"
                filterable
                remote
                clearable
                :loading="loadingSelect"
                :remote-method="remoteMethodOperationName"
              >
                <el-option
                  v-for="item in opeName"
                  :key="item.opeCode"
                  :label="item.opeName"
                  :value="item.opeCode"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="patient-card">
      <el-scrollbar
        style="height:100%;"
        :wrap-style="wrapStyle"
      >
        <ul
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="disabled"
          :infinite-scroll-immediate="false"
          infinite-scroll-distance="5"
        >
          <li
            v-for="(item,index) in cardList"
            :key="item.operationId"
            :class="{'active':index===activeIndex}"
            @dblclick="handleJump(item)"
            @click="hanldeSelectPatient(item,index)"
          >
            <div class="title">
              <span>手术室 {{ item.roomNo }}</span>
              <span>{{ item.stateName }}</span>
            </div>
            <div class="content clearfix">
              <div class="room">
                <span>{{ item.sequence }}</span>
              </div>
              <div class="info">
                <p class="clearfix">
                  <span class="label">患者</span>
                  <span
                    style="text-overflow: ellipsis;
                    white-space:nowrap;
                    max-width:80px;
                    overflow:hidden;"
                  >{{ item.patientName }}</span>
                  <span>{{ item.patientId }}</span>
                </p>
                <p>
                  <span class="label">住院号</span>
                  <span>{{ item.visitId }}</span>
                </p>
                <p>
                  <span class="label">手术</span>
                  <el-tooltip
                    effect="dark"
                    :content="item.opeName"
                    placement="top-start"
                  >
                    <span
                      class="overflow"
                      style="width:150px;margin-left:0;margin-right:0;"
                    >{{ item.opeName }}</span>
                  </el-tooltip>
                </p>
                <p>
                  <span class="label">时间</span>
                  <span>{{ item.opeTime }}</span>
                </p>
                <p>
                  <span class="label">术者</span>
                  <span style="max-width:40px;white-space: nowrap">{{ item.surgeonName }}</span>
                  <span
                    class="label"
                    style="margin-left:10px;"
                  >麻醉</span>
                  <span>{{ item.anesDocName }}</span>
                </p>
              </div>
              <div class="status">
                <div v-if="item.emergency">
                  <div style="display:flex;justify-content:center;">
                    <img
                      style="height:26px;width:26px;"
                      :src="require(`@/assets/emergency_${theme}.png`)"
                      alt
                    >
                  </div>
                  <div :style="{color:'#FF2C2C',fontSize:'14px',textAlign:'center'}">
                    急诊
                  </div>
                </div>
                <div v-if="item.quarantine">
                  <div style="display:flex;justify-content:center;">
                    <img
                      style="height:26px;width:26px;"
                      :src="require(`@/assets/quarantine_${theme}.png`)"
                      alt
                    >
                  </div>
                  <div :style="{color:'#2E95FE',fontSize:'14px',textAlign:'center'}">
                    隔离
                  </div>
                </div>
                <div v-if="item.radiate">
                  <div style="display:flex;justify-content:center;">
                    <img
                      style="height:26px;width:26px;"
                      :src="require(`@/assets/radiation_${theme}.png`)"
                      alt
                    >
                  </div>
                  <div :style="{color:'#FFCC03',fontSize:'14px',textAlign:'center'}">
                    放射
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p
          v-if="loading"
          class="loading"
        >
          加载中...
        </p>
        <!-- <p
          v-if="noMore&&cardList.length>0"
          class="loading"
        >
          没有更多了
        </p>-->
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import request from '../../utils/requestForMock'
import { opeList, roomList, getDefaultRoom } from '@/api/patientList'
import { mapState, mapActions, mapGetters } from 'vuex'
import { Socket, SocketRoom } from '@/model/Socket'
import _ from 'lodash'
import {
  anaesMethodDetail,
  opeNameData
} from '@/api/dictionary'
import SelectDoctorNurse from '@/components/Dictionary/SelectDoctorNurse'
import SelectDepartment from '@/components/Dictionary/SelectDepartment'
export default {
  name: 'PatientList',
  components: {
    SelectDoctorNurse,
    SelectDepartment
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      wrapStyle,
      loading: false,
      loadingSelect: false,
      searchForm: {
        id: '',
        name: '',
        date: moment().format('yyyy-MM-DD'),
        endDate: '',
        anaesDoc: '',
        anaesMethod: '',
        status: '',
        dept: '',
        opeName: ''
      },
      opeRoom: '',
      filterList: [
        { label: '全部', value: 0 },
        { label: '术前', value: 1 },
        { label: '术中', value: 2 },
        { label: '术后', value: 3 }
      ],
      opeState: 0,
      operationStatus: [],
      statusList: [
        { label: '急诊', value: 'emergency' },
        { label: '本人的', value: 'self' },
        { label: '隔离', value: 'quarantine' },
        { label: '放射', value: 'radiate' }
      ],
      showMore: false,
      currentPage: 1,
      pageSize: 16,
      cardList: [],
      dataList: [],
      roomList: [],
      totalPages: 1,
      anaesMethod: [],
      opeName: [],
      activeIndex: null
    }
  },
  computed: {
    ...mapState('Base', ['theme']),
    ...mapGetters('Base', ['operationId']),
    noMore () {
      return this.currentPage >= this.totalPages
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.getRoomList()
    // 获取手术名称
    this.getOpeName()
    // 获取手术方法
    this.getMethodData()
    // 绑定默认手术间
    this.getDefaultRoom()

    // this.getOpeName = _.throttle(this.getOpeName, 2000)
    this.getOpeName = _.debounce(this.getOpeName, 200)
  },
  mounted () {
    this.getPatientList()
    this.$eventHub.$on('refresh-ptlist', () => {
      this.getPatientList()
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getPatientList()
    })
  },
  methods: {
    ...mapActions('Base', [
      'setPatientId',
      'setOperationId',
      'setPatientCardInfo',
      'setProcedureState',
      'setRoomNo',
      'clearBaseInfo'
    ]),
    getDefaultRoom () {
      request({
        url: getDefaultRoom
      }).then(res => {
        this.opeRoom = res.data.data
        this.initSocket()
      })
    },
    initSocket () {
      if (this.opeRoom !== '') {
        SocketRoom.create(this.opeRoom)
        this.socket = SocketRoom.getInstance()
        this.socket.on('push_operation_cancel_event', (res) => {
          console.log(res)
          if (res.length) {
            switch (res[0].itemCode) {
              case '2':
                // if (res[0].operationId === this.operationId) {
                //   this.$confirm('当前操作需先选择患者', '提示', {
                //     confirmButtonText: '确定',
                //     type: 'warning',
                //     showCancelButton: false,
                //     customClass: 'messageBox'
                //   }).then(() => {}).catch(() => {
                //   })
                // }
                this.getPatientList('')
                break
              case '1':
                if (this.operationId && res[0].itemValue === this.operationId) {
                  if (Socket.instance) {
                    console.log(Socket.instance)
                  }
                  this.$confirm('当前患者已被取消', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    showCancelButton: false,
                    customClass: 'messageBox'
                  }).then(() => {
                    this.$router.push('/home')
                    this.getPatientList('')
                  }).catch(() => {
                  })
                } else {
                  this.getPatientList('')
                }
            }
          }
        })
      }
    },
    handleRoomChange () {
      this.socket.close()
      this.socket = null
      this.initSocket()
    },
    hanldeSelectPatient (item, index) {
      this.setPatientId(item.patientId)
      this.setOperationId(item.operationId)
      this.activeIndex = index
    },
    getMethodData () {
      request({
        url: anaesMethodDetail,
        method: 'GET'
      }).then((res) => {
        const data = res.data.data
        this.anaesMethod = data
      })
    },
    remoteMethodOperationName (query = '') {
      this.loadingSelect = true
      this.getOpeName(query)
    },
    getOpeName (query) {
      const fn = _.throttle((query) => {
        return request({
          url: opeNameData,
          params: {
            size: 10,
            start: 1,
            content: query
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.loadingSelect = false
            const data = res.data.data.list
            this.opeName = data
          }
        })
      }, 200)
      fn(query)
    },
    handleChangeList (param) {
      const d = new Date()
      let month = d.getMonth() + 1
      let date = d.getDate()
      month = month < 10 ? `0${month}` : `${month}`
      date = date < 10 ? `0${date}` : `${date}`
      if (param === 1) {
        this.searchForm.date =
          d.getFullYear() + '-' + month + '-' + date
      } else {
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
        month = d.getMonth() + 1
        date = d.getDate()
        month = month < 10 ? `0${month}` : `${month}`
        date = date < 10 ? `0${date}` : `${date}`
        this.searchForm.date =
          d.getFullYear() + '-' + month + '-' + date
      }
      this.getPatientList('')
    },
    handleChange (arr) {
      this.operationStatus.length > 1 && this.operationStatus.shift()
      this.$nextTick(() => {
        const val =
          this.operationStatus.length > 0 ? this.operationStatus[0] : ''
        console.log(val)
      })
      const list = this.dataList
      let rest = null
      if (arr.length > 0) {
        rest = list.filter((item) => {
          if (arr.indexOf('emergency') !== -1) {
            return item.emergency === true
          }
          if (arr.indexOf('quarantine') !== -1) {
            return item.quarantine === true
          }
          if (arr.indexOf('radiate') !== -1) {
            return item.radiate === true
          }
        })
        // console.log(rest)
        this.cardList = rest
      } else {
        this.cardList = this.dataList
      }
    },
    handleFilter (val) {
      const list = this.dataList
      let rest = null
      if (val.length > 0) {
        rest = list.filter((item) => {
          if (val.indexOf('emergency') !== -1) {
            return item.emergency === true
          } else if (val.indexOf('quatantine' !== -1)) {
            return item.quatantine === true
          } else if (val.indexOf('radiate' !== -1)) {
            return item.radiate === true
          } else {
            console.log('本人')
          }
        })
        this.cardList = rest
      } else {
        this.cardList = this.dataList
      }
    },
    handleJump (item) {
      this.setPatientId(item.patientId)
      this.setOperationId(item.operationId)
      this.setProcedureState(item.state)
      this.setRoomNo(item.roomNo)
      console.log(item.state)
      const noNeedSocketState = [10, 11, 14, 15, 16, 17]
      if (!noNeedSocketState.includes(+item.state)) {
        Socket.create(item.operationId)
      }
      // if (item.state === 6) {
      //   this.$eventHub.$emit('show-dialog', {
      //     perName: '设备采集', componentName: 'DeviceGather', necessary: true
      //   })
      // } else {
      //   }
      this.setPatientCardInfo({
        roomNo: item.sequence,
        ptName: item.patientName,
        gender: item.gender,
        ptId: item.patientId
      })
      this.$router.push('/home/patientInfo')
      this.activeIndex = null
    },
    handleRegister (param) {
      if (param === 1) {
        this.$eventHub.$emit('show-dialog', {
          perName: '急诊登记',
          componentName: 'EmergencyTreatment',
          necessary: false
        })
      } else {
        this.$eventHub.$emit('show-dialog', {
          perName: '手术排台',
          componentName: 'OperationArrangement',
          necessary: false
        })
      }
    },
    hanldeSearchMore () {
      this.showMore = !this.showMore
    },
    // 获取房间号
    getRoomList () {
      request({
        method: 'GET',
        url: roomList
      }).then((res) => {
        const data = res.data.data
        this.roomList = data.roomList
        // this.opeRoom = data.defaultRoom
      })
    },
    getPatientList (param) {
      if (param === '') {
        this.currentPage = 1
      }
      const obj = {}
      const search = {}
      obj.start = this.currentPage
      obj.pageSize = this.pageSize
      obj.opeState = this.opeState
      obj.roomNo = this.opeRoom
      search.patientId = this.searchForm.id
      search.name = this.searchForm.name
      search.date = this.searchForm.date
      search.anesMethod = this.searchForm.anaesMethod
      search.anesDoc = this.searchForm.anaesDoc
      search.dept = this.searchForm.dept
      search.opeName = this.searchForm.opeName
      search.deadLine = this.searchForm.endDate
      Object.assign(obj, search)
      request({
        method: 'GET',
        url: opeList,
        params: obj
      }).then((res) => {
        if (res.data.code === 200) {
          this.activeIndex = null
          this.clearBaseInfo()
          const data = res.data.data.list || []
          this.totalPages = res.data.data.pages
          data.forEach((value) => {
            if (value.opeScheduleTime) {
              // value.opeTime = moment(value.opeScheduleTime).format('yyyy-MM-DD HH:mm')
              value.opeTime = value.opeScheduleTime
            } else {
              value.opeTime = ''
            }
            if (value.isEmergency === 0) {
              value.emergency = true
            } else {
              value.emergency = false
            }
          })
          if (param === 'scroll') {
            this.cardList = this.cardList.concat(data)
            this.dataList = this.dataList.concat(data)
          } else {
            this.cardList = data
            this.dataList = data
          }
        }
      })
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        this.currentPage += 1
        this.getPatientList('scroll')
        this.loading = false
      }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.patient-info {
  height: 100%;
  width: 100%;
  padding: 0 0 0 12px;
  // display: flex;
  // flex-direction: column;
  .search {
    // flex: 1;
    height: 118px;
    @include theme-property("background", $color-background-navigation);
    @include theme-property("box-shadow", $box-shadow-card);
    border-radius: 5px;
    width: 100%;
    padding: 20px;
    position: relative;
    .other-search {
      position: absolute;
      padding: 20px 20px 0 20px;
      width: 100%;
      @include theme-property("background", $color-background-navigation);
      @include theme-property("box-shadow", $box-shadow-card);
      border-radius: 5px;
      top: 120px;
      left: 0;
      z-index: 1;
    }
    .el-checkbox {
      margin-right: 10px;
    }
  }
  .el-radio-group {
    margin-bottom: 0 !important;
  }
  .patient-card {
    // flex: 1;
    // height:calc(100% - 118px);
    height: calc(100% - 121px);
    box-sizing: border-box;
    padding-top: 20px;
    .loading {
      text-align: center;
      color: #fff;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, 392px);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      li {
        @include theme-property("box-shadow", $box-shadow-card);
        cursor: pointer;
        border-radius: 5px;
        padding: 0 0 14px 0;
        @include theme-property("background", $color-background-card);
        // border: 1px solid transparent;
        width: 392px;
        height: 196px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        transition: all 0.5s;
        .title {
          display: flex;
          justify-content: space-between;
          span {
            @include theme-property("color", $color-text-card-title);
            padding: 0 10px;
            line-height: 28px;
            &:last-child {
              font-weight: bold;
              @include theme-property("color", $color-text-primary);
            }
          }
        }
        .content {
          flex: 1;
          // display: flex;
          overflow: hidden;
          .room {
            width: 100px;
            float: left;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            span {
              box-shadow: 0 0 12px 3px #373a44;
              box-sizing: border-box;
              width: 100%;
              height: 46px;
              display: block;
              line-height: 46px;
              @include card-room;
              border-radius: 0px 23px 23px 0px;
              font-size: 26px;
              font-weight: bold;
              color: #fff;
              text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
              text-align: center;
            }
          }
          .info {
            height: 100%;
            float: left;
            width: calc(100% - 174px);
            padding: 0 0 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
              padding: 0;
              margin: 0;
              width: 100%;
              height: 28px;
              overflow: hidden;
              color: #9ba3d5;
              // display: flex;
              span {
                @include theme-property("color", $color-text-secondary);
                float: left;
                margin-right: 10px;
                line-height: 28px;
                display: block;
                &:first-child {
                  span {
                    &:last-child {
                      background: yellow;
                      // width: 80px;
                      max-width: 140px;
                    }
                  }
                }
                &:last-child {
                  margin-right: 0;
                }
              }
              .overflow {
                // max-width: 140px;
                width: 80px;
                margin: 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .label {
                @include theme-property("color", $color-text-regular);
                margin-right: 10px;
              }
            }
          }
          .status {
            height: 100%;
            width: 74px;
            float: right;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }
        &:hover {
          // @include border-active;
          @include theme-property("background", $color-background-card-hover);
        }
        &.active {
          // @include border-active;
          @include theme-property("background", $color-background-card-hover);
        }
      }
    }
  }
}
</style>
<style>
.rowScrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}
</style>
