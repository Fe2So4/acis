<template>
  <div
    ref="anaesTable"
    class="anaesTable"
  />
</template>

<script>
import * as spritejs from 'spritejs'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'
// import moment from 'moment'
const { Scene, Group, Label, Polyline } = spritejs
export default {
  data () {
    return {
      layer: null,
      layout: {},
      drugList: [{ name: '利多卡因', code: '1' }, { name: '安眠药', code: '2' }, { name: '降压药', code: '3' }], // 药品列表
      leftTitle: {
        text: '监测',
        width: 40,
        lineHeight: 30
      },
      // 行标题宽度
      rowTitle: {
        width: 128
      },
      rowList: [
        { text: '心电图', colNum: 2 },
        { text: '氧饱和度', colNum: 1 },
        { text: '潮气量', colNum: 2 },
        { text: 'f', colNum: 1 },
        { text: 'PEAK', colNum: 2 },
        { text: 'PEEP', colNum: 2 },
        { text: '中心静脉压', colNum: 2 },
        { text: '尿量', colNum: 1 },
        { text: '累计失血量', colNum: 2 }
      ],
      column: {
        num: 8
      }
    }
  },
  props: {
    // configuration: {
    //   type: Object,
    //   default: () => (
    //     {
    //       leftPartWidthRate: 0.18,
    //       rightPartWidthRate: 0.1,
    //       leftTitle: {
    //         text: '麻醉用药',
    //         width: 40,
    //         lineHeight: 30
    //       },
    //       timeTitle: {
    //         text: '时间',
    //         height: 30, // 是否显示顶部时间条，将高度置为0即可
    //         lineHeight: 30
    //       },
    //       totalTitle: {
    //         text: '总量'
    //       },
    //       xAxis: {
    //         startTime: '2018-02-01 08:00',
    //         endTime: '2018-02-01 12:00',
    //         timeInterval: 15 * 60 * 1000,
    //         lineInterval: 3
    //       },
    //       drugNumber: 10
    //     })
    // }
  },
  watch: {
    // configuration: {
    //   deep: true,
    //   handler: function (val) {
    //     this.resize()
    //   }
    // }
  },
  created () {
    this.resize = debounce(this.domResizeListener, 20)
  },
  mounted () {
    this.renderScene()
    this.createGroups()
    this.setLayout()
    this.setContent()
    addListener(this.$refs.anaesTable, this.resize)
  },
  beforeDestroy () {
    this.layer = null
    removeListener(this.$refs.anaesTable, this.resize)
  },
  methods: {
    domResizeListener () {
      this.scene.resize()
      this.setLayout()
      this.setContent()
    },
    renderScene () {
      this.scene = new Scene({
        container: this.$refs.anaesTable,
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
          this.leftTitle.width,
          this.layer.height
        ]
      })
      const leftPartRightLine = new Polyline({
        pos: [leftPart.attr('width') - 0.5, 0],
        points: [0, 0, 0, leftPart.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      leftPart.append(leftPartRightLine)

      const middlePart = this.layer.getElementsByClassName('middlePart')[0]
      middlePart.attr({
        size: [
          this.rowTitle.width,
          this.layer.height
        ],
        pos: [this.leftTitle.width, 0]
      })
      const middlePartRightLine = new Polyline({
        pos: [middlePart.attr('width') - 0.5, 0],
        points: [0, 0, 0, middlePart.attr('height')],
        strokeColor: 'black',
        lineWidth: 1
      })
      middlePart.append(middlePartRightLine)
      const rightPart = this.layer.getElementsByClassName('rightPart')[0]
      rightPart.attr({
        size: [
          this.layer.width - leftPart.attr('width') - middlePart.attr('width'),
          this.layer.height
        ],
        pos: [leftPart.attr('width') + middlePart.attr('width'), 0]
      })
    },
    setContent () {
      this.setLeftTitle()
      this.setRowTitle()
      this.setRightPartRow()
      this.setRightPartCol()
    },
    setLeftTitle () {
      const leftPart = this.layer.getElementsByClassName('leftPart')[0]
      const width = leftPart.attr('width')
      const height = leftPart.attr('height')
      const textArr = this.leftTitle.text.split('')
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
      leftPart.append(titleTextGroup)
    },
    setRowTitle () {
      const middlePart = this.layer.getElementsByClassName('middlePart')[0]
      const lineHeight = Math.round(middlePart.attr('height') / this.rowList.length)
      for (let i = 0; i < this.rowList.length - 1; i++) {
        const line = new Polyline({
          pos: [0, lineHeight * (1 + i) - 0.5],
          points: [0, 0, middlePart.attr('width'), 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        middlePart.append(line)
      }
      for (let i = 0; i < this.rowList.length; i++) {
        const label = new Label(this.rowList[i])
        label.attr({
          pos: [0, lineHeight * i + lineHeight / 2],
          anchor: [0, 0.5],
          fontSize: 12,
          fontFamily: '宋体',
          textAlign: 'center',
          fillColor: 'black',
          width: middlePart.attr('width'),
          lineHeight: lineHeight
          // bgcolor: 'red'
        })
        middlePart.append(label)
      }
    },
    setRightPartRow () {
      const rightPart = this.layer.getElementsByClassName('rightPart')[0]
      const lineHeight = Math.round(rightPart.attr('height') / this.rowList.length)
      for (let i = 0; i < this.rowList.length - 1; i++) {
        const line = new Polyline({
          pos: [0, lineHeight * (1 + i) - 0.5],
          points: [0, 0, rightPart.attr('width'), 0],
          strokeColor: 'black',
          lineWidth: 1
        })
        rightPart.append(line)
      }
    },
    setRightPartCol () {
      const rightPart = this.layer.getElementsByClassName('rightPart')[0]
      const lineHeight = Math.round(rightPart.attr('height') / this.rowList.length)
      for (let i = 0; i < this.rowList.length; i++) {
        const colInterval = Math.round(rightPart.attr('width') / this.column.num)
        // const colInterval = Math.round(rightPart.attr('width') / this.column.num) * this.rowList[i].colNum
        for (let j = 0; j < this.column.num - 1; j++) {
          const line = new Polyline({
            pos: [colInterval * (1 + j) - 0.5, lineHeight * i],
            points: [0, 0, 0, lineHeight],
            strokeColor: 'black',
            lineWidth: 1
          })
          if (j % this.rowList[i].colNum === 0 && this.rowList[i].colNum !== 1) {
            console.log(j, this.rowList[i].colNum)
            continue
          }
          rightPart.append(line)
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .anaesTable {
    height: 100%;
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 0 auto;
    background:#fff;
  }
</style>
