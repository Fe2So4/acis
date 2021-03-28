<template>
  <div class="overview">
    <div class="title">
      <span>共 {{ operationLength }} 台</span>
      <span> | </span>
      <span>空闲 {{ emptyLength }}</span>
    </div>
    <div class="roomTable">
      <vxe-table
        :cell-style="cellStyle"
        show-overflow
        size="mini"
        round
        height="100%"
        ref="xTable"
        align="center"
        highlight-hover-row
        auto-resize
        class="scroll"
        :data="list"
      >
        <vxe-table-column
          field="roomNo"
          title="手术室"
        />
        <vxe-table-column
          field="patientName"
          title="患者"
        />
        <vxe-table-column
          field="patientId"
          title="患者ID"
        />
        <vxe-table-column
          field="opeNameBefore"
          title="手术名称"
        />
        <vxe-table-column
          field="opeScheduleTime"
          title="手术时间"
        />
        <vxe-table-column
          field="surgeon"
          title="手术医生"
        />
        <vxe-table-column
          field="anesDoc"
          title="麻醉医生"
        />
        <vxe-table-column
          field="stateName"
          title="当前状态"
        />
      </vxe-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RoomList',
  data () {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    operationLength () {
      var count = 0
      this.list.forEach(item => {
        if (item.stateName !== '空闲') {
          count++
        }
      })
      return count
    },
    emptyLength () {
      var count = 0
      this.list.forEach(item => {
        if (item.stateName === '空闲') {
          count++
        }
      })
      return count
    }
  },
  mounted () {
    this.addScrollListener()
  },
  beforeDestroy () {
    this.removeScrollListener()
  },
  methods: {
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (row.stateName === '入复苏室') {
        // 判断条件，如果想要改变其他行样式，就写那一行的下标
        return {
          backgroundColor: '#f5ebbd'
        }
      }
    },
    onScroll (e) {
      const el = this.$refs.scrollbar.wrap
      if (el.scrollTop + el.clientHeight + 10 > el.scrollHeight) {
        this.$emit('touch-bottom')
      }
    },
    addScrollListener () {
      const el = this.$refs.scrollbar.wrap
      el.addEventListener('scroll', this.onScroll)
    },
    removeScrollListener () {
      const el = this.$refs.scrollbar.wrap
      el.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme';

.overview {
  height: 100%;
  font-size: 14px;
  @include theme-property('color', $color-text-primary);
  .title {
    text-align: right;
    line-height: 28px;
    padding-right: 10px;
  }
  .roomTable {
    height: calc(100% - 28px);
  }
}
</style>
