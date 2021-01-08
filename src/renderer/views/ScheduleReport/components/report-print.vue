<template>
  <div class="schedule-report">
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      align="center"
      style="color: #000000; font-size: 14px"
    >
      <thead style="display: table-header-group; font-weight: bold">
        <tr>
          <th
            colspan="9"
            style="
              text-align: center;
              font-size: 20px;
              padding: 0 0 8px 0;
              border: 0;
            "
          >
            手术排班表
          </th>
          <th
            colspan="2"
            style="text-align: center; padding: 0 0 8px 0; border: 0"
          >
            {{ time }} {{ date }}
          </th>
        </tr>
        <tr>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              border-left: 1px solid #000000;
              padding: 0 0;
            "
          >
            手术间
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
            "
          >
            台次
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            病人姓名
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            病区
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            床号
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            住院号
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 302px;
            "
          >
            诊断或手术名称
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 140px;
            "
          >
            术者
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 100px;
            "
          >
            麻醉方式
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            洗手
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            巡回
          </th>
        </tr>
      </thead>
      <tbody style="text-align: center">
        <tr v-for="(item, index) in tableData" :key="index">
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.opeRoom }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.sequence }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.ptNamePrint }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.inpatientWard }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.bedId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.visitId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              text-align: left;
            "
          >
            {{ item.operationName }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.surgeonName }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.anesMethod }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.opeNurse }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            {{ item.supplyNurse }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "ScheduleReport",
  data() {
    return {};
  },
  props: {
    tableData: {
      default: function () {
        return [];
      },
      type: Array,
    },
    time: {
      type: String,
      default: moment(new Date()).format("YYYY-MM-DD"),
    },
  },
  computed: {
    date() {
      let week = moment(this.time).day();
      switch (week) {
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
        case 0:
          return "星期日";
      }
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.schedule-report {
  // width: 210mm;
  margin: 0 auto;
  width: 297mm;
  height: 210mm;

  table {
    tbody {
      tr {
        td {
          &.bg-schedule {
            background-color: #fff3e0 !important;
          }
          &:first-child {
            border-left: 1px solid #000000;
          }
        }
        // &:last-child{
        //   td{
        //     border-bottom:1px solid #000000;
        //   }
        // }
      }
    }
  }
}
</style>
