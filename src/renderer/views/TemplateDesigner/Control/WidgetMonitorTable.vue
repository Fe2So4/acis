<template lang="pug">
  .monitor
    .left(:style="{'width':leftWidth + 'px'}")
      span 监测
    //- .center(:style="{'width':centerWidth + 'px'}")
    .right
      ul
        li(v-for="(item,index) of list" :key="index" class="rowHeight")
         .row-title(:style="{'width':centerWidth + 'px'}") {{item.name}}
         .column-content
          .column(v-for="(col,i) of item.data" :key="col" @contextmenu.prevent="handleActiveColumn(index,i)")
            select(v-if="item.name === '心电图'&&rowActive===index&&colActive===i" @blur="handleBlur" class="contextmenu")
              option(v-for="option in optionList" :value="option.value") {{option.label}}
            input(v-else-if="rowActive===index&&colActive===i" @blur="handleBlur" type="text" :value="col" class="contextmenu")
            span(v-else) {{col}}
          //- .column(v-for="col of item.data" :key="col" style="border-right:1px solid #000;") {{col}}
    //- vxe-grid(
    //-   border
    //-   highlight-hover-row
    //-   width="100%"
    //-   height="100%"
    //-   class="reverse-table"
    //-   :show-header="false"
    //-   :columns="tableColumn"
    //-   :data="tableData")

</template>
<script>
export default {
  data () {
    return {
      leftWidth: '30',
      rowActive: null,
      colActive: null,
      centerWidth: '128',
      list: [{ name: '心电图', data: [1, 2, 3, 4, 5, 6, 7, 8] },
        { name: '氧饱和度', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { name: '潮气里', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { name: 'f', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { name: 'PEAK', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
        { name: 'PEEP', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }],
      rowHeight: null,
      optionList: [{ label: '正常', value: '1' }, { label: '无', value: '0' }, { label: '房颤', value: '2' }]
      // tableColumn: [
      //   { field: 'name', title: '姓名' },
      //   { field: 'role', title: '角色' },
      //   { field: 'sex', title: '性别' },
      //   { field: 'age', title: '年龄' },
      //   { field: 'address2', title: '地址' },
      //   { field: 'date3', title: '时间' }
      // ],
      // tableData: [{ name: 'dyw', address2: 'hospital', role: 'admin', sex: '男', age: '22', date3: '2020-6-24' },
      //   { name: 'dyw', address2: 'hospital', role: 'admin', sex: '男', age: '22', date3: '2020-6-24' },
      //   { name: 'dyw', address2: 'hospital', role: 'admin', sex: '男', age: '22', date3: '2020-6-24' }]
    }
  },
  created () {
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
    // this.reverseTable()
  },
  methods: {
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
      this.tableColumn = [{
        field: '0',
        fixed: 'left',
        width: 80
      }].concat(tableData.map((item, index) => {
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
      }))
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
      const oinput = document.querySelector('input')
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
    handleSelect () {
      this.handleBlur()
    }
  },
  mounted () {
    this.getRowHeight()
  }
}
</script>
<style lang="stylus" scoped>
  .monitor
    height 288px
    width 100%
    display flex
    border 1px solid #000
    box-sizing border-box
    font-size 12px
    .left
      // flex 1
      height 100%
      border-right 1px solid #000
      text-align center
      display table
      span
        display table-cell
        vertical-align middle
    .center
      // flex 1
      height 100%
      border-right 1px solid #000
      ul
        height 100%
        background pink
        li
          text-align center
          border-bottom 1px solid #000
          &:last-child
            border-bottom 0
    .right
      flex 1
      height 100%
      ul
        height 100%
        li
          text-align center
          box-sizing border-box
          border-bottom 1px solid #000
          display flex
          &:last-child
            border-bottom 0
          .row-title
            border-right 1px solid #000
          .column-content
            flex 1
            display flex
            height 100%
            .column
              flex 1
              height 100%
              border-right 1px solid #000000
              position relative
              &:last-child
                border-right 0
              .contextmenu
                position absolute
                left 0
                top 0
                height 100%
                border unset
                outline unset
                width 100%
</style>
