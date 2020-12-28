<template>
  <div class="preview">
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="preview-table">
        <vxe-table
          max-height="600px"
          width="100%"
          border
          ref="previewTable"
          size="mini"
          auto-resize
          align="center"
          class="scroll"
          :row-style="rowStyle"
          highlight-current-row
          :data="previewList"
        >
          <vxe-table-column field="opeRoom" title="手术间" width="82" />
          <vxe-table-column field="sequence" title="台次" width="82" />
          <vxe-table-column field="ptName" title="姓名" width="120" />
          <vxe-table-column field="inpatientWard" title="病区" width="82" />
          <vxe-table-column field="bedId" title="床位" width="120" />
          <vxe-table-column
            field="visitId"
            title="住院号"
            width="120"
            show-overflow="title"
          />
          <vxe-table-column
            field="operationName"
            title="手术名称"
            width="120"
          />
          <vxe-table-column field="surgeon" title="手术医师" width="82" />
          <vxe-table-column
            field="anesDoc"
            title="麻醉医师"
            show-overflow="title"
          />
          <vxe-table-column
            field="opeNurse"
            title="洗手护士"
            show-overflow="title"
          />
          <vxe-table-column
            field="supplyNurse"
            title="巡回护士"
            show-overflow="title"
          />
        </vxe-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary">提 交</el-button>
        <el-button size="mini">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { previewList } from "@/api/schedule";
import request from "@/utils/requestForMock";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      previewList: [],
    };
  },
  props: {
    timeDate: {
      type: String,
      default: function () {
        return "";
      },
    },
    previewVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("Schedule", ["time"]),
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      if (row.state === "1") {
        return {
          color: "red",
        };
      } else {
        return {
          color: "green",
        };
      }
    },
    getData() {
      request({
        url: previewList + "/" + this.time,
      }).then((res) => {
        const data = res.data.data;
        this.previewList = data;
      });
    },
    handleClose() {
      this.$emit("handleClose");
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.preview {
  .preview-table {
    height: 80%;
  }
  .dialog-footer {
    text-align: center;
  }
  /deep/ .el-dialog__title {
    @include theme-property("color", $color-text-regular);
  }
}
</style>
