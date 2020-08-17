<template>
  <div
    class="patientDetail"
    v-if="elementWidth"
    :style="{
      width: elementWidth + 'px',
      left: elementLeft + 'px'
    }"
    @mousemove="onMouseover"
    @mouseleave="onMouseLeave"
  >
    <div class="background">
      <div
        class="ready"
        :style="{width: readyWidth + 'px'}"
      />
      <div
        class="operating"
        :style="{width: operatingWidth + 'px'}"
      />
      <div
        class="waking"
        :style="{width: wakingWidth + 'px'}"
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
    inOperTime () {
      if (this.info.inOperTime) {
        return moment(this.info.inOperTime)
      }
      return 0
    },
    operStartTime () {
      if (this.info.operStartTime) {
        return moment(this.info.operStartTime)
      } else if (this.info.inOperTime) {
        return moment()
      }
      return 0
    },
    operEndTime () {
      if (this.info.operEndTime) {
        return moment(this.info.operEndTime)
      } else if (this.info.inOperTime) {
        return moment()
      }
      return 0
    },
    outOperTime () {
      if (this.info.outOperTime) {
        return moment(this.info.outOperTime)
      } else if (this.info.inOperTime) {
        return moment()
      }
      return 0
    },
    readyWidth () {
      if (this.inOperTime !== 0 && this.operStartTime !== 0) {
        const val = this.operStartTime.diff(this.inOperTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    operatingWidth () {
      if (this.operEndTime !== 0 && this.operStartTime !== 0) {
        const val = this.operEndTime.diff(this.operStartTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    wakingWidth () {
      if (this.operEndTime !== 0 && this.outOperTime !== 0) {
        const val = this.outOperTime.diff(this.operEndTime, 'minutes')
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    elementWidth () {
      return this.readyWidth + this.operatingWidth + this.wakingWidth
    },
    elementLeft () {
      if (this.inOperTime) {
        const val = this.inOperTime.diff(
          moment(`${this.date} 07:30:00`),
          'minutes'
        )
        return Math.round(val * this.widthScale)
      }
      return 0
    },
    text () {
      return `
        入室时间：${this.sliceTimeStr(this.info.inOperTime)}<br>
        麻醉开始时间：${this.sliceTimeStr(this.info.anesStartTime)}<br>
        手术开始时间：${this.sliceTimeStr(this.info.operStartTime)}<br>
        手术结束时间：${this.sliceTimeStr(this.info.operEndTime)}<br>
        麻醉结束时间：${this.sliceTimeStr(this.info.anesEndTime)}<br>
        出室时间：${this.sliceTimeStr(this.info.outOperTime)}<br>
        ${+this.info.isEmergency ? '急诊' : '择期'}<br>
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
      if (str.length && str.length === 19) {
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
  border: 1px solid #cddaff;
  border-radius: 5px;
  height: 56px;
  overflow: hidden;
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
      background: #f7cf42;
    }
    .waking {
      background: #15d18d;
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
