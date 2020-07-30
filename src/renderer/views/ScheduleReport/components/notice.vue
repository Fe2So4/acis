<template>
  <div class="notice">
    <h2 class="center normal">
      复旦大学附属华山医院
    </h2>
    <h1 class="center normal">
      切除手术患者术前注意事项（I）
    </h1>
    <table class="itemTable">
      <tr>
        <td class="order">
          1、
        </td>
        <td>
          姓名：<span class="info">{{ noticeData.NAME }}</span>
          性别：<span class="info">{{ noticeData.gender }}</span>
          年龄：<span class="info">{{ noticeData.birthday }}</span>
        </td>
      </tr>
      <tr>
        <td>2、</td>
        <td>
          请您于
          <span class="info">{{ noticeData.year }}</span>年<span class="info">{{ noticeData.month }}</span>月<span class="info">{{ noticeData.day }}</span>日
          {{ noticeData.amPm }}<span class="info">{{ noticeData.time }}</span>到华山医院
          <span class="bold">门诊三楼皮肤病理取材室</span>
          门口，按“切除术”顺序号，依次手术。
        </td>
      </tr>
      <tr>
        <td>3、</td>
        <td>
          请您带好病历本、磁卡、付费发票、病理检验申请单、知情同意书、
          <span class="bold">HIV/RPR</span>
          化验报告及所有与手术相关的收费单据。
        </td>
      </tr>
      <tr>
        <td>4、</td>
        <td>请详细阅读知情同意书，并填写所有项目，最后签署“同意”并签名。</td>
      </tr>
      <tr>
        <td>5、</td>
        <td>若手术区域为外阴、腋下等体毛浓密部位，请患者自行剃毛备皮。</td>
      </tr>
      <tr>
        <td>6、</td>
        <td>若手术区域为头皮，我院可给予剃发备皮，需付费。</td>
      </tr>
      <tr>
        <td>7、</td>
        <td>有糖尿病、高血压、肝肾功能异常、凝血功能异常、精神状态异常等慢性疾病的患者，请将病情告诉手术医生。必要时可做相应处理，否则，一切后果自负。</td>
      </tr>
      <tr>
        <td>8、</td>
        <td>慢性病患者常规用药，术前按常规服用。若有服用抗凝药物史，请提前告知医生，并作相应调整。</td>
      </tr>
      <tr>
        <td>9、</td>
        <td>
          若无特殊情况，手术当日<span class="bold">无需禁食</span>。
        </td>
      </tr>
      <tr>
        <td>10、</td>
        <td>
          手术当日请挂<span class="bold">皮肤科普通号</span>。
        </td>
      </tr>
      <tr>
        <td>11、</td>
        <td>
          为避免院内感染，手术患者术前需要进行
          <span class="bold">HIV</span>、<span class="bold">RPR</span>
          的检验及
          <span class="bold">新冠核酸</span>、<span class="bold">抗体</span>
          检验。
        </td>
      </tr>
      <tr>
        <td>12、</td>
        <td>头面部手术，请当天最好不要化妆。</td>
      </tr>
      <tr>
        <td>13、</td>
        <td>请手术当天不要佩戴耳环、项链、戒指等饰品，以免损坏或遗失。</td>
      </tr>
      <tr>
        <td>14、</td>
        <td>由于病情演变的可能，手术当天可能会改变手术方法，甚至取消手术操作，请病患理解。</td>
      </tr>
    </table>
    <h2 class="right normal">
      华山医院总院皮肤科
    </h2>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers(
  'operationApplication'
)
export default {
  name: 'Notice',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['noticeData'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>
<style lang="scss" scoped>
.notice {
  font-family: "宋体";
  border: 1px solid #333;
  padding: 10px 50px;
  width: 1000px;
  margin: 0 auto;
  h2 {
    font-size: 20px;
  }
  h1 {
    font-size: 28px;
  }
  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
  .info {
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
    font-family: "黑体";
  }
  .normal {
    font-weight: normal;
    line-height: 22px;
  }
  .itemTable {
    text-align: left;
    font-size: 18px;
    line-height: 20px;
    border: none;

    td {
      padding: 0;
    }

    & > tr > td:first-child {
      white-space: nowrap;
      vertical-align: top;
    }
  }
}
</style>
