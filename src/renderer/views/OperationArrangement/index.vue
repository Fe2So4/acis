<template lang="pug">
  .operation-arrangement
    .title {{titleDate}}手术排台
    el-form(:inline="true" size="mini" :model="form")
      el-form-item
        el-radio-group(v-model="form.radio" @change="getData")
          el-radio(:label="1") 全部
          el-radio(:label="2") 本人的
          el-radio(:label="3") 其他人
        el-select(v-model="form.select" :disabled="form.radio !== 3" style="margin-left:12px;"
        filterable
        remote
        :remote-method="remoteMethod"
        @change="getData")
          el-option(v-for="item in docList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
            :disabled="item.disabled")
      el-form-item(label="时间")
        el-date-picker(type="date" :clearable="false" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.date" @change="getData")
    .content
      vxe-table(
        border
        show-header-overflow
        show-overflow
        keep-source
        highlight-hover-row
        align="center"
        height="100%"
        size="mini"
        class="scroll"
        :data="tableData"
        :checkbox-config="{checkStrictly: true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      )
        vxe-table-column(type="seq" width="60" title="排序")
        vxe-table-column(field="opeRoom" title="术间")
        vxe-table-column(field="sequence" title="台次")
        vxe-table-column(field="anesDoc" title="麻醉医生")
        vxe-table-column(field="deptName" title="科室")
        vxe-table-column(field="bedId" title="床号")
        vxe-table-column(field="patientName" title="患者姓名")
        vxe-table-column(field="gender" title="性别")
        vxe-table-column(field="age" title="年龄")
        vxe-table-column(field="patientId" title="患者ID")
        vxe-table-column(field="hospitalNo" title="住院号")
        vxe-table-column(field="diagnose" title="诊断")
        vxe-table-column(field="operationName" title="手术名称")
        vxe-table-column(field="memo" title="备注")
        vxe-table-column(field="anesMethod" title="麻醉方式")
        vxe-table-column(field="opeNurse" title="洗手护士")
        vxe-table-column(field="supplyNurse" title="巡回护士")
        vxe-table-column(field="surgeon" title="手术医师")
        vxe-table-column(field="assist" title="手术助手")
</template>
<script>
import moment from 'moment'
import { opeSchedule } from '@/api/patientList'
import { getDoctorNurseListPaging } from '@/api/dict'
import request from '@/utils/requestForMock'
import { getCurrentAccount } from '@/utils/storage'
export default {
  name: 'OperationArrangement',
  data () {
    return {
      tableData: [],
      loading: false,
      form: {
        radio: 1,
        select: '',
        date: moment(new Date()).format('YYYY-MM-DD')
      },
      options: [],
      docList: []
    }
  },
  computed: {
    titleDate () {
      return moment(this.form.date).format('YYYY-MM-DD')
    }
  },
  mounted () {
    // this.getDocList()
    this.getData()
  },
  methods: {
    getData () {
      let surgeon = ''
      if (this.form.radio === 1) {
        this.form.select = ''
        surgeon = ''
      } else if (this.form.radio === 2) {
        this.form.select = ''
        surgeon = getCurrentAccount()
      } else {
        surgeon = this.form.select
      }
      request({
        url: opeSchedule,
        params: {
          date: this.form.date,
          surgeon: surgeon
        }
      }).then(res => {
        const data = res.data.data
        this.tableData = data
      })
    },
    getDocList (content = '') {
      request({
        url: getDoctorNurseListPaging,
        params: {
          userJob: 1,
          start: 1,
          size: 20,
          content
        }
      }).then(res => {
        const data = res.data.data.list
        this.docList = data
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.getDocList(query)
      } else {
        this.getDocList()
        // this.options = []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.operation-arrangement
  width 80vw
  height 70vh
  .title
    color #9BA3D5
    text-align center
    font-size 18px
    line-height 28px
    font-weight bold
    margin-bottom 16px
  .content
    height calc(100% - 90px)
</style>
