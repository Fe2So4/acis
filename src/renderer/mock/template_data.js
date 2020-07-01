export default {
  code: 200,
  success: true,
  data: [
    // {
    //   border: { color: '#000000', position: ['top', 'right', 'bottom', 'left'], width: 1 },
    //   eventTitle: { height: 40, lineHeight: 40, text: '事件标题' },
    //   height: 527,
    //   id: 'e8822910-1e48-43e3-ad88-2c49b3db0c67',
    //   leftPartWidthRate: 0.18,
    //   leftTitle:
    // { lineHeight: 30, text: '左标题', width: 50 },
    //   name: 'widget-physical-sign',
    //   positionX: 0,
    //   positionY: 174,
    //   rightPartWidthRate: 0.1,
    //   timeTitle: { height: 30, lineHeight: 30, text: '时间' },
    //   totalTitle: { text: '图例' },
    //   width: 788,
    //   xAxis: { endTime: '2018-01-01 12:00', lineInterval: 3, startTime: '2018-01-01 08:00', timeInterval: 15 },
    //   yAxis: {
    //     lineInterval: 2,
    //     list: [
    //       {
    //         index: 0,
    //         label: 'Y轴1',
    //         values: [{ label: '℃', value: 0 }, { label: 10, value: 10 }, { label: '到顶啦', value: 20 }]
    //       }, { index: '1', label: 'Y坐标轴', values: [{ label: '0', value: 0 }, { label: '50', value: '50' }, { label: '100', value: '100' }] }]
    //   }
    // }
    {
      leftPartWidthRate: 0.18,
      rightPartWidthRate: 0.1,
      height: 400,
      width: 788,
      positionX: 0,
      positionY: 100,
      leftTitle: {
        text: '麻醉用药',
        width: 50,
        lineHeight: 30
      },
      timeTitle: {
        text: '时间',
        height: 30,
        lineHeight: 30
      },
      totalTitle: {
        text: '总量'
      },
      xAxis: {
        startTime: '2020-06-23 09:00',
        endTime: '2020-06-23 13:00',
        timeInterval: 15 * 60 * 1000,
        lineInterval: 3
      },
      drugNumber: 10,
      name: 'widget-anaes-drug'
    }
    // {
    //   name: 'widget-monitor-table',
    //   height: 400,
    //   width: 788,
    //   positionX: 0,
    //   positionY: 100,
    //   leftTitle: {
    //     text: '监测',
    //     width: 40,
    //     lineHeight: 30
    //   },
    //   // 行标题宽度
    //   rowTitle: {
    //     width: 128
    //   },
    //   rowList: [
    //     { text: '心电图', colNum: 2, signCode: 212, signItem: 'VTE', label: '第1行' },
    //     { text: '氧饱和度', colNum: 1, signCode: 212, signItem: 'VTE', label: '第2行' },
    //     { text: '潮气量', colNum: 1, signCode: 212, signItem: 'VTE', label: '第3行' },
    //     { text: 'f', colNum: 1, signCode: 212, signItem: 'VTE', label: '第4行' },
    //     { text: 'PEAK', colNum: 1, signCode: 212, signItem: 'VTE', label: '第5行' },
    //     { text: 'PEEP', colNum: 1, signCode: 212, signItem: 'VTE', label: '第6行' },
    //     { text: '中心静脉压', colNum: 1, signCode: 212, signItem: 'VTE', label: '第7行' },
    //     { text: '尿量', colNum: 1, signCode: 212, signItem: 'VTE', label: '第8行' },
    //     { text: '累计失血量', colNum: 1, signCode: 212, signItem: 'VTE', label: '第9行' }
    //   ],
    //   anaesColumn: {
    //     num: 8
    //   }
    // }
  ]
}
