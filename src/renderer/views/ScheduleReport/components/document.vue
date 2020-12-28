<template>
  <div class="document">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-date-picker
          v-model="time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          popper-class="dateTimePicker"
          @change="getData"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="printEvent" :disabled="!reportVisible">
          打印
        </el-button>
        <el-button @click="handleEdit" v-show="reportVisible"> 编辑 </el-button>
        <el-button @click="getData"> 刷新 </el-button>
        <el-button @click="handleSubmit" v-show="!reportVisible">
          提交修改
        </el-button>
        <el-button @click="handleEdit" v-show="!reportVisible">
          返回
        </el-button>
      </el-form-item>
    </el-form>
    <div class="content">
      <!-- <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      > -->
      <div v-if="!reportVisible" style="height: 100%">
        <vxe-table
          border
          round
          auto-resize
          keep-source
          export-config
          ref="xTable"
          height="100%"
          :data="tableData"
          align="center"
          size="mini"
          :edit-config="{ trigger: 'dblclick', mode: 'cell', showStatus: true }"
          :header-cell-class-name="cellClassName"
        >
          <!-- class="table-report" -->
          <vxe-table-column
            field="opeRoom"
            title="手术间"
            width="80"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-select v-model="scope.row.opeRoom">
                <el-option
                  v-for="item in roomList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </template>
            <template v-slot="{ row }">
              {{ getSelectLabel(row.opeRoom, roomList) }}
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="sequence"
            title="台次"
            width="60"
            :edit-render="{}"
          >
            <template v-slot:edit="scope">
              <el-input v-model="scope.row.sequence" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="ptName" title="病人信息" />
          <vxe-table-column field="inpatientWard" title="病区" />
          <vxe-table-column field="bedId" title="床号" width="60" />
          <vxe-table-column field="visitId" title="住院号" width="80" />
          <vxe-table-column field="diagnoseBefore" title="诊断" width="100" />
          <vxe-table-column
            field="operationName"
            title="手术名称"
            width="220"
          />
          <vxe-table-column field="surgeonName" title="手术医师" width="80" />
          <vxe-table-column field="anesMethod" title="麻醉方法" />
          <vxe-table-column field="anesDoc" title="麻醉医师" width="80" />
          <vxe-table-column field="opeNurse" title="洗手护士" />
          <vxe-table-column field="supplyNurse" title="巡回护士" />
          <vxe-table-column field="memo" title="备注" />
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <el-button type="text" @click="cancelSchedule(row)">
                撤销
              </el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="print-document" v-else>
        <Report id="print-report" :table-data="tableData" :time="time" />
      </div>
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {
  getTableList,
  updateScheduledRoomPlatform,
  cancelScheduleSubmit,
} from "@/api/schedule";
import { roomNoList } from "@/api/dictionary";
import request from "@/utils/requestForMock";
import Report from "./report";
import { ipcRenderer } from "electron";
import XEUtils from "xe-utils";
export default {
  name: "Document",
  data() {
    return {
      value: "",
      time: moment(new Date()).format("yyyy-MM-DD"),
      ptList: [],
      tableData: [],
      floor: "",
      roomList: [],
      reportVisible: true,
    };
  },
  components: {
    Report,
  },
  computed: {},
  methods: {
    cancelSchedule(row) {
      request({
        url: cancelScheduleSubmit + `?operationId=` + row.operationId,
        method: "put",
      }).then((res) => {
        this.$message({ type: "success", message: "撤销成功" });
        this.getData();
      });
    },
    printEvent() {
      // this.$router.push('/print-notice')
      if (this.tableData.length > 0) {
        const printHtml = document.querySelector("#print-report").outerHTML;
        const options = { silent: true };
        ipcRenderer.send(
          "printChannel",
          printHtml,
          "schedule-report.css",
          options
        );
      } else {
        this.$message({ type: "warning", message: "请选择正确排班日期" });
      }
    },
    handleEdit() {
      // const updateRecords = this.$refs.xTable.getUpdateRecords()
      this.reportVisible = !this.reportVisible;
    },
    getRoomList() {
      request({
        method: "get",
        url: roomNoList,
      }).then((res) => {
        this.roomList = res.data.data;
      });
    },
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item === value);
      return item || null;
    },
    cellClassName({ row, column }) {
      if (column === "title") {
        return "header-title";
      }
    },
    handleSubmit() {
      const updateRecords = this.$refs.xTable.getUpdateRecords();
      const arr = [];
      updateRecords.forEach((item) => {
        arr.push({
          operationId: item.operationId,
          opeRoom: item.opeRoom,
          sequence: item.sequence,
        });
      });
      request({
        method: "put",
        url: updateScheduledRoomPlatform,
        data: arr,
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({ type: "success", message: "修改成功" });
          this.getData();
        } else {
          this.$message({ type: "success", message: res.data.msg });
        }
      });
    },
    getData() {
      request({
        url: getTableList + "/" + this.time,
        method: "GET",
      }).then((res) => {
        this.tableData = res.data.data || [];
      });
    },
  },
  mounted() {
    this.getData();
    this.getRoomList();
  },
};
</script>
<style lang="scss" scoped>
.document {
  height: 100%;
  .content {
    height: calc(100% - 46px);
  }
  .print-document {
    background: #e3e3e3;
    box-shadow: 1px 20px 45px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 0 50px;
    height: 100%;
    h3 {
      text-align: center;
    }
    .el-row {
      margin-bottom: 10px;
      // padding: 0 0 5px 0;
      &:first-child {
        margin: unset;
      }
      .el-col {
        display: flex;
        margin-right: 20px;
        span {
          display: inline-block;
          padding: 2px;
          &:last-child {
            margin-left: 5px;
            border-bottom: 1px solid #fff;
            text-align: left;
            text-indent: 5px;
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
  border-left: 1px solid #1a2131;
  border-bottom: 1px solid #1a2131;
  span {
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid #1a2131;
    border-top: 1px solid #1a2131;
    // border-bottom: 1px solid #1A2131;
    box-sizing: border-box;
  }
}
.document /deep/ .el-select .el-select-dropdown,
.el-select-dropdown .el-select-dropdown__item {
  // padding: 0;
  // width: 400px;
}
.document /deep/ .el-select .el-select-dropdown,
.document .el-select-dropdown__item.is-disabled {
  background: #f3f6f9;
  cursor: auto;
  color: #000;
}
.document /deep/ .el-scrollbar__view {
  height: 100%;
}
.table-report {
  @page {
    size: landscape;
  }
  background: #e3e3e3;
  color: #434343;
  font-size: 14px;
  /deep/ .vxe-table--header-wrapper {
    background: #e3e3e3;
  }
  /deep/ thead {
    tr {
      &:first-child {
        th {
          line-height: 50px;
          font-size: 30px;
          background-image: linear-gradient(
              rgba(227, 227, 227, 1),
              rgba(227, 227, 227, 1)
            ),
            linear-gradient(rgba(227, 227, 227, 1), rgba(227, 227, 227, 1));
        }
      }
      &:nth-child(2) {
        th {
          background-image: linear-gradient(
              rgba(227, 227, 227, 1),
              rgba(227, 227, 227, 1)
            ),
            linear-gradient(rgba(227, 227, 227, 1), rgba(227, 227, 227, 1));
          &:first-child {
            text-align: left;
            border-bottom: 1px solid rgba(97, 109, 143, 0.5);
          }
          &:last-child {
            border-bottom: 1px solid rgba(97, 109, 143, 0.5);
            text-align: right;
          }
        }
      }
    }
  }
}
.table-report.vxe-table .vxe-body--row.header-title {
  font-size: 30px;
  line-height: 50px;
  color: #fff;
}
.table-report.vxe-table .vxe-header--column.col-blue {
  background-color: #2db7f5;
  color: #fff;
}
</style>
<style>
.scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
