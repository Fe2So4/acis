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
            select(v-if="item.dict && rowActive===index && colActive===i" @blur="handleBlur" class="contextmenu" @change="handleSelectFn($event)")
              option(style="display:none;" value="")
              option(v-for="option in optionList" :value="option.value") {{option.label}}
            input(v-else-if="rowActive===index && colActive===i" @blur="handleBlur" type="text" :value="col.value" class="contextmenu")
            span(v-else) {{col.value}}
</template>
<script>
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
      startTime: '',
      endTime: '',
      dataList: [
        {
          name: '心电图',
          code: '1',
          data: [
            { time: '2020-8-8 8:8', value: '窦性心律' },
            { time: '2020-8-8 8:8', value: '窦性心律' },
            { time: '2020-8-8 8:8', value: '窦性心律' }
          ]
        },
        {
          name: '氧饱和度',
          code: '2',
          data: [{ time: '2020-8-8 8:8', value: '20' }]
        },
        {
          name: '潮气里',
          code: '3',
          data: [{ time: '2020-8-8 8:8', value: '20' }]
        },
        { name: 'f', code: '4', data: [{ time: '2020-8-8 8:8', value: '20' }] },
        {
          name: 'PEAK',
          code: '5',
          data: [{ time: '2020-8-8 8:8', value: '20' }]
        },
        {
          name: 'PEEP',
          code: '6',
          data: [{ time: '2020-8-8 8:8', value: '20' }]
        }
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
        num: 8
      }
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
    }
  },
  computed: {
    tableList () {
      this.list.forEach((value, index, array) => {
        const length = this.anaesColumn.num / value.colNum
        for (let i = 0; i < length; i++) {
          if (value.data[i]) {
          } else {
            value.data.push('')
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
  created () {},
  methods: {
    // 获取数据
    getDataList () {
      this.dataList.forEach((value, index, array) => {
        this.list[index].data = JSON.parse(JSON.stringify(value.data))
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
      const height = 286 / this.list.length
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
              this.list[index].data[i] = oinput.value
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
              this.list[index].data[i] = this.optionList[
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
    }
  },
  mounted () {
    this.getRowHeight()
    this.getDataList()
  }
}
</script>
<style lang="stylus" scoped>
.monitor {
  height: 288px;
  width: 100%;
  display: flex;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 12px;

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
