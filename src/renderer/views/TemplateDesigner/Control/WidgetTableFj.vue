<template>
  <div
    class="widgetTable"
  >
    <table
      class="table"
      ref="table"
      :style="widgetStyle"
    >
      <tr>
        <th
          v-for="(col, colIndex) of configuration.columns.list"
          :key="colIndex"
          :width="col.width"
          :height="configuration.row.height"
          :style="cellStyle"
        >
          {{ col.label }}
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) of configuration.row.length"
        :key="rowIndex"
      >
        <td
          v-for="(col, colIndex) of configuration.columns.list"
          :key="colIndex"
          :height="configuration.row.height"
          :style="cellStyle"
        >
          {{ responseList[rowIndex] ? responseList[rowIndex][col.field] : '' }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { baseLi } from '@/api/urlAndPortConfig'

export default {
  name: 'WidgetTableFj',
  props: {
    configuration: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: true
    },
    pageIndex: {
      type: [Number, String],
      required: false,
      default: -1
    },
    operationId: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    },
    pageIndex: {
      handler: function (val) {
        if (this.editMode) return
        if (val === -1) return
        this.getData()
      },
      immediate: true
    }
  },
  data () {
    return {
      widgetStyle: {},
      cellStyle: {},
      responseList: []
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let styleObj = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        textAlign: font.textAlign
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
      this.cellStyle = { ...styleObj }
    },
    getData () {
      const {
        request: {
          api,
          method
        }
      } = this.configuration
      if (!api) return
      const type = method === 'get' ? 'params' : 'data'
      return request({
        url: `${baseLi}${api}`,
        method: method,
        [type]: {
          start: +this.pageIndex + 1,
          size: this.configuration.row.length,
          operationId: this.operationId
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          }
          return Promise.reject(new Error('获取数据失败'))
        }
      ).then(
        res => {
          this.responseList = res.list
          this.$emit('set-total-page', res.totalPage)
        }
      )
    }
  }
}

</script>
<style lang='scss' scoped>
.widgetTable {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .table {
    border-collapse: collapse;
    table-layout: fixed;
    tr {
      min-height: 30px;
    }
  }
}
</style>
