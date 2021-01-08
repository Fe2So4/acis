<template>
  <div class="schedule-report">
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      align="center"
      style="color: #444444; font-size: 14px"
    >
      <thead style="display: table-header-group; font-weight: bold">
        <tr>
          <th
            colspan="14"
            style="
              text-align: center;
              font-size: 30px;
              padding: 16px 0;
              border: 0;
            "
          >
            手术排班表
          </th>
        </tr>
        <tr>
          <th
            colspan="7"
            style="text-align: left; padding: 9px 0"
          >
            时间：{{ time }}
          </th>
          <th
            colspan="7"
            style="text-align: right; padding: 9px 0"
          >
            台数：{{ tableData.length }} 台
          </th>
        </tr>
        <tr>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              border-left: 1px solid #444444;
              padding: 9px 0;
            "
          >
            手术间
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            台次
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            病人信息
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            病区
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            床号
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            住院号
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            诊断
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
              width: 202px;
            "
          >
            手术名称
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            手术医师
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            麻醉方法
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            麻醉医师
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            洗手护士
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            巡回护士
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            备注
          </th>
          <th
            style="
              border-bottom: 1px solid #444444;
              border-top: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
          >
            执行
          </th>
        </tr>
      </thead>
      <tbody style="text-align: center">
        <tr
          v-for="(item, index) in tableData"
          :key="index"
        >
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.opeRoom }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.sequence }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.ptName }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.inpatientWard }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.bedId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.visitId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.diagnoseBefore }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.operationName }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.surgeonName }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.anesMethod }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.anesDoc }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.opeNurse }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.supplyNurse }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.memo }}
          </td>
          <td
            style="
              border-bottom: 1px solid #444444;
              border-right: 1px solid #444444;
              padding: 9px 0;
            "
            :class="{ 'bg-schedule': item.index % 2 === 0 }"
          >
            {{ item.isExecute === "0" ? "未执行" : "已执行" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'ScheduleReport',
  data () {
    return {}
  },
  props: {
    tableData: {
      default: function () {
        return []
      },
      type: Array
    },
    time: {
      type: String,
      default: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.schedule-report {
  height: 100%;
  // 1191px * 842px
  // background: #E3E3E3;
  // box-shadow: 1px 20px 45px 5px rgba(0, 0, 0, 0.5);
  // border-radius: 5px;
  table {
    tbody {
      tr {
        td {
          &.bg-schedule {
            background-color: #fff3e0 !important;
          }
          &:first-child {
            border-left: 1px solid #444444;
          }
        }
        // &:last-child{
        //   td{
        //     border-bottom:1px solid #444444;
        //   }
        // }
      }
    }
  }
}
</style>
