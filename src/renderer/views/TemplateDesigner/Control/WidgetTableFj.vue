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
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      widgetStyle: {},
      responseList: [],
      cellStyle: {}
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
      this.cellStyle = { ...borderObj }
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
