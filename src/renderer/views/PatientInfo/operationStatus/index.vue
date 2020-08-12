<template lang="pug">
.operation-status.clearfix
  .card
    .top
      span 姓名
        span {{ ptCardInfo.ptName }}
      span 性别
        span {{ ptCardInfo.gender }}
    .center ID
      span {{ ptCardInfo.ptId }}
    .bottom
      i.el-icon-back(@click="back")
      .room {{ ptCardInfo.roomNo }}
  .step
    .left-arow(@click="handleChangeNav(1)")
      i.el-icon-arrow-left.arow
    .scroll-content(ref="scrollContent")
      el-scrollbar.rowScrollbar(style="overflow-y:hidden;", ref="scrollbar")
        ul
          li(v-for="(item, index) in opeStatusList", :key="index")
            .img
              img(:src="getImg(item.state)")
              .line(v-if="item.state == 0 && index > 0")
              .gray(v-else-if="item.state == 2 && index > 0")
                ol
                  li
                  li
                  li
                  li
                  li
                  li
                  li
                  li
              .loading(v-else-if="item.state == 1 && index > 0")
                ol
                  li
                  li
                  li
                  li
                  li
                  li
                  li
                  li
            .title {{ item.conName }}
            .time
              el-date-picker(
                v-model="item.time",
                :readonly="item.state == 0",
                :disabled="item.state == 2",
                size="mini",
                type="datetime",
                style="width:130px;",
                placeholder="",
                @change="handleAddOpeStatusTime(item)",
                format="MM-dd HH:mm",
                value-format="yyyy-MM-dd HH:mm:ss",
                popper-class="dateTimePicker"
              )
    .right-arow(@click="handleChangeNav(2)")
      i.el-icon-arrow-right.arow
  DialogResuscitationBed(:visible.sync="dialogResuscitationBedVisible")
