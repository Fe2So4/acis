<template lang="pug">
.score-chart
  .chart(ref="chart")
  .table
    vxe-table.scroll(
      border,
      show-header-overflow,
      show-overflow,
      highlight-hover-row,
      align="center",
      height="100%",
      auto-resize,
      size="mini",
      :data="tableData"
    )
      vxe-table-column(field="name", title="评估时间")
      vxe-table-column(field="specs", title="评估结果")
      vxe-table-column(field="specs", title="评估人")
</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: 'ScoreChart',
  data () {
    return {
      tableData: [],
      chart: null
    }
  },
  computed: {
    ...mapState('Base', ['theme']),
    textColor () {
      switch (this.theme) {
        case 'dark-blue':
          return '#9BA3D5'
        case 'dark-gray':
          return '#BABABA'
        case 'light-white':
          return '#707C91'
        default:
          return ''
      }
    },
    axisLineColor () {
      switch (this.theme) {
        case 'dark-blue':
          return '#626D8F'
        case 'dark-gray':
          return '#BABABA'
        case 'light-white':
          return '#CECECE'
        default:
          return ''
      }
    },
    splitLineColor () {
      switch (this.theme) {
        case 'dark-blue':
          return '#32394B'
        case 'dark-gray':
          return '#5D5D5F'
        case 'light-white':
          return '#EBEBEB'
        default:
          return ''
      }
    }
  },
  methods: {
    createCharts () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chart)
      // 绘制图表
      const option = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            // 去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle: {
              color: this.axisLineColor
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
          axisTick: {
            // 去掉坐标轴刻线
            show: false
          },
          axisLine: {
            lineStyle: {
              color: this.axisLineColor
            }
          },
          splitLine: {
            lineStyle: {
              color: [this.splitLineColor],
              width: 1,
              type: 'solid'
            }
          } // 去除网格线
        },
        dataset: {
          source: [
            { time: '2020-7-14', value: '10' },
            { time: '2020-7-15', value: '12' },
            { time: '2020-7-16', value: '18' }
          ]
        },
        series: [
          {
            // data: [10, 20, 9, 10, 12, 13, 10],
            type: 'line',
            lineStyle: {
              // color: '#616D8F'
            }
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: this.textColor
        }
      }
      this.chart.setOption(option)
    }
  },
  mounted () {
    this.createCharts()
  },
  beforeDestroy () {
    this.chart.dispose()
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
$background: (
  "dark-blue": #1e222e,
  "dark-gray": #363638,
  light-white: #f8f8f8,
);
.score-chart {
  height: 200px;
  display: flex;
  @include theme-property("background", $background);
  justify-content: space-between;

  .table {
    width: 506px;
    height: 200px;
  }

  .chart {
    height: 200px;
    width: 332px;
  }
}
</style>
