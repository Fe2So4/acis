<template>
  <div
    class="preview"
    v-if="previewVisible"
  >
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="80%"
    >
      <vxe-table
        max-height="300px"
        width="100%"
        border
        ref="previewTable"
        size="mini"
        align="center"
        highlight-current-row
        :data="previewList"
      >
        <vxe-table-column
          field="roomNo"
          title="手术间"
          width="82"
        />
        <vxe-table-column
          field="sequence"
          title="台次"
          width="82"
        />
        <vxe-table-column
          field="patientName"
          title="姓名"
          width="120"
        />
        <vxe-table-column
          field="inpatientWard"
          title="病区"
          width="82"
        />
        <vxe-table-column
          field="bedNo"
          title="床位"
          width="120"
        />
        <vxe-table-column
          field="patientId"
          title="住院号"
          width="120"
          show-overflow="title"
        />
        <vxe-table-column
          field="operationName"
          title="手术名称"
          width="120"
        />
        <vxe-table-column
          field="surgeon"
          title="手术医师"
          width="82"
        />
        <vxe-table-column
          field="anaesDoc"
          title="麻醉医师"
          show-overflow="title"
        />
        <vxe-table-column
          field="washNurse"
          title="洗手护士"
          show-overflow="title"
        />
        <vxe-table-column
          field="hangNurse"
          title="巡回护士"
          show-overflow="title"
        />
      </vxe-table>
    </el-dialog>
  </div>
</template>
<script>
import { getPreviewList } from '../../../api/schedule'
export default {
  data () {
    return {
      previewList: []
    }
  },
  props: {
    timeDate: {
      type: String,
      default: function () {
        return ''
      }
    },
    previewVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取预览列表
    async getPreviewList () {
      const formData = new FormData()
      formData.append('date', this.timeDate)
      const res = await getPreviewList(formData)
      res.forEach(value => {
        value.anaesDoc = (value.doctor + value.firstDoctor + value.secondDoctor + value.thirdDoctor).replace(
          /^,+/, '').replace(/,+$/, '')
        value.washNurse = (value.washFirstNurse + ',' + value.washSecondNurse).replace(/^,+/, '').replace(/,+$/,
          '')
        value.hangNurse = (value.runFirstDoctor + ',' + value.runSecondDoctor).replace(/^,+/, '').replace(/,+$/,
          '')
      })
      this.previewList = res
    }
  },
  mounted () {
    this.getPreviewList()
  }
}
</script>
<style lang="scss" scoped>

</style>
