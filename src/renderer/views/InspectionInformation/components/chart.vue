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
import echarts from 'echarts'
export default {
  data () {
    return {
      option: {
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
    }
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.createCharts()
  },
  methods: {
    createCharts () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.chart)
      // 绘制图表
      const option = this.option
      myChart.setOption(option)
    },
    handleClose () {
      this.$emit('handleClose')
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
