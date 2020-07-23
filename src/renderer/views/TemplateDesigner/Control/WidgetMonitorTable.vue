<template lang="pug">
  .monitor
    .left(:style="{'width':leftWidth + 'px'}")
      span 监测
    //- .center(:style="{'width':centerWidth + 'px'}")
    .right
      ul
        li(v-for="(item,index) of tableList" :key="item.name" class="rowHeight")
         .row-title(:style="{'width':centerWidth + 'px'}") {{item.name}}
         .column-content
          .column(v-for="(col,i) of item.data" :key="i" @contextmenu.prevent="handleActiveColumn(index,i)")
            select(v-if="item.name==='心电图' && rowActive===index && colActive===i" @blur="handleBlur" class="contextmenu" @change="handleSelectFn($event)")
              option(style="display:none;" value="")
              option(v-for="option in optionList" :value="option.value") {{option.label}}
            input(v-else-if="rowActive===index && colActive===i" @blur="handleBlur" type="text" :value="col.value" class="contextmenu")
            span(v-else) {{col.value}}
</template>
<script>
// import request from '@/utils/'
import {
  getMonitorData,
  getSocketData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
// import moment from 'moment'
import io from 'socket.io-client'
export default {
  data () {
    return {
      rowActive: null,
      colActive: null,
      list: [
        { name: '心电图', data: [], colNum: 2, dict: true, code: '1' },
        { name: '氧饱和度', data: [], colNum: 1, dict: false, code: '2' },
        { name: '潮气里', data: [], colNum: 1, dict: false, code: '3' },
        { name: 'f', data: [], colNum: 1, dict: false, code: '4' },
        { name: 'PEAK', data: [], colNum: 1, dict: false, code: '5' },
        { name: 'PEEP', data: [], colNum: 1, dict: false, code: '6' }
      ],
      rowHeight: null,
      // startTime: '',
      // endTime: '',
      dataList: [
        // {
        //   name: '心电图',
        //   code: '1',
        //   data: [
        //     { time: '2020-8-8 8:8', value: '窦性心律' },
        //     { time: '2020-8-8 8:8', value: '窦性心律' },
        //     { time: '2020-8-8 8:8', value: '窦性心律' }
        //   ]
        // },
        // {
        //   name: '氧饱和度',
        //   code: '2',
        //   data: [{ time: '2020-8-8 8:8', value: '20' }]
        // },
        // {
        //   name: '潮气里',
        //   code: '3',
        //   data: [{ time: '2020-8-8 8:8', value: '20' }]
        // },
        // { name: 'f', code: '4', data: [{ time: '2020-8-8 8:8', value: '20' }] },
        // {
        //   name: 'PEAK',
        //   code: '5',
        //   data: [{ time: '2020-8-8 8:8', value: '20' }]
        // },
        // {
        //   name: 'PEEP',
        //   code: '6',
        //   data: [{ time: '2020-8-8 8:8', value: '20' }]
        // }
      ],
      optionList: [
        { label: '正常', value: '0' },
        { label: '无', value: '1' },
        { label: '房颤', value: '2' }
      ],
      leftTitle: {
        text: '监测',
        width: 40,
        lineHeight: 30
      },
      // 行标题宽度
      rowTitle: {
        width: 128
      },
      anaesColumn: {
        num: 16
      },
      socket: null
    }
  },
  props: {
    configuration: {
      type: Object,
      default: () => ({
        name: 'widget-monitor-table',
        height: 400,
        width: 788,
        positionX: 0,
        positionY: 100,
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
          {
            text: '心电图',
            colNum: 2,
            signCode: 212,
            signItem: 'VTE',
            label: '第1行'
          },
          {
            text: '氧饱和度',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第2行'
          },
          {
            text: '潮气量',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第3行'
          },
          {
            text: 'f',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第4行'
          },
          {
            text: 'PEAK',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第5行'
          },
          {
            text: 'PEEP',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第6行'
          },
          {
            text: '中心静脉压',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第7行'
          },
          {
            text: '尿量',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第8行'
          },
          {
            text: '累计失血量',
            colNum: 1,
            signCode: 212,
            signItem: 'VTE',
            label: '第9行'
          }
        ],
        anaesColumn: {
          num: 8
        }
      })
    },
    editMode: {
      type: Boolean,
      default: true
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    operationId: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    tableList () {
      this.list.forEach((value, index, array) => {
        const length = this.anaesColumn.num / value.colNum
        for (let i = 0; i < length; i++) {
          if (value.data[i]) {
          } else {
            value.data.push({ time: '', value: '' })
          }
        }
      })
      return this.list
    },
    leftWidth () {
      return this.configuration.leftTitle.width
    },
    centerWidth () {
      return this.configuration.rowTitle.width
    }
  },
  created () {
    // this.getMonitorData()
  },
  beforeCreate () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },
  methods: {
    // 获取数据
    getDataList () {
      this.dataList.forEach((value, index, array) => {
        this.list[index].data = JSON.parse(JSON.stringify(value.data))
      })
    },
    // 获取检测表格数据
    getMonitorData () {
      request({
        method: 'POST',
        data: {
          // startTime: this.startTime,
          startTime: '2020-07-06 04:00:00',
          endTime: '2020-07-06 20:00:00',
          // operationId: this.operationId
          operationId: 'b0f9d8bda9244397a44cb8ff278937d9'
        },
        url: getMonitorData
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.name = item.itemName
          item.list.forEach(_item => {
            _item.time = _item.itemPoint
            _item.value = _item.itemValue
          })
        })
        this.dataList = data
        this.dataList.forEach((value, index, array) => {
          const list = JSON.parse(JSON.stringify(value.list))
          const empty = []
          list.forEach(item => {
            // if()
          })
          this.list[index].data = empty
        })
      })
    },
    // 反转函数
    reverseTable () {
      const tableData = this.tableData
      this.tableData = this.tableColumn.map(column => {
        const item = { 0: column.title }
        tableData.forEach((row, rowIndex) => {
          item[rowIndex + 1] = row[column.field]
        })
        return item
      })
      this.tableColumn = [
        {
          field: '0',
          fixed: 'left',
          width: 80
        }
      ].concat(
        tableData.map((item, index) => {
          console.log(item.name)
          if (item.name === 'name') {
            return {
              field: `${index + 1}`,
              width: 200
            }
          } else {
            return {
              field: `${index + 1}`,
              width: 120
            }
          }
        })
      )
    },
    // 计算行高
    getRowHeight () {
      const oMonitor = document.querySelector('.right')
      // console.log(oMonitor.offsetHeight)
      const height = oMonitor.offsetHeight / this.list.length
      const oli = document.querySelectorAll('.rowHeight')
      for (let i = 0; i < oli.length; i++) {
        oli[i].style.height = height + 'px'
        oli[i].style.lineHeight = height + 'px'
      }
    },
    handleActiveColumn (rowIndex, colIndex) {
      this.rowActive = rowIndex
      this.colActive = colIndex
      // let oinput = null
      // if (this.rowActive !== null && this.colActive !== null) {
      //   oinput = document.querySelector('input')
      //   if (oinput) {
      //     oinput.focus()
      //   }
      // }
      // console.log(oinput.value)
    },
    handleBlur () {
      const oinput = document.querySelectorAll('.contextmenu')[0]
      this.list.forEach((value, index, array) => {
        if (index === this.rowActive) {
          value.data.forEach((item, i) => {
            if (this.colActive === i) {
              this.list[index].data[i].value = oinput.value
            }
          })
        }
      })
      this.rowActive = null
      this.colActive = null
    },
    handleSelectFn (e) {
      this.list.forEach((value, index, array) => {
        if (index === this.rowActive) {
          value.data.forEach((item, i) => {
            if (this.colActive === i) {
              this.list[index].data[i].value = this.optionList[
                e.target.selectedIndex - 1
              ].label
            }
          })
        }
      })
      this.rowActive = null
      this.colActive = null
    },
    handleSelect () {
      this.handleBlur()
    },
    getDataBySocketIO () {
      // 如果没有传入的时间
      // if (!this.startTime || !this.endTime) {
      //   return
      // }
      // // 与当前时间对比，如果结束时间为当前时间之前，则不需要建立连接
      // const now = new Date()
      // if (+moment(this.endTime) < now) {
      //   if (this.socket) {
      //     this.socket.close()
      //   }
      //   return
      // }
      // const loginUserNum = 'as6d54f6a5sd4f6a54df6a5sd4f'
      // const loginUserNum = this.operationId
      const loginUserNum = 'b0f9d8bda9244397a44cb8ff278937d9'
      this.socket = io(getSocketData, {
        query: {
          loginUserNum
        }
      })
      this.socket.on('connect', () => {
        console.log('socket.io connected')
      })
      this.socket.on('reconnect_error', e => {
        console.error(e)
      })
      this.socket.on('disconnect', () => {
        console.log('socket.io disconnect')
      })
      // 体征曲线
      const that = this
      this.socket.on('push_monitor_event', res => {
        console.log(res)
        if (Array.isArray(res)) {
          // 回应socket.io
          that.socket.emit('push_monitor_event', {
            loginUserNum,
            content: res
          })
          // res.forEach(item => {
          //   const { itemCode: signId, ...value } = item
          //   if (that.lines[signId]) {
          //     that.lines[signId].addPoint({
          //       time: value.timePoint,
          //       value: value.itemValue
          //     })
          //   }
          // })
        }
      })
    }
  },
  mounted () {
    this.getRowHeight()
    // if (!this.editMode) {
    // this.getMonitorData()
    this.getDataBySocketIO()
    // }
    // this.getDataList()
  }
}
</script>
<style lang="stylus" scoped>
.monitor {
  height: 100%;
  width: 100%;
  display: flex;
  border: 1px solid red;
  box-sizing: border-box;
  font-size: 12px;
  background:#fff;
  .left {
    // flex 1
    height: 100%;
    border-right: 1px solid #000;
    text-align: center;
    display: table;

    span {
      display: table-cell;
      vertical-align: middle;
    }
  }

  .center {
    // flex 1
    height: 100%;
    border-right: 1px solid #000;

    ul {
      height: 100%;
      background: pink;

      li {
        text-align: center;
        border-bottom: 1px solid #000;

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  .right {
    flex: 1;
    height: 100%;

    ul {
      height: 100%;

      li {
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        display: flex;

        &:last-child {
          border-bottom: 0;
        }

        .row-title {
          border-right: 1px solid #000;
        }

        .column-content {
          flex: 1;
          display: flex;
          height: 100%;

          .column {
            flex: 1;
            height: 100%;
            border-right: 1px solid #000000;
            position: relative;

            &:last-child {
              border-right: 0;
            }

            .contextmenu {
              position: absolute;
              left: 0;
              top: 0;
              height: 100%;
              border: unset;
              outline: unset;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
