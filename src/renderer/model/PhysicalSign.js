import { Polyline, Label, Group } from 'spritejs'
import moment from 'moment'
export class PhysicalSignLine {
  constructor ({
    signId,
    name,
    label,
    color,
    group,
    layer,
    startTime,
    endTime,
    min,
    max
  }) {
    this._signId = signId
    this._name = name
    this._label = label
    this._color = color
    this._group = group
    this._layer = layer
    this._startMoment = +moment(startTime)
    this._endMoment = +moment(endTime)
    this._min = min
    this._max = max
    this._labels = new Map()
    this._line = new Polyline({
      pos: [0, 0],
      points: [],
      strokeColor: this._color,
      lineWidth: 2,
      className: 'signLine'
    })
    this._group.append(this._line)
  }

  addPoint ({ time, value }) {
    const { x, y } = this._coordinateAdaptor({ time, value })
    const thisMoment = +moment(time, 'YYYY-MM-DD HH:mm:ss')
    const hasLabel = thisMoment % (5 * 60 * 1000) === 0
    const text = hasLabel ? this._label : ''
    const label = new Label(text)
    const position = [x, y]
    const width = hasLabel ? 8 : 4
    const height = hasLabel ? 10 : 4
    label.attr({
      anchor: [0, 0],
      width,
      height,
      fontSize: 8,
      fontFamily: '宋体',
      textAlign: 'center',
      verticalAlign: 'middle',
      fillColor: this._color,
      pos: [position[0] - width / 2, position[1] - height / 2],
      zIndex: 1,
      className: 'signLabel',
      signId: this._signId,
      signName: this._name,
      timePoint: time,
      pointValue: value
    })
    this._labels.set(label, position)

    let offsetPosition = [0, 0]
    const mousedownHandler = (e) => {
      const { x, y } = e
      offsetPosition = label.getOffsetPosition(x - width / 2, y - height / 2)
      this._layer.addEventListener('mousemove', mousemoveHandler)
      this._layer.addEventListener('mouseup', mouseupHandler)
    }
    const mousemoveHandler = (e) => {
      const { x, y } = e
      const groupOffsetPosition = this._group.getOffsetPosition(x, y)
      let newPosY = Math.min(
        groupOffsetPosition[1] - offsetPosition[1],
        this._group.attr('height')
      )
      newPosY = Math.max(0, newPosY)
      const newPos = [position[0], newPosY]
      label.setAttribute('pos', [
        Math.round(newPos[0] - width / 2),
        Math.round(newPos[1] - height / 2)
      ])
      label.setAttribute('fillColor', 'red')
      this._labels.set(label, newPos)
      this._drawLine()
      label.attr('pointValue', this.getPoint(label))
    }
    const mouseupHandler = (e) => {
      this._layer.removeEventListener('mousemove', mousemoveHandler)
      this._layer.removeEventListener('mouseup', mouseupHandler)
    }
    label.addEventListener('mousedown', mousedownHandler)
    this._group.append(label)
    this._drawLine()
  }

  // 获取某个点的value
  getPoint (label) {
    const position = this._labels.get(label)
    if (position) {
      return this._valueAdaptor(position)
    } else {
      return 0
    }
  }

  getLegend () {
    const legend = new Label(this._label + this._name)
    legend.attr({
      anchor: [0, 0],
      fontFamily: '宋体',
      fontSize: 12,
      height: 20,
      textAlign: 'center',
      verticalAlign: 'middle',
      fillColor: this._color
    })
    return legend
  }

  _drawLine () {
    const points = Array.from(this._labels.values()).reduce((arr, item) =>
      arr.concat(item)
    )
    this._line.setAttribute('points', points)
  }

  // 时间和值转化为坐标
  _coordinateAdaptor ({ time, value }) {
    const thisMoment = +moment(time)
    let x =
      ((thisMoment - this._startMoment) /
        (this._endMoment - this._startMoment)) *
      this._group.attr('width')
    x = Math.round(x)
    let y =
      ((this._max - value) / (this._max - this._min)) *
      this._group.attr('height')
    y = Math.round(y)
    return {
      x,
      y
    }
  }