</template>
<script>
import unstart from '@/assets/unstart.png'
import ongoing from '@/assets/ongoing.png'
import finished from '@/assets/finished.png'
import request from '@/utils/requestForMock'
import { patientStatus, addStatus } from '@/api/patientList'
import { mapGetters, mapActions } from 'vuex'
import DialogResuscitationBed from './DialogResuscitationBed'
import { Socket } from '@/model/Socket'
export default {
  name: 'OperationStatus',
  components: {
    DialogResuscitationBed
  },
  data () {
    return {
      datetime: '',
      opeStatusList: [],
      // 复苏床位弹框
      dialogResuscitationBedVisible: false
    }
  },
  computed: {
    ...mapGetters('Base', ['ptCardInfo', 'operationId']),
    getImg (status) {
      return function (status) {
        switch (status) {
          case 0:
            return finished
          case 1:
            return ongoing
          case 2:
            return unstart
        }
      }
    }
  },
  mounted () {
    this.getStatusList()
  },
  methods: {
    ...mapActions('Base', [
      'setProcedureState',
      'setOperationStateList',
      'clearBaseInfo'
    ]),
    getStatusList () {
      if (this.operationId === '') {
        return
      }
      return request({
        method: 'GET',
        url: `${patientStatus}/${this.operationId}`
      }).then((res) => {
        if (res.data && res.data.success) {
          this.opeStatusList = res.data.data
          this.setOperationStateList(res.data.data)
        }
      })
    },
    back () {
      this.$router.push('/home')
      this.clearBaseInfo()
      if (Socket.instance) {
        Socket.close()
      }
    },
    handleChangeNav (nav) {
      const scrollbarEl = this.$refs.scrollbar.wrap
      if (nav === 1) {
        this.scrollEffect(scrollbarEl, -168)
      } else {
        this.scrollEffect(scrollbarEl, 168)
      }
    },
    // 修改状态
    addStatusTimePoint (param) {
      const formData = new FormData()
      formData.append('operationId', this.operationId)
      formData.append('conCode', param.conCode)
      formData.append('timePoint', param.time)
      request({
        method: 'POST',
        url: addStatus,
        data: formData
      }).then((res) => {
        if (res.data && res.data.success) {
          this.scrollEffect(this.$refs.scrollbar.wrap, 168)
          this.setProcedureState(res.data.data)
          this.getStatusList()
          this.$eventHub.$emit('refresh-ptlist')
          // 入复苏室状态情况下需要选择床位和增加设备信息
          if (+param.conCode === 12) {
            this.showResuscitationBed()
          }
        }
      })
    },
    handleAddOpeStatusTime (param) {
      this.addStatusTimePoint(param)
    },
    // 展示复苏床位
    showResuscitationBed () {
      this.dialogResuscitationBedVisible = true
    },
    // 移动效果
    scrollEffect (el, distance) {
      const hiddenWidth = el.scrollWidth - el.clientWidth
      let timer = null
      const step = Math.round(distance / (300 / 16))
      let current = 0
      const scrollTimer = () => {
        timer = setTimeout(() => {
          el.scrollLeft += step
          current += step
          if (
            Math.abs(current) < Math.abs(distance) &&
            el.scrollLeft > 0 &&
            el.scrollLeft < hiddenWidth
          ) {
            scrollTimer()
          } else {
            if (timer) clearTimeout(timer)
          }
        }, 16)
      }
      scrollTimer()
    }
  }
}
</script>
<style lang="stylus" scoped>
.operation-status {
  width: 100%;
  height: 114px;
  background: #181C27;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  overflow: hidden;

  // display flex
  .card {
    margin: 10px 0 0 10px;
    width: 210px;
    float: left;
    min-width: 210px;
    max-height: 94px;
    background: rgba(37, 44, 64, 1);
    border: 2px solid rgba(53, 62, 86, 1);
    border-radius: 6px;
    font-size: 14px;
    padding: 4px 9px 9px;
    color: #D0DAE5;

    .top {
      display: flex;
      justify-content: space-between;

      span {
        > {
          span {
            color: #9BA3D5;
            display: inline-block;
            line-height: 22px;
            text-indent: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 80px;
            // overflow:hidden;
          }
        }
      }
    }

    .center {
      span {
        color: #9BA3D5;
        text-indent: 13px;
        line-height: 22px;
        display: inline-block;
      }
    }

    .bottom {
      position: relative;
      margin-top: 5px;

      i {
        cursor: pointer;
        width: 18px;
        height: 18px;
        font-size: 18px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }

      .room {
        width: 100px;
        height: 30px;
        background: linear-gradient(120deg, rgba(84, 190, 234, 1), rgba(219, 83, 160, 1));
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        color: #FFFFFF;
        text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
        line-height: 30px;
        text-align: center;
        margin: 0 auto;
      }
    }
  }

  .step {
    // flex 1
    height: 100%;
    float: right;
    width: calc(100% - 220px);
    position: relative;

    .left-arow {
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      transition: all ease 0.3s;
      cursor: pointer;

      &:hover {
        transform: scale(1.4);
      }
    }

    .right-arow {
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      cursor: pointer;
      transition: all ease 0.3s;

      &:hover {
        transform: scale(1.4);
      }
    }

    .arow {
      font-size: 48px;
      line-height: 114px;
      font-weight: bold;
      color: #2D95F7;
    }

    .scroll-content {
      width: calc(100% - 116px);
      margin: 0 auto;

      ul {
        width: 100%;
        display: flex;
        height: 114px;
        margin: 0 auto;
        padding: 0 9px;

        li {
          margin-right: 38px;

          &:last-child {
            margin-right: 0;
          }

          .img {
            height: 40px;
            // overflow hidden
            margin-top: 10px;
            text-align: center;
            position: relative;

            img {
              height: 40px;
              width: 40px;
              transform: scale(1.9);
              z-index: 1;
            }

            .line {
              height: 2px;
              position: absolute;
              left: -90px;
              top: 0;
              bottom: 0;
              margin: auto;
              background: #2991EF;
              width: 140px;
            }

            .loading {
              height: 2px;
              position: absolute;
              left: -78px;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 140px;

              ol {
                padding: 0;
                display: flex;

                li {
                  width: 10px;
                  height: 2px;
                  margin-right: 5px;
                  // background #2991EF
                  background: #ff4359;
                  border-radius: 1px;
                  animation: load 1.06s ease infinite;

                  &:nth-child(1) {
                    animation-delay: 0.13s;
                  }

                  &:nth-child(2) {
                    animation-delay: 0.26s;
                  }

                  &:nth-child(3) {
                    animation-delay: 0.39s;
                  }

                  &:nth-child(4) {
                    animation-delay: 0.52s;
                  }

                  &:nth-child(5) {
                    animation-delay: 0.65s;
                  }

                  &:nth-child(6) {
                    animation-delay: 0.78s;
                  }

                  &:nth-child(7) {
                    animation-delay: 0.91s;
                  }

                  &:nth-child(8) {
                    animation-delay: 1.04s;
                  }
                }

                @keyframes load {
                  0% {
                    opacity: 1;
                  }

                  100% {
                    opacity: 0;
                  }
                }
              }
            }

            .gray {
              height: 2px;
              position: absolute;
              left: -78px;
              top: 0;
              bottom: 0;
              margin: auto;
              width: 140px;

              ol {
                padding: 0;
                display: flex;

                li {
                  width: 10px;
                  height: 2px;
                  margin-right: 5px;
                  background: #4262b2;
                  border-radius: 1px;
                }
              }
            }
          }
        }

        .title {
          font-size: 14px;
          line-height: 26px;
          color: #9BA3D5;
          text-align: center;
        }
      }
    }
  }
}
</style>
<style>
.el-picker-panel {
  background: #252c40 !important;
}
.scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.rowScrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}
</style>
