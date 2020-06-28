export default {
  code: 200,
  success: true,
  data: {
    list: [
      {
        signId: 1,
        name: '体温',
        yIndex: 0,
        label: '⊗',
        color: 'red',
        list: [
          {
            time: '2020-06-23 09:00',
            value: 10
          },
          {
            time: '2020-06-23 09:05',
            value: 12
          },
          {
            time: '2020-06-23 09:10',
            value: 3
          }
        ]
      },
      {
        signId: 2,
        name: '心跳',
        yIndex: 1,
        label: 'Ф',
        color: 'blue',
        list: [
          {
            time: '2020-06-23 09:00',
            value: 100
          },
          {
            time: '2020-06-23 09:05',
            value: 16
          },
          {
            time: '2020-06-23 09:10',
            value: 75
          }
        ]
      }
    ]
  }
}
