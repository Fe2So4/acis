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
              .img(:class="{'out-ope-room':item.conName === '出手术室'}")
                img(:src="getImg(item.state)" @dblclick="handleShowList(item)")
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
              .time( @dblclick="getNewTime(item, index)" @click="focusPicker(item,index,$event)",)
                //- input(
                //-   :id=" 'inputTime' + index "
                //-   :disabled="item.state == 2"
                //-   v-model="item.time"
                //-   @focus="getNewHHMM(item)"
                //-   @keyup.enter="handleAddOpeStatusTime(item, 'inputTime' + index)"
                //-   type="time"
                //-   style="width: 120px;text-indent: 8px;height: 30px;font-size: 20px;text-align: center;"
                //- )
                el-date-picker(

                  :class="'datepicker' + index"
                  v-model="item.time",
                  readonly,
                  :disabled="item.state == 2",
                  size="mini",
                  type="datetime",
                  style="width:130px;",
                  placeholder="",
                  @change="handleAddOpeStatusTime(item, index)",
                  format="MM-dd HH:mm",
                  value-format="yyyy-MM-dd HH:mm:ss",
                  :popper-class="'dateTimePicker' + index"
                )
      .right-arow(@click="handleChangeNav(2)")
        i.el-icon-arrow-right.arow
    .menu-list(v-if="showVisible" ref="menuList")
      .menu-list-left
      .menu-list-right
        .menu-list-item(@click.stop="handleTransTo(1)") 转入复苏室
        .menu-list-item(@click.stop="handleTransTo(3)") 转入病房
        .menu-list-item(@click.stop="handleTransTo(2)") 转入ICU
        .menu-list-item(@click.stop="handleTransTo(4)") 非计划转入ICU
    .menu-list(v-if="showTypeList" ref="menuTypeList")
      .menu-list-left
      .menu-list-right
        .menu-list-item(@click.stop="backOperationState") 转回手术间
    DialogResuscitationBed(:visible.sync="dialogResuscitationBedVisible" @handleUpdateStatus="handleUpdateStatus")
    //- DialogTime(@closeDialogVisible="changeVisible" :selectYear="selectYear" :selectTime="selectTime" :dialogVisible="dialogVisible")
    el-dialog(append-to-body,:close-on-click-modal="false",title="请选择时间",
      :visible.sync="dialogVisible",
      width="350px",
      :before-close="onCancel")
      el-form(:inline="true")
        el-form-item
          el-date-picker(style="width:130px",
            size="mini",
            format="MM-dd",
            value-format="yyyy-MM-dd",
            v-model="selectYear",
            type="date",
            placeholder="选择日期")
        el-form-item
          .el-date-editor.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date(style="width:130px")
            input(style="width:130px;height:28px;fontSize:14px",
              type="time"
              class="el-input__inner"
              size="mini",
              maxlength="5",
              v-model="selectTime")
      span(slot="footer", class='dialog-footer')
        el-button(size="mini", @click="onCancel") 取消
        el-button(size="mini", @click="onSaveTime", type="primary") 确定

</template>
<script>
import utilsDebounce from '@/utils/utilsDebounce'
import getNowFormatDate from '@/utils/utilsNewTime'
import request from '@/utils/requestForMock'
import {
  patientStatus,
  addStatus,
  opeDirection,
  startSyncMonitorDataFJ,
  endMonitorDataDocking,
  backOperationState,
  getOperationBindEquipmentIpWhenInRoom
} from '@/api/patientList'
import { mapGetters, mapActions, mapState } from 'vuex'
import DialogResuscitationBed from './DialogResuscitationBed'
// import DialogTime from './DialogTime'
import { Socket } from '@/model/Socket'
import $bus from '@/utils/bus'
import moment from 'moment'

