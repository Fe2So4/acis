<template>
  <div class="templateDesignerPage">
    <content-displayer
      :widget-list="widgetList"
      :start-time="startTime"
      :end-time="endTime"
    />
    <div>
      <el-button
        type="primary"
        @click="showList"
      >
        保存
      </el-button>
      <el-button @click="getData">
        请求
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
      widgetList: [{
      //   bloodTransfusion: {
      //     num: 2,
      //     text: '输血'
      //   },
      //   drugNumber: 10,
      //   height: 259,
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
      //   positionY: 10,
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
      //     timeInterval: 15
      //   }
      // }],
        // drugNumber: 10,
        // height: 300,
        // id: '979362f8-3d5a-4d2d-9911-503cad5437fc',
        // leftPartWidthRate: 0.18,
        // leftTitle: {
        //   lineHeight: 30,
        //   text: '麻醉用药',
        //   width: 50
        // },
        // name: 'widget-anaes-drug',
        // positionX: 0,
        // positionY: 10,
        // rightPartWidthRate: 0.1,
        // timeTitle: {
        //   height: 30,
        //   lineHeight: 30,
        //   text: '时间'
        // },
        // totalTitle: {
        //   text: '总量'
        // },
        // width: 792,
        // xAxis: {
        //   endTime: '2018-01-01 13:00',
        //   lineInterval: 3,
        //   startTime: '2018-01-01 09:00',
        //   timeInterval: 15
        // }
        name: 'widget-monitor-table',
        height: 400,
        width: 792,
        positionX: 0,
        positionY: 10,
        border: true,
        leftTitle: {
          text: '监测',
          width: 40,
          lineHeight: 30
        },
        // 行标题宽度
        rowTitle: {
          width: 128
        },
        rowList: [
          { text: '心电图', colNum: 2, signCode: 212, signItem: 'VTE', label: '第1行' },
          { text: '氧饱和度', colNum: 1, signCode: 212, signItem: 'VTE', label: '第2行' },
          { text: '潮气量', colNum: 2, signCode: 212, signItem: 'VTE', label: '第3行' },
          { text: 'f', colNum: 1, signCode: 212, signItem: 'VTE', label: '第4行' },
          { text: 'PEAK', colNum: 2, signCode: 212, signItem: 'VTE', label: '第5行' },
          { text: 'PEEP', colNum: 2, signCode: 212, signItem: 'VTE', label: '第6行' },
          { text: '中心静脉压', colNum: 2, signCode: 212, signItem: 'VTE', label: '第7行' },
          { text: '尿量', colNum: 1, signCode: 212, signItem: 'VTE', label: '第8行' },
          { text: '累计失血量', colNum: 2, signCode: 212, signItem: 'VTE', label: '第9行' }
        ],
        anaesColumn: {
          num: 8
        }
      }],
      startTime: '',
      endTime: ''
    }
  },
  async created () {
    // const templateInfo = await this.getTemplateInfo()
    // this.getTemplateAndValueData(templateInfo)
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    getData () {
      const obj = {
        operationId: '00.6203HS1',
        conCode: '4',
        timePoint: '2020-07-10 12:07:45'
      }
      this.$http(
        {
          method: 'post',
          url: 'http://192.168.1.149:8090/acis/superConfig/addTimePoint',
          data: obj,
          headers: {
            withCredentials: false
          }
        }
      ).then(res => {
        console.log(res)
      })
    },
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
        const [widgetList, valueMap] = [res[0].data.data, res[1].data.data]
        widgetList.forEach(widget => {
          // 源数据赋值
          if (widget.dataSource) {
            const { tableName, className } = widget.dataSource
            let value
            if (valueMap[tableName] && valueMap[tableName][className]) {
              value = valueMap[tableName][className]
            }
            if (value) {
              widget.value = value
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
          this.startTime = res.data.data.startTime
          this.endTime = res.data.data.endTime
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
  width: 80vw;
  height: 80vh;
}
</style>
