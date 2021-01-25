<template>
  <div
    ref="inOut"
    class="inOut"
    :style="widgetStyle"
    @click="handleClearRightClick"
  >
    <drug-list
      v-if="drugListVisible"
      :position="position"
      :menu-list="list"
      @handleClick="handleAddDrug"
    />
    <drug-detail
      v-if="drugDetailVisible"
      :drug-name="drugName"
      :start-time="drugStartTime"
      :drug-detail-visible="drugDetailVisible"
      @handleClose="handleCloseDrugDetail"
      @handleSubmit="handleSubmit"
    />
    <canvas
      id="canvas"
      width="0"
      height="0"
    />
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
  getInfusionBloodList,
  getBloodInfusionData,
  addDrug
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
const { Scene, Group, Label, Polyline } = spritejs
export default {
  name: 'WidgetInOut',
  data () {
    return {
      layer: null,
      drugDetailVisible: false,
      drugListVisible: false,
      layout: {},
      // drugList: [], // 药品列表
      widgetStyle: {},
      list: [],
      groupNo: null,
      infusionList: [],
      bloodTransfusionList: [],
      outPutList: [{ menuName: '尿量', value: '1' }],
      drugStartTime: null,
      position: { positionX: 0, positionY: 0 },
      currentState: null,
      outPutDataList: [],
      infusionDataList: [],
      bloodTransfusionDataList: [],
      currentDrug: {},
      drugName: ''
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
  components: {
    DrugList,
    DrugDetail
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
    this.setTotalLine()
    this.setInfusionLine()
    this.setTransfusionLine()
    if (!this.editMode) {
      await this.getDrawLineList()
      await this.getInfusionBloodList()
      // 注册刷新事件
      this.$eventHub.$on('document-refresh', () => {
        // 获取数据
        this.getDrawLineList()
        this.getInfusionBloodList()
      })
      // 注册刷新事件
      this.$eventHub.$on('document-redraw', () => {
        // 重新绘制
        this.setLayout()
        this.setContent()
        // 获取数据
        this.getDrawLineList()
        this.getInfusionBloodList()
      })
    } else {
      addListener(this.$refs.inOut, this.resize)
    }
    // this.setDrug()
  },
  beforeDestroy () {
    this.layer = null
    removeListener(this.$refs.inOut, this.resize)
  },
  methods: {
    // 获取输血输液列表数据
    getInfusionBloodList () {
      request({
        method: 'GET',
        url: getInfusionBloodList
      }).then((res) => {
        const data = res.data.data
        const infusionList = []
        const bloodTransfusionList = []
        data.forEach((value, index) => {
          value.menuName = value.detailName
          value.value = value.detailCode
          if (value.eventCode === 'E004') {
            bloodTransfusionList.push(value)
          } else {
            infusionList.push(value)
          }
        })
        this.bloodTransfusionList = bloodTransfusionList
        this.infusionList = infusionList
      })
    },
    async getDrawLineList () {
      if (this.startTime && this.endTime) {
        request({
          method: 'post',
          url: getBloodInfusionData,
          data: {
            startTime: this.startTime,
            endTime: this.endTime,
            operationId: this.operationId
          }
        }).then((res) => {
          const data = res.data.data
          const infusionDataList = []
          const bloodTransfusionDataList = []
          data.forEach((item, index) => {
            item.total = item.gross
            item.data.forEach((_item) => {
              _item.startTime = _item.eventStartTime
              _item.endTime = _item.eventEndTime
              _item.dose = _item.dosage
              if (_item.isHolding === '1') {
                _item.continue = true
              } else {
                _item.continue = false
              }
            })
            if (item.eventId === 'E004') {
              bloodTransfusionDataList.push(item)
            } else {
              infusionDataList.push(item)
            }
          })
          this.infusionDataList = infusionDataList
          this.bloodTransfusionDataList = bloodTransfusionDataList
          this.setDrug()
          this.setInfusionLine()
          this.setTransfusionLine()
          // this.setDrugLine()
          this.setDrugTotal()
          // 通知渲染完成----通知打印
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
        container: this.$refs.inOut,
        width: this.$refs.width,
        height: this.$refs.height
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
      this.layer.getElementsByClassName('content').forEach((ref) => {
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
        ]
        // padding: [0, 10, 0, 10]
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
      const drugListBorderLeftLine = new Polyline({
        pos: [29.5, 0],
        points: [0, 0, 0, drugList.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
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
      // const infusion = drugList.getElementsByClassName('infusion')[0]
      // const bloodTransfusion = drugList.getElementsByClassName('bloodTransfusion')[0]
      // const outPut = drugList.getElementsByClassName('outPut')[0]
      const infusion = new Group({ className: 'infusion content' })
      const bloodTransfusion = new Group({
        className: 'bloodTransfusion content'
      })
      const outPut = new Group({ className: 'outPut content' })
      drugList.append(infusion, bloodTransfusion, outPut)
      const step = Math.round(
        drugList.attr('height') /
          (this.configuration.infusion.num +
            this.configuration.bloodTransfusion.num +
            this.configuration.outPut.num)
      )
      infusion.attr({
        size: [leftMain.attr('width'), step * this.configuration.infusion.num]
        // bgcolor: 'red'
      })
      const text1 = new Label(this.configuration.infusion.text)
      text1.attr({
        pos: [0, (step * this.configuration.infusion.num) / 2],
        anchor: [0, 0.5],
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: 30,
        height: infusion.attr('height'),
        lineHeight: infusion.attr('height')
      })
      for (let i = 0; i < this.configuration.infusion.num; i++) {
        const infusionLine = new Polyline({
          pos: [30, i * step - 0.5],
          points: [0, 0, leftMain.attr('width') - 30, 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        infusion.append(infusionLine)
      }
      infusion.append(text1)
      bloodTransfusion.attr({
        size: [
          leftMain.attr('width'),
          step * this.configuration.bloodTransfusion.num
        ],
        // bgcolor: 'green',
        pos: [0, step * this.configuration.infusion.num]
      })
      const text2 = new Label(this.configuration.bloodTransfusion.text)
      text2.attr({
        pos: [0, (step * this.configuration.bloodTransfusion.num) / 2],
        anchor: [0, 0.5],
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: 30,
        height: bloodTransfusion.attr('height'),
        lineHeight: bloodTransfusion.attr('height')
      })
      bloodTransfusion.append(text2)
      const bloodTransfusionTopLine = new Polyline({
        pos: [0, -0.5],
        points: [0, 0, drugList.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      for (let i = 1; i < this.configuration.bloodTransfusion.num; i++) {
        const centerLine = new Polyline({
          pos: [30, i * step - 0.5],
          points: [0, 0, leftMain.attr('width') - 30, 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        bloodTransfusion.append(centerLine)
      }
      bloodTransfusion.append(bloodTransfusionTopLine)
      outPut.attr({
        size: [leftMain.attr('width'), step * this.configuration.outPut.num],
        pos: [
          0,
          (this.configuration.bloodTransfusion.num +
            this.configuration.infusion.num) *
            step
        ]
      })
      for (let i = 1; i < this.configuration.bloodTransfusion.num; i++) {
        const outPutLine = new Polyline({
          pos: [30, i * step - 0.5],
          points: [0, 0, leftMain.attr('width') - 30, 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        outPut.append(outPutLine)
      }
      const text3 = new Label(this.configuration.outPut.text)
      text3.attr({
        pos: [0, (step * this.configuration.outPut.num) / 2],
        anchor: [0, 0.5],
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: 30,
        height: outPut.attr('height'),
        lineHeight: outPut.attr('height')
      })
      const outPutTopLine = new Polyline({
        pos: [0, -0.5],
        points: [0, 0, drugList.attr('width'), 0],
        strokeColor: 'black',
        lineWidth: 1
      })
      outPut.append(text3)
      if (this.configuration.outPut.num !== 0) {
        outPut.append(outPutTopLine)
      }
      drugList.append(drugListBorderLeftLine, drugListBorderRightLine)

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
      //   const gridBorderBottomLine = new Polyline({
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
      const timeTitle = this.layer.getElementsByClassName('timeTitle')[0]
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
      const totalTitle = this.layer.getElementsByClassName('totalTitle')[0]
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
      const lineNumber =
        this.configuration.infusion.num +
        this.configuration.bloodTransfusion.num +
        this.configuration.outPut.num
      const yScale = Math.round(height / lineNumber)
      for (let index = 0; index < lineNumber; index++) {
        if (index) {
          const mainLine = new Polyline({
            pos: [0, Math.round(index * yScale) - 0.5],
            points: [0, 0, width, 0],
            strokeColor: 'gray',
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
        i += this.configuration.xAxis.timeInterval * 60 * 1000
      }
      this.xAxisList = list
    },
    setXAxis () {
      const xAxis = this.layer.getElementsByClassName('xAxis')[0]
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
      const grid = this.layer.getElementsByClassName('grid')[0]
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
      const lineNumber =
        this.configuration.infusion.num +
        this.configuration.bloodTransfusion.num +
        this.configuration.outPut.num
      const yScale = Math.round(height / lineNumber)
      for (let index = 0; index < lineNumber; index++) {
        if (index) {
          const mainLine = new Polyline({
            pos: [0, Math.round(index * yScale) - 0.5],
            points: [0, 0, width, 0],
            strokeColor: 'gray',
            lineWidth: 1
          })
          grid.append(mainLine)
        }
      }
      for (let i = 0; i < this.configuration.infusion.num; i++) {
        const group = new Group({
          pos: [0, Math.round(i * yScale) - 0.5],
          size: [grid.attr('width'), yScale],
          className: 'infusion row',
          index: i
        })
        grid.append(group)
      }
      for (let i = 0; i < this.configuration.bloodTransfusion.num; i++) {
        const group = new Group({
          pos: [
            0,
            yScale * this.configuration.infusion.num + Math.round(i * yScale)
          ],
          size: [grid.attr('width'), yScale],
          className: 'bloodTransfusion row',
          index: i + this.configuration.infusion.num
        })
        grid.append(group)
      }
      for (let i = 0; i < this.configuration.outPut.num; i++) {
        const group = new Group({
          pos: [
            0,
            yScale *
              (this.configuration.infusion.num +
                this.configuration.bloodTransfusion.num) +
              Math.round(i * yScale)
          ],
          size: [grid.attr('width'), yScale],
          className: 'outPut row',
          index:
            this.configuration.infusion.num +
            this.configuration.bloodTransfusion.num +
            i
        })
        grid.append(group)
      }
      this.handleGridRightClick()
    },
    // 网格区右击
    handleGridRightClick () {
      if (!this.editMode) {
        if (this.startTime && this.endTime) {
          const grid = this.layer.getElementsByClassName('grid')[0]
          const leftPart = this.layer.getElementsByClassName('leftPart')[0]
          const width = grid.attr('width')
          grid.addEventListener('mousedown', (evt) => {
            if (evt.originalEvent.button === 2) {
              if (evt.target.attr('className').indexOf('row') !== -1) {
                this.groupNo = evt.target.attr('index')

                this.drugStartTime =
                  moment(this.startTime) +
                  ((evt.x - leftPart.attr('width')) *
                    (moment(this.endTime) - moment(this.startTime))) /
                    width
                if (evt.target.attr('className').indexOf('infusion') !== -1) {
                  this.list = this.infusionList
                  this.currentState = 'infusion'
                  if (this.infusionDataList[this.groupNo]) {
                    this.drugListVisible = false
                    this.currentDrug = this.infusionDataList[this.groupNo]
                    this.currentDrug.eventType = this.infusionDataList[
                      this.groupNo
                    ].eventId
                    this.drugName = this.infusionDataList[
                      this.groupNo
                    ].eventName
                    this.drugDetailVisible = true
                  } else {
                    this.drugListVisible = true
                  }
                } else if (
                  evt.target.attr('className').indexOf('bloodTransfusion') !==
                  -1
                ) {
                  this.list = this.bloodTransfusionList
                  this.currentState = 'bloodTransfusion'
                  if (this.bloodTransfusionDataList[this.groupNo]) {
                    this.drugListVisible = false
                    this.currentDrug = this.bloodTransfusionDataList[
                      this.groupNo
                    ]
                    this.currentDrug.eventType = this.bloodTransfusionDataList[
                      this.groupNo
                    ].eventId
                    this.drugName = this.bloodTransfusionDataList[
                      this.groupNo
                    ].eventName
                    this.drugDetailVisible = true
                  } else {
                    this.drugListVisible = true
                  }
                } else {
                  this.list = this.outPutList
                  this.currentState = 'output'
                }
                this.position.positionX = evt.x
                this.position.positionY = evt.y
              }
            }
          })
        }
      }
    },
    handleAddDrug (param) {
      if (!this.editMode) {
        let list = []
        switch (this.currentState) {
          case 'infusion':
            list = this.infusionDataList
            break
          case 'bloodTransfusion':
            list = this.bloodTransfusionDataList
            break
          case 'output':
            list = this.outPutDataList
        }
        if (list[this.groupNo]) {
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
    handleClearRightClick () {
      if (!this.editMode) {
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
    handleSubmit (param) {
      // let data = []
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
    },
    // 绘制输液线段
    setInfusionLine () {
      // 清空子元素
      if (!this.editMode) {
        this.layer.getElementsByClassName('infusion_col').forEach((ref) => {
          ref.removeAllChildren()
        })
        const grid = this.layer.getElementsByClassName('grid')[0]
        const height = grid.attr('height')
        const lineNumber =
          this.configuration.infusion.num +
          this.configuration.bloodTransfusion.num +
          this.configuration.outPut.num
        const yScale = Math.round(height / lineNumber)
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')
        const row = grid.getElementsByClassName('row')
        this.infusionDataList.forEach((value, index, array) => {
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
            let endTime = null
            if (item.endTime !== '') {
              endTime = Math.round(
                (moment(item.endTime) -
                  moment(this.configuration.xAxis.startTime)) *
                  interval
              )
            }
            if (item.continue) {
              group = new Group({
                className: 'infusion_col',
                colIndex: i,
                size: [endTime - startTime, yScale],
                pos: [startTime, 0]
              })
              dose.attr({
                pos: [group.attr('width') / 2 - text / 2, 0],
                lineHeight: yScale,
                height: yScale,
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
                strokeColor: 'blue'
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
                  strokeColor: 'blue'
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
                  lineWidth: 1
                })
                group.append(rightLine)
              }
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
                strokeColor: 'blue'
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
                strokeColor: 'blue'
              })
              group.append(leftLine, leftCenterLine, rightCenterLine, dose)
            } else {
              group = new Group({
                className: 'infusion_col',
                colIndex: i,
                size: [text, yScale],
                pos: [startTime, 0]
              })
              dose.attr({
                pos: [0, 0],
                lineHeight: yScale,
                height: yScale,
                fontSize: 12,
                fillColor: 'blue',
                fontFamily: '宋体',
                textAlign: 'center',
                strokeWidth: 1
              })
              group.append(dose)
            }
            // if(row[index]&&index<this.configuration.){
            row[index].append(group)
            // }
          })
        })
      }
    },
    // 绘制输血线段
    setTransfusionLine () {
      // 清空子元素
      if (!this.editMode) {
        this.layer.getElementsByClassName('blood_col').forEach((ref) => {
          ref.removeAllChildren()
        })
        const grid = this.layer.getElementsByClassName('grid')[0]
        const height = grid.attr('height')
        const lineNumber =
          this.configuration.infusion.num +
          this.configuration.bloodTransfusion.num +
          this.configuration.outPut.num
        const yScale = Math.round(height / lineNumber)
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')
        const row = grid.getElementsByClassName('row')
        this.bloodTransfusionDataList.forEach((value, index, array) => {
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
            let endTime = null
            if (item.endTime !== '') {
              endTime = Math.round(
                (moment(item.endTime) -
                  moment(this.configuration.xAxis.startTime)) *
                  interval
              )
            }
            if (item.continue) {
              group = new Group({
                className: 'blood_col',
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
                strokeColor: 'blue'
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
                  strokeColor: 'blue'
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
                  strokeColor: 'blue'
                })
                group.append(rightLine)
              }
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
                strokeColor: 'blue'
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
                strokeColor: 'blue'
              })
              group.append(leftLine, leftCenterLine, rightCenterLine, dose)
            } else {
              group = new Group({
                className: 'blood_col',
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
            const rowIndex = parseInt(this.configuration.infusion.num + index)
            if (row[rowIndex]) {
              row[rowIndex].append(group)
            }
          })
        })
      }
    },
    // 绘制出量线段
    setOutputLine () {
      // 清空子元素
      if (!this.editMode) {
        this.layer.getElementsByClassName('output_col').forEach((ref) => {
          ref.removeAllChildren()
        })
        const grid = this.layer.getElementsByClassName('grid')[0]
        const height = grid.attr('height')
        const lineNumber =
          this.configuration.infusion.num +
          this.configuration.bloodTransfusion.num +
          this.configuration.outPut.num
        const yScale = Math.round(height / lineNumber)
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')
        const row = grid.getElementsByClassName('row')
        this.bloodTransfusionDataList.forEach((value, index, array) => {
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
            let endTime = null
            if (item.endTime !== '') {
              endTime = Math.round(
                (moment(item.endTime) -
                  moment(this.configuration.xAxis.startTime)) *
                  interval
              )
            }
            if (item.continue) {
              group = new Group({
                className: 'output_col',
                colIndex: i,
                size: [endTime - startTime, Math.round(yScale / 2)],
                pos: [startTime, Math.round(yScale / 2 - yScale / 4)]
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
                points: [0, 0, 0, group.attr('height')],
                lineWidth: 1,
                strokeColor: 'blue'
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
                  strokeColor: 'blue'
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
                  strokeColor: 'blue'
                })
                group.append(rightLine)
              }
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
                strokeColor: 'blue'
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
                strokeColor: 'blue'
              })
              group.append(leftLine, leftCenterLine, rightCenterLine, dose)
            } else {
              group = new Group({
                className: 'output_col',
                colIndex: i,
                size: [text, Math.round(yScale / 2)],
                pos: [startTime, Math.round(yScale / 2 - yScale / 4)]
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
            row[this.configuration.infusion.num + index].append(group)
          })
        })
      }
    },
    // 绘制用药总量
    setDrugTotal () {
      if (!this.editMode) {
        // 清空子元素
        this.layer.getElementsByClassName('total').forEach((ref) => {
          ref.removeAllChildren()
        })
        const legend = this.layer.getElementsByClassName('legend')[0]
        // const infusion = drugList.getElementsByClassName('infusion')[0]
        // const bloodTransfusion = drugList.getElementsByClassName(
        //   'bloodTransfusion'
        // )[0]
        // const outPut = drugList.getElementsByClassName('outPut')[0]
        const width = Math.round(legend.attr('width'))
        const lineNumber =
          this.configuration.infusion.num +
          this.configuration.bloodTransfusion.num +
          this.configuration.outPut.num
        const lineHeight = Math.round(legend.attr('height') / lineNumber)
        for (let i = 0; i < this.infusionDataList.length; i++) {
          if (this.infusionDataList[i]) {
            const text = new Label(this.infusionDataList[i].gross)
            text.attr({
              pos: [0, lineHeight * i],
              anchor: [0, 0],
              fontSize: 12,
              fontFamily: '宋体',
              textAlign: 'center',
              fillColor: 'blue',
              width: width,
              height: lineHeight,
              lineHeight: lineHeight
            })
            legend.append(text)
          }
        }
        // 已修改
        for (let i = 0; i < this.bloodTransfusionDataList.length; i++) {
          if (this.bloodTransfusionDataList[i]) {
            const text = new Label(this.bloodTransfusionDataList[i].gross)
            text.attr({
              pos: [
                0,
                lineHeight * i + lineHeight * this.configuration.infusion.num
              ],
              anchor: [0, 0],
              fontSize: 12,
              fontFamily: '宋体',
              textAlign: 'center',
              fillColor: 'blue',
              width: width,
              height: lineHeight,
              lineHeight: lineHeight
            })
            legend.append(text)
          }
        }
      }
    },
    setDrug () {
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      const drugList = leftPart.getElementsByClassName('drugList')[0]

      const infusion = drugList.getElementsByClassName('infusion')[0]
      const bloodTransfusion = drugList.getElementsByClassName(
        'bloodTransfusion'
      )[0]
      // const outPut = drugList.getElementsByClassName('outPut')[0]
      if (!this.editMode) {
        const leftPart = this.layer.getElementsByClassName('leftPart')[0]
        const drugList = leftPart.getElementsByClassName('drugList')[0]
        const width = Math.round(drugList.attr('width'))
        const lineNumber =
          this.configuration.infusion.num +
          this.configuration.bloodTransfusion.num +
          this.configuration.outPut.num
        const lineHeight = Math.round(drugList.attr('height') / lineNumber)
        for (let i = 0; i < this.infusionDataList.length; i++) {
          if (this.infusionDataList[i]) {
            const text = new Label(this.infusionDataList[i].eventName)
            text.attr({
              pos: [30, lineHeight * i],
              anchor: [0, 0],
              fontSize: 12,
              fontFamily: '宋体',
              textAlign: 'center',
              fillColor: 'blue',
              width: width - 30,
              height: lineHeight,
              lineHeight: lineHeight
            })
            if (i < this.configuration.infusion.num) {
              infusion.append(text)
            }
          }
        }
        for (let i = 0; i < this.bloodTransfusionDataList.length; i++) {
          if (this.bloodTransfusionDataList[i]) {
            const text = new Label(this.bloodTransfusionDataList[i].eventName)
            text.attr({
              pos: [30, lineHeight * i],
              anchor: [0, 0],
              fontSize: 12,
              fontFamily: '宋体',
              textAlign: 'center',
              fillColor: 'blue',
              width: width - 30,
              height: lineHeight,
              lineHeight: lineHeight
            })
            if (i < this.configuration.bloodTransfusion.num) {
              bloodTransfusion.append(text)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.inOut {
  height: 100%;
  width: 100%;
  // border: 1px solid black;
  box-sizing: border-box;
  margin: 0 auto;
  overflow: unset !important;
  // background: #fff;
}
</style>
