<template>
  <div class="unallacated">
    <vxe-table
      resizable
      ref="unTable"
      round
      width="100%"
      height="100%"
      size="mini"
      border
      auto-resize
      align="center"
      class="scroll"
      :data="tableData"
      highlight-current-row
      :menu-config="tableMenu"
      :cell-class-name="cellClassName"
      :row-style="rowStyle"
      @menu-click="contextMenuClickEvent"
      @cell-menu="cellContextMenuEvent"
      @cell-click="handleCellClick"
      @cell-dblclick="handleDistributeRoom"
    >
      <vxe-table-column
        field="sequence"
        title="台次"
        width="50"
      />
      <vxe-table-column
        field="ptName"
        title="姓名"
        width="70"
        show-overflow
      />
      <vxe-table-column
        field="inpatientWard"
        title="病区"
        width="50"
      />
      <vxe-table-column
        field="bedId"
        title="床位"
        width="60"
      />
      <vxe-table-column
        field="visitId"
        title="住院号"
        width="80"
      />
      <vxe-table-column
        field="surgeon"
        title="医师"
        width="140"
        show-overflow
      />
      <vxe-table-column
        field="operation"
        title="手术"
        width="204"
      />
    </vxe-table>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
// import { getOpeApply, distributeOpeApply } from '@/api/schedule'
import { distributeOpeApply, cancelCurrentOperation } from '@/api/schedule'
import moment from 'moment'
import XEUtils from 'xe-utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      // list: []
      tableMenu: {
        body: {
          options: [
            [
              {
                code: 'cancelOperation',
                name: '取消手术',
                prefixIcon: 'fa fa-copy',
                disabled: false
              }
            ]
          ]
        }
      }
    }
  },
  props: {
    time: {
      type: String,
      // required: true,
      default: moment(new Date()).format('yyyy-MM-DD')
    },
    select: {
      type: String,
      default: ''
    },
    floor: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    searchContent: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom']),
    tableData () {
      const filterName = XEUtils.toString(this.searchContent)
        .trim()
        .toLowerCase()
      let searchProps = []
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        if (this.select === '1') {
          searchProps = ['inpatientWard']
        } else if (this.select === '2') {
          searchProps = ['surgeon']
        } else if (this.select === '3') {
          searchProps = ['operation']
        } else {
          searchProps = ['ptName']
        }
        // const searchProps = ['patientName', 'inpatientWard'];
        const rest = this.list.filter((item) =>
          searchProps.some(
            (key) =>
              XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1
          )
        )
        return rest.map((row) => {
          const item = Object.assign({}, row)
          searchProps.forEach((key) => {
            item[key] = XEUtils.toString(item[key]).replace(
              filterRE,
              (match) =>
                // `<span class="keyword-lighten">${match}</span>`)
                `${match}`
            )
          })
          return item
        })
      }
      return this.list
    }
  },
  watch: {
    time: {
      handler (val) {
        return val
      },
      imediate: true
    },
    searchContent: {
      handler (newValue, old) {
        return newValue
      },
      imediate: true
    }
    // select: {
    //   handler (newValue, old) {
    //     return newValue
    //   },
    //   imediate: true
    // }
  },
  methods: {
    // getData () {
    //   request({
    //     url: getOpeApply + '/' + this.time + '/' + this.floor
    //   }).then(res => {
    //     const data = res.data.data
    //     data.forEach(value => {

    //     })
    //     this.list = data
    //   })
    // },
    // handleShowDetail () {
    //   this.$emit('handleShowDetail')
    // },
    contextMenuClickEvent ({ menu, row, column }) {
      // const xTable = this.$refs.unTable
      switch (menu.code) {
        case 'cancelOperation':
          this.$confirm('是否取消当前手术申请?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              request({
                url: cancelCurrentOperation + '?operationId=' + row.operationId,
                method: 'put'
              }).then((res) => {
                this.$message({ type: 'success', message: '取消成功' })
                this.$eventHub.$emit('get-unallocated')
              })
            })
            .catch(() => {})
          break
      }
    },
    cellContextMenuEvent ({ row }) {
      this.$refs.unTable.setCurrentRow(row)
    },
    rowStyle ({ row, rowIndex }) {
      // opeClassNo   0 择期 1急诊 2紧急 3加台
      switch (row.opeClassNo) {
        case '1':
          return {
            backgroundColor: 'rgb(0,195,255)'
          }
        case '2':
          return {
            backgroundColor: 'rgb(239,130,239)'
          }
        case '3':
          return {
            backgroundColor: 'rgb(148,243,148)'
          }
      }
    },
    cellClassName ({ row, column }) {
      if (column.title === '手术') {
        return 'opeTitle'
      }
    },
    handleDistributeRoom ({ row }) {
      // this.$emit('handleDistributeRoom')
      if (this.currentRoom.roomNo) {
        if (
          parseInt(this.currentRoom.count) < parseInt(this.currentRoom.maxCount)
        ) {
          request({
            method: 'PUT',
            url:
              distributeOpeApply +
              `/${this.currentRoom.roomNo}/${row.operationId}/${this.time}`
          }).then((res) => {
            this.$eventHub.$emit('get-allocated')
            this.$eventHub.$emit('get-room')
            this.$eventHub.$emit('get-unallocated')
            this.$eventHub.$emit('get-records')
          })
        } else {
          this.$message({
            type: 'warning',
            message: '当前手术间已到达最大台次'
          })
        }
      } else {
        this.$message({ type: 'warning', message: '请先选择手术间' })
      }
    },
    handleCellClick ({ row, column }) {
      this.$emit('changePatientDetail', row)
    }
  },
  mounted () {
    // this.getData()
    // this.$eventHub.$on('get-unallocated', () => {
    //   // 获取数据
    //   this.getData()
    // })
  }
}
</script>

<style lang="scss" scoped>
.unallacated {
  height: 100%;
  width: 100%;
}
</style>
<style >
.opeTitle {
  /* color: #fff; */
  text-align: left !important;
  white-space: wrap !important;
}
</style>
