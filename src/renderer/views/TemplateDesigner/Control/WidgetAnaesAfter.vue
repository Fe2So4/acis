<template>
  <div
    class="WidgetAnaesAfter
"
    :style="[
      noTableNameStyle,
      dataSourceAlertStyle,
      dictionarySourceAlertStyle
    ]"
  >
    <input
      ref="input"
      class="input"
      type="text"
      :style="widgetStyle"
      :placeholder="configuration.placeholder"
      :readonly="configuration.readonly"
      :value="showValue"
      @[showSelectEvent]="showSelect"
    >
    <el-select
      clearable
      v-show="selectVisible"
      ref="select"
      class="select"
      :value="configuration.value"
      @change="onSelectChange"
      size="mini"
      filterable
      remote
      :remote-method="onRemote"
      collapse-tags
      :placeholder="configuration.placeholder"
      @visible-change="onOptionVisibleChange"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>
<script>
import { getOperationList } from '@/api/dict'
import request from '@/utils/requestForMock'
import { validateDataSourceMixin, validateDictionarySourceMixin } from './mixin'

export default {
  name: 'WidgetAnaesAfter',
  mixins: [validateDataSourceMixin, validateDictionarySourceMixin],
  props: {
    configuration: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    configuration: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.setStyle()
        if (val.value) {
          if (val.value.includes('_')) {
            this.showValue = val.value.split('_')[1]
          } else {
            this.showValue = val.value
          }
        } else {
          this.showValue = ''
        }
      }
    }
  },
  data () {
    return {
      widgetStyle: {},
      showSelectEvent: 'click',
      selectVisible: false,
      options: [],
      content: '', // 搜索的内容
      showValue: '', // 显示在input框中的内容
      pageIndex: 1, // 当前页
      isLastPage: true // 是否为最后一页
    }
  },
  created () {
    this.setStyle()
  },
  mounted () {
    if (this.editMode) return
    this.addScrollListener()
  },
  beforeDestroy () {
    if (this.editMode) return
    this.removeScrollListener()
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let styleObj = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        color: font.color,
        textAlign: font.textAlign,
        textIndent: font.textIndent + 'pt'
      }
      const borderObj = border.position.reduce((obj, item) => {
        let style = 'solid'
        if (border.style) {
          style = border.style
        }
        obj['border-' + item] = border.width + 'px ' + style + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
    },
    async showSelect (e) {
      if (this.editMode) {
        return
      }
      this.content = this.showValue
      await this.getDictionaryData(1)
      this.selectVisible = true
      setTimeout(() => {
        this.$refs.select.focus()
      })
    },
    onOptionVisibleChange (visible) {
      if (!visible) {
        this.selectVisible = false
      }
    },
    onScroll (e) {
      const el = this.$refs.select.$refs.scrollbar.wrap
      if (el.scrollTop + el.clientHeight + 10 > el.scrollHeight) {
        if (!this.isLastPage) {
          this.getDictionaryData(this.pageIndex + 1)
        }
      }
    },
    getDictionaryData (start) {
      return this.getOperationList(this.content, start).then(
        ({ list, pageNum, isFirstPage, isLastPage }) => {
          list = list.map(({ opeCode, opeName }) => `${opeCode}_${opeName}`)
          this.isLastPage = isLastPage
          this.pageIndex = pageNum
          if (isFirstPage) {
            this.options = list
          } else {
            this.options.push(...list)
          }
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    getOperationList (content, start) {
      return request({
        method: 'get',
        url: getOperationList,
        params: {
          content,
          start,
          size: 10
        }
      }).then(res => {
        if (res.data.success) {
          return res.data.data
        } else {
          return Promise.reject(new Error('未请求到数据'))
        }
      })
      // .catch(e => {
      //   return {
      //     total: 7,
      //     list: [
      //       {
      //         userName: '王文青',
      //         userId: 'jx0001'
      //       },
      //       {
      //         userName: '游舟',
      //         userId: 'n0001'
      //       },
      //       {
      //         userName: '佘娜',
      //         userId: 'T0001'
      //       }
      //     ],
      //     pageNum: 1,
      //     pageSize: 3,
      //     size: 3,
      //     startRow: 1,
      //     endRow: 3,
      //     pages: 3,
      //     prePage: 0,
      //     nextPage: 2,
      //     isFirstPage: true,
      //     isLastPage: false,
      //     hasPreviousPage: false,
      //     hasNextPage: true,
      //     navigatePages: 8,
      //     navigatepageNums: [
      //       1,
      //       2,
      //       3
      //     ],
      //     navigateFirstPage: 1,
      //     navigateLastPage: 3,
      //     firstPage: 1,
      //     lastPage: 3
      //   }
      // })
    },
    onSelectChange (val) {
      // 标志已被修改过
      this.configuration.dirty = true
      this.configuration.value = val

      if (val) {
        if (val.includes('_')) {
          this.showValue = val.split('_')[1]
        } else {
          this.showValue = val
        }
      } else {
        this.showValue = ''
      }
    },
    addScrollListener () {
      if (this.$refs.select.$refs.scrollbar) {
        const el = this.$refs.select.$refs.scrollbar.wrap
        el.addEventListener('scroll', this.onScroll)
      }
    },
    removeScrollListener () {
      if (this.$refs.select.$refs.scrollbar) {
        const el = this.$refs.select.$refs.scrollbar.wrap
        el.removeEventListener('scroll', this.onScroll)
      }
    },
    onRemote (val) {
      this.configuration.dirty = true
      this.configuration.value = val
      this.content = val
      this.getDictionaryData(1)

      if (val) {
        if (val.includes('_')) {
          this.showValue = val.split('_')[1]
        } else {
          this.showValue = val
        }
      } else {
        this.showValue = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.WidgetAnaesAfter {
  width: 100%;
  height: 100%;
  position: relative;

  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
  }

  .select {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .select ::v-deep .el-input {
    height: 100%;
  }

  .select ::v-deep .el-input__inner {
    height: 100%;
    background: white;
    color: black;
  }

  .select ::v-deep .el-select__tags,
  .select ::v-deep .el-input__suffix {
    // display: none;
  }
}
</style>
