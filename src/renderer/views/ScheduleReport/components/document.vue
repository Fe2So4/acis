<template>
  <div class="document">
    <el-form
      :inline="true"
      size="mini"
    >
      <el-form-item>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          @change="getData"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="print">
          打印
        </el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <div class="print-document">
          <vxe-table
            border
            show-footer
            export-config
            ref="xTable"
            height="100%"
            :data="tableData"
            align="center"
          >
            <vxe-table-column
              field="opeRoom"
              title="术间"
            />
            <vxe-table-column
              field="sequence"
              title="序号"
            />
            <vxe-table-column
              field="ptName"
              title="病人信息"
            />
            <vxe-table-column
              field="inpatientWard"
              title="病区"
            />
            <vxe-table-column
              field="bedId"
              title="床号"
            />
            <vxe-table-column
              field="visitId"
              title="住院号"
            />
            <vxe-table-column
              field="diagnoseBefore"
              title="诊断"
            />
            <vxe-table-column
              field="operationName"
              title="手术名称"
            />
            <vxe-table-column
              field="surgeonName"
              title="手术医师"
            />
            <vxe-table-column
              field="anesMethod"
              title="麻醉方法"
            />
            <vxe-table-column
              field="anesDoc"
              title="麻醉医师"
            />
            <vxe-table-column
              field="opeNurse"
              title="洗手护士"
            />
            <vxe-table-column
              field="supplyNurse"
              title="巡回护士"
            />
            <vxe-table-column
              field="memo"
              title="备注"
            />
          </vxe-table>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import {
  getTableList
} from '@/api/schedule'
import request from '@/utils/requestForMock'
import { ipcRenderer } from 'electron'
export default {
  name: 'Document',
  data () {
    return {
      value: '',
      time: moment(new Date()).format('yyyy-MM-DD'),
      ptList: [],
      tableData: [],
      floor: ''
    }
  },
  computed: {},
  methods: {
    print () {
      const html = document.querySelector('.print-content')
      ipcRenderer.send('print-start', {
        html: html
      })
    },
    getData () {
      request({
        url: getTableList + '/' + this.time,
        method: 'GET'
      }).then(res => {
        this.tableData = res.data.data
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.document {
  height: 100%;
  .content{
    height:calc(100% - 46px);
  }
  .print-document{
    height: 100%;
    h3{
      text-align: center;
    }
    .el-row{
      margin-bottom:10px;
      // padding: 0 0 5px 0;
      &:first-child{
        margin:unset ;
      }
      .el-col{
        display: flex;
        margin-right: 20px;
        span{
          display: inline-block;
          padding: 2px;
          &:last-child{
            margin-left: 5px;
            border-bottom: 1px solid #fff;
            text-align: left;
            text-indent:5px;
            flex: 1;
          }
        }
      }
    }
  }
}
.document /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .content {
  display: flex;
  border-left: 1px solid #1A2131;
  border-bottom: 1px solid #1A2131;
  span {
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid #1A2131;
    border-top: 1px solid #1A2131;
    // border-bottom: 1px solid #1A2131;
    box-sizing: border-box;
  }
}
.document /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item {
  padding: 0;
  width: 400px;
}
.document /deep/ .el-select .el-select-dropdown,
.document .el-select-dropdown__item.is-disabled {
  background: #f3f6f9;
  cursor: auto;
  color: #000;
}
.document /deep/ .el-scrollbar__view{
  height: 100%;
}
</style>
<style>
  .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
