<template>
  <div class="liquidProperties">
    <vxe-table
      border="inner"
      ref="table"
      resizable
      highlight-hover-row
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}"
      height="600px"
      class="scroll"
      size="mini"
    >
      <vxe-table-column
        field="liquidName"
        title="名称"
        :edit-render="{
          name: '$input',
          events:{change: onInputChange}
        }"
      />
    </vxe-table>
    <div class="buttons">
      <el-button
        type="primary"
        size="mini"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import { getLiquidProperty, saveLiquidProperty } from '@/api/generalConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'LiquidProperties',
  data () {
    return {
      tableData: [],
      modifiedMap: {}
    }
  },
  created () {
    this.getLiquidProperty()
  },
  methods: {
    onSave () {
      const list = Object.values(this.modifiedMap).map(
        ({ liquidCode, liquidName }) => {
          return {
            liquidCode,
            liquidName
          }
        }
      )
      if (!list.length) {
        this.$message({
          type: 'info',
          message: '未更改任何项目'
        })
        return
      }
      this.saveLiquidProperty(list)
    },
    onInputChange ({ row }) {
      this.modifiedMap[row.inputCode] = row
    },
    getLiquidProperty () {
      return request({
        method: 'get',
        url: getLiquidProperty
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.tableData = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    saveLiquidProperty (list) {
      return request({
        method: 'put',
        url: saveLiquidProperty,
        data: list
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 重置缓存
            this.modifiedMap = {}
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.liquidProperties {
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
