<template>
  <div class="designerContent">
    <div
      class="content"
      :style="style"
      @drop="onDrop"
      @dragover="onDragOver"
      ref="designerContent"
      @dblclick="onDblckick"
    >
      <canvas
        class="canvas"
        @click="onClickCanvas"
      />
      <widget-movable
        v-for="(item,index) of widgetList"
        :key="index"
        :prop-id="item.id"
        :actual="item.actual"
        :visual="item.visual"
        :active-id="activeId"
        @widget-resize="onWidgetResize"
        @widget-active="onWidgetActive"
        @widget-move="onWidgetMove"
        @widget-drag-start="onWidgetDragStart"
        @widget-drag-end="onWidgetDragEnd"
        @widget-delete="onWidgetDelete"
      >
        <component :is="item.name" />
      </widget-movable>
    <!-- <pre>{{ widgetList }}</pre> -->
    </div>
  </div>
</template>
<script>
import WidgetMovable from './WidgetMovable'
import WidgetInput from './WidgetInput'
import WidgetText from './WidgetText'
import WidgetLine from './WidgetLine'
import WidgetPanel from './WidgetPanel'
import { v4 as uuidv4 } from 'uuid'
import { createNamespacedHelpers } from 'vuex'
const Mock = require('mockjs')
// const Random = Mock.Random
const { mapState, mapActions } = createNamespacedHelpers('PageTemplateDesigner')
// import * as _ from 'lodash'
export default {
  name: 'ContentDesigner',
  components: {
    WidgetMovable,
    WidgetInput,
    WidgetText,
    WidgetLine,
    WidgetPanel
  },
  data () {
    const circleWidth = 8
    const circleOffset = -(circleWidth / 2 + 1) + 'px'
    return {
      widgetMap: new Map(),
      widgetList: [],
      activeId: '',
      referenceLine: {
        x: [],
        y: []
      },
      adsorptionDistance: 10,
      widget: {
        id: '',
        name: '',
        actual: {
          width: '',
          height: '',
          positionX: '',
          positionY: ''
        },
        visual: {
          width: '',
          height: '',
          positionX: '',
          positionY: ''
        }
      },
      activeContent: false,
      circles: [
        {
          style: {
            left: circleOffset,
            top: circleOffset,
            cursor: 'nw-resize'
          }
        },
        {
          style: {
            left: 'calc(50% - ' + circleWidth / 2 + 'px)',
            top: circleOffset,
            cursor: 'n-resize'
          }
        },
        {
          style: {
            right: circleOffset,
            top: circleOffset,
            cursor: 'ne-resize'
          }
        },
        {
          style: {
            left: circleOffset,
            top: 'calc(50% - ' + circleWidth / 2 + 'px)',
            cursor: 'w-resize'
          }
        },
        {
          style: {
            right: circleOffset,
            top: 'calc(50% - ' + circleWidth / 2 + 'px)',
            cursor: 'e-resize'
          }
        },
        {
          style: {
            left: circleOffset,
            bottom: circleOffset,
            cursor: 'sw-resize'
          }
        },
        {
          style: {
            left: 'calc(50% - ' + circleWidth / 2 + 'px)',
            bottom: circleOffset,
            cursor: 's-resize'
          }
        },
        {
          style: {
            right: circleOffset,
            bottom: circleOffset,
            cursor: 'se-resize'
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      activeWidget: state => state.activeWidget,
      width: state => state.width,
      height: state => state.height
    }),
    style () {
      return {
        // left: this.actual.positionX + 'px',
        // top: this.actual.positionY + 'px',
        width: this.width + 'px',
        height: this.height + 'px'
        // borderColor: this.active ? 'rebeccapurple' : 'transparent'
      }
    }
  },
  watch: {
    activeWidget: {
      handler (newVal, old) {
        // console.log(newVal.id)
        const val = newVal
        // console.log(this.widgetMap.get(newVal.id))
        this.widgetMap.set(val.id, val)
        this.setWidgetList()
      }
    }
  },
  created () {
    var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|10-20': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        id: function () {
          return uuidv4()
        },
        name: 'widget-input',
        'width|10-200': 10,
        'height|10-30': 10,
        'positionX|0-200': 0,
        'positionY|0-400': 0
      }]
    })
    // 输出结果
    console.log(data.list.length)
    data.list.forEach(item => {
      const { id, name, width, height, positionX, positionY } = item
      this.widgetMap.set(id, {
        id,
        name,
        visual: {
          width,
          height,
          positionX,
          positionY
        },
        actual: {
          width,
          height,
          positionX,
          positionY
        }
      })
      this.setWidgetList()
    })
  },
  methods: {
    ...mapActions([
      'setActiveWidget',
      'setWidthHeight'
    ]),
    onDblckick () {
      this.activeContent = true
    },
    setWidgetList () {
      this.widgetList = [...this.widgetMap.values()]
    },
    onWidgetDelete (e) {
      // console.log(e)
      this.widgetMap.delete(e)
      this.setWidgetList()
      // console.log(this.widgetMap, this.widgetMap._c)
    },
    onDragOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    },
    onDrop (e) {
      const { offsetX, offsetY, id, name, width, height, type } = JSON.parse(
        e.dataTransfer.getData('text/plain')
      )
      switch (type) {
        case 'resize':
        case 'move':
          return
        case 'copy': {
          let left = e.offsetX
          let top = e.offsetY

          // 如果重叠
          if (e.target !== this.$refs.designerContent) {
            left += +e.target.style.left.replace(/px/g, '')
            top += +e.target.style.top.replace(/px/g, '')
          }

          left = left - offsetX
          top = top - offsetY

          const { positionX, positionY } = this.correctPositon({
            positionX: left,
            positionY: top,
            width,
            height
          })

          this.setWidgetMap(id, {
            id,
            name,
            actual: {
              positionX,
              positionY,
              width,
              height
            },
            visual: {
              positionX,
              positionY,
              width,
              height
            }
          })
          break
        }
        default:
      }
    },
    setWidgetMap (id, data) {
      const originalData = this.widgetMap.get(id)
      if (!originalData) {
        this.widgetMap.set(id, data)
      } else {
        if (data.visual) {
          originalData.visual = Object.assign({}, originalData.visual, data.visual)
        }
        if (data.actual) {
          originalData.actual = Object.assign({}, originalData.actual, data.actual)
        }
      }
      this.setWidgetList()
    },
    onWidgetResize (e) {
      if (e.data.positionX < 0 || e.data.positionY < 0) {
        return
      }
      if (
        e.data.positionX + e.data.width >
          this.$refs.designerContent.clientWidth ||
        e.data.positionY + e.data.height >
          this.$refs.designerContent.clientHeight
      ) {
        return
      }
      if (e.data.width <= 0 || e.data.height <= 0) {
        return
      }

      // 更新visual
      this.setWidgetMap(e.id, {
        visual: e.data
      })

      // 获取边界线
      const visual = this.widgetMap.get(e.id).visual

      const actual = Object.assign({}, visual)

      switch (e.cursor) {
        case 'nw-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX
              }
            ],
            y: [
              {
                name: 'lineY',
                value: visual.positionY
              }
            ]
          }

          const { closestX, closestY } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.positionX = closestX.closestLine.value
                actual.width = visual.width - (closestX.closestLine.value - actual.positionX)
                break
            }
          }
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.positionY = closestY.closestLine.value
                actual.height = visual.height - (closestY.closestLine.value - visual.positionY)
                break
            }
          }
          break
        }
        case 'n-resize': {
          const selfLines = {
            x: [],
            y: [
              {
                name: 'lineY',
                value: visual.positionY
              }
            ]
          }
          const { closestY } = this.getClosestLine(selfLines)
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.positionY = closestY.closestLine.value
                actual.height = visual.height - (closestY.closestLine.value - visual.positionY)
                break
            }
          }
          break
        }

        case 'ne-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX + visual.width
              }
            ],
            y: [
              {
                name: 'lineY',
                value: visual.positionY
              }
            ]
          }

          const { closestX, closestY } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.width = closestX.closestLine.value - visual.positionX
                break
            }
          }
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.positionY = closestY.closestLine.value
                actual.height = visual.height - (closestY.closestLine.value - visual.positionY)
                break
            }
          }
          break
        }
        case 'w-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX
              }
            ],
            y: []
          }

          const { closestX } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.positionX = closestX.closestLine.value
                actual.width = visual.width - (closestX.closestLine.value - visual.positionX)
                break
            }
          }
          break
        }
        case 'e-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX + visual.width
              }
            ],
            y: []
          }

          const { closestX } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.width = closestX.closestLine.value - visual.positionX
                break
            }
          }
          break
        }
        case 'sw-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX
              }
            ],
            y: [
              {
                name: 'lineY',
                value: visual.positionY + visual.height
              }
            ]
          }

          const { closestX, closestY } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.positionX = closestX.closestLine.value
                actual.width = visual.width - (closestX.closestLine.value - actual.positionX)
                break
            }
          }
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.height = closestY.closestLine.value - visual.positionY
                break
            }
          }
          break
        }
        case 's-resize': {
          const selfLines = {
            x: [],
            y: [
              {
                name: 'lineY',
                value: visual.positionY + visual.height
              }
            ]
          }

          const { closestY } = this.getClosestLine(selfLines)
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.height = closestY.closestLine.value - visual.positionY
                break
            }
          }
          break
        }
        case 'se-resize': {
          const selfLines = {
            x: [
              {
                name: 'lineX',
                value: visual.positionX + visual.width
              }
            ],
            y: [
              {
                name: 'lineY',
                value: visual.positionY + visual.height
              }
            ]
          }

          const { closestX, closestY } = this.getClosestLine(selfLines)
          if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
            switch (closestX.name) {
              case 'lineX':
                actual.width = closestX.closestLine.value - visual.positionX
                break
            }
          }
          if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
            switch (closestY.name) {
              case 'lineY':
                actual.height = closestY.closestLine.value - visual.positionY
                break
            }
          }
          break
        }
        default:
      }

      // 更新actual
      this.setWidgetMap(e.id, {
        actual
      })
    },
    onWidgetActive (e) {
      this.activeId = e
      // console.log(e, 'dblclick', this.widgetMap.get(e))
      this.setActiveWidget(this.widgetMap.get(e))
    },
    onWidgetMove (e) {
      // 边界修正
      const { positionX, positionY } = this.correctPositon({
        positionX: e.data.positionX,
        positionY: e.data.positionY,
        width: this.widgetMap.get(e.id).actual.width,
        height: this.widgetMap.get(e.id).actual.height
      })

      e.data.positionX = positionX
      e.data.positionY = positionY

      // 更新visual
      this.setWidgetMap(e.id, {
        visual: e.data
      })

      // 获取边界线
      const visual = this.widgetMap.get(e.id).visual
      const selfLines = {
        x: [
          {
            name: 'lineLeftX',
            value: visual.positionX
          },
          {
            name: 'lineRightX',
            value: visual.positionX + visual.width
          },
          {
            name: 'lineCenterX',
            value: visual.positionX + visual.width / 2
          }
        ],
        y: [
          {
            name: 'lineTopY',
            value: visual.positionY
          },
          {
            name: 'lineBottomY',
            value: visual.positionY + visual.height
          },
          {
            name: 'lineCenterY',
            value: visual.positionY + visual.height / 2
          }
        ]
      }
      const { closestX, closestY } = this.getClosestLine(selfLines)
      const actual = Object.assign({}, visual)

      if (closestX.closestLine && closestX.closestLine.abs < this.adsorptionDistance) {
        switch (closestX.name) {
          case 'lineLeftX':
            actual.positionX = closestX.closestLine.value
            break
          case 'lineRightX':
            actual.positionX = closestX.closestLine.value - visual.width
            break
          case 'lineCenterX':
            actual.positionX = closestX.closestLine.value - visual.width / 2
            break
        }
      }
      if (closestY.closestLine && closestY.closestLine.abs < this.adsorptionDistance) {
        switch (closestY.name) {
          case 'lineTopY':
            actual.positionY = closestY.closestLine.value
            break
          case 'lineBottomY':
            actual.positionY = closestY.closestLine.value - visual.height
            break
          case 'lineCenterY':
            actual.positionY = closestY.closestLine.value - visual.height / 2
            break
        }
      }

      // 更新actual
      this.setWidgetMap(e.id, {
        actual
      })
    },
    onWidgetDragStart (e) {
      this.setReferenceLine(e.id)
    },
    onWidgetDragEnd (e) {
      // 更新visual
      this.widgetMap.get(e.id).visual = Object.assign({}, this.widgetMap.get(e.id).actual)
    },
    onClickCanvas () {
      this.activeId = ''
    },
    setReferenceLine (id) {
      this.referenceLine.x = [...this.widgetMap.values()]
        .filter(item => item.id !== id)
        .reduce(
          (arr, item) =>
            arr.concat([
              item.actual.positionX,
              item.actual.positionX + item.actual.width,
              item.actual.positionX + item.actual.width / 2
            ]),
          []
        )
        .reduce((arr, item) => {
          if (!arr.includes(item)) {
            return arr.concat([item])
          } else {
            return arr
          }
        }, [])
        .sort((a, b) => a - b)
      this.referenceLine.y = [...this.widgetMap.values()]
        .filter(item => item.id !== id)
        .reduce(
          (arr, item) =>
            arr.concat([
              item.actual.positionY,
              item.actual.positionY + item.actual.height,
              item.actual.positionY + item.actual.height / 2
            ]),
          []
        )
        .reduce((arr, item) => {
          if (!arr.includes(item)) {
            return arr.concat([item])
          } else {
            return arr
          }
        }, [])
        .sort((a, b) => a - b)
    },
    getClosestLine (selfLines) {
      // 获取最近的参考线
      const closestX = selfLines.x.reduce((value, line) => {
        const closestLine = this.referenceLine.x.reduce((val, x) => {
          if (val) {
            if (val.abs > Math.abs(x - line.value)) {
              return {
                value: x,
                abs: Math.abs(x - line.value)
              }
            } else {
              return val
            }
          } else {
            return {
              value: x,
              abs: Math.abs(x - line.value)
            }
          }
        }, null)
        if (value && value.closestLine) {
          if (value.closestLine.abs > closestLine.abs) {
            return {
              closestLine,
              name: line.name
            }
          } else {
            return value
          }
        } else {
          return {
            closestLine,
            name: line.name
          }
        }
      }, null)
      const closestY = selfLines.y.reduce((value, line) => {
        const closestLine = this.referenceLine.y.reduce((val, y) => {
          if (val) {
            if (val.abs > Math.abs(y - line.value)) {
              return {
                value: y,
                abs: Math.abs(y - line.value)
              }
            } else {
              return val
            }
          } else {
            return {
              value: y,
              abs: Math.abs(y - line.value)
            }
          }
        }, null)
        if (value && value.closestLine) {
          if (value.closestLine.abs > closestLine.abs) {
            return {
              closestLine,
              name: line.name
            }
          } else {
            return value
          }
        } else {
          return {
            closestLine,
            name: line.name
          }
        }
      }, null)
      return { closestX, closestY }
    },
    // 边界修正
    correctPositon ({ positionX, positionY, width, height }) {
      positionX = positionX < 0 ? 0 : positionX
      positionY = positionY < 0 ? 0 : positionY
      positionX = (positionX + width) > this.$refs.designerContent.clientWidth
        ? this.$refs.designerContent.clientWidth - width
        : positionX
      positionY = positionY + height > this.$refs.designerContent.clientHeight
        ? this.$refs.designerContent.clientHeight - height
        : positionY
      return {
        positionX,
        positionY
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.designerContent {
  height: 100%;
  flex: 1 1 600px;
  background: cornsilk;
  // position: relative;
  overflow: auto;

  .canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .content{
    position: relative;
    // width: 600px;
    // height:800px;
    border:1px dashed red;
    margin:0 auto;
    .circle {
      width: 8px;
      height: 8px;
      // border: 1px solid rebeccapurple;
      background: rebeccapurple;
      position: absolute;
      border-radius: 2px;
  }
  }
}
</style>
