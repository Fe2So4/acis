<template>
  <div class="templateDesignerPage">
    <content-displayer :widget-list="widgetList" />
    <div>
      <el-button
        type="primary"
        @click="showList"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  getTemplateInfo,
  getTemplateData,
  getValueData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import ContentDisplayer from './ContentDisplayer'
export default {
  name: 'PageTemplateDesigner',
  components: {
    ContentDisplayer
  },
  data () {
    return {
      widgetList: []
    }
  },
  async created () {
    const templateInfo = await this.getTemplateInfo()
    this.getTemplateAndValueData(templateInfo)
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    getTemplateAndValueData ({ templateId, startTime, endTime }) {
      return Promise.all([
        request({
          url: getTemplateData,
          method: 'POST',
          data: {
            templateId
          }
        }),
        request({
          url: getValueData,
          method: 'POST',
          data: {
            templateId
          }
        })
      ]).then(res => {
        const [widgetList, valueList] = [res[0].data.data, res[1].data.data]
        widgetList.forEach(widget => {
          // 源数据赋值
          if (widget.dataSource) {
            const { tableName, className } = widget.dataSource
            const valueItem = valueList.find(
              item =>
                item.tableName === tableName && item.className === className
            )
            if (valueItem) {
              widget.value = valueItem.value
            }
          }
          // x轴起止时间更改
          if (widget.xAxis) {
            widget.xAxis.startTime = startTime
            widget.xAxis.endTime = endTime
          }
        })
        this.widgetList = widgetList
      })
    },
    getTemplateInfo () {
      return request({
        method: 'POST',
        url: getTemplateInfo,
        data: {}
      }).then(
        res => {
          return res.data.data
        }
      )
    },
    showList () {
      console.log(JSON.stringify(this.widgetList))
    }
  }
}
</script>
<style lang="scss" scoped>
.templateDesignerPage {
  display: flex;
}
</style>
