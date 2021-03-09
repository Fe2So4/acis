<template>
  <div
    class="widgetNews"
    :style="widgetStyle"
  >
    <div class="lineContent">
      <div
        v-for="(col, index) in configuration.column"
        class="col"
        :style="colStyle(index)"
        :key="index"
      />
    </div>
    <div class="newsContent">
      <div
        class="news"
        v-for="(news, idx) in newsList"
        :key="idx"
        :style="{ width: colWidth }"
      >
        <div class="order">
          {{ news.detailCode }}
        </div>
        <div>
          {{ news.detailName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { getAcisIntraoEventInfo } from '@/api/intraoperative'
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
    },
    pageIndex: {
      type: Number,
      required: false,
      default: -1
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
    getData () {
      this.getAcisIntraoEventInfo().then(
        list => {
          this.newsList = list
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    getAcisIntraoEventInfo () {
      let type = null
      if (
        this.$route.params.flag === 0 ||
        (this.$route.params.buttonConfig &&
          this.$route.params.buttonConfig.includes('ANES'))
      ) {
        type = 1
      } else if (
        this.$route.params.flag === 1 ||
        (this.$route.params.buttonConfig &&
          this.$route.params.buttonConfig.includes('ANAB'))
      ) {
        type = 2
      }
      return request({
        url: getAcisIntraoEventInfo,
        data: {
          type: type,
          operationId: this.operationId,
          line: 40,
          length: 22,
          page: this.pageIndex + 1,
          startTime: this.startTime,
          endTime: this.endTime
        },
        method: 'post'
      }).then(res => {
        if (res.data.success) {
          return res.data.data.eventList
        }
        return Promise.reject(new Error('获取术中事件信息失败'))
      })
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
    flex-wrap: wrap;
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
