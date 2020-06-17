export default function getConfigurationItems (widgetName) {
  switch (widgetName) {
    case 'widget-physical-sign':
      return {
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
            },
            {
              index: 1,
              values: [
                {
                  value: 30,
                  label: '30'
                },
                {
                  value: 40,
                  label: 40
                },
                {
                  value: 50,
                  label: '顶部'
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
    case 'widget-input':
    case 'widget-textarea':
      return {
        font: {
          size: 9,
          weight: 'normal',
          lineHeight: 30,
          textAlign: 'left'
        },
        border: {
          position: ['top', 'right', 'bottom', 'left'],
          color: '#000000',
          width: 1
        },
        placeholder: '占位内容'
      }
    case 'widget-text':
      return {
        font: {
          size: 9,
          weight: 'normal',
          lineHeight: 30,
          textAlign: 'left'
        },
        border: {
          position: ['top', 'right', 'bottom', 'left'],
          color: '#000000',
          width: 1
        },
        text: '文本内容'
      }
    default:
      return {}
  }
}

const configurationItems = {
  layout: ['width', 'height'],
  position: ['positionX', 'positionY']
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
