<template>
  <div
    class="widgetNews"
    :style="widgetStyle"
  >
    <div class="lineContent">
      <div
        v-for="(col,index) in configuration.column"
        class="col"
        :style="colStyle(index)"
        :key="index"
      />
    </div>
    <div class="newsContent">
      <div
        class="news"
        v-for="news in newsList"
        :key="news.order"
        :style="{width: colWidth}"
      >
        <div class="order">
          {{ news.order }}
        </div>
        <div>
          {{ news.startTime | timeFilter }}
          <span v-if="news.endTime">> {{ news.endTime | timeFilter }}</span>
          {{ news.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { getEventData } from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
export default {
  name: 'WidgetNews',
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
        this.setStyle()
      }
    }
  },
  data () {
    return {
      widgetStyle: {},
      newsList: []
    }
  },
  computed: {
    colStyle () {
      return index => {
        return {
          width: 100 / this.configuration.column + '%',
          'border-right':
            index !== this.configuration.column - 1
              ? this.configuration.border.width +
                'px solid' +
                this.configuration.border.color
              : 'none'
        }
      }
    },
    colWidth () {
      return 100 / this.configuration.column + '%'
    }
  },
  created () {
    this.setStyle()
    if (!this.editMode) {
      this.getData()
    }
  },
  mounted () {
    this.$eventHub.$on('document-refresh', () => {
      this.getData()
    })
    this.$eventHub.$on('document-redraw', () => {
      this.getData()
    })
  },
  filters: {
    timeFilter (time) {
      return moment(time, 'YYYY-MM-DD HH:mm:ss').format('MM-DD HH:mm')
    }
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let widgetStyle = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        color: font.color,
        textAlign: font.textAlign,
        textIndent: font.textIndent + 'pt'
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      widgetStyle = { ...widgetStyle, ...borderObj }
      this.widgetStyle = widgetStyle
    },
    async getData () {
      await this.getEventData()
    },
    getEventData () {
      return request({
        method: 'GET',
        url: getEventData,
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          operationId: this.operationId
        }
      }).then(
        res => {
          this.newsList = this.convertEventData(res.data.data)
        }
      )
    },
    convertEventData (eventData) {
      if (!Array.isArray(eventData)) {
        return []
      }
      const startMoment = +moment(this.startTime)
      const endMoment = +moment(this.endTime)
      let order = 0
      const list = eventData.reduce((arr, item) => {
        const eventArr = []
        const {
          eventCode,
          detailCode,
          detailName: name,
          drawIcon: label,
          iconColor,
          eventStartTime,
          eventEndTime
        } = item
        if (eventStartTime) {
          const eventStartMoment = +moment(eventStartTime, 'YYYY-MM-DD HH:mm:ss')
          if (eventStartMoment >= startMoment && eventStartMoment <= endMoment) {
            eventArr.push({
              eventId: eventCode + '' + detailCode,
              name: name + (eventEndTime ? '开始' : ''),
              label,
              color: iconColor ? '#' + iconColor : 'black',
              time: eventStartTime,
              startTime: eventStartTime,
              endTime: eventEndTime
            })
          }
        }
        if (eventEndTime) {
          const eventEndMoment = +moment(eventEndTime, 'YYYY-MM-DD HH:mm:ss')
          if (eventEndMoment >= startMoment && eventEndMoment <= endMoment) {
            eventArr.push({
              eventId: eventCode + '' + detailCode,
              name: name + '结束',
              label,
              color: iconColor ? '#' + iconColor : 'black',
              time: eventEndTime,
              startTime: eventStartTime,
              endTime: eventEndTime
            })
          }
        }
        return arr.concat(eventArr)
      }, [])
      list.sort(
        (a, b) =>
          +moment(a.time, 'YYYY-MM-DD HH:mm:ss') -
          +moment(b.time, 'YYYY-MM-DD HH:mm:ss')
      )
      list.forEach(item => {
        item.order = ++order
      })
      return list
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetNews {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .lineContent {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .col {
      border-right: 1px solid black;
      width: 100%;
    }
    .col:last-child {
      border-right: none;
    }
  }
  .newsContent {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    align-content: flex-start;
    .news {
      display: flex;
      .order {
        flex: 0 0 20px;
        text-align: center;
      }
    }
  }
}
</style>
