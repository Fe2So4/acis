<template>
  <div class="managementEventTemplate">
    <div class="content">
      <div class="tree">
        <el-scrollbar
          style="height: 100%"
          :wrap-style="wrapStyle"
        >
          <p>模板名称</p>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="onNodeClick"
            default-expand-all
            @node-contextmenu="onNodeContextmenu"
          >
            <span slot-scope="{ node, data }">
              <span>{{ node.label || data.modeName }}</span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
      <div class="table">
        <vxe-table
          border="inner"
          ref="table"
          resizable
          highlight-hover-row
          height="599px"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}"
          class="scroll"
          size="mini"
        >
          <vxe-table-column
            type="checkbox"
            width="40"
          />
          <vxe-table-column
            field="eventType"
            title="类型"
            width="60"
          />
          <vxe-table-column
            field="eventName"
            title="事件名称"
            width="200"
          />
          <vxe-table-column
            field="approach"
            title="途径"
            width="80"
            :edit-render="{
              name: '$select',
              options: approachList,
              optionProps: {
                value: 'detailCode',
                label: 'detailName'
              },
              events: {
                change: onChangeCell
              }
            }"
          />
          <vxe-table-column
            field="concentration"
            title="浓度"
            width="80"
            :edit-render="{
              name: '$input',
              props: {type: 'float', digits: 2},
              events: {
                change: onChangeCell
              }}"
          />
          <vxe-table-column
            field="concentrationUnit"
            title="单位"
            width="80"
          />
          <vxe-table-column
            field="speed"
            title="速度"
            width="80"
            :edit-render="{
              name: '$input',
              props: {type: 'float', digits: 2},
              events: {
                change: onChangeCell
              }}"
          />
          <vxe-table-column
            field="speedUnit"
            title="单位"
            width="80"
          />
          <vxe-table-column
            field="dosage"
            title="剂量"
            width="80"
            :edit-render="{
              name: '$input',
              props: {type: 'float', digits: 2},
              events: {
                change: onChangeCell
              }}"
          />
          <vxe-table-column
            field="dosageUnit"
            title="单位"
            width="80"
          />
          <vxe-table-column
            field="holdingTime"
            title="持续时间"
            width="100"
            :edit-render="{
              name: '$input',
              props: {type: 'number'},
              events: {
                change: onChangeHoldingTime
              }}"
          />
        </vxe-table>
      </div>
    </div>
    <div class="buttons">
      <el-button
        size="mini"
        @click="onDelete"
      >
        删除
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  getEventTemplateList,
  getEventTemplateDetail,
  getApproachList,
  saveChangedEventTemplate,
  deleteEventTemplate,
  renameEventTemplate
} from '@/api/intraoperative'
import request from '@/utils/requestForMock'
export default {
  name: 'ManagementEventTemplate',
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    const defaultProps = Object.freeze({
      children: 'list',
      label: 'name'
    })
    return {
      wrapStyle,
      defaultProps,
      templateId: '',
      treeData: [],
      tableData: [],
      approachList: [],
      changedMap: {},
      deletedMap: {}
    }
  },
  created () {
    this.getApproachList()
    this.getEventTemplateList()
  },
  methods: {
    // onClose () {
    //   this.$emit('update:visible', false)
    // },
    onNodeContextmenu (e, node) {
      const that = this
      if (Object.hasOwnProperty.call(node, 'id')) {
        this.$ctxMenu({
          list: [
            {
              label: '删除',
              value: 'del'
            },
            {
              label: '重命名',
              value: 'rename'
            }
          ],
          posX: e.pageX,
          posY: e.pageY,
          onSelectMenuItem (item) {
            if (item.value === 'del') {
              that.deleteEventTemplate(node.id, () => {
                that.getEventTemplateList()
                if (node.id === that.templateId) {
                  that.tableData = []
                  that.changedMap = {}
                  that.deletedMap = {}
                }
              })
            } else if (item.value === 'rename') {
              that.$prompt('请输入新的模板名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'messageBox'
              }).then(({ value }) => {
                that.renameEventTemplate(node.id, value, () => {
                  that.getEventTemplateList()
                })
              }).catch(() => {

              })
            }
          }
        })
      }
    },
    onChangeCell ({ row }) {
      this.changedMap[row.id] = row
    },
    onChangeHoldingTime ({ row }) {
      if (row.holdingTime) {
        row.isHolding = '1'
      } else {
        row.isHolding = '0'
      }
      this.changedMap[row.id] = row
    },
    onSave () {
      const requestArr = []
      const changedList = Object.values(this.changedMap).map((item) => {
        const obj = {};
        ({
          approach: obj.approach,
          concentration: obj.concentration,
          concentrationUnit: obj.concentrationUnit,
          detailId: obj.detailId,
          dosage: obj.dosage,
          dosageUnit: obj.dosageUnit,
          eventId: obj.eventId,
          eventName: obj.eventName,
          eventType: obj.eventType,
          holdingTime: obj.holdingTime,
          id: obj.id,
          isHolding: obj.isHolding,
          speed: obj.speed,
          speedUnit: obj.speedUnit
        } = item)
        return obj
      })
      if (changedList.length) {
        requestArr.push(this.saveChangedTemplate(changedList, 2))
      }
      const deletedList = Object.values(this.deletedMap).map((item) => {
        const obj = {};
        ({ id: obj.id } = item)
        return obj
      })
      if (deletedList.length) {
        requestArr.push(this.saveChangedTemplate(deletedList, 1))
      }
      if (requestArr.length) {
        return Promise.all(requestArr).then((res) => {
          const success = res.every((res) => res.data && res.data.data)
          if (success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 重置缓存
            this.changedMap = {}
            this.deletedMap = {}
          } else {
            this.$message({
              type: 'error',
              message: '保存失败'
            })
          }
        })
      }
    },
    onDelete () {
      const selectedArr = this.$refs.table.getCheckboxRecords()
      if (selectedArr.length) {
        selectedArr.forEach((row) => {
          this.deletedMap[row.id] = row
          const index = this.tableData.findIndex((item) => item.id === row.id)
          this.tableData.splice(index, 1)
          delete this.changedMap[row.id]
        })
      }
    },
    onNodeClick (node) {
      if (Object.hasOwnProperty.call(node, 'id')) {
        if (this.validateModified()) {
          this.templateId = node.id
          this.getEventTemplateDetail()
        } else {
          this.$confirm('当前有未保存的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.getEventTemplateDetail(node.id)
            })
            .catch(() => {})
        }
      }
    },
    validateModified () {
      return (
        Object.keys(this.changedMap).length +
          Object.keys(this.deletedMap).length ===
        0
      )
    },
    getEventTemplateList () {
      return request({
        method: 'get',
        url: getEventTemplateList
      }).then((res) => {
        if (res.data && res.data.success) {
          this.treeData = res.data.data
        }
      })
    },
    getEventTemplateDetail () {
      if (this.templateId === '') {
        return
      }
      return request({
        method: 'post',
        url: getEventTemplateDetail,
        params: {
          templeteId: this.templateId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.tableData = res.data.data
          // 重置缓存
          this.changedMap = {}
          this.deletedMap = {}
        }
      })
    },
    getApproachList () {
      return request({
        method: 'get',
        url: getApproachList
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.approachList = res.data.data
          }
        })
        .catch((e) => {})
    },
    saveChangedEventTemplate (list, mode) {
      return request({
        method: 'post',
        url: saveChangedEventTemplate,
        data: {
          list,
          mode,
          templeteId: this.templateId
        }
      })
    },
    deleteEventTemplate (templateId, successCb) {
      return request({
        method: 'post',
        url: deleteEventTemplate,
        params: {
          modeId: templateId
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            if (successCb) {
              successCb()
            }
          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      )
    },
    renameEventTemplate (templateId, name, successCb) {
      return request({
        method: 'post',
        url: renameEventTemplate,
        params: {
          id: templateId,
          name
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '重命名成功'
            })
            if (successCb) {
              successCb()
            }
          } else {
            return Promise.reject(new Error())
          }
        }
      ).catch(
        e => {
          this.$message({
            type: 'error',
            message: '重命名失败'
          })
        }
      )
    }
  }
}
</script>
<style lang='scss' scoped>
.managementEventTemplate {
  font-size: 14px;
  width: 90vw;
  // height: 60vh;
  .content {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 20% 80%;
    border: 1px solid #39425c;
    border-radius: 5px;
    height: 600px;
    font-size: 14px;
    .tree {
      p {
        color: #0094ff;
        margin: 0;
        padding: 10px;
      }
      .el-tree {
        background: unset;
      }
    }
  }
  .buttons {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