export default {
  name: 'OperationStatus',
  components: {
    DialogResuscitationBed
    // DialogTime
  },
  data () {
    return {
      TimeFn: null,
      selectItem: {},
      selectYear: '',
      selectTime: '',
      dialogVisible: false,
      showTypeList: false,
      mazuiEnd: {
        conCode: '',
        conName: '',
        time: ''
      },
      datetime: '',
      opeStatusList: [],
      // 复苏床位弹框
      dialogResuscitationBedVisible: false,
      showVisible: false
    }
  },
  computed: {
    ...mapState('Base', ['theme']),
    ...mapGetters('Base', ['ptCardInfo', 'operationId']),
    getImg () {
      return function (status) {
        let state = 'unstart'
        switch (status) {
          case 0:
            state = 'finished'
            break
          case 1:
            state = 'ongoing'
            break
          case 2:
            state = 'unstart'
            break
          default:
        }
        return require(`@/assets/${state}_${this.theme}.png`)
      }
    }
  },
  mounted () {
    this.showTypeList = false
    this.getStatusList()
    this.$refs.scrollbar.update()
    $bus.$on('hidenMenu', () => {
      this.showVisible = false
      this.showTypeList = false
    })
    $bus.$on('shuaxinStatusList', () => {
      this.getStatusList()
    })
  },
  beforeDestroy () {
    $bus.$off('hidenMenu')
    $bus.$off('shuaxinStatusList')
  },
  methods: {
    ...mapActions('Base', [
      'setProcedureState',
      'setOperationStateList',
      'clearBaseInfo'
    ]),
    onCancel () {
      this.dialogVisible = false
    },
    onSaveTime () {
      if (
        this.selectYear === '' ||
        this.selectYear === undefined ||
        this.selectYear === null
      ) {
        this.$message.warning('请输入正确的日期')
        return false
      }
      if (
        this.selectTime === '' ||
        this.selectTime === undefined ||
        this.selectTime === null
      ) {
        this.$message.warning('请输入正确的时间')
        return false
      }
      const time = this.selectYear + ' ' + this.selectTime + ':00'
      this.selectItem.time = time
      this.onCancel()
      this.handleAddOpeStatusTime(this.selectItem)
    },
    focusPicker (item, index, e) {
      if (item.state === 2) return
      clearTimeout(this.TimeFn)
      this.TimeFn = setTimeout(() => {
        this.selectItem = item
        if (item.time) {
          this.selectYear = String(item.time.split(' ')[0])
          const time = String(item.time.split(' ')[1])
          console.log(time)
          this.selectTime = time.substring(0, 5)
        } else {
          this.selectYear = String(getNowFormatDate().split(' ')[0])
          const time = String(getNowFormatDate().split(' ')[1])
          console.log(time)
          this.selectTime = time.substring(0, 5)
        }
        this.dialogVisible = true
      }, 300)

      // console.log(item, e)
      // this.$nextTick(() => {
      //   const time = item.time
      //   if (e.$el.children[0].getAttribute('addClickHandleFlag') !== '1') {
      //     e.$el.children[0].setAttribute('addClickHandleFlag', '1')
      //     e.$el.children[0].addEventListener('blur', () => {
      //       if (this.opeStatusList[index].time !== time) {
      //         console.log('1111')
      //       }
      //     })
      //   }
      // })
      // this.$nextTick(() => {
      //   event.popperElm.childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].children[0].addEventListener(
      //     'input',
      //     () => {
      //       const a =
      //         event.popperElm.childNodes[0].childNodes[1].childNodes[0]
      //           .childNodes[1].childNodes[0].children[0].value
      //       if (a.length === 2 && !a.includes(':')) {
      //         event.popperElm.childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].children[0].value =
      //           a + ':'
      //       }
      //       // event.popperElm.childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].children[0].value =
      //       //   a.substring(0, 2) + ':' + a.substring(2)
      //     }
      //   )
      // })
    },
    // 双击获取当前时间 隐藏弹出框
    getNewTime (item, index) {
      if (item.state === 2) return
      clearTimeout(this.TimeFn)
      item.time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.handleAddOpeStatusTime(item)
      // const dateType = document.getElementsByClassName(
      //   'dateTimePicker' + index
      // )[0]
      // dateType.style.display = 'none'
    },
    // 修改手术状态
    backOperationState () {
      request({
        method: 'get',
        url: backOperationState + '/' + this.operationId
      }).then(res => {
        if (res.data.code === 200) {
          this.showTypeList = false
          this.getStatusList()
        }
      })
    },
    getNewHHMM (item) {
      if (item.time === '' || item.time === null || item.time === undefined) {
        item.time = moment(new Date()).format('HH:mm')
      }
    },
    handleShowList (item) {
      if (item.conCode === '13') {
        this.showTypeList = true
        this.$nextTick(() => {
          const outOpeRoom = document.querySelector('.out-ope-room')
          const scrollbarEl = this.$refs.scrollbar.wrap
          this.$refs.menuTypeList.style.left =
            outOpeRoom.offsetLeft + 630 - scrollbarEl.scrollLeft + 'px'
          this.$refs.menuTypeList.style.top = outOpeRoom.offsetTop + 80 + 'px'
        })
      } else {
        if (item.conCode !== '11') return
        if (item.time === '') {
          this.$message({ type: 'success', message: '请先完成出手术室操作!' })
          return
        }
        this.showVisible = true
        this.$nextTick(() => {
          const outOpeRoom = document.querySelector('.out-ope-room')
          const scrollbarEl = this.$refs.scrollbar.wrap
          this.$refs.menuList.style.left =
            outOpeRoom.offsetLeft + 493 - scrollbarEl.scrollLeft + 'px'
          this.$refs.menuList.style.top = outOpeRoom.offsetTop + 72 + 'px'
        })
      }
    },
    // 床位触发手术状态更新
    handleUpdateStatus () {
      this.addStatusTimePoint({
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        conCode: 13
      })
      this.scrollEffect(this.$refs.scrollbar.wrap, 336)
    },
    handleTransTo (param) {
      // if()
      request({
        method: 'post',
        url: opeDirection,
        data: {
          operationId: this.operationId,
          direction: '' + param,
          timePoint: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.getStatusList()
          if (param === 1) {
            this.showResuscitationBed()
          }
          this.showVisible = false
        }
      })
    },
    getStatusList () {
      if (this.operationId === '') {
        return
      }
      return request({
        method: 'GET',
        url: `${patientStatus}/${this.operationId}`
      }).then(res => {
        if (res.data && res.data.success) {
          // 去除 去除麻醉结束逻辑
          // if (res.data.data) {
          //   res.data.data.forEach((item, index) => {
          //     if (item.conName === '麻醉结束') {
          //       this.mazuiEnd = item
          //       res.data.data.splice(index, 1)
          //     }
          //   })
          // }

          this.opeStatusList = res.data.data
          this.setOperationStateList(res.data.data)
        }
      })
    },
    back () {
      return this.$router.push('/home').then(
        res => {
          this.clearBaseInfo()
          if (Socket.instance) {
            Socket.close()
          }
        },
        e => {}
      )
    },
    handleChangeNav (nav) {
      const scrollbarEl = this.$refs.scrollbar.wrap
      this.showVisible = false
      if (nav === 1) {
        this.scrollEffect(scrollbarEl, -168)
      } else {
        this.scrollEffect(scrollbarEl, 168)
      }
    },
    // 开启体征推送
    handleStartMonitorData () {
      request({
        method: 'get',
        url: startSyncMonitorDataFJ + '/' + this.operationId
      }).then(res => {})
    },
    // 关闭体征推送
    handleEndMonitorData () {
      request({
        method: 'get',
        url: endMonitorDataDocking + '/' + this.operationId
      }).then(res => {})
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
      }).then(res => {
        if (res.data && res.data.success) {
          // 去除 去除麻醉结束逻辑
          // if (param.conName === '手术结束') {
          //   this.addStatusTimePoint(this.mazuiEnd)
          // }
          this.setProcedureState(res.data.data)
          this.getStatusList()
          this.scrollEffect(this.$refs.scrollbar.wrap, 168)
          // this.$eventHub.$emit('refresh-ptlist')
          // 入复苏室状态情况下需要选择床位和增加设备信息
          // if (+param.conCode === 12) {
          //   this.showResuscitationBed()
          // }
          if (+param.conCode === 6 || +param.conCode === 13) {
            this.handleStartMonitorData()
          } else if (+param.conCode === 11 || +param.conCode === 14) {
            this.handleEndMonitorData()
          }
          // 建立socket连接
          const noNeedSocketState = [10, 11, 14, 15, 16, 17]
          if (Socket.instance) {
            if (noNeedSocketState.includes(+res.data.data)) {
              Socket.close()
            }
          } else {
            if (!noNeedSocketState.includes(+res.data.data)) {
              Socket.create(this.operationId)
            }
          }
        }
      })
    },
    handleAddOpeStatusTime (param) {
      console.log(param)
      if (param.conName === '入手术室') {
        this.searchOperationBindEquipmentIpWhenInRoom(param)
      } else {
        if (param.conName === '手术结束') {
          this.mazuiEnd.time = param.time
        }
        this.addStatusTimePoint(param)
      }
    },
    // 判断手术开始是否绑定监护仪
    searchOperationBindEquipmentIpWhenInRoom (param) {
      request({
        method: 'get',
        url: getOperationBindEquipmentIpWhenInRoom + '/' + this.operationId
      }).then(res => {
        if (res.data.code === 200) {
          this.addStatusTimePoint(param)
        } else {
          this.$message.error('请先绑定监护仪')
          param.time = ''
        }
      })
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
<style lang="scss" scoped>
@import '@/styles/theme';

.operation-status {
  width: 100%;
  height: 114px;
  @include theme-property('background', $color-background-navigation);
  @include theme-property('box-shadow', $box-shadow-card);
  border-radius: 5px;
  overflow: hidden;

  // display flex
  .card {
    margin: 10px 0 0 10px;
    width: 210px;
    float: left;
    min-width: 210px;
    max-height: 94px;
    @include theme-property('background', $color-background-card);
    @include theme-property('border', $border-card-small);
    border-radius: 6px;
    font-size: 14px;
    padding: 4px 9px 9px;
    @include theme-property('color', $color-text-regular);

    .top {
      display: flex;
      justify-content: space-between;

      span {
        > {
          span {
            @include theme-property('color', $color-text-secondary);
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
        @include theme-property('color', $color-text-secondary);
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
        // background: linear-gradient(120deg, rgba(84, 190, 234, 1), rgba(219, 83, 160, 1));
        @include card-room;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
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
      color: #2d95f7;
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
          margin-right: 10px;
          // position: relative;

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
              background: #2991ef;
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
          @include theme-property(color, $color-text-regular);
          text-align: center;
        }
      }
    }
  }
  .menu-list {
    position: absolute;
    display: flex;
    width: 180px;
    left: 0;
    top: 0;
    z-index: 999999;
    // height: 124px;
    background: #1e222e;
    border: 1px solid #39425c;
    @include theme-property('background', $background-dialog);
    @include theme-property('border-color', $dateTimePicker-color-border);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    .menu-list-left {
      width: 30px;
      // height: 124px;
      background: #2c3140;
      @include theme-property('background', $dateTimePicker-color-background);
      // border-radius: 5px 0px 0px 5px;
    }
    .menu-list-right {
      flex: 1;
      padding-left: 10px;
      .menu-list-item {
        color: #9ba3d5;
        @include theme-property('color', $color-text-regular);
        font-size: 12px;
        cursor: pointer;
        line-height: 24px;
        &:hover {
          color: #388ff7;
          @include theme-property('color', $color-text-primary);
        }
      }
    }
  }
}
</style>
<style>
.scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}

.rowScrollbar .el-scrollbar__wrap .el-scrollbar__view {
  white-space: nowrap;
}
</style>
