<template>
  <div>
    <el-dialog
      title="套用模板"
      :visible="this.visible"
      append-to-body
      :modal="false"
      width="80%"
      @close="onClose"
    >
      <div class="content">
        <div class="tree">
          <p>模板名称</p>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            @node-click="onNodeClick"
            default-expand-all
          >
            <span
              slot-scope="{ node, data }"
            >
              <span>{{ node.label || data.modeName }}</span>
            </span>
          </el-tree>
        </div>
        <div class="table">
          <vxe-table
            border="inner"
            ref="table"
            resizable
            highlight-hover-row
            height="330px"
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
                }
              }"
            />
            <vxe-table-column
              field="concentration"
              title="浓度"
              width="80"
              :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"
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
              :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"
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
              :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"
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
              :edit-render="{name: '$input', props: {type: 'number'}}"
            />
          </vxe-table>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-date-picker
          v-model="date"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          size="mini"
          popper-class="dateTimePicker"
        />
        <el-checkbox
          v-model="useDosage"
          size="mini"
          style="margin: 0 10px"
        >
          不套用剂量
        </el-checkbox>
        <el-button
          type="primary"
          @click="onUseTemplate"
          size="mini"
        >
          套 用
        </el-button>
        <el-button
          @click="onClose"
          size="mini"
        >
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import {
  getEventTemplateList,
  getEventTemplateDetail
} from '@/api/intraoperative'
import request from '@/utils/requestForMock'
export default {
  name: 'DialogEventTemplate',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    approachList: {
      required: true,
      type: Array
    }
  },
  data () {
    const date = moment().format('YYYY-MM-DD HH:mm')
    return {
      date: date,
      useDosage: false,
      treeData: [],
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      tableData: []
    }
  },
  created () {
    this.getEventTemplateList()
  },
  methods: {
    onClose () {
      this.$emit('update:visible', false)
    },
    onUseTemplate () {
      this.$emit('use-template')
    },
    onNodeClick (node) {
      if (Object.hasOwnProperty.call(node, 'id')) {
        console.log(node)
        this.getEventTemplateDetail(node.id)
      }
    },
    getEventTemplateList () {
      return request({
        method: 'get',
        url: getEventTemplateList
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.treeData = res.data.data
          }
        }
      )
    },
    getEventTemplateDetail (templeteId) {
      return request({
        method: 'post',
        url: getEventTemplateDetail,
        params: {
          templeteId
        }
      }).then(
        res => {
          if (res.data && res.data.success) {
            this.tableData = res.data.data
          }
        }
      )
    }
  }

}

</script>
<style lang='scss' scoped>
.content {
  display: grid;
  grid-template-columns: 20% 80%;
  border: 1px solid #39425C;
  border-radius: 5px;
  height: 500px;
  font-size: 14px;
  .tree {
    p {
      color: #0094FF;
      margin: 0;
      padding: 10px;
    }
    .el-tree {
      background: unset;
    }
  }
}
</style>
