<template>
  <div class="page-withdraw">
    <el-scrollbar style="height:100%;" class="scrollbar">
      <div class="box" @contextmenu="showMenu2">
        <div
          class="box-item"
          v-for="item in recordsList"
          :key="item.id"
          @dblclick="handleWithdraw(item.id)"
        >{{ item.message }}</div>
        <vue-context-menu
          :context-menu-data="contextMenuData2"
          @handlerClearList="handlerClearList"
        />
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import request from "@/utils/requestForMock";
import { getRecord } from "@/api/schedule";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      contextMenuData2: {
        menuName: "demo1",
        axis: {
          x: null,
          y: null,
        },
        menulists: [
          {
            btnName: "清空",
            fnHandler: "handlerClearList",
          },
        ],
      },
      recordsList: [],
    };
  },
  props: {},
  computed: {
    ...mapGetters("Schedule", ["time"]),
  },
  mounted() {
    this.getData();
    this.$eventHub.$on("get-records", () => {
      this.getData();
    });
  },
  methods: {
    getData() {
      request({
        url: getRecord + `/${this.time}`,
      }).then((res) => {
        this.recordsList = res.data.data;
      });
    },
    handlerClearList() {
      console.log("qingkong");
      this.recordsList = [];
    },
    showMenu2() {
      // this.transferIndex1 = index // tranfer index to child component
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      this.contextMenuData2.axis = {
        x,
        y,
      };
    },
    handleWithdraw(sysno) {
      this.$emit("handleWithdraw", sysno);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-withdraw {
  height: 100%;
  // background: #f3f6f9;
  // overflow-y: auto;
  .box {
    height: 100%;
    .box-item {
      font: 14px/28px "";
      padding-left: 10px;
      cursor: pointer;
      color: #d0dae5;
      &:hover {
        background: #2c3b66;
      }
    }
  }
}
</style>
<style>
.page-withdraw .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
