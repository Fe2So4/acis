<template lang="pug">
  .score-chart
    .chart(ref="chart")
    .table
      vxe-table(
        border
        show-header-overflow
        show-overflow
        highlight-hover-row
        align="center"
        height="100%"
        auto-resize
        size="mini"
        class="scroll"
        :data="tableData"
      )
        vxe-table-column(field="name" title="评估时间")
        vxe-table-column(field="specs" title="评估结果")
        vxe-table-column(field="specs" title="评估人")
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'ScoreChart',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    createCharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.chart)
      // 绘制图表
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
          source: [
            { time: '2020-7-14', value: '10' },
            { time: '2020-7-15', value: '12' },
            { time: '2020-7-16', value: '18' }
          ]
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
      myChart.setOption(option)
    }
  },
  mounted () {
    this.createCharts()
  }
}
</script>
<style lang="stylus" scoped>
  .score-chart
    height 200px
    display flex
    background #1E222E
    justify-content space-between
    .table
      width 506px
      height 200px
    .chart
      height 200px
      width 332px
</style>
