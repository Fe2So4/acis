export default function getConfigurationItems (widgetName) {
  const border = {
    position: ['top', 'right', 'bottom', 'left'],
    color: '#000000',
    width: 1
  }
  const font = {
    size: 9,
    weight: 'normal',
    lineHeight: 30,
    textAlign: 'left'
  }
  // 源数据
  const dataSource = {
    tableName: '',
    className: ''
  }
  // 字典
  const dictionarySource = {
    dictTableName: '',
    dictClassName: ''
  }
  switch (widgetName) {
    case 'widget-checkbox-group':
      return {
        singleSelect: '1',
        collections: [{ label: '项目1', value: '1' }, { label: '项目2', value: '2' }]
      }
    case 'widget-anaes-drug':
      return {
        leftPartWidthRate: 0.18,
        rightPartWidthRate: 0.1,
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
          startTime: '2020-07-01 09:00',
          endTime: '2020-07-01 13:00',
          timeInterval: 15 * 60 * 1000,
          lineInterval: 3
        },
        drugNumber: 10
      }
    case 'widget-in-out':
      return {
        leftPartWidthRate: 0.18,
        rightPartWidthRate: 0.1,
        leftTitle: {
          text: '输液输血',
          width: 40,
          lineHeight: 30
        },
        timeTitle: {
          text: '时间',
          height: 0, // 是否显示顶部时间条，将高度置为0即可
          lineHeight: 30
        },
        totalTitle: {
          text: '总量'
        },
        xAxis: {
          startTime: '2018-02-01 08:00',
          endTime: '2018-02-01 12:00',
          timeInterval: 15 * 60 * 1000,
          lineInterval: 3
        },
        drugNumber: 10,
        infusion: { text: '输液', num: 3 },
        bloodTransfusion: {
          text: '输血', num: 2
        },
        outPut: { text: '用量', num: 0 }
      }
    case 'widget-anaes-table':
      return {
        leftTitle: {
          text: '监测',
          width: 40,
          lineHeight: 30
        },
        // 行标题宽度
        rowTitle: {
          width: 128
        },
        rowList: [
          { text: '心电图', colNum: 2, signCode: 212, signItem: 'VTE', label: '第1行' },
          { text: '氧饱和度', colNum: 1, signCode: 212, signItem: 'VTE', label: '第2行' },
          { text: '潮气量', colNum: 2, signCode: 212, signItem: 'VTE', label: '第3行' },
          { text: 'f', colNum: 1, signCode: 212, signItem: 'VTE', label: '第4行' },
          { text: 'PEAK', colNum: 2, signCode: 212, signItem: 'VTE', label: '第5行' },
          { text: 'PEEP', colNum: 2, signCode: 212, signItem: 'VTE', label: '第6行' },
          { text: '中心静脉压', colNum: 2, signCode: 212, signItem: 'VTE', label: '第7行' },
          { text: '尿量', colNum: 1, signCode: 212, signItem: 'VTE', label: '第8行' },
          { text: '累计失血量', colNum: 2, signCode: 212, signItem: 'VTE', label: '第9行' }
        ],
        anaesColumn: {
          num: 8
        }
      }
    case 'widget-image':
      return {
        imgUrl: 'http://47.103.105.200/htmlFile/056a0b71-b085-4947-a71f-6df7d0529e50_100000000.jpg'
      }
    case 'widget-physical-sign':
      return {
        border,
        leftPartWidthRate: 0.18,
        rightPartWidthRate: 0.1,
        leftTitle: {
          text: '左标题',
          width: 50,
          lineHeight: 30
        },
        timeTitle: {
          text: '时间',
          height: 30,
          lineHeight: 30
        },
        eventTitle: {
          text: '事件标题',
          height: 40,
          lineHeight: 40
        },
        totalTitle: {
          text: '图例'
        },
        yAxis: {
          list: [
            {
              label: 'Y轴1',
              index: 0,
              values: [
                {
                  value: 0,
                  label: '℃'
                },
                {
                  value: 10,
                  label: 10
                },
                {
                  value: 20,
                  label: '到顶啦'
                }
              ]
            }
          ],
          lineInterval: 2
        },
        xAxis: {
          startTime: '2018-01-01 08:00',
          endTime: '2018-01-01 12:00',
          timeInterval: 15,
          lineInterval: 3
        }
      }
    case 'widget-news':
      return {
        font,
        border,
        column: 3
      }
    case 'widget-input':
      return {
        font,
        border,
        placeholder: '占位内容',
        readonly: false,
        dataSource,
        multiSelect: false,
        dictionarySource
      }
    case 'widget-textarea':
      return {
        font,
        border,
        placeholder: '占位内容',
        dataSource
      }
    case 'widget-text':
      return {
        font,
        border,
        text: '文本内容'
      }
    case 'widget-line':
      return {
        direction: 'horizontal'
      }
    default:
      return {}
  }
}

const configurationItems = {
  layout: ['width', 'height'],
  position: ['positionX', 'positionY'],
  data: ['dataSource', 'dictionarySource']
}

const configurationMap = {}
let parent
for (parent in configurationItems) {
  configurationItems[parent].forEach(item => {
    configurationMap[item] = {
      parent
    }
  })
}

export {
  configurationMap
}
