<template>
  <div class="operation-arrangement">
    <div class="title">
      {{ titleDate }}手术排台
    </div>
    <el-form
      :inline="true"
      size="mini"
      :model="form"
    >
      <el-form-item>
        <el-radio-group
          v-model="form.radio"
          @change="getData"
        >
          <el-radio :label="1">
            全部
          </el-radio>
          <el-radio :label="2">
            本人的
          </el-radio>
          <el-radio :label="3">
            其他人
          </el-radio>
        </el-radio-group>
        <el-select
          v-model="form.select"
          :disabled="form.radio !== 3"
          style="margin-left:12px;"
          filterable
          remote
          :remote-method="remoteMethod"
          @change="getData"
        >
          <el-option
            v-for="item in docList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          type="date"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="form.date"
          @change="getData"
        />
      </el-form-item>
    </el-form>
    <div class="container">
      <el-scrollbar style="height:100%;">
        <ul>
          <li
            v-for="item in tableData"
            :key="item.operationId"
            :class="{
              recovery: item.operationState === '入复苏室',
              outrecovery: item.operationState === '出复苏室'
            }"
          >
            <div class="title">
              <span>手术室 {{ item.opeRoom }}</span>
              <span style="fontSize:16px">{{ item.operationState }}</span>
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
                  <span>{{ item.hospitalNo }}</span>
                </p>
                <p>
                  <span class="label">手术</span>
                  <el-tooltip
                    effect="dark"
                    :content="item.operationName"
                    placement="top-start"
                  >
                    <span
                      class="overflow"
                      style="width:150px;margin-left:0;margin-right:0;"
                    >{{ item.operationName }}</span>
                  </el-tooltip>
                </p>
                <p>
                  <span class="label">时间</span>
                  <span>{{ item.opeScheduleTime }}</span>
                </p>
                <p>
                  <span class="label">术者</span>
                  <span style="max-width:40px;white-space: nowrap">{{
                    item.surgeon
                  }}</span>
                  <span
                    class="label"
                    style="margin-left:10px;"
                  >麻醉</span>
                  <span>{{ item.anesDoc }}</span>
                </p>
              </div>
              <!-- <div class="status">
                <div v-if="item.emergency">
                  <div style="display:flex;justify-content:center;">
                    <img
                      style="height:26px;width:26px;"
                      :src="require(`@/assets/emergency_${theme}.png`)"
                      alt
                    >
                  </div>
                  <div
                    :style="{
                      color: '#FF2C2C',
                      fontSize: '14px',
                      textAlign: 'center'
                    }"
                  >
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
                  <div
                    :style="{
                      color: '#2E95FE',
                      fontSize: '14px',
                      textAlign: 'center'
                    }"
                  >
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
                  <div
                    :style="{
                      color: '#FFCC03',
                      fontSize: '14px',
                      textAlign: 'center'
                    }"
                  >
                    放射
                  </div>
                </div>
              </div> -->
            </div>
          </li>
        </ul>
        <!-- <p
          v-if="noMore&&cardList.length>0"
          class="loading"
        >
          没有更多了
        </p>-->
      </el-scrollbar>

      <!-- <vxe-table
        border
        show-header-overflow
        show-overflow
        keep-source
        highlight-hover-row
        align="center"
        height="100%"
        size="mini"
        class="scroll"
        :data="tableData"
        :checkbox-config="{ checkStrictly: true }"
        :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
      >
        <vxe-table-column
          type="seq"
          width="60"
          title="paix"
        />
      </vxe-table> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { opeSchedule } from '@/api/patientList'
import { getDoctorNurseListPaging } from '@/api/dict'
import request from '@/utils/requestForMock'
import { getCurrentAccount } from '@/utils/storage'
export default {
  name: 'OperationArrangement',
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      wrapStyle,
      tableData: [],
      loading: false,
      form: {
        radio: 1,
        select: '',
        date: moment(new Date()).format('YYYY-MM-DD')
      },
      options: [],
      docList: []
    }
  },
  computed: {
    titleDate () {
      return moment(this.form.date).format('YYYY-MM-DD')
    }
  },
  mounted () {
    // this.getDocList()
    this.getData()
  },
  methods: {
    getData () {
      let surgeon = ''
      if (this.form.radio === 1) {
        this.form.select = ''
        surgeon = ''
      } else if (this.form.radio === 2) {
        this.form.select = ''
        surgeon = getCurrentAccount()
      } else {
        surgeon = this.form.select
      }
      request({
        url: opeSchedule,
        params: {
          date: this.form.date,
          surgeon: surgeon
        }
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    },
    getDocList (content = '') {
      request({
        url: getDoctorNurseListPaging,
        params: {
          userJob: 1,
          start: 1,
          size: 20,
          content
        }
      }).then(res => {
        const data = res.data.data.list
        this.docList = data
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.getDocList(query)
      } else {
        this.getDocList()
        // this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme';
.operation-arrangement {
  width: 80vw;
  height: 70vh;
  .title {
    color: #9ba3d5;
    text-align: center;
    font-size: 18px;
    line-height: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  .container {
    height: calc(100% - 90px);
  }
}
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, 392px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  li {
    @include theme-property('box-shadow', $box-shadow-card);
    cursor: pointer;
    border-radius: 5px;
    padding: 0 0 14px 0;
    @include theme-property('background', $color-background-card);
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
        @include theme-property('color', $color-text-card-title);
        padding: 0 10px;
        line-height: 28px;
        &:last-child {
          font-weight: bold;
          @include theme-property('color', $color-text-primary);
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
          font-size: 18px;
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
            @include theme-property('color', $color-text-secondary);
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
            @include theme-property('color', $color-text-regular);
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
      @include theme-property('background', $color-background-card-hover);
    }
    &.active {
      // @include border-active;
      @include theme-property('background', $color-background-card-hover);
    }
    &.recovery {
      @include theme-property('background', $color-background-card-recovery);
    }
    &.outrecovery {
      @include theme-property('background', $color-background-card-outrecovery);
    }
  }
}
</style>
