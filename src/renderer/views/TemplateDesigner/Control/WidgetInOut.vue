<template>
  <div
    ref="inOut"
    class="inOut"
  />
</template>

<script>
import * as spritejs from 'spritejs'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
import moment from 'moment'
const { Scene, Group, Label, Polyline } = spritejs
export default {
  data () {
    return {
      layer: null,
      layout: {},
      drugList: [] // 药品列表
    }
  },
  props: {
    configuration: {
      type: Object,
      default: () => {
        return {
          leftPartWidthRate: 0.18,
          rightPartWidthRate: 0.1,
          leftTitle: {
            text: '输液输血',
            width: 40,
            lineHeight: 30
          },
          timeTitle: {
            text: '时间',
            height: 0, // 是否显示顶部时间条，将高度置为0即可
            lineHeight: 30
          },
          totalTitle: {
            text: '总量'
          },
          xAxis: {
            startTime: '2018-02-01 08:00',
            endTime: '2018-02-01 12:00',
            timeInterval: 15 * 60 * 1000,
            lineInterval: 3
          },
          drugNumber: 10,
          drugList: [], // 药品列表
          infusion: { text: '输液', num: 3 },
          bloodTransfusion: {
            text: '输血', num: 2
          },
          outPut: { text: '用量', num: 0 }
        }
      }
    }
  },
  created () {
    this.resize = debounce(this.domResizeListener, 20)
  },
  mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    addListener(this.$refs.inOut, this.resize)
  },
  beforeDestroy () {
    this.layer = null
    removeListener(this.$refs.inOut, this.resize)
  },
  methods: {
    domResizeListener () {
      this.scene.resize()
      this.setLayout()
      this.setContent()
    },
    renderScene () {
      this.scene = new Scene({
        container: this.$refs.inOut,
        width: this.$refs.width,
        height: this.$refs.height,
        mode: 'static'
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
        points: [0, timeTitle.attr('height') - 0.5, timeTitle.attr('width') - 0.5, timeTitle.attr('height') - 0.5],
        strokeColor: 'black',
        lineWidth: 1
      })
      timeTitle.append(timeTitleBorderBottomLine)

      // leftPart/leftMain/drugList
      const drugList = leftMain.getElementsByClassName('drugList')[0]
      drugList.attr({
        size: [leftMain.attr('width'), leftMain.attr('height') - timeTitle.attr('height')],
        pos: [0, timeTitle.attr('height')]
      })
      const drugListBorderLeftLine = new Polyline({
        pos: [29.5, 0],
        points: [0, 0, 0, drugList.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      const drugListBorderRightLine = new Polyline({
        points: [drugList.attr('width') - 0.5, 0, drugList.attr('width') - 0.5, drugList.attr('height') - 0.5],
        strokeColor: 'black',
        lineWidth: 1
      })
      // const infusion = drugList.getElementsByClassName('infusion')[0]
      // const bloodTransfusion = drugList.getElementsByClassName('bloodTransfusion')[0]
      // const outPut = drugList.getElementsByClassName('outPut')[0]
      const infusion = new Group({ className: 'infusion content' })
      const bloodTransfusion = new Group({ className: 'bloodTransfusion content' })
      const outPut = new Group({ className: 'outPut content' })
      drugList.append(infusion, bloodTransfusion, outPut)
      console.log(infusion, bloodTransfusion, outPut)
      const step = Math.round(drugList.attr('height') / (this.configuration.infusion.num + this.configuration.bloodTransfusion.num + this.configuration.outPut.num))
      infusion.attr({
        size: [leftMain.attr('width'), step * this.configuration.infusion.num]
        // bgcolor: 'red'
      })
      const text1 = new Label(this.configuration.infusion.text)
      text1.attr({
        pos: [0, step * this.configuration.infusion.num / 2],
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
        size: [leftMain.attr('width'), step * this.configuration.bloodTransfusion.num],
        // bgcolor: 'green',
        pos: [0, step * this.configuration.infusion.num]
      })
      const text2 = new Label(this.configuration.bloodTransfusion.text)
      text2.attr({
        pos: [0, step * this.configuration.bloodTransfusion.num / 2],
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
        pos: [0, (this.configuration.bloodTransfusion.num + this.configuration.infusion.num) * step]
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
        pos: [0, step * this.configuration.outPut.num / 2],
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
              (1 - this.configuration.leftPartWidthRate - this.configuration.rightPartWidthRate)
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
            this.configuration.timeTitle.height
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
      this.setDrugContent()
      this.setXAxisList()
      this.setXAxis()
      this.setGrid()
      this.setTotalTitle()
    },
    setDrugContent () {
      // const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      // const drugList = leftPart.getElementsByClassName('drugList')[0]
      // const width = Math.round(drugList.attr('width'))
      // const lineHeight = Math.round(drugList.attr('height')) / this.drugNumber
      // for (let i = 0; i < this.drugNumber - 1; i++) {
      //   const line = new Polyline({
      //     pos: [0, Math.round(lineHeight * (i + 1)) - 0.5],
      //     points: [0, 0, width, 0],
      //     strokeColor: 'black',
      //     lineWidth: 1
      //   })
      //   drugList.append(line)
      // }
      // for (let i = 0; i < this.drugNumber; i++) {
      //   if (this.drugList[i]) {
      //     const text = new Label(this.drugList[i].name)
      //     text.attr({
      //       pos: [0, lineHeight * i],
      //       anchor: [0, 0],
      //       fontSize: 12,
      //       fontFamily: '宋体',
      //       textAlign: 'center',
      //       fillColor: 'blue',
      //       width: width,
      //       height: lineHeight,
      //       lineHeight: lineHeight
      //     })
      //     drugList.append(text)
      //   }
      // }
    },
    setLeftTitle () {
      const leftTitle = this.layer.getElementsByClassName('leftTitle')[0]
      const width = leftTitle.attr('width')
      const height = leftTitle.attr('height')
      const textArr = this.configuration.leftTitle.text.split('')
      // const textArr = this.leftTitle.text
      const lineHeight = this.configuration.leftTitle.lineHeight
      const titleTextGroup = new Group()
      titleTextGroup.attr({
        size: [40 - 1, textArr.length * lineHeight],
        pos: [40 / 2, height / 2],
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
        i += this.configuration.xAxis.timeInterval
      }
      this.configuration.xAxis.list = list
    },
    setXAxis () {
      const xAxis = this.layer.getElementsByClassName('xAxis')[0]
      const width = xAxis.attr('width')
      const height = xAxis.attr('height')
      const list = this.configuration.xAxis.list
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
      const xAxislist = this.configuration.xAxis.list
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
                index * xScale + i * (xScale / this.configuration.xAxis.lineInterval)
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
      // const yAxislistMax =
      // this.yAxis.list.reduce((max, item) => {
      //   return Math.max(max, item.values.length)
      // }, 0) - 1
      // const yScale = height / yAxislistMax
      const lineNumber = this.configuration.infusion.num + this.configuration.bloodTransfusion.num + this.configuration.outPut.num
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
        // for (let i = 1; i < this.yAxis.lineInterval; i++) {
        //   const line = new Polyline({
        //     pos: [
        //       0,
        //       Math.round(
        //         index * yScale + i * (yScale / this.yAxis.lineInterval)
        //       ) - 0.5
        //     ],
        //     points: [0, 0, width, 0],
        //     strokeColor: 'gray',
        //     lineWidth: 1,
        //     lineDash: [1, 2, 3]
        //   })
        //   grid.append(line)
        // }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.inOut {
  height: 100%;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  margin: 0 auto;
  background:#fff;
}
</style>
