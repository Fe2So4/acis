export default {
  code: 200,
  success: true,
  data: {
    list: [
      { height: 297, id: 'paper', name: 'paper', width: 210 },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: { color: '#000000', position: ['bottom'], width: 1 },
        placeholder: '',
        readonly: false,
        required: true,
        dataSource: { className: '', tableName: '' },
        tagName: '',
        multiSelect: false,
        dictionarySource: {
          conditionClassNameId: '',
          dictClassName: '',
          dictRelationName: '',
          dictTableName: ''
        },
        height: 30,
        id: 'e871bcfa-cac1-4a4f-b67c-d66ad6432a73',
        name: 'widget-input',
        positionX: 100,
        positionY: 157,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: { color: '#000000', position: ['bottom'], width: 1 },
        placeholder: '',
        readonly: false,
        required: false,
        dataSource: {
          className: 'inpatient_ward',
          tableName: 'acis_ope_apply_info'
        },
        tagName: '',
        multiSelect: true,
        dictionarySource: {
          conditionClassNameId: 'deatil_name',
          dictClassName: 'dict_code',
          dictRelationName: 'E0012',
          dictTableName: 'acis_dict_common_detail'
        },
        height: 30,
        id: 'bb7f8408-da1b-4e98-9aa0-cfa7ab42e163',
        name: 'widget-input',
        positionX: 100,
        positionY: 217,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        leftPartWidthRate: 0.18,
        rightPartWidthRate: 0.1,
        leftTitle: { lineHeight: 30, text: '左标题', width: 50 },
        timeTitle: { height: 30, lineHeight: 30, text: '时间' },
        eventTitle: { height: 40, lineHeight: 40, text: '事件标题' },
        totalTitle: { text: '图例' },
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
        },
        xAxis: {
          endTime: '2018-01-01 12:00',
          lineInterval: 3,
          startTime: '2018-01-01 08:00',
          timeInterval: 15
        },
        height: 236,
        id: '7b82328b-2b05-4450-aa1b-e54c5be3c06e',
        name: 'widget-physical-sign',
        positionX: 0,
        positionY: 765,
        width: 792
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        column: 4,
        height: 120,
        id: 'fc54b3cf-923f-4425-b88c-540c9a3f3ead',
        name: 'widget-news',
        positionX: 0,
        positionY: 1001,
        width: 792
      },
      {
        font: {
          lineHeight: 134,
          size: 39,
          textAlign: 'center',
          weight: 'normal'
        },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '啥  啥 啥 文 书',
        height: 134,
        id: '62686589-f3d4-46b6-9ca6-1af374b81a4b',
        name: 'widget-text',
        positionX: 178.5,
        positionY: 0,
        width: 435
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '输入框',
        height: 30,
        id: 'c9edd06d-dd5d-41cf-a5a5-d33879f583f8',
        name: 'widget-text',
        positionX: 0,
        positionY: 157,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '单选下拉框',
        height: 30,
        id: 'ef72953b-74aa-4541-8e5f-bc2224fc24e6',
        name: 'widget-text',
        positionX: 0,
        positionY: 187,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '多选下拉框',
        height: 30,
        id: '00cc9976-c62b-4a8c-bba2-82be95836bfd',
        name: 'widget-text',
        positionX: 0,
        positionY: 217,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: { color: '#000000', position: ['bottom'], width: 1 },
        placeholder: '',
        readonly: false,
        required: false,
        dataSource: {
          className: 'patient_id',
          tableName: 'acis_ope_apply_info'
        },
        tagName: '',
        multiSelect: false,
        dictionarySource: {
          conditionClassNameId: 'deatil_name',
          dictClassName: 'dict_code',
          dictRelationName: 'E0012',
          dictTableName: 'acis_dict_common_detail'
        },
        height: 30,
        id: 'f3e80fbc-2fa7-4300-90ab-b5e9cc5394ba',
        name: 'widget-input',
        positionX: 100,
        positionY: 187,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '单选框',
        height: 30,
        id: 'f16d3ced-7a5b-4fdd-8e19-7b5b3f24089c',
        name: 'widget-text',
        positionX: 0,
        positionY: 247,
        width: 100
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        text: '多选框',
        height: 30,
        id: '3b05e502-da56-4259-a0c2-3543a6932325',
        name: 'widget-text',
        positionX: 0,
        positionY: 277,
        width: 100
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        singleSelect: '1',
        labelMargin: 10,
        collections: [
          { label: '项目1', value: '1' },
          { label: '项目2', value: '2' }
        ],
        dataSource: { className: '', tableName: '' },
        height: 30,
        id: '33abc726-738f-4799-b2be-bcb12e67b553',
        name: 'widget-checkbox-group',
        positionX: 100,
        positionY: 247,
        width: 269
      },
      {
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 0
        },
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        singleSelect: '2',
        labelMargin: 10,
        collections: [
          { label: '项目1', value: '1' },
          { label: '项目2', value: '2' }
        ],
        dataSource: { className: '', tableName: '' },
        height: 30,
        id: 'fc2d8a8c-dde6-4b84-b43e-6a80b1d33384',
        name: 'widget-checkbox-group',
        positionX: 100,
        positionY: 277,
        width: 231
      },
      {
        font: { lineHeight: 30, size: 9, textAlign: 'left', weight: 'normal' },
        border: {
          color: '#000000',
          position: ['top', 'right', 'bottom', 'left'],
          width: 1
        },
        placeholder: '占位内容',
        readonly: false,
        required: false,
        dataSource: { className: '', tableName: '' },
        tagName: '',
        height: 152,
        id: 'd5abbe8e-86dd-4efa-b130-0a082f0cc102',
        name: 'widget-textarea',
        positionX: 0,
        positionY: 307,
        width: 331
      },
      {
        font: {
          color: '#000000',
          lineHeight: 30,
          size: 9,
          textAlign: 'center',
          textIndent: 0,
          weight: 'normal'
        },
        border: { position: [], color: '#000000', width: 1 },
        height: 30,
        id: 'e970bc4b-e5c5-498d-81d0-7e3f3d95877a',
        name: 'widget-pagination',
        positionX: 231,
        positionY: 459,
        width: 100
      },
      {
        font: {
          size: 9,
          weight: 'normal',
          lineHeight: 15,
          textAlign: 'left',
          textIndent: 0,
          color: '#000000'
        },
        border: { position: ['bottom'], color: '#000000', width: 1 },
        placeholder: '',
        readonly: false,
        required: false,
        dataSource: { tableName: '', className: '' },
        tagName: '',
        datePickerType: 'datetime',
        height: 30,
        id: '852be10d-e6e6-41db-be05-275dbb4b83d4',
        name: 'widget-date-picker',
        positionX: 0,
        positionY: 459,
        width: 231
      }
    ],
    isIntraoperative: true
  }
}
