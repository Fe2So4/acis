<template>
  <div class="detail">
    <div
      class="content"
      v-show="detail.scheduledDateTime"
    >
      申请时间：{{ detail.scheduledDateTime }}
      申请台次：{{ detail.sequence }}
      病区：{{ detail.inpatientWard }} 床位：{{ detail.bedNo }} 住院号：{{ detail.patientId }}
      医师：{{ detail.surgeon }} 手术：{{ detail.operationName }} 病人姓名：{{ detail.patientName }}
      诊断：{{ detail.diagBeforeOperation }} 备注：{{ detail.operationDescription }}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .detail {
    height: 40px;
    background: #f3f6f9;
    font: 14px/40px "";
  }
</style>
