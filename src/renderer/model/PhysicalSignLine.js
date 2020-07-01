import { Polyline, Label } from 'spritejs'
import moment from 'moment'
export default class PhysicalSignLine {
  constructor ({ label, color, group, layer, startTime, endTime, min, max }) {
    this._label = label
    this._color = color
    this._group = group
    this._layer = layer
    this._startMoment = +moment(startTime)
    this._endMoment = +moment(endTime)
    this._min = min
    this._max = max
    this._labels = new Map()
    this._line = new Polyline(
      {
        pos: [0, 0],
        points: [],
        strokeColor: this._color,
        lineWidth: 1
      }
    )
    this._group.append(this._line)
  }

  addPoint (value) {
    const { x, y } = this._coordinateAdaptor(value)
    const label = new Label(this._label)
    const position = [x, y]
    label.attr({
      anchor: [0, 0],
      size: [20, 20],
      fontSize: 12,
      textAlign: 'center',
      verticalAlign: 'middle',
      fillColor: this._color,
      pos: [position[0] - 10, position[1] - 10],
      zIndex: 1
    })
    this._labels.set(label, position)

    let offsetPosition = [0, 0]

    const mousedownHandler = e => {
      const { x, y } = e
      offsetPosition = label.getOffsetPosition(x - 10, y - 10)
      this._layer.addEventListener('mousemove', mousemoveHandler)
      this._layer.addEventListener('mouseup', mouseupHandler)
    }

    const mousemoveHandler = e => {
      const { x, y } = e
      const groupOffsetPosition = this._group.getOffsetPosition(x, y)
      let newPosY = Math.min(groupOffsetPosition[1] - offsetPosition[1], this._group.attr('height'))
      newPosY = Math.max(0, newPosY)
      const newPos = [position[0], newPosY]
      label.setAttribute('pos', [newPos[0] - 10, newPos[1] - 10])
      this._labels.set(label, newPos)
      this._drawLine()
    }

    const mouseupHandler = e => {
      this._layer.removeEventListener('mousemove', mousemoveHandler)
      this._layer.removeEventListener('mouseup', mouseupHandler)
    }

    label.addEventListener('mousedown', mousedownHandler)

    this._group.append(label)
    this._drawLine()
  }

  _drawLine () {
    const points = Array.from(this._labels.values()).reduce((arr, item) => arr.concat(item))
    this._line.setAttribute('points', points)
  }

  _coordinateAdaptor ({ time, value }) {
    const thisMoment = +moment(time)
    let x = (thisMoment - this._startMoment) / (this._endMoment - this._startMoment) * this._group.attr('width')
    console.log(x)
    x = Math.round(x)
    let y = (this._max - value) / (this._max - this._min) * this._group.attr('height')
    y = Math.round(y)
    return {
      x,
      y
    }
  }
}
