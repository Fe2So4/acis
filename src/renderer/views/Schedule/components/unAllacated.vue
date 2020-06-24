<template>
  <div class="unallacated">
    <vxe-table
      ref="unTable"
      resizable
      width="100%"
      height="100%"
      size="mini"
      border
      align="center"
      :data="list"
      highlight-current-row
      @cell-click="handleShowDetail"
      @cell-dblclick="handleDistributeRoom"
    >
      <vxe-table-column
        field="scheduledDateTime"
        title="申请时间"
        width="120"
      />
      <vxe-table-column
        field="sequence"
        title="申请台次"
        width="120"
        show-overflow="title"
      />
      <vxe-table-column
        field="patientName"
        title="姓名"
        width="120"
        type="html"
      />
      <vxe-table-column
        field="inpatientWard"
        title="病区"
        width="120"
        type="html"
      />
      <vxe-table-column
        field="bedNo"
        title="床号"
        show-overflow="title"
        width="62"
      />
      <vxe-table-column
        field="patientId"
        title="住院号"
        show-overflow="title"
        width="120"
      />
      <vxe-table-column
        field="diagBeforeOperation"
        title="诊断"
        show-overflow="title"
        width="62"
      />
      <vxe-table-column
        field="operationName"
        title="手术名称"
        show-overflow="title"
        width="120"
        type="html"
      />
      <vxe-table-column
        field="surgeon"
        title="手术医师"
        show-overflow="title"
        width="120"
        type="html"
      />
      <vxe-table-column
        field="anaesthesiaName"
        title="麻醉方法"
        show-overflow="title"
        width="120"
      />
      <vxe-table-column
        field="operationDescription"
        title="备注"
        show-overflow
        width="62"
      />
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    handleShowDetail () {
      this.$emit('handleShowDetail')
    },
    handleDistributeRoom () {
      this.$emit('handleDistributeRoom')
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .unallacated{
    height:100%;
    width:100%;
  }
</style>
