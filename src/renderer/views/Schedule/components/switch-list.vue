<template>
  <div class="switch-content">
    <vxe-table
      height="100%"
      width="100%"
      border
      ref="previewTable"
      size="mini"
      align="center"
      auto-resize
      class="scroll"
      :row-style="rowStyle"
      highlight-current-row
      :data="switchList"
    >
      <vxe-table-column field="opeRoom" title="手术间" width="60" />
      <vxe-table-column field="sequence" title="台次" width="50" />
      <vxe-table-column field="operationId" title="病人ID" width="60" />
      <vxe-table-column field="ptName" title="姓名" width="60" />
      <vxe-table-column field="age" title="年龄" width="60" />
      <vxe-table-column field="bedId" title="床位" width="100" />
      <vxe-table-column
        field="visitId"
        title="住院号"
        width="80"
        show-overflow="title"
      />
      <vxe-table-column field="operationName" title="手术名称" width="220" />
      <vxe-table-column field="surgeonName" title="手术医师" width="70" />
      <vxe-table-column field="assist1" title="助手1" width="60" />
      <vxe-table-column field="assist2" title="助手2" width="60" />
      <vxe-table-column field="assist3" title="助手3" width="60" />
      <vxe-table-column
        field="anesDocName"
        title="主麻"
        show-overflow="title"
        width="60"
      />
      <vxe-table-column
        field="firstAnesDocName"
        title="副麻1"
        width="60"
        show-overflow="title"
      />
      <vxe-table-column
        field="secAnesDocName"
        title="副麻2"
        width="60"
        show-overflow="title"
      />
      <vxe-table-column
        field="firstOpeNurseName"
        title="洗手1"
        width="60"
        show-overflow="title"
      />
      <vxe-table-column
        field="secOpeNurseName"
        title="洗手2"
        width="60"
        show-overflow="title"
      />
      <vxe-table-column
        field="firstSupplyNurseName"
        title="巡回1"
        width="60"
        show-overflow="title"
      />
      <vxe-table-column
        field="secSupplyNurseName"
        title="巡回2"
        width="60"
        show-overflow="title"
      />
    </vxe-table>
  </div>
</template>
<script>
import request from "@/utils/requestForMock";
import { getSwitchList } from "@/api/schedule";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      switchList: [],
    };
  },
  props: {},
  computed: {
    ...mapGetters("Schedule", ["time"]),
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      if (row.state === "1") {
        return {
          color: "green",
        };
      } else {
        return {
          color: "red",
        };
      }
    },
    getSwitchList() {
      request({
        url: getSwitchList + "/" + this.time,
      }).then((res) => {
        this.switchList = res.data.data;
      });
    },
  },
  mounted() {
    this.getSwitchList();
  },
};
</script>
<style lang="scss" scoped>
.switch-content {
  height: 100%;
  width: 100%;
}
</style>
