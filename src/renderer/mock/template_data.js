export default {
  code: 200,
  success: true,
  data: {
    list: [
      { height: 297, id: 'paper', name: 'paper', width: 210 },
      {
        border: { color: '#000000', position: ['bottom'], width: 1 },
        dataSource: { className: '', tableName: '' },
        dictionarySource: {
          conditionClassNameId: '',
          dictClassName: '',
          dictRelationName: '',
          dictTableName: ''
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'e871bcfa-cac1-4a4f-b67c-d66ad6432a73',
        multiSelect: false,
        name: 'widget-input',
        placeholder: '',
        positionX: 100,
        positionY: 157,
        readonly: false,
        width: 100
      },
      {
        border: { color: '#000000', position: ['bottom'], width: 1 },
        dataSource: {
          className: 'inpatient_ward',
          tableName: 'acis_ope_apply_info'
        },
        dictionarySource: {
          conditionClassNameId: 'deatil_name',
          dictClassName: 'dict_code',
          dictRelationName: 'E0012',
          dictTableName: 'acis_dict_common_detail'
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'bb7f8408-da1b-4e98-9aa0-cfa7ab42e163',
        multiSelect: true,
        name: 'widget-input',
        placeholder: '',
        positionX: 100,
        positionY: 217,
        readonly: false,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        eventTitle: { height: 40, lineHeight: 40, text: '事件标题' },
        height: 236,
        id: '7b82328b-2b05-4450-aa1b-e54c5be3c06e',
        leftPartWidthRate: 0.18,
        leftTitle: { lineHeight: 30, text: '左标题', width: 50 },
        name: 'widget-physical-sign',
        positionX: 0,
        positionY: 765,
        rightPartWidthRate: 0.1,
        timeTitle: { height: 30, lineHeight: 30, text: '时间' },
        totalTitle: { text: '图例' },
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
                { label: '℃', value: 20 },
                { label: 30, value: 30 },
                { label: '到顶啦', value: 40 }
              ]
            },
            {
              index: '1',
              label: 'Y坐标轴',
              values: [
                { label: '0', value: 0 },
                { label: '200', value: '200' },
                { label: '400', value: '400' }
              ]
            }
          ]
        }
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        column: 4,
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 120,
        id: 'fc54b3cf-923f-4425-b88c-540c9a3f3ead',
        name: 'widget-news',
        positionX: 0,
        positionY: 1001,
        width: 792
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: {
          lineHeight: 134,
          size: 39,
          textAlign: 'center',
          weight: 'normal'
        },
        height: 134,
        id: '62686589-f3d4-46b6-9ca6-1af374b81a4b',
        name: 'widget-text',
        positionX: 178.5,
        positionY: 0,
        text: '啥  啥 啥 文 书',
        width: 435
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'c9edd06d-dd5d-41cf-a5a5-d33879f583f8',
        name: 'widget-text',
        positionX: 0,
        positionY: 157,
        text: '输入框',
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'ef72953b-74aa-4541-8e5f-bc2224fc24e6',
        name: 'widget-text',
        positionX: 0,
        positionY: 187,
        text: '单选下拉框',
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: '00cc9976-c62b-4a8c-bba2-82be95836bfd',
        name: 'widget-text',
        positionX: 0,
        positionY: 217,
        text: '多选下拉框',
        width: 100
      },
      {
        border: { color: '#000000', position: ['bottom'], width: 1 },
        dataSource: {
          className: 'patient_id',
          tableName: 'acis_ope_apply_info'
        },
        dictionarySource: {
          conditionClassNameId: 'deatil_name',
          dictClassName: 'dict_code',
          dictRelationName: 'E0012',
          dictTableName: 'acis_dict_common_detail'
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'f3e80fbc-2fa7-4300-90ab-b5e9cc5394ba',
        multiSelect: false,
        name: 'widget-input',
        placeholder: '',
        positionX: 100,
        positionY: 187,
        readonly: false,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'f16d3ced-7a5b-4fdd-8e19-7b5b3f24089c',
        name: 'widget-text',
        positionX: 0,
        positionY: 247,
        text: '单选框',
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: '3b05e502-da56-4259-a0c2-3543a6932325',
        name: 'widget-text',
        positionX: 0,
        positionY: 277,
        text: '多选框',
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        collections: [
          { label: '项目1', value: '1' },
          { label: '项目2', value: '2' }
        ],
        dataSource: { className: '', tableName: '' },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: '33abc726-738f-4799-b2be-bcb12e67b553',
        name: 'widget-checkbox-group',
        positionX: 100,
        positionY: 247,
        singleSelect: '1',
        width: 269
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        collections: [
          { label: '项目1', value: '1' },
          { label: '项目2', value: '2' }
        ],
        dataSource: { className: '', tableName: '' },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 30,
        id: 'fc2d8a8c-dde6-4b84-b43e-6a80b1d33384',
        name: 'widget-checkbox-group',
        positionX: 100,
        positionY: 277,
        singleSelect: '2',
        width: 231
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        dataSource: { className: '', tableName: '' },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        height: 152,
        id: 'd5abbe8e-86dd-4efa-b130-0a082f0cc102',
        name: 'widget-textarea',
        placeholder: '占位内容',
        positionX: 0,
        positionY: 307,
        width: 331
      },
      // {
      //   bloodTransfusion: {
      //     num: 2,
      //     text: '输血'
      //   },
      //   drugNumber: 10,
      //   height: 203,
      //   id: '578761b8-c1e1-4a55-aeb7-859f06793aa4',
      //   infusion: {
      //     num: 3,
      //     text: '输液'
      //   },
      //   leftPartWidthRate: 0.18,
      //   leftTitle: {
      //     lineHeight: 30,
      //     text: '输液输血',
      //     width: 40
      //   },
      //   name: 'widget-in-out',
      //   outPut: {
      //     num: 0,
      //     text: '用量'
      //   },
      //   positionX: 0,
      //   positionY: 622,
      //   rightPartWidthRate: 0.1,
      //   timeTitle: {
      //     height: 0,
      //     lineHeight: 30,
      //     text: '时间'
      //   },
      //   totalTitle: {
      //     text: '总量'
      //   },
      //   width: 792,
      //   xAxis: {
      //     endTime: '2018-02-01 12:00',
      //     lineInterval: 3,
      //     startTime: '2018-02-01 08:00',
      //     timeInterval: 900000,
      //     list: [
      //       {
      //         label: '08:00'
      //       },
      //       {
      //         label: '08:15'
      //       },
      //       {
      //         label: '08:30'
      //       },
      //       {
      //         label: '08:45'
      //       },
      //       {
      //         label: '09:00'
      //       },
      //       {
      //         label: '09:15'
      //       },
      //       {
      //         label: '09:30'
      //       },
      //       {
      //         label: '09:45'
      //       },
      //       {
      //         label: '10:00'
      //       },
      //       {
      //         label: '10:15'
      //       },
      //       {
      //         label: '10:30'
      //       },
      //       {
      //         label: '10:45'
      //       },
      //       {
      //         label: '11:00'
      //       },
      //       {
      //         label: '11:15'
      //       },
      //       {
      //         label: '11:30'
      //       },
      //       {
      //         label: '11:45'
      //       }
      //     ]
      //   }
      // },
      // {
      //   anaesColumn: {
      //     num: 8
      //   },
      //   height: 139,
      //   id: 'a86659fd-ebf0-47c8-a93a-b9717038c419',
      //   leftTitle: {
      //     lineHeight: 30,
      //     text: '监测',
      //     width: 40
      //   },
      //   name: 'widget-anaes-table',
      //   positionX: 0,
      //   positionY: 331,
      //   rowList: [
      //     {
      //       colNum: 2,
      //       label: '第1行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '心电图'
      //     },
      //     {
      //       colNum: 1,
      //       label: '第2行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '氧饱和度'
      //     },
      //     {
      //       colNum: 2,
      //       label: '第3行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '潮气量'
      //     },
      //     {
      //       colNum: 1,
      //       label: '第4行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: 'f'
      //     },
      //     {
      //       colNum: 2,
      //       label: '第5行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: 'PEAK'
      //     },
      //     {
      //       colNum: 2,
      //       label: '第6行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: 'PEEP'
      //     },
      //     {
      //       colNum: 2,
      //       label: '第7行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '中心静脉压'
      //     },
      //     {
      //       colNum: 1,
      //       label: '第8行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '尿量'
      //     },
      //     {
      //       colNum: 2,
      //       label: '第9行',
      //       signCode: 212,
      //       signItem: 'VTE',
      //       text: '累计失血量'
      //     }
      //   ],
      //   rowTitle: {
      //     width: 128
      //   },
      //   width: 792
      // },
      {
        drugNumber: 10,
        height: 154,
        id: '979362f8-3d5a-4d2d-9911-503cad5437fc',
        leftPartWidthRate: 0.18,
        leftTitle: {
          lineHeight: 30,
          text: '麻醉用药',
          width: 50
        },
        name: 'widget-anaes-drug',
        positionX: 0,
        positionY: 469,
        rightPartWidthRate: 0.1,
        timeTitle: {
          height: 30,
          lineHeight: 30,
          text: '时间'
        },
        totalTitle: {
          text: '总量'
        },
        width: 792,
        xAxis: {
          endTime: '2020-07-01 13:00',
          lineInterval: 3,
          startTime: '2020-07-01 09:00',
          timeInterval: 900000,
          list: [
            {
              label: '09:00'
            },
            {
              label: '09:15'
            },
            {
              label: '09:30'
            },
            {
              label: '09:45'
            },
            {
              label: '10:00'
            },
            {
              label: '10:15'
            },
            {
              label: '10:30'
            },
            {
              label: '10:45'
            },
            {
              label: '11:00'
            },
            {
              label: '11:15'
            },
            {
              label: '11:30'
            },
            {
              label: '11:45'
            },
            {
              label: '12:00'
            },
            {
              label: '12:15'
            },
            {
              label: '12:30'
            },
            {
              label: '12:45'
            }
          ]
        }
      }
    ],
    isIntraoperative: true
  }
}
