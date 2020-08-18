<template>
  <div
    class="patientDetail"
    v-if="elementWidth"
    :style="{
      width: elementWidth + 'px',
      left: elementLeft + 'px'
    }"
    :class="{hasEnd:info.outHomeTime}"
    @mousemove="onMouseover"
    @mouseleave="onMouseLeave"
  >
    <div class="background">
      <div
        class="ready"
        :style="{width: leftWidth + 'px'}"
      />
      <div
        class="operating"
        :style="{width: middleWidth + 'px'}"
      />
      <div
        class="waking"
        :style="{width: rightWidth + 'px'}"
      />
    </div>
    <div class="content">
      <div class="left">
        <div
          class="circle"
          :style="{background: +info.isEmergency ? '#FF4045':'#24E760'}"
        />
      </div>
      <div class="right">
        {{ info.patientName }}
        {{ info.patientGender }}
        {{ info.age }}
        {{ info.inpatientWard }}
        {{ info.bedId }}
        {{ info.surgeon }}
        {{ info.anesDoc }}
        {{ info.anesMethod }}
        {{ info.opeName }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'PatientDetail',
  props: {
    info: {
      type: Object,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  data () {
    const widthScale = 160 / 60
    return {
      widthScale
    }
  },
  computed: {
    entryTime () {
      if (this.info.homeTime) {
        return moment(this.info.homeTime)
      }
      return 0
    },
    intubationStartTime () {
      if (this.info.intubationStartTime) {
        return moment(this.info.intubationStartTime)
      }
      return moment()
    },
    intubationEndTime () {
      if (this.info.intubationEndTime) {
        return moment(this.info.intubationEndTime)
      }
      return moment()
    },
    exitTime () {
      if (this.info.outHomeTime) {
        return moment(this.info.outHomeTime)
      }
      return moment()
    },
    leftWidth () {
      if (this.entryTime !== 0) {
        const val = this.intubationStartTime.diff(this.entryTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    middleWidth () {
      if (this.intubationStartTime !== 0 && this.intubationEndTime !== 0) {
        const val = this.intubationEndTime.diff(this.intubationStartTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    rightWidth () {
      if (this.intubationEndTime !== 0 && this.exitTime !== 0) {
        const val = this.exitTime.diff(this.intubationEndTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    elementWidth () {
      return this.leftWidth + this.middleWidth + this.rightWidth
    },
    elementLeft () {
      if (this.entryTime) {
        const val = this.entryTime.diff(
          moment(`${this.date} 07:30:00`),
          'minutes'
        )
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    text () {
      return `
        入PACU时间：${this.sliceTimeStr(this.info.homeTime)}<br>
        插管开始时间：${this.sliceTimeStr(this.info.intubationStartTime)}<br>
        插管结束时间：${this.sliceTimeStr(this.info.intubationEndTime)}<br>
        出PACU时间：${this.sliceTimeStr(this.info.outHomeTime)}<br>
        姓名：${this.info.patientName}<br>
        性别：${this.info.patientGender}<br>
        年龄：${this.info.age}<br>
        病区：${this.info.inpatientWard}<br>
        床号：${this.info.bedId}<br>
        手术医生：${this.info.surgeon}<br>
        麻醉医生：${this.info.anesDoc}<br>
        ${this.info.anesMethod}<br>
        ${this.info.opeName}<br>
      `
    }
  },
  methods: {
    onMouseover (e) {
      this.showTooltip(e)
    },
    onMouseLeave () {
      this.$tooltip.remove()
    },
    showTooltip (e) {
      this.$tooltip({
        dangerouslyUseHTMLString: true,
        message: this.text,
        positionX: e.pageX,
        positionY: e.pageY
      })
    },
    sliceTimeStr (str) {
      if (str && str.length && str.length === 19) {
        return str.slice(-8, -3)
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.patientDetail {
  position: absolute;
  border: {
    style: solid;
    color: #cddaff;
    width: 1px;
    right: 0;
    radius: 5px 0 0 5px;
  }

  height: 56px;
  overflow: hidden;
  &.hasEnd {
    border: {
      right: 1px;
      radius: 5px;
    }
  }

  .background,
  .content {
    display: flex;
    overflow: hidden;
  }
  .background {
    height: 100%;
    .ready {
      background: #69a7fb;
    }
    .operating {
      background: #15d18d;
    }
    .waking {
      background: #69a7fb;
    }
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .left {
      align-items: center;
      flex: 0 0 28px;
      .circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.3);
      }
    }
    .right {
      font-size: 14px;
      color: white;
      line-height: 21px;
      text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
      white-space: normal;
    }
  }
}
</style>
