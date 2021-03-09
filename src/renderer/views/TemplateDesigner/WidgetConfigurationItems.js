import { Cell } from '../../model/WidgetTable'
export default function getConfigurationItems(widgetName) {
  // 边框
  const border = {
    position: ['top', 'right', 'bottom', 'left'],
    color: '#000000',
    width: 1,
    style: 'solid'
  }
  // 文字
  const font = {
    size: 9,
    weight: 'normal',
    lineHeight: 15,
    textAlign: 'left',
    textIndent: 0,
    color: '#000000'
  }
  // 源数据
  const dataSource = {
    tableName: '',
    className: ''
  }
  // 字典
  const dictionarySource = {
    dictTableName: '',
    conditionClassNameId: '',
    dictClassName: '',
    dictRelationName: ''
  }
  // 必填
  const required = false
  // 标签名
  const tagName = ''
  // 表格
  const widgetTableConfiguration = {
    font,
    border,
    cells: [[
      new Cell('0-1_0-1'),
      new Cell('0-1_1-2')
    ],
    [
      new Cell('1-2_0-1'),
      new Cell('1-2_1-2')
    ]]
  }
  switch (widgetName) {
    case 'widget-checkbox-group':
      return {
        border: Object.assign({}, border, {
          position: []
        }),
        font,
        singleSelect: '1',
        labelMargin: 10,
        collections: [
          {
            label: '项目1',
            value: '1'
          },
          {
            label: '项目2',
            value: '2'
          }
        ],
        dataSource
      }
    case 'widget-anaes-drug':
      return {
        leftPartWidthRate: 0.18,
        rightPartWidthRate: 0.1,
        border,
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
          startTime: '2018-01-01 08:00',
          endTime: '2018-01-01 12:00',
          timeInterval: 15,
          lineInterval: 3
        },
        drugNumber: 10
      }
    case 'widget-in-out':
      return {
        border,
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
          startTime: '2018-01-01 08:00',
          endTime: '2018-01-01 12:00',
          timeInterval: 15,
          lineInterval: 3
        },
        drugNumber: 10,
        infusion: { text: '输液', num: 3, width: 30 },
        bloodTransfusion: {
          text: '输血', num: 2
        },
        outPut: { text: '出量', num: 0, width: 30 }
      }
    case 'widget-anaes-table':
      return {
        border,
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
        border,
        dataSource
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
        border: Object.assign({}, border, {
          position: ['bottom']
        }),
        placeholder: '',
        readonly: false,
        required,
        dataSource,
        tagName,
        multiSelect: false,
        dictionarySource
      }
    case 'widget-date-picker':
      return {
        font,
        border: Object.assign({}, border, {
          position: ['bottom']
        }),
        placeholder: '',
        readonly: false,
        required,
        dataSource,
        tagName,
        datePickerType: 'datetime'
      }
    case 'widget-textarea':
      return {
        font,
        border,
        placeholder: '占位内容',
        readonly: false,
        required,
        dataSource,
        tagName
      }
    case 'widget-text':
      return {
        font,
        border: Object.assign({}, border, {
          position: []
        }),
        text: '文本内容'
      }
    case 'widget-pagination':
      return {
        font,
        border: Object.assign({}, border, {
          position: []
        })
      }
    case 'widget-line':
      return {
        direction: 'horizontal'
      }
    case 'widget-table':
      return widgetTableConfiguration
    case 'widget-table-fj':
      return {
        font,
        border,
        columns: {
          list: [
            {
              label: '表头1',
              width: 'auto',
              field: '字段'
            },
            {
              label: '表头2',
              width: '80',
              field: '字段'
            }
          ]
        },
        row: {
          height: 30,
          length: 4
        },
        request: {
          api: '',
          method: 'get'
        }
      }
    case 'widget-anaesthesia-doctor':
      return {
        tagName,
        font,
        border: Object.assign({}, border, {
          position: ['bottom']
        }),
        placeholder: '',
        dataSource
      }
    case 'widget-anaes-after':
      return {
        tagName,
        font,
        border: Object.assign({}, border, {
          position: ['bottom']
        }),
        placeholder: '',
        dataSource
      }
    case 'widget-anaes-method':
      return {
        tagName,
        font,
        border: Object.assign({}, border, {
          position: ['bottom']
        }),
        placeholder: '',
        dataSource
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

const getWidgetDefaultSize = function (widgetName) {
  switch (widgetName) {
    case 'widget-text':
      return {
        width: 60,
        height: 15
      }
    case 'widget-input':
    case 'widget-line':
      return {
        width: 50,
        height: 15
      }
    default:
      return {
        width: 100,
        height: 30
      }
  }
}

export {
  configurationMap,
  getWidgetDefaultSize
}
