<template lang="pug">
  .inspection-dialog
    .dialog-content
      .dialog-title
        span {{title}}
        i(class="el-icon-close" @click="handleClose")
      .dialog-body
        .chart(ref="chart")
</template>
<script>
import request from '@/utils/requestForMock'
import { getTestInfoLine } from '@/api/systemIntegration'
import echarts from 'echarts'
export default {
  name: 'DialogChart',
  props: {
    title: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    itemCode: {
      type: String,
      required: true
    },
    patientId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  created () {
    this.getTestInfoLine()
  },
  mounted () {
    this.createCharts()
  },
  beforeDestroy () {
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    createCharts () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart)
    },
    handleClose () {
      this.$emit('handleClose')
    },
    getTestInfoLine () {
      return request({
        url: getTestInfoLine,
        method: 'get',
        params: {
          startTime: this.startTime,
          endTime: this.endTime,
          patientId: this.patientId,
          itemCode: this.itemCode
        }
      }).then(res => {
        if (res.data && res.data.success) {
          const source = res.data.data.map(item => {
            return {
              time: item.resultTime,
              value: item.value
            }
          })
          this.setChartSource(source)
        }
      })
    },
    setChartSource (source) {
      const option = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: { // 去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#616D8F'
            }
          }
        },
        grid: {
          top: '10px',
          bottom: '20px',
          left: '30px',
          right: '0'
        },
        yAxis: {
          type: 'value',
          axisTick: { // 去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#616D8F'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#333'],
              width: 1,
              type: 'solid'
            }
          } // 去除网格线
        },
        dataset: {
          source: source
        },
        series: [{
          // data: [10, 20, 9, 10, 12, 13, 10],
          type: 'line',
          lineStyle: {
            // color: '#616D8F'
          }
        }],
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#9BA3D5'
        }
      }
      // 绘制图表
      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="stylus" scoped>
.inspection-dialog
    font-size 14px
    position fixed
    width 100vw
    height 100vh
    left 0
    top 0
    z-index 3
    display flex
    justify-content center
    align-items center
    .dialog-content
      padding 0px 20px 40px
      background #181C27
      box-shadow 0px 0px 12px 3px rgba(0, 0, 0, 0.4)
      border-radius 10px
      .dialog-title
        line-height 32px
        display flex
        color #0094FF
        justify-content space-between
        i
          font-size 18px
          margin-top 7px
          font-weight bold
          cursor pointer
          transition all ease 0.3
          &:hover
            transform scale(1.2)
    .dialog-body
      .chart
        height 480px
        width 600px
</style>
