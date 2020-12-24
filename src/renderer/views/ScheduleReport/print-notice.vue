<template>
  <div class="print-content" style="width: 960px">
    <table
      style="
        width: 880px;
        height: 380px;
        margin: 0 auto;
        border-collapse: collapse;
        text-align: center;
      "
    >
      <tr>
        <td
          colspan="10"
          style="
            text-align: center;
            line-height: 40px;
            font-weight: bold;
            font-size: 30;
          "
        >
          手术通知单
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          姓名
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.ptName }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          性别
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.gender }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          年龄
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.age }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          床号
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.bedId }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          住院号
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.visitId }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          手术时间
        </td>
        <td
          class="value"
          colspan="2"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.opeScheduleTime }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          手术间
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.opeRoom }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          手术台次
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.sequence }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          科室
        </td>
        <td
          class="value"
          colspan="2"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.deptName }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          术前诊断
        </td>
        <td
          class="value"
          colspan="9"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.diagnoseBefore }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          手术名称
        </td>
        <td
          class="value"
          colspan="9"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.operationName }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          麻醉方式
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
          colspan="4"
        >
          {{ noticeData.anesMethod }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          麻醉医师
        </td>
        <td
          class="value"
          colspan="4"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.anesDoc }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          主刀医生
        </td>
        <td
          class="value"
          colspan="3"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.surgeon }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          第一助手
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.surgeonAssist1 }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          第二助手
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.surgeonAssist1 }}
        </td>
        <td
          class="label"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          第三助手
        </td>
        <td
          class="value"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.surgeonAssist3 }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          备注
        </td>
        <td
          class="value"
          colspan="9"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          {{ noticeData.memo }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-left: 1px solid #000;
          "
        >
          高危
        </td>
        <td
          class="value"
          colspan="9"
          style="border-top: 1px solid #000; border-right: 1px solid #000"
        >
          <!-- 高危（未做） -->
        </td>
      </tr>
      <tr>
        <td
          colspan="10"
          style="
            border-top: 1px solid #000;
            border-right: 1px solid #000;
            border-bottom: 1px solid #000;
            height: 38px;
            border-left: 1px solid #000;
          "
        />
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    noticeData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.print-content {
  background: #e3e3e3;
  height: 100%;
  margin: 0 auto;
  width: 960px;
  box-shadow: 1px 20px 45px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px 5px 0px 0px;
  color: #202020;
  h3 {
    text-align: center;
  }
  .label {
    // color:#CFD9E5
  }
  .value {
    // color:#9AA3D4;
    min-width: 50px;
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
</style>>
