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
          startTime: '2018-02-01 08:00',
          endTime: '2018-02-01 12:00',
          timeInterval: 15 * 60 * 1000,
          lineInterval: 3
        }
      }
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
          width: 40,
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
          startTime: '2018-02-01 08:00',
          endTime: '2018-02-01 12:00',
          timeInterval: 15 * 60 * 1000,
          lineInterval: 3
        },
        drugNumber: 10
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
// eslint-disable-next-line no-unused-vars
for (const parent in configurationItems) {
  console.log(parent)
  configurationItems[parent].forEach(item => {
    configurationMap[item] = {
      parent
    }
  })
}
console.log(configurationMap)

export {
  configurationMap
}
