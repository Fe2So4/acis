<template>
  <div class="room-config">
    <el-dialog title="手术间配置" :visible.sync="roomVisible" width="60%">
      <div class="roomConfig">
        <el-form ref="form" label-width="100px">
          <el-form-item label="手术间号">
            <el-input v-model="roomNo" disabled />
          </el-form-item>
          <el-form-item label="最大手术台数">
            <el-input v-model="maxCount" />
          </el-form-item>
          <el-form-item label="科室">
            <el-select v-model="dept" placeholder="请选择科室">
              <el-option
                v-for="(item,index) in deptList"
                :key="index"
                :value="item.deptCode"
                :label="item.deptName"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updataData">确认</el-button>
            <el-button type="primary" @click="roomVisible==false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/utils/requestForMock";
import { getConfigByRoomNo, changeConfigByRoomNo } from "@/api/schedule";
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
      deptList: [],
      maxCount: "",
      dept: "",
      roomNo: "",
    };
  },
  props: {
    roomVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("Schedule", ["currentRoom"]),
  },
  methods: {
    submitRoomConfig() {},
    getConfigData() {
      request({
        url: getConfigByRoomNo + "/" + this.currentRoom,
      }).then((res) => {
        let data = res.data.data;
        this.maxCount = data.maxOperationNum;
        this.deptCode = data.deptName;
        this.roomNo = data.roomNo;
      });
    },
    updataData() {
      let obj = {};
      obj.maxNo = this.maxCount;
      obj.deptCode = this.deptCode;
      obj.roomNo = this.roomNo;
      reques({
        url: changeConfigByRoomNo,
        data: obj,
      }).then((res) => {
        if (res.code === 200) {
          this.$message({ type: "success", message: "提交成功" });
        }
      });
    },
  },
  mounted() {
    this.getConfigData();
  },
};
</script>
<style lang="scss" scoped>
.room-config {
}
</style>
