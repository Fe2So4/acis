<template lang="pug">
.pacu-status
  el-form(:model="form", :inline="true", size="mini")
    el-form-item(label="日期")
      el-date-picker(
        type="date",
        format="yyyy-MM-dd",
        value-format="yyyy-MM-dd",
        v-model="form.date"
        @change="onChangeTime"
        popper-class="dateTimePicker"
      )
    el-form-item
      .status
        span(
          v-for="item in list",
          :key="item.label",
          style="margin-right:10px;"
        )
          span(
            :class="item.type",
            :style="{ background: item.color }"
          )
          span {{ item.label }}
  .status-content
    .left
      .title
        span.white 手术间
        span.green 完成
        span.blue 总数
      ul
        li(v-for="(item, index) in patientList", :key="index")
          span.white {{ item.opeRoom }}
          span.green {{ item.complete }}
          span.blue {{ item.allCount }}
    .right
      el-scrollbar
        .content
          .line(ref="line")
          ul
            li(v-for="item in patientList", :key="item.opeRoom")
              PatientDetail(v-for="(_item, index) in item.completedWardsInfo" :date="form.date" :info="_item")
</template>
<script>
import * as spritejs from 'spritejs'
import moment from 'moment'
import request from '@/utils/requestForMock'
import { getPacuStatus } from '@/api/pacu'
import PatientDetail from './PatientDetail'
const { Scene, Group, Polyline, Label } = spritejs
export default {
  name: 'PacuStatus',
  components: { PatientDetail },
  data () {
    const list = Object.freeze([
      { label: '不带管', color: '#69a7fb', type: 'rectangle' },
      { label: '带管', color: '#15d18d', type: 'rectangle' }
    ])
    const today = moment().format('YYYY-MM-DD')
    return {
      form: {
        room: '',
        date: today
      },
      layer: null,
      scene: null,
      list: list,
      timeList: [],
      patientList: [],
      roomList: []
    }
  },
  created () {
    this.getPacuStatus()
  },
  mounted () {
    this.setTimeLine()
  },
  methods: {
    onChangeTime (val) {
      if (val) {
        this.getPacuStatus()
      }
    },
    onChangeRoom () {
      this.getRealtimeState()
    },
    getPacuStatus () {
      return request({
        url: getPacuStatus,
        method: 'get',
        params: {
          dateTime: this.form.date
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.patientList = res.data.data
          }
        }
      )
    },
    // getRoomList () {
    //   return request({
    //     url: getRoomList,
    //     method: 'get'
    //   }).then(
    //     res => {
    //       if (res.data && res.data.success) {
    //         this.roomList = res.data.data
    //       }
    //     }
    //   )
    // },
    setTimeLine () {
      this.renderScene()
      this.createGroups()
      this.setLayout()
      this.setContent()
    },
    renderScene () {
      this.scene = new Scene({
        container: this.$refs.line,
        width: this.$refs.width,
        height: this.$refs.height
        // mode: 'static'
      })
      this.layer = this.scene.layer()
    },
    createGroups () {
      const topPart = new Group({ className: 'topPart' })
      const bottomPart = new Group({ className: 'bottomPart' })
      this.layer.append(topPart, bottomPart)
    },
    setLayout () {
      const topPart = this.layer.getElementsByClassName('topPart')[0]
      topPart.attr({
        size: [this.layer.width, 20]
      })
      const bottomPart = this.layer.getElementsByClassName('bottomPart')[0]
      bottomPart.attr({
        pos: [0, topPart.attr('height')],
        size: [this.layer.width, 30]
      })
      const line = new Polyline({
        pos: [0, 0.5],
        points: [0, 0, topPart.attr('width'), 0],
        strokeColor: '#4A5A87',
        lineWidth: 1
      })
      bottomPart.append(line)
      for (let i = 0; i < 24; i++) {
        const hour = new Polyline({
          pos: [80 + i * 160 + 0.5, 0],
          points: [0, 0, 0, 20],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })

        bottomPart.append(hour)
      }
      for (let i = 0; i <= 24; i++) {
        const half = new Polyline({
          pos: [i * 160 + 0.5, 0],
          points: [0, 0, 0, 15],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })
        bottomPart.append(half)
      }
      for (let i = 0; i < 48; i++) {
        const quarter = new Polyline({
          pos: [40 + i * 80 + 0.5, 0],
          points: [0, 0, 0, 10],
          strokeColor: '#4A5A87',
          lineWidth: 1
        })
        bottomPart.append(quarter)
      }
    },
    setContent () {
      const topPart = this.layer.getElementsByClassName('topPart')[0]
      for (let i = 1; i <= 24; i++) {
        const s = i + ':00'
        this.timeList.push(s)
      }
      this.timeList = [
        ...this.timeList.slice(7, 24),
        ...this.timeList.slice(0, 7)
      ]
      for (let i = 0; i < this.timeList.length; i++) {
        if (this.timeList[i]) {
          const label = new Label(this.timeList[i])
          label.attr({
            pos: [80 + i * 160 - 15, 0],
            anchor: [0, 0],
            fontSize: 14,
            fontFamily: '宋体',
            textAlign: 'center',
            fillColor: '#4A5A87',
            height: 20,
            lineHeight: 20
          })
          topPart.append(label)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pacu-status {
  height: 70vh;
  width: 80vw;
  color: #9BA3D5;
  font-size: 14px;

  .status {
    display: flex;
    line-height: 28px;

    .circle {
      vertical-align: middle;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 6px;
      margin-top: -2px;
    }

    .rectangle {
      margin-top: -2px;
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 14px;
      margin-right: 6px;
    }
  }
  .el-form {
    height: 30px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .status-content {
    width: 100%;
    .right {
      width: calc(100% - 200px);
      float: right;
      .content {
        width: 3841px;
        height: 600px;
        ul {
          height: calc(100% - 50px);
          li {
            margin-bottom: 20px;
            position: relative;
            height: 56px;
            overflow: hidden;
          }
        }
        .line {
          height: 50px;
        }
      }
    }

    .left {
      width: 200px;
      float: left;
      padding-right: 20px;
      box-sizing: border-box;
      text-align: center;

      span {
        display: inline-block;
        line-height: 50px;
      }

      .white {
        color: #FFFFFF;
        width: 50px;
      }

      .green {
        width: 28px;
        color: #00B337;
      }

      .blue {
        width: 28px;
        color: #007EFF;
      }

      .title {
        line-height: 30px;
        display: flex;
        justify-content: space-between;
      }

      ul {
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;

          span {
            display: inline-block;
            text-align: center;
            padding: 3px 0;

            &:first-child {
              width: 50px;
              height: 50px;
              font-size: 24px;
              line-height: 44px;
              font-weight: bold;
              text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
              border-radius: 50%;
              background: #3C79E9;
            }
          }
        }
      }
    }
  }
}
</style>
