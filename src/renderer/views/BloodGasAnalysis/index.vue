<template>
  <div class="content">
    <div class="list">
      <div class="item title">
        <div class="icon">
          <div class="iconfont icon-shijian" />
        </div>
        <div class="text">
          <div class="t">
            时间记录
          </div>
        </div>
      </div>
      <div
        class="item"
        v-for="(i, idx) of list"
        :key="i.recordId"
        :class="{'active': recordId === i.recordId}"
        @click="setActive(i)"
      >
        <div class="icon">
          <div
            class="line up"
            v-show="idx !== 0"
          />
          <div
            class="line bottom"
            v-show="idx !== list.length - 1"
          />
          <div class="circle" />
        </div>
        <div class="text">
          <div class="t">
            {{ i.analysisTime }}
          </div>
        </div>
      </div>
    </div>
    <BloodGas
      :time.sync="time"
      :items="listDict"
    />
    <div class="buttons">
      <el-button
        size="mini"
        @click="onClear"
      >
        清空
      </el-button>
      <el-button
        size="mini"
        @click="onAdd"
      >
        新增
      </el-button>
      <el-button
        size="mini"
        @click="onDelete"
        :disabled="!recordId"
      >
        删除
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="onUpdate"
        :disabled="!recordId"
      >
        保存
      </el-button>
      <el-button
        size="mini"
        @click="onClose"
      >
        关闭
      </el-button>
    </div>
  </div>
</template>

<script>
import BloodGas from '@/components/BloodGas/BloodGas'
import request from '../../utils/requestForMock'
import {
  getBloodGasAnalysisRecordTime,
  getBloodGasAnalysisDict,
  addBloodGasAnalysisRecord,
  updateBloodGasAnalysisRecord,
  deleteBloodGasAnalysisRecord
} from '@/api/blood'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'BloodGasAnalysis',
  components: { BloodGas },
  data () {
    return {
      list: [],
      listDict: [],
      recordId: '',
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters('Base', ['operationId'])
  },
  created () {
    this.getItems().then(
      () => this.getRecords()
    )
  },
  methods: {
    setActive ({ analysisTime, detail, recordId }) {
      this.recordId = recordId
      this.time = analysisTime
      this.listDict.forEach(item => {
        const detailItem = detail.find(({ bloodCode }) => bloodCode === item.bloodCode)
        item.bloodValue = detailItem ? detailItem.bloodValue : ''
      })
    },
    getItems () {
      return this.getBloodGasAnalysisDict().then(
        res => {
          res.forEach(item => {
            item.bloodValue = ''
          })
          this.listDict = res
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    getRecords () {
      return this.getBloodGasAnalysisRecordTime().then(
        res => {
          this.list = res
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    onAdd () {
      this.addBloodGasAnalysisRecord().then(
        (recordId) => {
          this.recordId = recordId
          this.$message.success('新增成功')
          return this.getRecords()
        }
      ).then(
        () => {
          this.setActive(this.list.find(({ recordId }) => recordId === this.recordId))
        }
      ).catch(
        e => {
          this.$message.error(e.message)
        }
      )
    },
    onClear () {
      this.recordId = ''
      this.time = moment().format('YYYY-MM-DD HH:mm:ss')
      this.listDict.forEach(item => {
        item.bloodValue = ''
      })
    },
    onUpdate () {
      this.updateBloodGasAnalysisRecord()
    },
    onClose () {
      this.onClear()
      this.$eventHub.$emit('close-dialog')
    },
    onDelete () {
      this.deleteBloodGasAnalysisRecord().then(
        () => {
          this.$message.success('删除成功')
          this.onClear()
          return this.getRecords()
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    getBloodGasAnalysisRecordTime () {
      return request({
        url: `${getBloodGasAnalysisRecordTime}/${this.operationId}`
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('获取血气分析记录失败'))
          }
        }
      )
    },
    getBloodGasAnalysisDict () {
      return request({
        url: getBloodGasAnalysisDict
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('查询血气分析字典失败'))
          }
        }
      )
    },
    addBloodGasAnalysisRecord () {
      return request({
        url: addBloodGasAnalysisRecord,
        method: 'post',
        data: {
          operationId: this.operationId,
          analysisTime: this.time,
          recordList: this.listDict
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('新增血气分析记录失败'))
          }
        }
      )
    },
    updateBloodGasAnalysisRecord () {
      return request({
        url: updateBloodGasAnalysisRecord,
        method: 'put',
        data: {
          operationId: this.operationId,
          analysisTime: this.time,
          recordList: this.listDict,
          recordId: this.recordId
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('更新血气分析记录失败'))
          }
        }
      )
    },
    deleteBloodGasAnalysisRecord () {
      return request({
        url: `${deleteBloodGasAnalysisRecord}/${this.recordId}`,
        method: 'delete'
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('删除血气分析记录失败'))
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme";

.content {
  padding-top: 20px;
  display: grid;
  grid-template-columns: 198px auto;
  grid-template-rows: auto auto;

  .item {
    display: flex;
    height: 52px;

    .icon {
      flex: 38px 0 0;
      display: flex;
      position: relative;

      .line {
        position: absolute;
        width: 1px;
        background: #9ba3d5;
        left: 50%;
        height: calc((100% - 16px) / 2);

        &.up {
          top: 0;
        }

        &.bottom {
          bottom: 0;
        }
      }

      .circle {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border-width: 4px;
        border-style: solid;
        @include theme-property(border-color, $color-primary);
        @include theme-property(background, $color-primary);
        margin: auto;
      }
    }

    .text {
      flex: 160px 0 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .t {
        height: 30px;
        font-size: 14px;
        text-indent: 10px;
        width: 100%;
        @include theme-property(color, $color-text-regular);
        line-height: 30px;
      }
    }

    &.active {
      .text {
        .t {
          @include theme-property(background, $background-dialog-active);
          @include theme-property(color, $patient-detail-color);
        }
      }

      .circle {
        @include theme-property(background, $patient-detail-color);
      }
    }

    &.title {
      height: 36px;

      .icon {
        @include theme-property(color, $color-primary);
        justify-content: space-around;

        .iconfont {
          font-size: 22px;
        }
      }

      .text {
        justify-content: unset;

        .t {
          line-height: 22px;
        }
      }
    }
  }

  .buttons {
    grid-column: 1/3;
    padding-top: 20px;
    text-align: right;
  }
}
</style>
