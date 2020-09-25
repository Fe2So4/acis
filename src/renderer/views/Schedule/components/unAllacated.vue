<template>
  <div class="unallacated">
    <vxe-table
      ref="unTable"
      resizable
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
      @cell-click="handleCellClick"
      @cell-dblclick="handleDistributeRoom"
    >
      <!-- @cell-click="handleShowDetail" -->
      <!-- <vxe-table-column
        field="opeScheduleTime"
        title="申请时间"
      /> -->
      <!-- <vxe-table-column
        field="sequence"
        title="申请台次"
        show-overflow="title"
      /> -->
      <vxe-table-column
        field="ptName"
        title="姓名"
        type="html"
      />
      <vxe-table-column
        field="inpatientWard"
        title="病区"
        type="html"
      />
      <vxe-table-column
        field="bedId"
        title="床位"
        show-overflow="title"
      />
      <vxe-table-column
        field="visitId"
        title="住院号"
        show-overflow="title"
      />
    </vxe-table>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { getOpeApply, distributeOpeApply } from '@/api/schedule'
import moment from 'moment'
import XEUtils from 'xe-utils'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      list: []
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
    }
  },
  computed: {
    ...mapGetters('Schedule', ['currentRoom']),
    tableData () {
      const filterName = XEUtils.toString(this.searchContent).trim().toLowerCase()
      let searchProps = []
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        if (this.select === 1) {
          searchProps = ['inpatientWard']
        } else if (this.select === 2) {
          searchProps = ['surgeon']
        } else if (this.select === 3) {
          searchProps = ['operationName']
        } else {
          searchProps = ['patientName']
        }
        // const searchProps = ['patientName', 'inpatientWard'];
        const rest = this.list.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase()
          .indexOf(filterName) > -1))
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match =>
              `<span class="keyword-lighten">${match}</span>`)
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
      }
    },
    imediate: true
  },
  methods: {
    getData () {
      request({
        url: getOpeApply + '/' + this.time
      }).then(res => {
        const data = res.data.data
        data.forEach(value => {

        })
        this.list = data
      })
    },
    // handleShowDetail () {
    //   this.$emit('handleShowDetail')
    // },
    handleDistributeRoom ({ row }) {
      // this.$emit('handleDistributeRoom')
      if (parseInt(this.currentRoom.count) < parseInt(this.currentRoom.maxCount)) {
        request(
          {
            method: 'PUT',
            url: distributeOpeApply + `/${this.currentRoom.roomNo}/${row.operationId}/${this.time}`
          }
        ).then(res => {
          this.$eventHub.$emit('get-allocated')
          this.$eventHub.$emit('get-room')
          this.getData()
          this.$eventHub.$emit('get-records')
        })
      } else {
        this.$message({ type: 'warning', message: '当前手术间已到达最大台次' })
      }
    },
    handleCellClick ({ row }) {
      this.$emit('changePatientDetail', row)
    }
  },
  mounted () {
    this.getData()
    this.$eventHub.$on('get-unallocated', () => {
      // 获取数据
      this.getData()
    })
  }
}
</script>

<style lang="scss" scoped>
  .unallacated{
    height:100%;
    width:100%;
  }
</style>
