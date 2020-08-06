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
          .column(v-for="(col,i) of item.list" :key="i" @contextmenu.prevent="handleActiveColumn(index,i)")
            select(v-if="item.name==='心电图' && rowActive===index && colActive===i" @blur="handleBlur" class="contextmenu" @change="handleSelectFn($event)")
              option(style="display:none;" value="")
              option(v-for="option in optionList" :value="option.value") {{option.label}}
            input(v-else-if="rowActive===index && colActive===i" @blur="handleBlur" type="text" :value="col.value" class="contextmenu")
            span(v-else) {{col.value}}
</template>
<script>
import {
  getMonitorData,
  updateMonitorData
} from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
import { Socket } from '@/model/Socket'
import moment from 'moment'
export default {
  data () {
    return {
      rowActive: null,
      colActive: null,
      // list: [
      //   { name: '心电图', data: [], colNum: 2, dict: true, code: '1' },
      //   { name: '氧饱和度', data: [], colNum: 1, dict: false, code: '2' },
      //   { name: '潮气里', data: [], colNum: 1, dict: false, code: '3' },
      //   { name: 'f', data: [], colNum: 1, dict: false, code: '4' },
      //   { name: 'PEAK', data: [], colNum: 1, dict: false, code: '5' },
      //   { name: 'PEEP', data: [], colNum: 1, dict: false, code: '6' }
      // ],
      list: [],
      rowHeight: null,
      // startTime: '',
      // endTime: '',
      dataList: [],
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
          num: 16
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
      const list = JSON.parse(JSON.stringify(this.list))
      list.forEach((value) => {
        const length = this.configuration.anaesColumn.num / 1
        for (let i = 0; i < length; i++) {
          if (value.list[i]) {
          } else {
            value.list.push({ time: '', value: '' })
          }
        }
      })
      // this.getRowHeight()
      return list
    },
    leftWidth () {
      return this.configuration.leftTitle.width
    },
    centerWidth () {
      return this.configuration.rowTitle.width
    }
  },
  created () {
    this.getMonitorData()
  },
  beforeCreate () {
    if (this.socket) {
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
          startTime: this.startTime,
          endTime: this.endTime,
          // startTime: '2020-07-27 19:20:00',
          // endTime: '2020-07-27 19:30:00',
          operationId: this.operationId
          // operationId: 'b0f9d8bda9244397a44cb8ff278937d9'
        },
        url: getMonitorData
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.name = item.itemName
          item.list.forEach(_item => {
            _item.time = _item.timePoint
            _item.value = _item.itemValue
          })
        })
        // this.list = data
        this.list = data
        this.getRowHeight()
      })
    },
    // 计算行高
    getRowHeight () {
      this.$nextTick(() => {
        const oMonitor = document.querySelector('.right')
        const height = oMonitor.offsetHeight / this.list.length
        // console.log(oMonitor.offsetHeight)
        const oli = document.querySelectorAll('.rowHeight')
        for (let i = 0; i < oli.length; i++) {
          oli[i].style.height = height + 'px'
          oli[i].style.lineHeight = height + 'px'
        }
      })
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
          value.list.forEach((item, i) => {
            if (this.colActive === i) {
              this.list[index].list[i].value = oinput.value
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
          value.list.forEach((item, i) => {
            if (this.colActive === i) {
              this.list[index].list[i].value = this.optionList[
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
      if (!this.startTime || !this.endTime) {
        return
      }
      // // 与当前时间对比，如果结束时间为当前时间之前，则不需要建立连接
      const now = new Date()
      if (+moment(this.endTime) < now) {
        if (this.socket) {
          this.socket.close()
        }
        return
      }
      // const loginUserNum = 'as6d54f6a5sd4f6a54df6a5sd4f'
      const loginUserNum = this.operationId
      this.socket = Socket.getInstance()
      // 监测数据
      const that = this
      this.socket.on('push_monitor_event', res => {
        console.log(res)
        if (Array.isArray(res)) {
          // 回应socket.io
          that.socket.emit('push_monitor_event', {
            loginUserNum,
            content: res
          })
          res.forEach(item => {
            const { itemCode: code, ...value } = item
            that.list.forEach(_item => {
              if (code === _item.itemCode) {
                _item.list.push({ time: value.timePoint, value: value.itemValue })
              }
            })
            // if (that.list[code]) {
            //   that.list[code].push({
            //     time: value.timePoint,
            //     value: value.itemValue
            //   })
            // }
          })
        }
      })
    },
    updateMonitorData () {
      request({
        url: updateMonitorData,
        method: 'POST'
      }).then(res => {

      })
    }
  },
  mounted () {
    // if (!this.editMode) {
    // this.getMonitorData()
    this.getDataBySocketIO()
    // }
    // this.getDataList()
    this.$eventHub.$on('update-monitor', () => {
      this.updateMonitorData()
    })
  }
}
</script>
<style lang="stylus" scoped>
.monitor {
  height: 100%;
  width: 100%;
  display: flex;
  border: 1px solid black;
  box-sizing: border-box;
  font-size: 12px;
  // background:#fff;
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
