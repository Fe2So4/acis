
<template lang="pug">
  .common-terms
    .content(class="clearfix")
      .left
        el-scrollbar(style="height: 100%"
        :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="itemCode"
            :props="defaultProps"
            default-expand-all
            @node-click="handleChange"
        )
      .right
        vxe-table(
          border
          ref="xTable"
          auto-resize
          show-header-overflow
          show-overflow
          keep-source
          highlight-hover-row
          highlight-current-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          :data="tableData"
          :checkbox-config="{checkStrictly: true}"
          :radio-config="{highlight: true}"
          @radio-change="currentChangeEvent"
          @current-change="currentChangeEvent"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        )
          //- vxe-table-column(type="radio" width="60")
          //-   //- template
          //-   //-   span(class="drag-btn")
          //-   //-     i(class="vxe-icon--menu")
          vxe-table-column(field="detailId" title="序号")
          vxe-table-column(field="itemName" title="分类")
          vxe-table-column(field="detailName" title="名称" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini" @blur="handleBlur")
          vxe-table-column(field="detailCode" title="编码" :edit-render="{}")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailCode" size="mini" @blur="handleBlur")
    .option
<<<<<<< HEAD
      el-button(size="mini" :disabled="optionType!==1" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" @click="$refs.xTable.removeCheckboxRow()" :disabled="optionType===1") 删除(D)
      el-button(size="mini" @click="saveEvent" :disabled="optionType===1") 保存(S)
      el-button(size="mini" @click="revertEvent" :disabled="optionType===1") 取消(C)
      el-button(size="mini") 刷新(R)
=======
      el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" :disabled="deleteDisabled" @click="$refs.xTable.removeCheckboxRow()") 删除(D)
      el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
      el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
      el-button(size="mini" :disabled="refreshDisabled") 刷新(R)
>>>>>>> c24ccfd1e6614ae687d792facc8cc46ea94d5405
</template>
<script>
import {
  commonTermsList,
  commonTermsDetail,
  addCommonTermsDetail,
  updateCommonTermsDetail
} from "@/api/dictionary";
import request from "@/utils/requestForMock";
export default {
  data() {
    return {
      wrapStyle: [
        {
          "overflow-x": "hidden"
        }
      ],
      tableData: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "itemName"
      },
      currentMenu: {},
<<<<<<< HEAD
      optionType: 1 // 新增状态,
      // currentRow: {}
    }
=======
      optionType: 1, // 新增状态
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: true,
      insertData: {}
    };
>>>>>>> c24ccfd1e6614ae687d792facc8cc46ea94d5405
  },
  watch: {
    data: {
      handler(val) {
        return val;
      }
    }
    // insertData: {
    //   handler(val) {
    //     if (
    //       (val.detailCode && val.detailCode !== "") ||
    //       (val.detailName && val.detailName !== "")
    //     ) {
    //       this.cancelDisabled = false;
    //       this.saveDisabled = false;
    //     } else {
    //       this.cancelDisabled = false;
    //     }
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  mounted() {
    this.getCommonTerms();
  },
  methods: {
<<<<<<< HEAD
    currentChangeEvent ({ row }) {
      console.log(row)
      // this.currentRow = row
=======
    handleBlur() {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset();
      if (insertRecords.length > 0) {
        if (
          insertRecords[0].detailCode !== "" ||
          insertRecords[0].detailName !== ""
        ) {
          this.saveDisabled = false;
          this.cancelDisabled = false;
          this.deleteDisabled = false;
        } else {
          this.saveDisabled = true;
          this.cancelDisabled = false;
          this.deleteDisabled = true;
        }
      }
    },
    currentChangeEvent({ row }) {
      console.log(row);
      this.insertData = row;
      if (row.detailCode === "" && row.detailName === "") {
        this.deleteDisabled = true;
        this.cancelDisabled = false;
      } else {
        this.deleteDisabled = false;
      }
>>>>>>> c24ccfd1e6614ae687d792facc8cc46ea94d5405
    },
    handleChange(val) {
      this.currentMenu = val;
      this.getCommonTermsDetail();
    },
    getCommonTerms() {
      request({
        method: "GET",
        url: commonTermsList
      }).then(res => {
        const data = res.data.data;
        this.data = data;
      });
    },
    getCommonTermsDetail() {
      request({
        method: "GET",
        url: commonTermsDetail + "/" + this.currentMenu.itemCode
      }).then(res => {
        const data = res.data.data;
        this.tableData = data;
      });
    },
    async insertEvent(row) {
      // this.optionType = 2;
      this.addDisabled = true;
      this.cancelDisabled = false;
      this.data.forEach(value => {
        value.disabled = true;
      });
      const record = {
        detailId: this.tableData.length + 1,
        itemName: this.currentMenu.itemName,
        detailCode: "",
        detailName: ""
      };
      this.insertData = record;
      const { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      console.log(newRow);
      // await this.$refs.xTable.setActiveCell(newRow, 'sex')
    },
    // rowDrop () {
    //   this.$nextTick(() => {
    //     const xTable = this.$refs.xTable
    //     this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
    //       handle: '.drag-btn',
    //       onEnd: ({ newIndex, oldIndex }) => {
    //         const currRow = this.tableData.splice(oldIndex, 1)[0]
    //         this.tableData.splice(newIndex, 0, currRow)
    //       }
    //     })
    //   })
    // },
    revertEvent() {
      this.$refs.xTable.revertData();
      this.cancelDisabled = true;
      this.addDisabled = false;
    },
<<<<<<< HEAD
    addCommonTermsDetail (param) {
      const obj = {}
      obj.detailId = param.detailId
      obj.detailCode = param.detailCode
      obj.detailName = param.detailName
      obj.itemCode = this.currentMenu.itemCode
=======
    addCommonTermsDetail(param) {
      // "detailCode": "",
      // "detailId": "",
      // "detailName": "",
      // "itemCode": "",
      // "sort": 0,
      // "state": true
      const obj = {};
      obj.detailId = param.detailId;
      obj.detailCode = param.detailCode;
      obj.detailName = param.detailName;
      obj.itemCode = this.currentMenu.itemCode;
>>>>>>> c24ccfd1e6614ae687d792facc8cc46ea94d5405
      request({
        method: "POST",
        url: addCommonTermsDetail,
        data: obj
      }).then(res => this.getCommonTermsDetail());
    },
    updateCommonTermsDetail(param) {
      const list = param;
      list.forEach(value => {
        value.itemCode = this.currentMenu.itemCode;
        for (var k in value) {
          if (k === "itemName") {
            delete value[k];
          }
        }
      });
      request({
        method: "PUT",
        url: updateCommonTermsDetail,
        data: list
      }).then(res => this.getCommonTermsDetail());
    },
    saveEvent() {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset();
      // this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
      console.log(insertRecords, updateRecords);
      if (insertRecords.length > 0) {
        this.addCommonTermsDetail(insertRecords[0]);
      }
      if (updateRecords.length > 0) {
        this.updateCommonTermsDetail(updateRecords);
      }
      this.addDisabled = false;
      this.saveDisabled = true;
      this.refreshDisabled = false;
      this.cancelDisabled = true;
      this.deleteDisabled = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.common-terms {
  height: 100%;

  .content {
    height: calc(100% - 38px);

    .left {
      float: left;
      width: 20%;
      height: 100%;
    }

    .right {
      height: 100%;
      float: right;
      width: 80%;
    }
  }

  .option {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
