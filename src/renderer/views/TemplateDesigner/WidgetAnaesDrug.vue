<template>
  <div
    ref="anaesDrug"
    class="anaesDrug"
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
      leftPartWidthRate: 0.18,
      rightPartWidthRate: 0.1,
      leftTitle: {
        text: '麻醉用药',
        width: 40,
        lineHeight: 30
      },
      timeTitle: {
        text: '时间',
        height: 30, // 是否显示顶部时间条，将高度置为0即可
        lineHeight: 30
      },
      totalTitle: {
        text: '总量'
      },
      yAxis: {
        list: [
          {
            index: 0,
            values: [
              {
                value: 0,
                label: '℃'
              },
              {
                value: 10,
                label: 10
              },
              {
                value: 20,
                label: '到顶啦'
              }
            ]
          },
          {
            index: 1,
            values: [
              {
                value: 30,
                label: '30'
              },
              {
                value: 40,
                label: 40
              },
              {
                value: 50,
                label: '顶部'
              }
            ]
          }
        ],
        lineInterval: 2
      },
      xAxis: {
        startTime: '2018-02-01 08:00',
        endTime: '2018-02-01 12:00',
        timeInterval: 15 * 60 * 1000,
        lineInterval: 3
      },
      drugNumber: 10,
      drugList: [{ name: '利多卡因', code: '1' }, { name: '安眠药', code: '2' }, { name: '降压药', code: '3' }] // 药品列表
    }
  },
  created () {
    this.setXAxisList()
  },
  mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    addListener(this.$refs.anaesDrug, debounce(this.domResizeListener, 20))
  },
  beforeDestroy () {
    this.layer = null
    removeListener(this.$refs.anaesDrug, this.domResizeListener)
  },
  methods: {
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
          Math.round(this.layer.width * this.leftPartWidthRate),
          this.layer.height
        ]
      })
      // leftPart/leftTitle
      const leftTitle = leftPart.getElementsByClassName('leftTitle')[0]
      leftTitle.attr({
        size: [this.leftTitle.width || 0, leftPart.attr('height')],
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
        size: [leftMain.attr('width'), this.timeTitle.height]
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
      const drugListBorderRightLine = new Polyline({
        points: [drugList.attr('width') - 0.5, 0, drugList.attr('width') - 0.5, drugList.attr('height') - 0.5],
        strokeColor: 'black',
        lineWidth: 1
      })
      drugList.append(drugListBorderRightLine)
      const middlePart = this.layer.getElementsByClassName('middlePart')[0]
      middlePart.attr({
        size: [
          Math.round(
            this.layer.width *
              (1 - this.leftPartWidthRate - this.rightPartWidthRate)
          ),
          this.layer.height
        ],
        pos: [leftPart.attr('width'), 0]
      })

      // middlePart/xAxis
      const xAxis = middlePart.getElementsByClassName('xAxis')[0]
      xAxis.attr({
        size: [middlePart.attr('width'), this.timeTitle.height]
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
            this.timeTitle.height
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
          Math.round(this.layer.width * this.rightPartWidthRate),
          this.layer.height
        ],
        pos: [leftPart.attr('width') + middlePart.attr('width'), 0]
      })

      // rightPart/totalTitle
      const totalTitle = rightPart.getElementsByClassName('totalTitle')[0]
      totalTitle.attr({
        size: [rightPart.attr('width'), this.timeTitle.height]
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
          rightPart.attr('height') - this.timeTitle.height
        ],
        pos: [0, this.timeTitle.height]
      })
    },
    setContent () {
      this.setLeftTitle()
      this.setTimeTitle()
      this.setDrugContent()
      this.setXAxis()
      this.setGrid()
      this.setTotalTitle()
    },
    setDrugContent () {
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      const drugList = leftPart.getElementsByClassName('drugList')[0]
      const width = Math.round(drugList.attr('width'))
      const lineHeight = Math.round(drugList.attr('height')) / this.drugNumber
      for (let i = 0; i < this.drugNumber - 1; i++) {
        const line = new Polyline({
          pos: [0, Math.round(lineHeight * (i + 1)) - 0.5],
          points: [0, 0, width, 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        drugList.append(line)
      }
      for (let i = 0; i < this.drugNumber; i++) {
        if (this.drugList[i]) {
          const text = new Label(this.drugList[i].name)
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
          drugList.append(text)
        }
      }
    },
    setLeftTitle () {
      const leftTitle = this.layer.getElementsByClassName('leftTitle')[0]
      const width = leftTitle.attr('width')
      const height = leftTitle.attr('height')
      const textArr = this.leftTitle.text.split('')
      // const textArr = this.leftTitle.text
      const lineHeight = this.leftTitle.lineHeight
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
      const text = new Label(this.timeTitle.text)
      text.attr({
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: Math.round(timeTitle.attr('width')),
        height: this.timeTitle.height,
        lineHeight: this.timeTitle.lineHeight
      })
      timeTitle.append(text)
    },
    setTotalTitle () {
      const totalTitle = this.layer.getElementsByClassName('totalTitle')[0]
      const text = new Label(this.totalTitle.text)
      text.attr({
        fontSize: 12,
        fontFamily: '宋体',
        textAlign: 'center',
        fillColor: 'black',
        width: Math.round(totalTitle.attr('width')),
        height: this.timeTitle.height,
        lineHeight: this.timeTitle.lineHeight
      })
      totalTitle.append(text)
    },
    setXAxisList () {
      const startMoment = +moment(this.xAxis.startTime)
      const endMoment = +moment(this.xAxis.endTime)
      const list = []
      for (let i = startMoment; i < endMoment;) {
        list.push({
          // value: i - startMoment,
          label: moment(i).format('HH:mm')
        })
        i += this.xAxis.timeInterval
      }
      this.xAxis.list = list
    },
    setXAxis () {
      const xAxis = this.layer.getElementsByClassName('xAxis')[0]
      const width = xAxis.attr('width')
      const height = xAxis.attr('height')
      const list = this.xAxis.list
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
      const xAxislist = this.xAxis.list
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
        for (let i = 1; i < this.xAxis.lineInterval; i++) {
          const line = new Polyline({
            pos: [
              Math.round(
                index * xScale + i * (xScale / this.xAxis.lineInterval)
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
      const yScale = height / this.drugNumber
      for (let index = 0; index < this.drugNumber; index++) {
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
.anaesDrug {
  height: 100%;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  margin: 0 auto;
  background:#fff;
}
</style>
