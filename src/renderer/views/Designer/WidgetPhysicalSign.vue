<template>
  <div
    ref="physicalSign"
    class="widgetPhysicalSign"
    :style="widgetStyle"
  />
</template>

<script>
import * as spritejs from 'spritejs'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import moment from 'moment'
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
    }
  },
  data () {
    return {
      widgetStyle: {},
      layer: null,
      layout: {}
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
        this.resize()
      }
    }
  },
  created () {
    this.setStyle()
    this.resize = debounce(this.domResizeListener, 20)
  },
  mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    addListener(this.$refs.physicalSign, this.resize)
  },
  beforeDestroy () {
    this.scene = null
    removeListener(this.$refs.physicalSign, this.resize)
  },
  methods: {
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
      const leftTitle = this.layer.getElementsByClassName('leftTitle')[0]
      const width = leftTitle.attr('width')
      const height = leftTitle.attr('height')
      const textArr = this.configuration.leftTitle.text.split('')
      const lineHeight = this.configuration.leftTitle.lineHeight
      const titleTextGroup = new Group()
      titleTextGroup.attr({
        size: [width - 1, textArr.length * lineHeight],
        pos: [width / 2, height / 2],
        anchor: [0.5, 0.5]
      })
      textArr.forEach((item, i, arr) => {
        const title = new Label(item)
        title.attr({
          pos: [0, lineHeight * i - (lineHeight * arr.length) / 2],
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
    setYAxis () {
      const yAxis = this.layer.getElementsByClassName('yAxis')[0]
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
          label.attr({
            fontSize: 12,
            fontFamily: '宋体',
            textAlign: 'right',
            fillColor: 'black',
            width: width,
            padding: [0, 5, 0, 0],
            anchor: [1, 0.5],
            pos: [width, -(t.value - values[0].value) * scale]
          })
          textGroup.append(label)
        })
      })
    },
    setEventTitle () {
      const eventTitle = this.layer.getElementsByClassName('eventTitle')[0]
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
