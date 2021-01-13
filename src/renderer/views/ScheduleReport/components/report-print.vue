<template>
  <div class="schedule-report">
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      align="center"
      style="color: #000000; font-size: 14px;"
    >
      <thead style="display: table-header-group; font-weight: bold">
        <tr>
          <th
            colspan="3"
            style="text-align: center; padding: 0; border: 0;font-size: 14px;"
          >
            {{ time }} {{ date }} 共{{ tableData.length }}台
          </th>
          <th
            colspan="6"
            style="
              text-align: center;
              font-size: 26px;
              padding: 0 0 8px 0;
              border: 0;
            "
          >
            手术排班表
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
              width:60px;
            "
          >
            手术间
          </th>
          <th
            style="
              border-bottom: 1px solid #000000;
              border-top: 1px solid #000000;
              border-right: 1px solid #000000;
              width:50px;
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
              width:70px;
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
              width:60px;
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
              width:60px;
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
              width:80px;
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
              width: 280px;
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
              width: 80px;
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
              width: 60px;
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
              width: 60px;
            "
          >
            巡回
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
            备注
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
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:60px;
            "
          >
            <div style="width:60px;overflow:hidden;white-space:nowrap;">
              {{ item.opeRoom }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:50px;
            "
          >
            {{ item.sequence }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:70px;
            "
          >
            <div style="width:70px;overflow:hidden;white-space:nowrap;">
              {{ item.ptNamePrint }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:60px;
            "
          >
            <div style="width:60px;overflow:hidden;white-space:nowrap;">
              {{ item.inpatientWard }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:60px;
            "
          >
            {{ item.bedId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width:80px;
            "
          >
            {{ item.visitId }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              font-weight:bold;
              text-align:left;
            "
          >
            <div
              style="
              width:280px;
              white-space:nowrap;
              overflow:hidden;
              padding-left:2px;
              "
            >
              {{ item.operationName }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 140px;
            "
          >
            <div style="min-width:140px;">
              {{ item.surgeonName }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
            "
          >
            <div
              style="overflow:hidden;
              white-space:nowrap;
              width:80px;"
            >
              {{ item.anesMethod }}
            </div>
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 70px;
            "
          >
            {{ item.opeNurse }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 70px;
            "
          >
            {{ item.supplyNurse }}
          </td>
          <td
            style="
              border-bottom: 1px solid #000000;
              border-right: 1px solid #000000;
              padding: 0 0;
              width: 110px;"
          >
            <span>
              {{ item.memo }}
            </span>
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
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    date () {
      const week = moment(this.time).day()
      switch (week) {
        case 1:
          return '星期一'
        case 2:
          return '星期二'
        case 3:
          return '星期三'
        case 4:
          return '星期四'
        case 5:
          return '星期五'
        case 6:
          return '星期六'
        case 0:
          return '星期日'
      }
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang="scss" scoped>
.schedule-report {
  // width: 210mm;
  margin: 0 auto;
  width: 297mm;
  height: 210mm;

  table {
    thead{
      tr{
        th{
          height:22px;
        }
      }
    }
    tbody {
      tr {
        td {
          height:22px;
          &.bg-schedule {
            background-color: gray !important;
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