  // 坐标转化为时间和值
  _valueAdaptor ([x, y]) {
    let value =
      this._max - (y / this._group.attr('height')) * (this._max - this._min)
    value = Math.round(value * 100) / 100
    return value
  }
}

export class PhysicalSignLegends {
  constructor (group) {
    this._group = group
    this.legends = []
  }

  addLegend ({ label, name }) {
    const legend = new Label(label + name)
    legend.attr({
      anchor: [0, 0],
      fontSize: 12,
      fontFamily: '宋体',
      height: 20,
      textAlign: 'center',
      verticalAlign: 'middle'
    })
    this.legends.push(legend)
    legend.attr('pos', [0, 20 * (this.legends.length - 1)])
    this._group.append(legend)
  }

  clear () {
    this.legends = []
    this._group.removeAllChildren()
  }
}

// 事件列表
export class PhysicalSignEventTags {
  constructor ({ group, startTime, endTime }) {
    this._group = group
    this._startMoment = +moment(startTime)
    this._endMoment = +moment(endTime)
  }

  addTag ({ order, label, time }) {
    const text = label || order + ''
    const tag = new Label(text)
    const tagWidth = 12
    const tagHeight = 14
    tag.attr({
      anchor: [0.5, 0.5],
      fontSize: 12,
      fontFamily: '宋体',
      width: tagWidth,
      height: tagHeight,
      textAlign: 'center',
      verticalAlign: 'middle',
      className: 'eventTag'
    })

    const thisMoment = +moment(time, 'YYYY-MM-DD HH:mm:ss')
    let x =
            ((thisMoment - this._startMoment) /
                (this._endMoment - this._startMoment)) *
            this._group.attr('width')
    let y = this._group.attr('height') / 2
    x = Math.round(x)
    y = Math.round(y)

    // 重叠判定尺寸是10px*10px
    const overlap = 10
    const xBoundMin = x - overlap / 2
    const xBoundMax = x + overlap / 2
    const tags = this._group.querySelectorAll('.eventTag')
    while (
      Array.prototype.some.call(tags, (t) => {
        const [tagX, tagY] = t.attr('pos')
        const yBoundMin = y - overlap / 2
        const yBoundMax = y + overlap / 2
        return (
          Math.max(tagX - overlap / 2, xBoundMin) < Math.min(tagX + overlap / 2, xBoundMax) &&
            Math.max(tagY - overlap / 2, yBoundMin) < Math.min(tagY + overlap / 2, yBoundMax)
        )
      })
    ) {
      y -= overlap
    }
    tag.attr('pos', [x, y])
    this._group.append(tag)
  }

  clear () {
    const tags = this._group.querySelectorAll('.eventTag')
    tags.forEach((el) => this._group.removeChild(el))
  }
}

// 血气分析
export class PhysicalSignBloodGas {
  constructor ({ group, startTime, endTime }) {
    this._group = group
    this._startMoment = +moment(startTime)
    this._endMoment = +moment(endTime)
  }

  addRecords (list) {
    list.forEach(item => this.addRecord(item))
  }

  addRecord ({ analysisTime: time, detail }) {
    const timestamp = +moment(time, 'YYYY-MM-DD HH:mm:ss')
    const x = this._group.attr('width') / (this._endMoment - this._startMoment) * (timestamp - this._startMoment)
    const group = new Group({
      pos: [x, 0],
      className: 'blood-gas-group'
    })
    detail.filter(({ bloodValue }) => bloodValue).forEach(({ bloodName, bloodValue }, idx) => {
      const label = new Label(`${bloodName}=${bloodValue}`)
      label.attr({
        pos: [0, 14 * idx],
        fontSize: 12,
        fontFamily: '宋体',
        fillColor: 'blue',
        className: 'blood-gas-label'
      })
      group.append(label)
    })
    this._group.append(group)
  }

  clear () {
    const tags = this._group.querySelectorAll('.blood-gas-group')
    tags.forEach((el) => this._group.removeChild(el))
  }
}
