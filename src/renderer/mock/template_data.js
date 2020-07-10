export default {
  code: 200,
  success: true,
  data: {
    list: [
      { id: 'paper', name: 'paper', width: 210, height: 107 },
      { collections: [{ label: '男', value: '男' }, { label: '女', value: '女' }], height: 30, id: '0510588f-6cc9-4483-9dc2-4f34e9b29e64', name: 'widget-checkbox-group', positionX: 394, positionY: 20, singleSelect: '1', width: 215 },
      {
        border: {
          color: '#000000',
          position: [
            'top',
            'right',
            'bottom',
            'left'
          ],
          width: 1
        },
        dataSource: {
          className: 'patient_id',
          tableName: 'acis_ope_apply_info'
        },
        dictionarySource: {
          dictTableName: '',
          conditionClassNameId: '',
          dictClassName: '',
          dictRelationName: ''
        },
        font: {
          lineHeight: 30,
          size: 9,
          textAlign: 'left',
          weight: 'normal'
        },
        height: 30,
        id: 'e871bcfa-cac1-4a4f-b67c-d66ad6432a73',
        multiSelect: false,
        name: 'widget-input',
        placeholder: '占位内容',
        positionX: 0,
        positionY: 25,
        readonly: false,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: [
            'top',
            'right',
            'bottom',
            'left'
          ],
          width: 1
        },
        dataSource: {
          className: 'inpatient_ward',
          tableName: 'acis_ope_apply_info'
        },
        dictionarySource: {
          dictTableName: 'acis_ope_apply_info',
          conditionClassNameId: '',
          dictClassName: 'patient_id',
          dictRelationName: ''
        },
        font: {
          lineHeight: 30,
          size: 9,
          textAlign: 'left',
          weight: 'normal'
        },
        height: 30,
        id: 'bb7f8408-da1b-4e98-9aa0-cfa7ab42e163',
        multiSelect: false,
        name: 'widget-input',
        placeholder: '占位内容',
        positionX: 200,
        positionY: 25,
        readonly: false,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: [
            'top',
            'right',
            'bottom',
            'left'
          ],
          width: 1
        },
        eventTitle: {
          height: 40,
          lineHeight: 40,
          text: '事件标题'
        },
        height: 291,
        id: '7b82328b-2b05-4450-aa1b-e54c5be3c06e',
        leftPartWidthRate: 0.18,
        leftTitle: {
          lineHeight: 30,
          text: '左标题',
          width: 50
        },
        name: 'widget-physical-sign',
        positionX: 0,
        positionY: 116,
        rightPartWidthRate: 0.1,
        timeTitle: {
          height: 30,
          lineHeight: 30,
          text: '时间'
        },
        totalTitle: {
          text: '图例'
        },
        width: 792,
        xAxis: {
          endTime: '2018-01-01 12:00',
          lineInterval: 3,
          startTime: '2018-01-01 08:00',
          timeInterval: 15
        },
        yAxis: {
          lineInterval: 2,
          list: [
            {
              index: 0,
              label: 'Y轴1',
              values: [
                {
                  label: '℃',
                  value: 20
                },
                {
                  label: 30,
                  value: 30
                },
                {
                  label: '到顶啦',
                  value: 40
                }
              ]
            },
            {
              index: '1',
              label: 'Y坐标轴',
              values: [
                {
                  label: '0',
                  value: 0
                },
                {
                  label: '200',
                  value: '200'
                },
                {
                  label: '400',
                  value: '400'
                }
              ]
            }
          ]
        }
      },
      {
        border: {
          color: '#000000',
          position: [
            'top',
            'right',
            'bottom',
            'left'
          ],
          width: 1
        },
        column: 4,
        font: {
          lineHeight: 30,
          size: 9,
          textAlign: 'left',
          weight: 'normal'
        },
        height: 379,
        id: 'fc54b3cf-923f-4425-b88c-540c9a3f3ead',
        name: 'widget-news',
        positionX: 0,
        positionY: 406,
        width: 792
      }
      // {
      //   name: 'widget-anaes-drug',
      //   width: 792,
      //   height: 400,
      //   positionX: 0,
      //   positionY: 0,
      //   leftPartWidthRate: 0.18,
      //   rightPartWidthRate: 0.1,
      //   leftTitle: {
      //     text: '麻醉用药',
      //     width: 40,
      //     lineHeight: 30
      //   },
      //   timeTitle: {
      //     text: '时间',
      //     height: 30, // 是否显示顶部时间条，将高度置为0即可
      //     lineHeight: 30
      //   },
      //   totalTitle: {
      //     text: '总量'
      //   },
      //   xAxis: {
      //     startTime: '2020-07-01 09:00',
      //     endTime: '2020-07-01 13:00',
      //     timeInterval: 15 * 60 * 1000,
      //     lineInterval: 3
      //   },
      //   drugNumber: 10
      // }
    ],
    isIntraoperative: true
  }
}
