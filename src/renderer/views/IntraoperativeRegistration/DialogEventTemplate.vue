<template>
  <div class="dialog-event-template">
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
          <div class="tree-content">
            <el-scrollbar
              style="height:100%;"
              :wrap-style="wrapStyle"
            >
              <el-tree
                :data="treeData"
                :props="defaultProps"
                @node-click="onNodeClick"
                default-expand-all
              >
                <span slot-scope="{ node, data }">
                  <span>{{ node.label || data.modeName }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <div class="table">
          <vxe-table
            border="inner"
            ref="table"
            resizable
            align="center"
            highlight-hover-row
            height="499px"
            :data="tableData"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            size="mini"
          >
            <!-- class="scroll" -->
            <vxe-table-column
              type="checkbox"
              width="40"
            />
            <vxe-table-column
              field="eventType"
              title="类型"
            />
            <vxe-table-column
              field="durationFromInroom"
              title="距入室时间"
              :edit-render="{
                name: '$input',
                props: { type: 'float', digits: 0 }
              }"
            />
            <!-- width="60" -->
            <vxe-table-column
              field="eventName"
              title="事件名称"
            />
            <!-- width="200" -->
            <!-- width="80" -->
            <vxe-table-column
              field="approach"
              title="途径"
              :edit-render="{
                style: 'z-index: 9999',
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
              :edit-render="{
                name: '$input',
                props: { type: 'float', digits: 2 }
              }"
            />
            <!-- width="80" -->
            <vxe-table-column
              field="concentrationUnit"
              title="单位"
              :edit-render="{
                name: '$select',
                options: conUnitList,
                optionProps: {
                  value: 'detail_code',
                  label: 'detail_name'
                }
              }"
              width="80"
            />
            <vxe-table-column
              field="speed"
              title="速度"
              :edit-render="{
                name: '$input',
                props: { type: 'float', digits: 2 }
              }"
            />
            <!-- width="80" -->
            <vxe-table-column
              field="speedUnit"
              title="单位"
              :edit-render="{
                name: '$select',
                options: speedUnitList,
                optionProps: {
                  value: 'detail_code',
                  label: 'detail_name'
                }
              }"
              width="80"
            />
            <vxe-table-column
              field="dosage"
              title="剂量"
              :edit-render="{
                name: '$input',
                props: { type: 'float', digits: 2 }
              }"
            />
            <!-- width="80" -->
            <vxe-table-column
              field="dosageUnit"
              title="单位"
              :edit-render="{
                name: '$select',
                options: doseUnitList,
                optionProps: {
                  value: 'detail_code',
                  label: 'detail_name'
                }
              }"
              width="80"
            />

            <vxe-table-column
              field="holdingTime"
              title="持续时间"
              :edit-render="{ name: '$input', props: { type: 'number' } }"
            />
            <!-- width="100" -->
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
          v-model="notUseDosage"
          size="mini"
          style="margin: 0 10px"
        >
          不套用剂量
        </el-checkbox>
        <el-button
          type="primary"
          @click="onUseTemplate"
          :true-label="false"
          :false-label="true"
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
import { mapState } from 'vuex'
import request from '@/utils/requestForMock'
import { getConUnit, getSpeedUnit, getDoseUnit } from '@/api/anaesDrug'
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
      conUnitList: [],
      speedUnitList: [],
      doseUnitList: [],
      date: date,
      notUseDosage: false,
      treeData: [],
      defaultProps: {
        children: 'list',
        label: 'name'
      },
      tableData: [],
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ]
    }
  },
  created () {
    this.getEventTemplateList()
    console.log(this.approachList)
    // if(this.eventType.eventName === '术中登记') {
    //   this.timeTitle = '距入室时间'
    // }else if(this.eventType.eventName === '复苏登记'){
    //   this.timeTitle = '距入室时间'
    // }
  },
  computed: {
    ...mapState('Anaes', ['eventType'])
  },
  mounted () {
    this.getDoseUnit()
    this.getConUnit()
    this.getSpeedUnit()
  },
  methods: {
    getDoseUnit () {
      request({
        url: getDoseUnit
      }).then(res => {
        this.doseUnitList = res.data.data
      })
    },
    getConUnit () {
      request({
        url: getConUnit
      }).then(res => {
        this.conUnitList = res.data.data
      })
    },
    getSpeedUnit () {
      request({
        url: getSpeedUnit
      }).then(res => {
        this.speedUnitList = res.data.data
      })
    },
    onClose () {
      this.$emit('update:visible', false)
    },
    onUseTemplate () {
      this.$emit('use-template', {
        list: this.tableData,
        date: this.date,
        useDosage: !this.notUseDosage
      })
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
      }).then(res => {
        if (res.data && res.data.success) {
          this.treeData = res.data.data
        }
      })
    },
    getEventTemplateDetail (templeteId) {
      return request({
        method: 'post',
        url: getEventTemplateDetail,
        params: {
          templeteId
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>
<style>
.vxe-select--panel {
  z-index: 9997 !important;
}
</style>
<style lang="scss" scoped>
@import '@/styles/theme';
.content {
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  border: 1px solid;
  @include theme-property('border-color', $dateTimePicker-color-border);
  border-radius: 5px;
  height: 500px;
  font-size: 14px;
  .tree {
    height: 100%;
    height: 500px;
    p {
      @include theme-property('color', $color-text-primary);
      margin: 0;
      padding: 10px;
    }
    .tree-content {
      height: calc(100% - 36px);
    }
    .el-tree {
      background: unset;
    }
  }
}

/deep/ .el-dialog__headerbtn {
  font-size: 20px !important;
}
</style>
