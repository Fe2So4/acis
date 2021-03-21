<template>
  <div
    ref="physicalSign"
    class="widgetPhysicalSign"
    :style="widgetStyle"
    :title="title"
  >
    <MySignsForm
      :dialog-visible="dialogVisible"
      @closeDio="closeDio"
    />
  </div>
</template>

<script>
// 打点渲染
import * as spritejs from 'spritejs'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import moment from 'moment'
import { getSignData, getEventDictData } from '@/api/medicalDocument'
import { getBloodGasAnalysisRecordTime } from '@/api/blood'
import { getAcisIntraoEventInfo } from '@/api/intraoperative'
import request from '@/utils/requestForMock'
import MySignsForm from '@/components/MySignsForm/mySignsForm'
import {
  PhysicalSignLine,
  PhysicalSignLegends,
  PhysicalSignEventTags,
  PhysicalSignBloodGas
} from '@/model/PhysicalSign'
import { Socket } from '@/model/Socket'
const { Scene, Group, Label, Polyline } = spritejs
export default {
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
    isRescueMode: {
      type: Boolean,
      default: false
    },
    operationId: {
      type: String,
      required: false,
      default: ''
    },
    operationPhase: {
      type: [String, Number],
      default: '1'
    },
    pageIndex: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data () {
    return {
      dialogVisible: false,
      timer: null,
      widgetStyle: {},
      title: '',
      layer: null,
      layout: {},
      lines: {},
      legends: null,
      eventTags: null,
      bloodGas: null,
      socket: null
    }
  },
  components: {
    MySignsForm
  },
  computed: {
    modeCode () {
      switch (+this.operationPhase) {
        case 4:
          return 'N034'
        default:
          return 'N033'
      }
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        if (this.editMode) {
          this.setStyle()
          this.resize()
        }
      }
    }
  },
  created () {
    this.setStyle()
    this.resize = debounce(this.domResizeListener, 20)
  },
  async mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    if (this.editMode) {
      addListener(this.$refs.physicalSign, this.resize)
    } else {
      // 初始化图例区域
      this.setLegends()
      // 初始化事件标记区域
      this.setEventTags()
      // 初始化血气分析区域
      this.setBloodGas()
      // 获取数据
      this.getData()
      // 添加grid展示详情效果
      this.addGirdTooltip()
      // 添加eventTag区域右击菜单
      this.addEventTagCtxMenu()
      // 获取拖动过的数据
      this.layer.addEventListener('mousedown', this.setSelectedPoint)
      document.addEventListener('mouseup', this.getChangedPoint)
      // 注册刷新事件
      this.$eventHub.$on('document-refresh', this.documentRefreshHandler)
      // 注册刷新事件
      this.$eventHub.$on('document-redraw', this.documentRedrawHandler)
      // 血气分析
      const grid = this.layer.querySelector('.grid')
      grid.addEventListener('dblclick', this.dblclickTimeHandler)
    }
  },
  beforeDestroy () {
    if (this.editMode) {
      removeListener(this.$refs.physicalSign, this.resize)
    } else {
      const els = this.layer.querySelectorAll('*')
      els.forEach(el => {
        el.removeAllListeners()
      })
      this.layer.removeEventListener('mousedown', this.setSelectedPoint)
      document.removeEventListener('mouseup', this.getChangedPoint)
      if (this.socket) {
        this.socket = null
      }
      // 取消注册刷新事件
      this.$eventHub.$off('document-refresh', this.documentRefreshHandler)
      // 取消注册刷新事件
      this.$eventHub.$off('document-redraw', this.documentRedrawHandler)
      // 血气分析
      const grid = this.layer.querySelector('.grid')
      grid.removeEventListener('dblclick', this.dblclickTimeHandler)
    }
    this.scene = null
  },
  methods: {
    closeDio () {
      this.dialogVisible = false
    },
    documentRefreshHandler () {
      console.log('document-refresh')
      // 获取数据
      this.getData()
    },
    documentRedrawHandler () {
      console.log('document-redraw')
      // 重新绘制
      this.setLayout()
      this.setContent()
      // 初始化事件标记区域
      this.setEventTags()
      // 初始化血气分析区域
      this.setBloodGas()
      // 获取数据
      this.getData()
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
        container: this.$refs.physicalSign,
        width: this.$refs.width,
        height: this.$refs.height,
        mode: 'static',
        contextType: '2d'
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
      const yAxis = new Group({
        className: 'yAxis content'
      })
      const eventTitle = new Group({
        className: 'eventTitle content'
      })
      leftMain.append(timeTitle, yAxis, eventTitle)

      const xAxis = new Group({
        className: 'xAxis content'
      })
      const grid = new Group({
        className: 'grid content'
      })
      const eventTag = new Group({
        className: 'eventTag content'
      })
      middlePart.append(xAxis, grid, eventTag)

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
        size: [this.configuration.leftTitle.width || 0, leftPart.attr('height')]
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
      })
      const timeTitleBorderRightLine = new Polyline({
        pos: [timeTitle.attr('width') - 0.5, 0],
        points: [0, timeTitle.attr('height') - 1, 0, timeTitle.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      timeTitle.append(timeTitleBorderRightLine)

      // leftPart/leftMain/yAxis
      const yAxis = leftMain.getElementsByClassName('yAxis')[0]
      yAxis.attr({
        size: [
          leftMain.attr('width'),
          leftMain.attr('height') -
            this.configuration.timeTitle.height -
            this.configuration.eventTitle.height
        ],
        pos: [0, this.configuration.timeTitle.height]
      })
      const yAxisBorderRightLine = new Polyline({
        pos: [yAxis.attr('width') - 0.5, 0],
        points: [0, 0, 0, yAxis.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      const yAxisBorderBottomLine = new Polyline({
        pos: [0, yAxis.attr('height') - 0.5],
        points: [0, 0, yAxis.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      yAxis.append(yAxisBorderRightLine, yAxisBorderBottomLine)

      // leftPart/leftMain/eventTitle
      const eventTitle = leftMain.getElementsByClassName('eventTitle')[0]
      eventTitle.attr({
        size: [leftMain.attr('width'), this.configuration.eventTitle.height],
        pos: [0, leftMain.attr('height') - this.configuration.eventTitle.height]
      })
      const eventTitleBorderRightLine = new Polyline({
        pos: [eventTitle.attr('width') - 0.5, 0],
        points: [0, 0, 0, eventTitle.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      eventTitle.append(eventTitleBorderRightLine)

      // middlePart
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
          middlePart.attr('height') -
            this.configuration.timeTitle.height -
            this.configuration.eventTitle.height
        ],
        pos: [0, xAxis.attr('height')]
      })
      const gridBorderRightLine = new Polyline({
        pos: [grid.attr('width') - 0.5, 0],
        points: [0, 0, 0, grid.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      const gridBorderBottomLine = new Polyline({
        pos: [0, grid.attr('height') - 0.5],
        points: [0, 0, grid.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      grid.append(gridBorderRightLine, gridBorderBottomLine)
      // middlePart/eventTag
      const eventTag = middlePart.getElementsByClassName('eventTag')[0]
      eventTag.attr({
        size: [middlePart.attr('width'), this.configuration.eventTitle.height],
        pos: [
          0,
          middlePart.attr('height') - this.configuration.eventTitle.height
        ]
      })
      const eventTagBorderRightLine = new Polyline({
        pos: [eventTag.attr('width') - 0.5, 0],
        points: [0, 0, 0, eventTag.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      eventTag.append(eventTagBorderRightLine)

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
      this.setYAxis()
      this.setEventTitle()
      this.setXAxisList()
      this.setXAxis()
      this.setGrid()
      this.setTotalTitle()
    },
    setLeftTitle () {
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
      const timeTitle = this.layer.querySelector('.timeTitle')
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
    setYAxis () {
      const yAxis = this.layer.querySelector('.yAxis')
      if (!yAxis) return
      const width = Math.round(
        yAxis.attr('width') / this.configuration.yAxis.list.length
      )
      this.configuration.yAxis.list.forEach(item => {
        const { index, values } = item
        const textGroup = new Group()
        textGroup.attr({
          width: width,
          height: yAxis.attr('height'),
          anchor: [0, 1],
          pos: [width * index, yAxis.attr('height')]
        })
        yAxis.append(textGroup)
        const arrange = values[values.length - 1].value - values[0].value
        const scale = yAxis.attr('height') / arrange
        values.forEach((t, i) => {
          const label = new Label(t.label.toString())
          let posY = -(t.value - values[0].value) * scale
          posY = Math.round(posY)
          posY = Math.min(-7, posY)
          posY = Math.max(-yAxis.attr('height') + 7, posY)
          posY = posY + 9
          label.attr({
            fontSize: 12,
            fontFamily: '宋体',
            textAlign: 'right',
            fillColor: 'black',
            width: width,
            height: 18,
            padding: [0, 5, 0, 0],
            anchor: [1, 1],
            pos: [width, posY]
          })
          textGroup.append(label)
        })
      })
    },
    setEventTitle () {
      const eventTitle = this.layer.querySelector('.eventTitle')
      if (!eventTitle) return
      const text = new Label(this.configuration.eventTitle.text)
      text.attr({
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: Math.round(eventTitle.attr('width')),
        height: this.configuration.eventTitle.height,
        lineHeight: this.configuration.eventTitle.lineHeight
      })
      eventTitle.append(text)
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
    setXAxisList () {
      const startMoment = +moment(this.configuration.xAxis.startTime)
      const endMoment = +moment(this.configuration.xAxis.endTime)
      const list = []
      for (let i = startMoment; i < endMoment;) {
        list.push({
          // value: i - startMoment,
          label: moment(i).format('HH:mm')
        })
        i += this.configuration.xAxis.timeInterval * 60 * 1000
      }
      this.xAxisList = list
    },
    setXAxis () {
      const xAxis = this.layer.querySelector('.xAxis')
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
            strokeColor: 'gray',
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
            strokeColor: 'gray',
            lineWidth: 1,
            lineDash: [1, 2, 3]
          })
          grid.append(line)
        }
      })
      const yAxislistMax =
        this.configuration.yAxis.list.reduce((max, item) => {
          return Math.max(max, item.values.length)
        }, 0) - 1
      const yScale = height / yAxislistMax
      for (let index = 0; index < yAxislistMax; index++) {
        if (index) {
          const mainLine = new Polyline({
            pos: [0, Math.round(index * yScale) - 0.5],
            points: [0, 0, width, 0],
            strokeColor: 'gray',
            lineWidth: 1
          })
          grid.append(mainLine)
        }
        for (let i = 1; i < this.configuration.yAxis.lineInterval; i++) {
          const line = new Polyline({
            pos: [
              0,
              Math.round(
                index * yScale +
                  i * (yScale / this.configuration.yAxis.lineInterval)
              ) - 0.5
            ],
            points: [0, 0, width, 0],
            strokeColor: 'gray',
            lineWidth: 1,
            lineDash: [1, 2, 3]
          })
          grid.append(line)
        }
      }
    },
    async getData () {
      // 清空折线、清空图例、清空事件
      this.clearLines()
      this.clearLegends()
      this.clearEventTags()
      // 请求折线数据
      const signData = await this.getPastSignData()
      if (signData === false) return
      // 绘制折线
      this.drawLines()
      // 绘制折线图例
      this.drawLineLegends()
      // 请求事件数据
      await this.getPastEventData()
      // 绘制事件标记
      this.drawEventTags()
      // 绘制事件图例
      this.drawEventLegends()
      // socket.io
      this.getDataBySocketIO()
      // 获取血气分析
      this.getBloodGasAnalysisRecordTime()

      this.$emit('finish')
    },
    getPastSignData () {
      if (this.startTime && this.endTime) {
        return request({
          method: 'POST',
          url: getSignData,
          data: {
            startTime: this.startTime,
            endTime: this.endTime,
            dataMode: this.isRescueMode ? 1 : 5, // 5-正常模式 1-抢救模式
            operationId: this.operationId,
            modeCode: this.modeCode
          }
        })
          .then(res => {
            const requestData = res.data.data
            this.lineList = requestData
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        return Promise.resolve(false)
      }
    },
    drawLines () {
      const gridGroup = this.layer.getElementsByClassName('grid')[0]
      if (Array.isArray(this.lineList)) {
        console.log(this.lineList)
        this.lineList.forEach(item => {
          const { min, max } = this.getYAxisValueRange(item.yindex)
          if (min === max) {
            return
          }
          const {
            itemCode: signId,
            itemName: name,
            drawIcon: label,
            disColor: color
          } = item
          if (name === 'SPO2' || name === 'SBP' || name === 'MBP') {
            item.list.forEach((value, index) => {
              this.lines[signId + index] = new PhysicalSignLine({
                signId: signId + index,
                name,
                label: value.itemValue,
                color: '#' + color,
                group: gridGroup,
                layer: this.layer,
                startTime: this.configuration.xAxis.startTime,
                endTime: this.configuration.xAxis.endTime,
                min,
                max
              })
              this.lines[signId + index].setValuePoint({
                time: value.timePoint,
                value: value.itemValue,
                pointY: name === 'SPO2' ? 2 : name === 'SBP' ? 13 : 24
              })
            })

            // item.list.forEach(value => {
            //   this.lines[signId].addPoint({
            //     time: value.timePoint,
            //     value: value.itemValue
            //   })
            // })
          } else {
            this.lines[signId] = new PhysicalSignLine({
              signId,
              name,
              label,
              color: '#' + color,
              group: gridGroup,
              layer: this.layer,
              startTime: this.configuration.xAxis.startTime,
              endTime: this.configuration.xAxis.endTime,
              min,
              max
            })
            item.list.forEach(value => {
              this.lines[signId].addPoint({
                time: value.timePoint,
                value: value.itemValue
              })
            })
          }
        })
      }
    },
    clearLines () {
      // 清空对象引用
      this.lines = {}
      // 清除group内的所有线
      const gridGroup = this.layer.getElementsByClassName('grid')[0]
      const lines = gridGroup.querySelectorAll('.signLine')
      lines.forEach(el => gridGroup.removeChild(el))
      const labels = gridGroup.querySelectorAll('.signLabel')
      labels.forEach(el => gridGroup.removeChild(el))
    },
    drawLineLegends () {
      if (Array.isArray(this.lineList)) {
        this.lineList.forEach(item => {
          this.legends.addLegend({
            label: item.drawIcon,
            name: item.itemName,
            color: '#' + item.disColor
          })
        })
      }
    },
    setLegends () {
      this.legends = new PhysicalSignLegends(
        this.layer.getElementsByClassName('legend')[0]
      )
    },
    clearLegends () {
      this.legends.clear()
    },
    // 获取某一个Y轴的最大最小值
    getYAxisValueRange (yIndex) {
      const yAxis = this.configuration.yAxis.list.find(
        item => +item.index === yIndex
      )
      if (!yAxis) {
        return {
          min: 0,
          max: 0
        }
      }
      return {
        min: yAxis.values[0].value,
        max: yAxis.values[yAxis.values.length - 1].value
      }
    },
    setSelectedPoint (e) {
      if (e.target instanceof Label && e.target.className === 'signLabel') {
        this.configuration.dirty = true
        this.selectedPoint = e.target
      }
    },
    getChangedPoint () {
      const label = this.selectedPoint
      if (label) {
        // const line = this.lines[label.attr('signId')]
        const pointData = {
          itemCode: label.attr('signId'),
          itemName: label.attr('signName'),
          // itemValue: line.getPoint(label),
          itemValue: label.attr('pointValue'),
          timePoint: label.attr('timePoint')
        }
        this.$emit('change-sign-data', pointData)
        this.selectedPoint = null
      }
    },
    setEventTags () {
      this.eventTags = new PhysicalSignEventTags({
        group: this.layer.getElementsByClassName('eventTag')[0],
        startTime: this.configuration.xAxis.startTime,
        endTime: this.configuration.xAxis.endTime
      })
    },
    clearEventTags () {
      this.eventTags.clear()
    },
    getPastEventData () {
      return this.getAcisIntraoEventInfo()
        .then(res => {
          this.eventList = res
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    // 事件标识
    drawEventTags () {
      if (Array.isArray(this.eventList)) {
        this.eventList.forEach(
          ({ detailCode, drawIcon, eventName, eventStartTime }) => {
            this.eventTags.addTag({
              order: detailCode,
              label: drawIcon,
              time: eventStartTime
            })
          }
        )
      }
    },
    // 事件图例
    drawEventLegends () {
      if (Array.isArray(this.eventList)) {
        this.eventList.forEach(
          ({ detailCode, drawIcon, eventName, eventStartTime }) => {
            if (drawIcon) {
              this.legends.addLegend({
                label: drawIcon,
                name: eventName
              })
            }
          }
        )
      }
    },
    async getDataBySocketIO () {
      // 如果没有传入的时间
      if (!this.startTime || !this.endTime) {
        console.log('没有传入时间')
        return
      }
      // 与当前时间对比，如果结束时间为当前时间之前，则不需要建立连接
      const now = new Date()
      if (+moment(this.endTime) < now) {
        console.log('结束时间为当前时间之前')
        return
      }
      const loginUserNum = this.operationId
      this.socket = Socket.getInstance()
      if (!this.socket) return
      // 体征曲线
      const that = this
      this.socket.on('push_sign_event', res => {
        that.socket.emit('push_sign_event', {
          loginUserNum,
          content: res
        })
        if (Array.isArray(res)) {
          // 回应socket.io
          console.log(that.lines)
          res.forEach(item => {
            const { itemCode: signId, ...value } = item
            if (that.lines[signId]) {
              that.lines[signId].addPoint({
                time: value.timePoint,
                value: value.itemValue
              })
            }
          })
        }
      })
    },
    // grid右击事件
    addGirdTooltip () {
      const grid = this.layer.querySelector('.grid')
      if (grid) {
        const mousemoveHandler = e => {
          if (
            e.target instanceof Label &&
            e.target.className !== 'blood-gas-label'
          ) {
            this.$tooltip({
              dangerouslyUseHTMLString: true,
              message: `
                名称：${e.target.attr('signName')}<br>
                时间：${e.target.attr('timePoint')}<br>
                值：${e.target.attr('pointValue')}
              `,
              positionX: e.originalEvent.pageX,
              positionY: e.originalEvent.pageY
            })
          } else {
            this.$tooltip.remove()
          }
        }
        const mouseleaveHandler = e => {
          this.$tooltip.remove()
        }
        const mouseRightClick = e => {
          if (e.originalEvent.button === 2) {
            this.dialogVisible = true
          }
        }
        grid.addEventListener('mousemove', mousemoveHandler)
        grid.addEventListener('mouseleave', mouseleaveHandler)
        grid.addEventListener('mouseup', mouseRightClick)
      }
    },
    addEventTagCtxMenu () {
      const eventTag = this.layer.querySelector('.eventTag')
      if (!eventTag) return
      const mouseupHandler = async e => {
        if (e.originalEvent.button === 2) {
          if (!this.eventDictList) {
            await this.getEventDictData()
          }
          const list = this.eventDictList.map(item => {
            return {
              label: item.detailName
            }
          })
          const that = this
          this.$ctxMenu({
            list,
            posX: e.originalEvent.pageX,
            posY: e.originalEvent.pageY,
            onSelectMenuItem (e) {
              e = that.eventDictList.find(item => e.label === item.detailName)
              if (e) {
                that.$emit('select-event-time-range', e)
              }
            }
          })
        }
      }
      eventTag.addEventListener('mouseup', mouseupHandler)
    },
    dblclickTimeHandler (e) {
      const { x, y } = e
      const grid = this.layer.querySelector('.grid')
      const [offsetX] = grid.getOffsetPosition(x, y)
      const startMoment = +moment(this.configuration.xAxis.startTime)
      const endMoment = +moment(this.configuration.xAxis.endTime)
      const width = grid.attr('width')
      const time = ((endMoment - startMoment) / width) * offsetX + startMoment
      this.$emit('dblclick-time', time)
    },
    getEventDictData () {
      return request({
        method: 'GET',
        url: getEventDictData
      }).then(res => {
        this.eventDictList = res.data.data
      })
    },
    getBloodGasAnalysisRecordTime () {
      return request({
        url: `${getBloodGasAnalysisRecordTime}/${this.operationId}`
      })
        .then(res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('查询血气分析记录失败'))
          }
        })
        .then(res => {
          this.bloodGas.addRecords(res)
        })
    },
    setBloodGas () {
      this.bloodGas = new PhysicalSignBloodGas({
        group: this.layer.querySelector('.grid'),
        startTime: this.configuration.xAxis.startTime,
        endTime: this.configuration.xAxis.endTime
      })
    },
    getAcisIntraoEventInfo () {
      // console.log(this.$route.params)
      let type = 1
      if (
        this.$route.params.flag === '0' ||
        (this.$route.params.buttonConfig &&
          this.$route.params.buttonConfig.includes('ANES'))
      ) {
        type = 1
      } else if (
        this.$route.params.flag === '1' ||
        (this.$route.params.buttonConfig &&
          this.$route.params.buttonConfig.includes('ANAB'))
      ) {
        type = 2
      }
      return request({
        url: getAcisIntraoEventInfo,
        data: {
          type: type,
          operationId: this.operationId,
          line: 40,
          length: 22,
          page: this.pageIndex + 1,
          startTime: this.startTime,
          endTime: this.endTime
        },
        method: 'post'
      }).then(res => {
        if (res.data.success) {
          return res.data.data.iconList
        }
        // return Promise.reject(new Error('获取术中事件信息失败'))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetPhysicalSign {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
