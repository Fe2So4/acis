<template>
  <div
    class="print-content"
    style="width:210mm"
  >
    <!-- <el-row>
      <el-col
        :offset="10"
        :span="6"
      >
        <h3 style="font-size:12px;">
          手术通知单
        </h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <span>手术间</span>
        <span>{{ noticeData.opeRoom }}</span>
      </el-col>
      <el-col :span="4">
        <span>手术台次</span>
        <span>{{ noticeData.sequence }}</span>
      </el-col>
      <el-col :span="6">
        <span>手术时间</span>
        <span>{{ noticeData.opeScheduleTime }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <span>姓名</span>
        <span>{{ noticeData.ptName }}</span>
      </el-col>
      <el-col :span="4">
        <span>性别</span>
        <span>{{ noticeData.gender }}</span>
      </el-col>
      <el-col :span="4">
        <span>年龄</span>
        <span>{{ noticeData.age }}</span>
      </el-col>
      <el-col :span="8">
        <span>诊断</span>
        <span>{{ noticeData.diagnoseBefore }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <span>科室</span>
        <span>{{ noticeData.deptName }}</span>
      </el-col>
      <el-col :span="4">
        <span>床号</span>
        <span>{{ noticeData.bedId }}</span>
      </el-col>
      <el-col :span="4">
        <span>住院号</span>
        <span>{{ noticeData.visitId }}</span>
      </el-col>
      <el-col :span="8">
        <span>手术名称</span>
        <span>{{ noticeData.operationName }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <span>主刀医生</span>
        <span>{{ noticeData.surgeon }}</span>
      </el-col>
      <el-col :span="5">
        <span>第一助手</span>
        <span>{{ noticeData.surgeonAssist1 }}</span>
      </el-col>
      <el-col :span="5">
        <span>第二助手</span>
        <span>{{ noticeData.surgeonAssist1 }}</span>
      </el-col>
      <el-col :span="5">
        <span>第三助手</span>
        <span>{{ noticeData.surgeonAssist3 }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <span>麻醉方式</span>
        <span>{{ noticeData.anesMethod }}</span>
      </el-col>
      <el-col :span="5">
        <span>麻醉医师</span>
        <span>{{ noticeData.anesDoc }}</span>
      </el-col>
      <el-col :span="5">
        <span>高危</span>
        <span />
      </el-col>
      <el-col :span="5">
        <span>备注</span>
        <span>{{ noticeData.memo }}</span>
      </el-col>
    </el-row> -->
    <table style="width:100%;">
      <tr>
        <td
          colspan="8"
          style="text-align:center;line-height:40px;
          font-weight:bold;"
        >
          手术通知单
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="width:80px;"
        >
          手术间
        </td>
        <td
          class="value"
          style="width:80px;"
        >
          {{ noticeData.opeRoom }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          手术台次
        </td>
        <td
          class="value"
          style="width:80px;"
        >
          {{ noticeData.sequence }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          手术时间
        </td>
        <td
          class="value"
          colspan="3"
        >
          {{ noticeData.opeScheduleTime }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="width:80px;"
        >
          姓名
        </td>
        <td class="value">
          {{ noticeData.ptName }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          性别
        </td>
        <td class="value">
          {{ noticeData.gender }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          年龄
        </td>
        <td class="value">
          {{ noticeData.age }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          诊断
        </td>
        <td class="value">
          {{ noticeData.diagnoseBefore }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="width:80px;"
        >
          科室
        </td>
        <td class="value">
          {{ noticeData.deptName }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          床号
        </td>
        <td class="value">
          {{ noticeData.bedId }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          住院号
        </td>
        <td class="value">
          {{ noticeData.visitId }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          手术名称
        </td>
        <td
          style="width:200px;"
          class="value"
        >
          {{ noticeData.operationName }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="width:80px;"
        >
          主刀医生
        </td>
        <td class="value">
          {{ noticeData.surgeon }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          第一助手
        </td>
        <td
          class="value"
        >
          {{ noticeData.surgeonAssist1 }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          第二助手
        </td>
        <td
          class="value"
        >
          {{ noticeData.surgeonAssist1 }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          第三助手
        </td>
        <td
          class="value"
        >
          {{ noticeData.surgeonAssist3 }}
        </td>
      </tr>
      <tr>
        <td
          class="label"
          style="width:80px;"
        >
          麻醉方式
        </td>
        <td
          class="value"
        >
          {{ noticeData.anesMethod }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          麻醉医师
        </td>
        <td
          class="value"
        >
          {{ noticeData.anesDoc }}
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          高危
        </td>
        <td
          class="value"
        >
          789
        </td>
        <td
          class="label"
          style="width:80px;"
        >
          备注
        </td>
        <td
          class="value"
        >
          {{ noticeData.memo }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    noticeData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
   .print-content{
      // background: #E3E3E3;
      h3{
        text-align: center;
      }
      .label{
        color:#CFD9E5
      }
      .value{
        color:#9AA3D4;
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
</style>>
