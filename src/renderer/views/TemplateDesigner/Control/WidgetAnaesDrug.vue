<template>
  <div
    ref="anaesDrug"
    class="anaesDrug"
    :style="widgetStyle"
    @click="handleClearRightClick"
  >
    <drug-list
      @emitgetDrug="emitgetDrugList"
      v-if="drugListVisible"
      :drug-list-visible.sync="drugListVisible"
      :position="position"
      :menu-list="list"
      :type="'0'"
      @handleClick="handleAddDrug"
    />
    <drug-detail
      v-if="drugDetailVisible"
      :start-time="drugStartTime"
      :drug-name="drugName"
      :drug-detail-visible="drugDetailVisible"
      @handleClose="handleCloseDrugDetail"
      @handleSubmit="handleSubmit"
    />
    <div
      id="closeEventId"
      style="z-index:9999999;width:90px;height:50px"
      v-show="closeEventFlag"
    >
      <el-button
        size="mini"
        @click="stopValue"
      >
        {{ btnName }}
      </el-button>
    </div>
    <canvas id="canvas" />
  </div>
</template>

<script>
import * as spritejs from 'spritejs'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import moment from 'moment'
import DrugList from '@/components/ContextMenu/index'
import DrugDetail from '@/components/DrugDetail/index'
import {
  getAnaesDrugList,
  getDrugListRecords,
  addDrug,
  stopPharmacyUse
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
const { Scene, Group, Label, Polyline } = spritejs
export default {
  name: 'WidgetAnaesDrug',
  data () {
    return {
      btnName: '',
      closeEventFlag: false,
      layer: null,
      drugListVisible: false,
      position: { positionX: 0, positionY: 0 },
      layout: {},
      drugList: [],
      // 药品列表
      list: [],
      groupNo: null,
      drugStartTime: null,
      drugDetailVisible: false,
      widgetStyle: {},
      drugName: '',
      currentDrug: {}
    }
  },
  props: {
    configuration: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: true
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    operationId: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    DrugList,
    DrugDetail
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        if (this.editMode) {
          this.resize()
          this.setStyle()
        }
      }
    }
  },
  created () {
    this.setStyle()
    this.resize = debounce(this.domResizeListener, 20)
  },
  async mounted () {
    this.saveDataIo()
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    if (!this.editMode) {
      await this.getDrugList()
      await this.getDrawLineList()
      // 注册刷新事件
      this.$eventHub.$on('document-refresh', () => {
        // 获取数据
        this.getDocumentRefresh()
      })
      // 注册刷新事件
      this.$eventHub.$on('document-redraw', () => {
        // 重新绘制
        this.getDocumentRedraw()
      })
    } else {
      addListener(this.$refs.anaesDrug, this.resize)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.$eventHub.$off('document-refresh', this.getDocumentRefresh)
    this.$eventHub.$off('document-redraw', this.getDocumentRedraw)
    this.layer = null
    removeListener(this.$refs.anaesDrug, this.resize)
  },
  methods: {
    emitgetDrugList (res) {
      // console.log(res)
      this.getDrugList(res)
    },
    saveDataIo () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.getDocumentRedraw()
      }, 60000)
    },
    getDocumentRefresh () {
      // 获取数据
      this.getDrawLineList()
    },
    getDocumentRedraw () {
      // 重新绘制
      this.setLayout()
      this.setContent()
      // 获取数据
      this.getDrawLineList()
    },
    // 获取用药列表数据
    getDrugList (res) {
      request({
        method: 'GET',
        url: getAnaesDrugList,
        params: {
          eventName: res
        }
      }).then(res => {
        const data = res.data.data
        data.forEach((value, index) => {
          value.menuName = value.detailName
          value.value = value.detailCode
        })
        this.list = data
      })
    },
    getDrawLineList () {
      if (this.startTime && this.endTime) {
        request({
          method: 'post',
          url: getDrugListRecords,
          data: {
            startTime: this.startTime,
            endTime: this.endTime,
            operationId: this.operationId
          }
        }).then(res => {
          const data = res.data.data
          data.forEach((item, index) => {
            item.total = item.gross
            item.data.forEach(_item => {
              _item.startTime = _item.eventStartTime
              _item.endTime = _item.eventEndTime
              _item.dose = _item.dosage
              if (_item.isHolding === '1') {
                _item.continue = true
              } else {
                _item.continue = false
              }
            })
          })
          this.drugList = data
          this.setDrug()
          this.setDrugLine()
          this.setDrugTotal()
          this.$emit('finish')
        })
      }
    },
    setStyle () {
      const { border } = this.configuration
      let styleObj = {}
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
    },
    domResizeListener () {
      this.scene.resize()
      this.setLayout()
      this.setContent()
    },
    renderScene () {
      this.scene = new Scene({
        container: this.$refs.anaesDrug,
        width: this.$refs.width,
        height: this.$refs.height,
        contextType: '2d'
        // mode: 'static'
      })
      this.layer = this.scene.layer()
    },
    createGroups () {
      const leftPart = new Group({
        className: 'leftPart'
      })
      const middlePart = new Group({
        className: 'middlePart'
      })
      const rightPart = new Group({
        className: 'rightPart'
      })
      this.layer.append(leftPart, middlePart, rightPart)

      const leftTitle = new Group({
        className: 'leftTitle content'
      })
      const leftMain = new Group({
        className: 'leftMain'
      })
      leftPart.append(leftTitle, leftMain)

      const timeTitle = new Group({
        className: 'timeTitle content'
      })
      const drugList = new Group({
        className: 'drugList content'
      })
      leftMain.append(timeTitle, drugList)

      const xAxis = new Group({
        className: 'xAxis content'
      })
      const grid = new Group({
        className: 'grid content'
      })
      // const eventTag = new Group({
      //   className: 'eventTag content'
      // })
      middlePart.append(xAxis, grid)

      const totalTitle = new Group({
        className: 'totalTitle content'
      })
      const legend = new Group({
        className: 'legend content'
      })
      rightPart.append(totalTitle, legend)
    },
    setLayout () {
      // 清空子元素
      this.layer.getElementsByClassName('content').forEach(ref => {
        ref.removeAllChildren()
      })
      // leftPart
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      leftPart.attr({
        size: [
          Math.round(this.layer.width * this.configuration.leftPartWidthRate),
          this.layer.height
        ]
      })
      // leftPart/leftTitle
      const leftTitle = leftPart.getElementsByClassName('leftTitle')[0]
      leftTitle.attr({
        size: [
          this.configuration.leftTitle.width || 0,
          leftPart.attr('height')
        ],
        padding: [0, 10, 0, 10]
      })
      const leftTitleBorderRightLine = new Polyline({
        pos: [leftTitle.attr('width') - 0.5, 0],
        points: [0, 0, 0, leftPart.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      leftTitle.append(leftTitleBorderRightLine)
      // leftPart/leftMain
      const leftMain = leftPart.getElementsByClassName('leftMain')[0]
      leftMain.attr({
        size: [
          leftPart.attr('width') - leftTitle.attr('width'),
          leftPart.attr('height')
        ],
        pos: [leftTitle.attr('width'), 0]
      })
      // leftPart/leftMain/timeTitle
      const timeTitle = leftMain.getElementsByClassName('timeTitle')[0]
      timeTitle.attr({
        size: [leftMain.attr('width'), this.configuration.timeTitle.height]
        // bgcolor: 'green'
      })
      // const timeTitleBorderRightLine = new Polyline({
      //   // pos: [timeTitle.attr('width') - 0.5, 0],
      //   points: [timeTitle.attr('width') - 0.5, 0, timeTitle.attr('width') - 0.5, timeTitle.attr('height') - 0.5],
      //   strokeColor: 'black',
      //   lineWidth: 1
      // })
      const timeTitleBorderBottomLine = new Polyline({
        pos: [0, 0],
        points: [
          0,
          timeTitle.attr('height') - 0.5,
          timeTitle.attr('width') - 0.5,
          timeTitle.attr('height') - 0.5
        ],
        strokeColor: 'black',
        lineWidth: 1
      })
      timeTitle.append(timeTitleBorderBottomLine)

      // leftPart/leftMain/drugList
      const drugList = leftMain.getElementsByClassName('drugList')[0]
      drugList.attr({
        size: [
          leftMain.attr('width'),
          leftMain.attr('height') - timeTitle.attr('height')
        ],
        pos: [0, timeTitle.attr('height')]
      })
      const drugListBorderRightLine = new Polyline({
        points: [
          drugList.attr('width') - 0.5,
          0,
          drugList.attr('width') - 0.5,
          drugList.attr('height') - 0.5
        ],
        strokeColor: 'black',
        lineWidth: 1
      })
      drugList.append(drugListBorderRightLine)
      const middlePart = this.layer.getElementsByClassName('middlePart')[0]
      middlePart.attr({
        size: [
          Math.round(
            this.layer.width *
              (1 -
                this.configuration.leftPartWidthRate -
                this.configuration.rightPartWidthRate)
          ),
          this.layer.height
        ],
        pos: [leftPart.attr('width'), 0]
      })

      // middlePart/xAxis
      const xAxis = middlePart.getElementsByClassName('xAxis')[0]
      xAxis.attr({
        size: [middlePart.attr('width'), this.configuration.timeTitle.height]
      })
      const xAxisBorderRightLine = new Polyline({
        pos: [xAxis.attr('width') - 0.5, 0],
        points: [0, 0, 0, xAxis.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      const xAxisBorderBottomLine = new Polyline({
        pos: [0, xAxis.attr('height') - 0.5],
        points: [0, 0, xAxis.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      xAxis.append(xAxisBorderRightLine, xAxisBorderBottomLine)
      // middlePart/grid
      const grid = middlePart.getElementsByClassName('grid')[0]
      grid.attr({
        size: [
          middlePart.attr('width'),
          middlePart.attr('height') - this.configuration.timeTitle.height
        ],
        pos: [0, xAxis.attr('height')]
      })
      const gridBorderRightLine = new Polyline({
        pos: [grid.attr('width') - 0.5, 0],
        points: [0, 0, 0, grid.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      // const gridBorderBottomLine = new Polyline({
      //   pos: [0, grid.attr('height') - 0.5],
      //   points: [0, 0, grid.attr('width'), 0],
      //   strokeColor: 'black',
      //   lineWidth: 1
      // })
      grid.append(gridBorderRightLine)

      // rightPart
      const rightPart = this.layer.getElementsByClassName('rightPart')[0]
      rightPart.attr({
        size: [
          Math.round(this.layer.width * this.configuration.rightPartWidthRate),
          this.layer.height
        ],
        pos: [leftPart.attr('width') + middlePart.attr('width'), 0]
      })

      // rightPart/totalTitle
      const totalTitle = rightPart.getElementsByClassName('totalTitle')[0]
      totalTitle.attr({
        size: [rightPart.attr('width'), this.configuration.timeTitle.height]
      })
      const totalTitleBorderBottomLine = new Polyline({
        pos: [0, totalTitle.attr('height') - 0.5],
        points: [0, 0, totalTitle.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      totalTitle.append(totalTitleBorderBottomLine)

      // rightPart/legend
      const legend = rightPart.getElementsByClassName('legend')[0]
      legend.attr({
        size: [
          rightPart.attr('width'),
          rightPart.attr('height') - this.configuration.timeTitle.height
        ],
        pos: [0, this.configuration.timeTitle.height]
      })
    },
    setContent () {
      this.setLeftTitle()
      this.setTimeTitle()
      this.setDrugContent()
      this.setXAxisList()
      this.setXAxis()
      this.setGrid()
      this.setTotalTitle()
      this.setTotalLine()
    },
    setDrugContent () {
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      const drugList = leftPart.getElementsByClassName('drugList')[0]
      const width = Math.round(drugList.attr('width'))
      const lineHeight =
        Math.round(drugList.attr('height')) / this.configuration.drugNumber
      for (let i = 0; i < this.configuration.drugNumber - 1; i++) {
        const line = new Polyline({
          pos: [0, Math.round(lineHeight * (i + 1)) - 0.5],
          points: [0, 0, width, 0],
          strokeColor: 'darkgray',
          lineWidth: 1
        })
        drugList.append(line)
      }
    },
    // 绘制用药列表
    setDrug () {
      // 清空子元素
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      const drugList = leftPart.getElementsByClassName('drugList')[0]
      const labels = drugList.querySelectorAll('.drug')
      if (labels.length > 0) {
        labels.forEach(el => drugList.removeChild(el))
      }
      const width = Math.round(drugList.attr('width'))
      const lineHeight = Math.round(
        drugList.attr('height') / this.configuration.drugNumber
      )
      for (let i = 0; i < this.configuration.drugNumber; i++) {
        if (this.drugList[i]) {
          const text = new Label(this.drugList[i].eventName)
          text.attr({
            pos: [0, lineHeight * i],
            anchor: [0, 0],
            fontSize: 12,
            fontFamily: '宋体',
            textAlign: 'left',
            fillColor: 'black',
            width: width,
            height: lineHeight,
            lineHeight: lineHeight,
            className: 'drug'
          })
          drugList.append(text)
        }
      }
    },
    setLeftTitle () {
      if (!this.layer) return
      const leftTitle = this.layer.querySelector('.leftTitle')
      if (!leftTitle) return
      const width = leftTitle.attr('width')
      const height = leftTitle.attr('height')
      const textArr = this.configuration.leftTitle.text.split('')
      const lineHeight = this.configuration.leftTitle.lineHeight
      const titleTextGroup = new Group()
      titleTextGroup.attr({
        size: [Math.round(width - 1), Math.round(textArr.length * lineHeight)],
        pos: [Math.round(width / 2), Math.round(height / 2)],
        anchor: [0.5, 0.5]
      })
      textArr.forEach((item, i, arr) => {
        const title = new Label(item)
        title.attr({
          pos: [0, Math.round(lineHeight * i - (lineHeight * arr.length) / 2)],
          anchor: [0.5, 0],
          fontSize: 12,
          fontFamily: '宋体',
          textAlign: 'center',
          fillColor: 'black',
          width: width,
          height: lineHeight,
          lineHeight: lineHeight
        })
        titleTextGroup.append(title)
      })
      leftTitle.append(titleTextGroup)
    },
    setTimeTitle () {
      const timeTitle = this.layer.getElementsByClassName('timeTitle')[0]
      if (!timeTitle) return
      const text = new Label(this.configuration.timeTitle.text)
      text.attr({
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: Math.round(timeTitle.attr('width')),
        height: this.configuration.timeTitle.height,
        lineHeight: this.configuration.timeTitle.lineHeight
      })
      timeTitle.append(text)
    },
    setTotalTitle () {
      const totalTitle = this.layer.querySelector('.totalTitle')
      if (!totalTitle) return
      const text = new Label(this.configuration.totalTitle.text)
      text.attr({
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: Math.round(totalTitle.attr('width')),
        height: this.configuration.timeTitle.height,
        lineHeight: this.configuration.timeTitle.lineHeight
      })
      totalTitle.append(text)
    },
    setTotalLine () {
      const legend = this.layer.getElementsByClassName('legend')[0]
      const height = legend.attr('height')
      const width = legend.attr('width')
      const yScale = height / this.configuration.drugNumber
      for (let index = 0; index < this.configuration.drugNumber; index++) {
        if (index) {
          const mainLine = new Polyline({
            pos: [0, Math.round(index * yScale) - 0.5],
            points: [0, 0, width, 0],
            strokeColor: 'darkgray',
            lineWidth: 1
          })
          legend.append(mainLine)
        }
      }
    },
    setXAxisList () {
      const startMoment = +moment(this.configuration.xAxis.startTime)
      const endMoment = +moment(this.configuration.xAxis.endTime)
      const list = []
      for (let i = startMoment; i < endMoment;) {
        list.push({
          // value: i - startMoment,
          label: moment(i).format('HH:mm')
        })
        i += this.configuration.xAxis.timeInterval * 60 * 1000 * 2
      }
      // console.log(list)
      this.xAxisList = list
    },
    setXAxis () {
      const xAxis = this.layer.getElementsByClassName('xAxis')[0]
      if (!xAxis) return
      const width = xAxis.attr('width')
      const height = xAxis.attr('height')
      const list = this.xAxisList
      const scale = width / list.length
      list.forEach((item, index, arr) => {
        const label = new Label(item.label.toString())
        label.attr({
          fontSize: 12,
          fontFamily: '宋体',
          textAlign: 'right',
          fillColor: 'black',
          height: height,
          lineHeight: height,
          anchor: [0.5, 0],
          pos: [Math.round(index * scale), 0]
        })
        xAxis.append(label)
      })
    },
    setGrid () {
      const grid = this.layer.querySelector('.grid')
      if (!grid) return
      const width = grid.attr('width')
      const height = grid.attr('height')
      const xAxislist = this.xAxisList
      const xScale = width / xAxislist.length
      xAxislist.forEach((item, index, arr) => {
        if (index) {
          const mainLine = new Polyline({
            pos: [Math.round(index * xScale) - 0.5, 0],
            points: [0, 0, 0, height],
            strokeColor: 'darkgray',
            lineWidth: 1
          })
          grid.append(mainLine)
        }
        for (let i = 1; i < this.configuration.xAxis.lineInterval; i++) {
          const line = new Polyline({
            pos: [
              Math.round(
                index * xScale +
                  i * (xScale / this.configuration.xAxis.lineInterval)
              ) - 0.5,
              0
            ],
            points: [0, 0, 0, height],
            strokeColor: 'darkgray',
            lineWidth: 1,
            lineDash: [2]
          })
          grid.append(line)
        }
      })
      const yScale = height / this.configuration.drugNumber
      for (let index = 0; index < this.configuration.drugNumber; index++) {
        if (index) {
          const mainLine = new Polyline({
            pos: [0, Math.round(index * yScale) - 0.5],
            points: [0, 0, width, 0],
            strokeColor: 'darkgray',
            lineWidth: 1
          })
          grid.append(mainLine)
        }
        const row = new Group({
          pos: [0, Math.round(index * yScale) - 0.5],
          size: [width, yScale],
          index: index,
          className: 'row'
        })
        grid.append(row)
      }
      this.handleGridRightClick()
    },
    // 停止事件
    stopValue () {
      const obj = {
        id: this.id
      }
      request({
        url: stopPharmacyUse,
        method: 'post',
        params: obj
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success(this.btnName)
          this.getDocumentRedraw()
        }
        this.closeEventFlag = false
      })
    },
    // 网格区右击
    handleGridRightClick () {
      if (!this.editMode) {
        if (this.startTime && this.endTime) {
          const grid = this.layer.getElementsByClassName('grid')[0]
          const leftPart = this.layer.getElementsByClassName('leftPart')[0]
          const width = grid.attr('width')
          // const xAxislist = this.xAxisList
          // console.log(xAxislist)
          // const xScale = Math.floor(width / xAxislist.length);
          // const interval = Math.floor(
          //   (this.configuration.xAxis.timeInterval * 60 * 1000) / xScale
          // );
          grid.removeEventListener('mousedown')

          grid.addEventListener('mousedown', evt => {
            let flag = 0
            if (evt.originalEvent.button === 2) {
              if (evt.currentTarget.attr('className' === 'line')) {
                this.groupNo = evt.target.attr('index')
                if (this.groupNo !== undefined && this.drugList[this.groupNo]) {
                  this.drugList[this.groupNo].data.forEach(item => {
                    if (item.isHolding === '1' && item.isFinish === '0') {
                      const res = document.getElementById('closeEventId')
                      this.btnName =
                        '停止' + this.drugList[this.groupNo].eventName
                      res.style.position = 'absolute'
                      res.style.top = evt.y + 5 + 'px'
                      res.style.left = evt.x + 5 + 'px'
                      this.id = item.id
                      this.closeEventFlag = true
                      flag = 0
                      return false
                    } else {
                      flag = 1
                    }
                  })
                }
              }
              if (evt.target.attr('className') === 'row') {
                this.groupNo = evt.target.attr('index')
                // console.log(evt.x - leftPart.attr("width"));
                this.drugStartTime =
                  moment(this.startTime) +
                  ((evt.x - leftPart.attr('width')) *
                    (moment(this.endTime) - moment(this.startTime))) /
                    width

                // return false
                if (this.drugList[this.groupNo]) {
                  this.drugListVisible = false
                  this.currentDrug = this.drugList[this.groupNo]
                  this.currentDrug.eventType = this.drugList[
                    this.groupNo
                  ].eventId
                  this.drugName = this.drugList[this.groupNo].eventName
                  if (flag === 1) {
                    this.drugDetailVisible = true
                  }
                } else {
                  this.closeEventFlag = false
                  this.drugListVisible = true
                }
                // this.drugListVisible = true
                this.position.positionX = evt.x
                this.position.positionY = evt.y
              }
            } else {
              this.closeEventFlag = false
            }
          })
        }
      }
    },
    // 下拉列表添加药品
    handleAddDrug (param) {
      if (!this.editMode) {
        if (this.drugList[this.groupNo]) {
          this.drugDetailVisible = true
        } else {
          const obj = {}
          obj.detailId = param.detailCode
          obj.eventId = param.eventCode
          obj.eventName = param.detailName
          obj.eventType = param.eventType
          this.currentDrug = obj
          this.drugListVisible = false
          this.drugDetailVisible = true
        }
      }
      // this.setDrug()
    },
    handleClearRightClick (e) {
      if (e.target.className.includes('input')) {
        console.log(111)
      } else if (!this.editMode) {
        this.getDrugList()
        this.drugListVisible = false
        this.groupNo = null
      }
    },
    handleCloseDrugDetail () {
      if (!this.editMode) {
        this.drugDetailVisible = false
        this.drugStartTime = null
      }
    },
    // 绘制用药线段
    setDrugLine () {
      // 清空子元素
      if (this.layer.getElementsByClassName('col').length > 0) {
        this.layer.getElementsByClassName('col').forEach(ref => {
          ref.removeAllChildren()
        })
      }
      const grid = this.layer.getElementsByClassName('grid')[0]
      const height = grid.attr('height')
      const yScale = height / this.configuration.drugNumber
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      const row = grid.getElementsByClassName('row')
      this.drugList.forEach((value, index, array) => {
        value.data.forEach((item, i) => {
          const dose = new Label(item.dose)
          const text = Math.ceil(ctx.measureText(item.dose).width)
          let group = null
          const width = grid.attr('width')
          const interval =
            width /
            (moment(this.configuration.xAxis.endTime) -
              moment(this.configuration.xAxis.startTime))
          const startTime = Math.round(
            (moment(item.startTime) -
              moment(this.configuration.xAxis.startTime)) *
              interval
          )
          // const startTime = Math.round((moment(item.startTime) - moment('2020-7-21 17:00')) * interval)
          let endTime = null
          if (item.endTime !== '') {
            endTime = Math.round(
              (moment(item.endTime) -
                moment(this.configuration.xAxis.startTime)) *
                interval
            )
            // endTime = Math.round((moment(item.endTime) - moment('2020-7-21 17:00')) * interval)
          }
          if (item.continue) {
            group = new Group({
              className: 'col',
              colIndex: i,
              size: [endTime - startTime, yScale],
              pos: [startTime, 0]
            })
            dose.attr({
              pos: [group.attr('width') / 2 - text / 2, 0],
              lineHeight: group.attr('height'),
              height: group.attr('height'),
              fontSize: 12,
              fillColor: 'blue',
              fontFamily: '宋体',
              textAlign: 'center',
              strokeWidth: 1
            })
            const leftLine = new Polyline({
              pos: [-0.5, 0],
              points: [
                0,
                group.attr('height') / 4,
                0,
                (group.attr('height') * 3) / 4
              ],
              lineWidth: 1,
              strokeColor: 'blue',
              className: 'line',
              index: index
            })
            if (item.isCross === '1') {
              const topArow = new Polyline({
                pos: [
                  group.attr('width') - 0.5,
                  group.attr('height') / 2 - 0.5
                ],
                points: [0, 0, -10, -group.attr('height') / 4],
                lineWidth: 1,
                strokeColor: 'blue'
              })
              const bottomArow = new Polyline({
                pos: [
                  group.attr('width') - 0.5,
                  group.attr('height') / 2 - 0.5
                ],
                points: [0, 0, -10, group.attr('height') / 4],
                lineWidth: 1,
                strokeColor: 'blue',
                className: 'line',
                index: index
              })
              group.append(topArow, bottomArow)
            } else {
              const rightLine = new Polyline({
                pos: [group.attr('width') - 0.5, 0],
                points: [
                  0,
                  group.attr('height') / 4,
                  0,
                  (group.attr('height') * 3) / 4
                ],
                lineWidth: 1,
                strokeColor: 'blue',
                className: 'line',
                index: index
              })
              group.append(rightLine)
            }
            if (
              moment(item.eventEndTime).diff(
                moment(item.eventStartTime),
                'minute'
              ) < 5
            ) {
              group.append(leftLine, dose)
            } else {
              const center = group.attr('width') / 2
              const leftCenterLine = new Polyline({
                pos: [0, 0],
                points: [
                  0,
                  group.attr('height') / 2 - 0.5,
                  center - text / 2 - 4,
                  group.attr('height') / 2 - 0.5
                ],
                lineWidth: 1,
                strokeColor: 'blue',
                className: 'line',
                index: index
              })
              const rightCenterLine = new Polyline({
                pos: [0, 0],
                points: [
                  center + text / 2 + 4,
                  group.attr('height') / 2 - 0.5,
                  group.attr('width'),
                  group.attr('height') / 2 - 0.5
                ],
                lineWidth: 1,
                strokeColor: 'blue',
                className: 'line',
                index: index
              })
              group.append(leftLine, leftCenterLine, rightCenterLine, dose)
            }
          } else {
            group = new Group({
              className: 'col',
              colIndex: i,
              size: [text, yScale],
              pos: [startTime, 0]
            })
            dose.attr({
              pos: [0, 0],
              lineHeight: group.attr('height'),
              height: group.attr('height'),
              fontSize: 12,
              fillColor: 'blue',
              fontFamily: '宋体',
              textAlign: 'center',
              strokeWidth: 1
            })
            group.append(dose)
          }
          if (row[index]) {
            row[index].append(group)
          }
        })
      })
    },
    // 绘制用药总量
    setDrugTotal () {
      if (!this.editMode) {
        if (!this.layer) {
          return false
        }
        // 清空子元素
        this.layer.getElementsByClassName('total').forEach(ref => {
          ref.removeAllChildren()
        })
        const legend = this.layer.getElementsByClassName('legend')[0]
        const labels = legend.querySelectorAll('.total')
        labels.forEach(el => legend.removeChild(el))
        const height = legend.attr('height')
        const width = legend.attr('width')
        const yScale = height / this.configuration.drugNumber
        this.drugList.forEach((value, index, array) => {
          const label = new Label(value.total)
          label.attr({
            pos: [0, yScale * index],
            anchor: [0, 0],
            textAlign: 'center',
            width: width,
            lineHeight: yScale,
            fontSize: 12,
            fillColor: 'blue',
            fontFamily: '宋体',
            strokeWidth: 1,
            className: 'total'
          })
          if (index < this.configuration.drugNumber) {
            legend.append(label)
          }
        })
      }
    },
    handleSubmit (param) {
      if (!this.editMode) {
        const list = []
        const obj = {}
        obj.eventType = ''
        obj.detailId = this.currentDrug.detailId
        obj.eventId = this.currentDrug.eventId
        obj.eventName = this.currentDrug.eventName
        obj.eventType = this.currentDrug.eventType
        obj.intervalTime = ''
        obj.approach = param.channel
        if (param.continue) {
          obj.holdingTime = moment(param.endTime).diff(
            moment(param.startTime),
            'minute'
          )
        } else {
          obj.holdingTime = ''
        }
        obj.eventStartTime = param.startTime
        obj.speedUnit = param.speedUnit
        obj.speed = param.speed
        obj.dosage = param.dose
        obj.concentration = param.concentration
        obj.concentrationUnit = param.concentrationUnit
        obj.dosageUnit = param.doseUnit
        obj.operationId = this.operationId
        if (param.continue) {
          obj.isHolding = 1
          obj.eventEndTime = param.endTime
        } else {
          obj.eventEndTime = ''
          obj.isHolding = 0
        }
        console.log(obj)
        list.push(obj)
        request({
          url: addDrug,
          method: 'POST',
          data: list
        }).then(() => {
          this.drugDetailVisible = false
          this.getDrawLineList()
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.anaesDrug {
  height: 100%;
  width: 100%;
  // border: 1px solid black;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  overflow: unset !important;
  // background: #fff;
}
</style>
