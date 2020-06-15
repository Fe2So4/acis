<template>
  <div
    class="widgetMovable"
    :style="style"
    tabindex="0"
    draggable="true"
    @dragstart="onDragStart"
    @drag="onDrag"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @drop="onDrop"
    @dblclick="onDblckick"
    @keyup.delete="onDelete"
  >
    <div
      class="circle"
      v-for="(circle, index) of circles"
      :key="index"
      :style="circle.style"
      draggable="true"
      @dragstart.stop="onDragStartResize"
      @drag.stop="onDragResize"
      @dragend.stop="onDragEndResize"
      v-show="active"
    />
    <slot />
  </div>
</template>
<script>
export default {
  name: 'WidgetMovable',
  props: {
    actual: {
      type: Object,
      required: true
    },
    visual: {
      type: Object,
      required: true
    },
    propId: {
      type: String,
      required: true
    },
    activeId: {
      required: true,
      type: String
    }
  },
  data () {
    const circleWidth = 8
    const circleOffset = -(circleWidth / 2 + 1) + 'px'
    return {
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
      ],
      resize: {
        start: {
          pageX: '',
          pageY: ''
        }
      },
      drag: {
        start: {
          pageX: '',
          pageY: ''
        }
      }
    }
  },
  computed: {
    style () {
      return {
        left: this.actual.positionX + 'px',
        top: this.actual.positionY + 'px',
        width: this.actual.width + 'px',
        height: this.actual.height + 'px',
        borderColor: this.active ? 'rebeccapurple' : 'transparent'
      }
    },
    active () {
      return this.propId === this.activeId
    }
  },
  methods: {
    onDragStart (e) {
      // 记录起始位置
      const { pageX, pageY } = e
      this.drag.start.pageX = pageX
      this.drag.start.pageY = pageY
      // 设置拖动数据类型
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          id: this.propId,
          offsetX: e.offsetX,
          offsetY: e.offsetY,
          type: 'move'
        })
      )
      // 定义拖动效果
      e.dataTransfer.dropEffect = 'move'

      // 定义跟随图片
      const canvas = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'canvas'
      )
      canvas.width = canvas.height = 50

      var ctx = canvas.getContext('2d')
      ctx.lineWidth = 4
      ctx.moveTo(0, 0)
      ctx.lineTo(50, 50)
      ctx.moveTo(0, 50)
      ctx.lineTo(50, 0)
      ctx.stroke()
      e.dataTransfer.setDragImage(canvas, 25, 25)

      // 通知父组件，删除当前控件的参考线
      this.$emit('widget-drag-start', {
        id: this.propId
      })
    },
    onDrag (e) {
      if (e.layerX < 0 || e.layerY < 0) {
        return
      }
      const dX = e.pageX - this.drag.start.pageX
      const dY = e.pageY - this.drag.start.pageY
      console.log(e.pageX, e.pageY, dX, dY)
      // 重置起始位置
      const { pageX, pageY } = e
      this.drag.start.pageX = pageX
      this.drag.start.pageY = pageY

      this.$emit('widget-move', {
        event: e,
        id: this.propId,
        data: {
          positionX: this.visual.positionX + dX,
          positionY: this.visual.positionY + dY
        }
      })
    },
    onDragOver (e) {
      e.dataTransfer.dropEffect = 'none'
    },
    onDragEnd (e) {
      // 通知父组件，更新visual
      this.$emit('widget-drag-end', {
        id: this.propId
      })
    },
    onDrop (e) {
      e.preventDefault()
      this.$emit('widget-active', this.propId)
    },
    onDragStartResize (e) {
      const { pageX, pageY } = e
      this.resize.start.pageX = pageX
      this.resize.start.pageY = pageY

      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          id: this.propId,
          type: 'resize'
        })
      )

      // 定义拖动效果
      e.dataTransfer.dropEffect = 'move'

      // 定义跟随图片
      const canvas = document.createElementNS(
        'http://www.w3.org/1999/xhtml',
        'canvas'
      )
      canvas.width = canvas.height = 50

      var ctx = canvas.getContext('2d')
      ctx.lineWidth = 4
      ctx.moveTo(0, 0)
      ctx.lineTo(50, 50)
      ctx.moveTo(0, 50)
      ctx.lineTo(50, 0)
      ctx.stroke()
      e.dataTransfer.setDragImage(canvas, 25, 25)

      this.$emit('widget-drag-start', { id: this.propId })
    },
    onDragResize (e) {
      const dX = e.pageX - this.resize.start.pageX
      const dY = e.pageY - this.resize.start.pageY

      // 重置起始位置
      const { pageX, pageY } = e
      this.resize.start.pageX = pageX
      this.resize.start.pageY = pageY

      let data
      switch (e.target.style.cursor) {
        case 'nw-resize':
          data = {
            positionX: this.visual.positionX + dX,
            positionY: this.visual.positionY + dY,
            width: this.visual.width - dX,
            height: this.visual.height - dY
          }
          break
        case 'n-resize':
          data = {
            positionX: this.visual.positionX,
            positionY: this.visual.positionY + dY,
            width: this.visual.width,
            height: this.visual.height - dY
          }
          break
        case 'ne-resize':
          data = {
            positionX: this.visual.positionX,
            positionY: this.visual.positionY + dY,
            width: this.visual.width + dX,
            height: this.visual.height - dY
          }
          break
        case 'w-resize':
          data = {
            positionX: this.visual.positionX + dX,
            positionY: this.visual.positionY,
            width: this.visual.width - dX,
            height: this.visual.height
          }
          break
        case 'e-resize':
          data = {
            positionX: this.visual.positionX,
            positionY: this.visual.positionY,
            width: this.visual.width + dX,
            height: this.visual.height
          }
          break
        case 'sw-resize':
          data = {
            positionX: this.visual.positionX + dX,
            positionY: this.visual.positionY,
            width: this.visual.width - dX,
            height: this.visual.height + dY
          }
          break
        case 's-resize':
          data = {
            positionX: this.visual.positionX,
            positionY: this.visual.positionY,
            width: this.visual.width,
            height: this.visual.height + dY
          }
          break
        case 'se-resize':
          data = {
            positionX: this.visual.positionX,
            positionY: this.visual.positionY,
            width: this.visual.width + dX,
            height: this.visual.height + dY
          }
          break
        default:
          return
      }
      if (data) {
        this.$emit('widget-resize', {
          id: this.propId,
          data: data,
          cursor: e.target.style.cursor
        })
      }
    },
    onDragEndResize (e) {
      // 通知父组件，更新visual
      this.$emit('widget-drag-end', {
        id: this.propId
      })
    },
    onDblckick () {
      this.$emit('widget-active', this.propId)
    },
    onDelete () {
      console.log('delete')
      if (this.active) {
        this.$emit('widget-delete', this.propId)
      }
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.widgetMovable {
  position: absolute;
  background: transparent;
  border: 2px solid rebeccapurple;
  .circle {
    width: 8px;
    height: 8px;
    // border: 1px solid rebeccapurple;
    background: rebeccapurple;
    position: absolute;
    border-radius: 2px;
    z-index:2
  }
}
</style>
