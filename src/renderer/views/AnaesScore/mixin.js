import request from '@/utils/requestForMock'
import {
  getAnesthesiaGradeItem,
  showAnesthesiaGradeItem,
  showTotalScore,
  // saveAnesthesiaGrade,
  calculateAnesthesiaGrade
} from '@/api/anaesScore'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden',
          padding: '0 20px'
        }
      ],
      group: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
      },
      scoreCriticalDegree: '', // 危重程度
      scoreMortality: '', // 死亡率
      grossScore: '', // 总分
      scoreClass: '', // 等级
      valueSnapshot: ''
    }
  },
  computed: {
    ...mapState(['operationId', 'patientId'])
  },
  created () {
    this.getGradeItemAndValue()
    this.showTotalScore()
  },
  methods: {
    getGradeItemAndValue () {
      return Promise.all([
        this.getAnesthesiaGradeItem(),
        this.showAnesthesiaGradeItem()
      ]).then(res => {
        const [responseItem, responseValue] = res
        if (
          responseItem.data.success &&
          Array.isArray(responseItem.data.data) &&
          responseValue.data.success &&
          Array.isArray(responseValue.data.data)
        ) {
          const itemList = responseItem.data.data
          const valueList = responseValue.data.data
          this.initGroups(itemList, valueList)
        }
      })
    },
    getAnesthesiaGradeItem () {
      return request({
        url: getAnesthesiaGradeItem,
        method: 'post',
        params: {
          gradingTypeId: this.anesthesiaScoreId
        }
      })
    },
    // 回显选项
    showAnesthesiaGradeItem () {
      return request({
        method: 'post',
        url: showAnesthesiaGradeItem,
        params: {
          anesthesiaScoreId: this.anesthesiaScoreId,
          operationId: this.operationId,
          patientId: this.patientId
        }
      })
    },
    // 回显总分
    showTotalScore () {
      return request({
        method: 'post',
        url: showTotalScore,
        params: {
          anesthesiaScoreId: this.anesthesiaScoreId,
          operationId: this.operationId,
          patientId: this.patientId
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            ({
              ScoreCriticalDegree: this.scoreCriticalDegree,
              ScoreMortality: this.scoreMortality,
              GrossScore: this.grossScore,
              ScoreClass: this.scoreClass
            } = res.data.data)
          }
        }
      )
    },
    // 保存
    // saveAnesthesiaGrade (list) {
    //   return request({
    //     method: 'post',
    //     url: saveAnesthesiaGrade,
    //     params: {
    //       anesthesiaScoreId: this.anesthesiaScoreId,
    //       operationId: this.operationId,
    //       patientId: this.patientId
    //     },
    //     data: list
    //   })
    // },
    // 获取已填写过的评分项
    getFilledList () {
      return [...Object.values(this.group)].reduce((acc, group) => {
        let values = group.filter(item => item.value)
        const { length } = values
        if (!length) {
          return acc
        }
        values = values.map(item => {
          const obj = {};
          ({
            id: obj.id,
            group: obj.group,
            label: obj.label,
            value: obj.value,
            score: obj.score
          } = item)
          const { options } = item
          if (options) {
            const option = item.options.find(
              option => option.label === obj.value
            )
            if (option) {
              obj.score = option.score
            }
          }
          return obj
        })
        return [...acc, ...values]
      }, [])
    },
    // 点击评分
    calculateAnesthesiaGrade (list) {
      return request({
        method: 'post',
        url: calculateAnesthesiaGrade,
        params: {
          anesthesiaScoreId: this.anesthesiaScoreId,
          operationId: this.operationId,
          patientId: this.patientId
        },
        data: list
      }).then(res => {
        if (res.data.success) {
          ({
            ScoreCriticalDegree: this.scoreCriticalDegree,
            ScoreMortality: this.scoreMortality,
            GrossScore: this.grossScore,
            ScoreClass: this.scoreClass
          } = res.data.data)
          // 保存快照
          this.valueSnapshot = JSON.stringify(this.group)
        }
      })
    },
    // 初始化各组
    initGroups (itemList, valueList) {
      Object.keys(this.group).forEach(key => {
        this.group[key] = this.initGroup(itemList, valueList, key)
      })
      // 生成快照
      this.valueSnapshot = JSON.stringify(this.group)
    },
    initGroup (itemList, valueList, id) {
      const listItem = itemList.find(item => item.group - id === 0)
      if (listItem) {
        const { children } = listItem
        if (children) {
          children.forEach(item => {
            let value
            const valueItem = valueList.find(
              valueItem => valueItem.id === item.id
            )
            if (valueItem) {
              switch (item.type) {
                case 'checkbox':
                  // 回显时布尔值为字符串
                  value = valueItem.value === 'true'
                  break
                default:
                  value = valueItem.value
              }
            } else {
              switch (item.type) {
                case 'checkbox':
                  value = false
                  break
                default:
                  value = ''
              }
            }

            item.value = value
            item.group = id
          })
        }
        return children || []
      }
      return []
    },
    // 清空
    clear () {
      this.scoreCriticalDegree = '' // 危重程度
      this.scoreMortality = '' // 死亡率
      this.grossScore = '' // 总分
      this.scoreClass = '' // 等级
      Object.values(this.group).forEach(group => {
        group.forEach(item => {
          let value = ''
          switch (item.type) {
            case 'checkbox':
              value = false
              break
            default:
          }
          item.value = value
        })
      })
    },
    async save () {
      // const list = this.getFilledList()
      // if (list.length === 0) {
      //   return this.$message({
      //     message: '未填写任何评分项',
      //     type: 'info'
      //   })
      // }
      // const res = await this.saveAnesthesiaGrade(list)
      // if (res.data.success) {
      //   this.$message({
      //     message: '保存成功',
      //     type: 'success'
      //   })
      // } else {
      //   this.$message({
      //     message: '保存失败',
      //     type: 'warning'
      //   })
      // }
    },
    // 判断是否有修改值
    validateModified () {
      return this.valueSnapshot === JSON.stringify(this.group)
    },
    async calculate () {
      if (this.validateModified()) return
      const list = this.getFilledList()
      if (list.length === 0) {
        return this.$message({
          message: '未填写任何评分项',
          type: 'info'
        })
      }
      await this.calculateAnesthesiaGrade(list)
    }
  }
}
