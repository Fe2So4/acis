const Mock = require('mockjs') // 引入mockJS
const MR = Mock.Random // 提mock的随机对象
// 由于jsonServer接收的是一个对象或者是函数，所以此文件需要对外导出一个对象或者函数
// // 注意：在使用mockJS的api生成随机数据时，会产生相同数据，如果需要修复这一bug，可自行将id进行随机操作
function mapData (num) {
  const data = []
  for (let i = 1; i <= num; i++) {
    data.push({
      'id|': i,
      src: `@image('640x300',@color,${i})`,
      detail: {
        title: '@ctitle(10,20)',
        price: '@float(99,999,2,2)',
        sail: '@integer(0,999)',
        detail1: "@image('640x300',@color,,png,@csentence(3,5)",
        detail2: "@image('640x300',@color,,png,@csentence(3,5)",
        detail3: "@image('640x300',@color,,png,@csentence(3,5)"
      }
    })
  }
  return data
};
module.exports = () => {
  const data = Mock.mock({
    homeList: mapData(20),
    banner: mapData(5),
    productsList: mapData(20),
    'user|10': [
      {
        'id|+1': 1,
        nickName: '@cname(3,6)',
        address: '@province',
        tel: '@string("number",11)',
        naughtyValue: '@integer(0,100)',
        headPortrait: '@image("100x100",@color,,,@cword)'
      }
    ]
  })
  return data
}
