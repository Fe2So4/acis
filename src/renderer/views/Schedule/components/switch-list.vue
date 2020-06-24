<template>
  <div class="switch">
    <vxe-table
      height="100%"
      width="100%"
      border
      ref="previewTable"
      size="mini"
      align="center"
      highlight-current-row
      :data="switchList"
    >
      <vxe-table-column
        field="room"
        title="手术间"
        width="82"
      />
      <vxe-table-column
        field="sequence"
        title="台次"
        width="82"
      />
      <vxe-table-column
        field="ptName"
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
        field="inpNo"
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
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    switchList: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .switch {
    height: 100%;
    width: 100%;
  }
</style>
