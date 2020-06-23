<template>
  <div class="contentDisplayer">
    <div class="content">
      <widget-wrapper
        v-for="(item,index) of widgetList"
        :key="index"
        :widget="item"
      >
        <component
          :is="item.name"
          :configuration="item"
          :edit-mode="editMode"
        />
      </widget-wrapper>
    </div>
    <!-- <pre>{{ widgetList }}</pre> -->
  </div>
</template>

<script>
import WidgetWrapper from './WidgetWrapper'
// import WidgetInput from '../PageTemplateDesigner/WidgetInput'
// import WidgetTextarea from '../PageTemplateDesigner/WidgetTextarea'
// import WidgetText from '../PageTemplateDesigner/WidgetText'
// import WidgetLine from '../PageTemplateDesigner/WidgetLine'
// import WidgetPhysicalSign from '../PageTemplateDesigner/WidgetPhysicalSign'
// import WidgetNews from '../PageTemplateDesigner/WidgetNews'
import { controls } from '../TemplateDesigner/getAllConfigurationPage'
import { getTemplateData, getValueData } from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
export default {
  name: 'ContentDisplayer',
  components: {
    WidgetWrapper,
    ...controls
  },
  data () {
    return {
      editMode: false,
      widgetList: []
    }
  },
  computed: {
  },
  created () {
    this.getTemplateAndValueData()
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
            const valueItem = valueList.filter(
              item =>
                item.tableName === tableName && item.className === className
            )
            if (valueItem.length) {
              widget.value = valueItem[0].value
            }
          }
        })

        this.widgetList = widgetList
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.contentDisplayer {
  height: calc(100vh - 30px);
  .content {
    position: relative;
  }
}
</style>
