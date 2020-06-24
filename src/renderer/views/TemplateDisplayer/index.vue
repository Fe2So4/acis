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
import { getTemplateData, getValueData } from '@/api/medicalDocument'
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
  created () {
    this.getTemplateAndValueData()
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    getTemplateAndValueData () {
      return Promise.all([
        request(getTemplateData),
        request(getValueData)
      ]).then(res => {
        const [widgetList, valueList] = [res[0].data.data, res[1].data.data]
        widgetList.forEach(widget => {
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
        })

        this.widgetList = widgetList
      })
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
