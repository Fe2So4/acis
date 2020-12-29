<template>
  <div class="option">
    <span>共排班{{ allCount }}台</span>
    <span>
      <span style="margin-right: 10px">
        楼层：
        <el-radio-group v-model="room" size="mini" @change="handleChange">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="6"></el-radio-button>
          <el-radio-button label="7"></el-radio-button>
          <el-radio-button label="8"></el-radio-button>
        </el-radio-group>
      </span>
      <span>
        <el-button type="primary" size="mini" @click="showPreview"
          >排班预览</el-button
        >
        <el-button type="primary" size="mini" @click="handleRefresh"
          >刷新</el-button
        >
        <!-- <el-button
          type="text"
          size="mini"
        >切换</el-button> -->
        <el-button type="primary" size="mini" @click="submitAll"
          >提交</el-button
        >
      </span>
    </span>
  </div>
</template>
<script>
import request from "@/utils/requestForMock";
import { submitAllApply } from "@/api/schedule";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      room: "",
    };
  },
  props: {
    roomFloor: {
      type: String,
      required: true,
    },
  },
  watch: {
    roomFloor: {
      handler(val) {
        if (val === "0") {
          this.room = "全部";
        } else {
          this.room = val;
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("Schedule", ["time", "allCount"]),
  },
  methods: {
    showPreview() {
      this.$emit("showPreview");
    },
    submitAll() {
      request({
        url: submitAllApply + "/" + this.time,
        method: "PUT",
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message({ type: "success", message: "提交成功" });
          this.$eventHub.$emit("get-unallocated");
          this.$eventHub.$emit("get-allocated");
          this.$eventHub.$emit("get-room");
          this.$eventHub.$emit("get-records");
          this.$eventHub.$emit("get-DocNurse");
        } else {
          this.$message({ type: "warning", message: "提交失败" });
        }
      });
    },
    handleChange(val) {
      let value = "0";
      if (val === "全部") {
      } else {
        value = val;
      }
      this.$emit("update:roomFloor", value);
    },
    handleRefresh() {
      this.$eventHub.$emit("get-allocated");
      this.$eventHub.$emit("get-unallocated");
      this.$eventHub.$emit("get-records");
      this.$eventHub.$emit("get-DocNurse");
    },
  },
  mounted() {
    this.$eventHub.$on("submit-all", this.submitAll);
  },
  beforeDestroy() {
    this.$eventHub.$off("submit-all");
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.option {
  padding: 10px 20px;
  @include theme-property("background", $background-schedule-option);
  display: flex;
  @include theme-property("color", $color-text-regular);
  font-size: 14px;
  line-height: 28px;
  justify-content: space-between;
  border-radius: 0px 0px 5px 5px;
}
.option /deep/ .el-button--text {
  @include theme-property("color", $color-text-regular);
}
</style>
