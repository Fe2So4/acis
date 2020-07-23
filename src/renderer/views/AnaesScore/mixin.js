import request from '@/utils/requestForMock'
import {
  getAnesthesiaGradeItem,
  showAnesthesiaGradeItem,
  saveAnesthesiaGrade,
  calculateAnesthesiaGrade
} from '@/api/anaesScore'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  computed: {
    ...mapState(['operationId', 'patientId'])
  },
  created () {
    this.getGradeItemAndValue()
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
    // 保存
    saveAnesthesiaGrade (list) {
      return request({
        method: 'post',
        url: saveAnesthesiaGrade,
        params: {
          anesthesiaScoreId: this.anesthesiaScoreId,
          operationId: this.operationId,
          patientId: this.patientId
        },
        data: list
      })
    },
    // 获取已填写过的评分项
    getDirtyList () {
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
    calculateAnesthesiaGrade () {
      return request({
        method: 'post',
        url: calculateAnesthesiaGrade,
        params: {
          anesthesiaScoreId: this.anesthesiaScoreId,
          operationId: this.operationId,
          patientId: this.patientId
        }
      }).then(res => {
        console.log(res)
      })
    },
    initGroups (itemList, valueList) {
      Object.keys(this.group).forEach(key => {
        this.group[key] = this.initGroup(itemList, valueList, key)
      })
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
      const list = this.getDirtyList()
      if (list.length === 0) {
        return this.$message({
          message: '未填写任何评分项',
          type: 'info'
        })
      }
      const res = await this.saveAnesthesiaGrade(list)
      if (res.data.success) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '保存失败',
          type: 'warning'
        })
      }
    },
    calculate () {
      this.calculateAnesthesiaGrade()
    }
  }
}
