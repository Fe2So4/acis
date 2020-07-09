<template>
  <div class="table">
    <vxe-table
      border
      show-overflow
      size="mini"
      ref="xTable"
      align="center"
      height="100%"
      class="anaesTable"
      :loading="loading"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    >
      <vxe-table-column
        type="checkbox"
        width="60"
      />
      <vxe-table-column
        field="type"
        title="类型"
      />
      <vxe-table-column
        field="eventName"
        title="事件名称"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-input
            v-model="row.eventName"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="method"
        title="途径"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-input
            v-model="row.method"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="concentration"
        title="浓度"
        :edit-render="{}"
      >
        <template v-slot:edit="{row}">
          <el-input
            v-model="row.concentration"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="concentrationUnit"
        title="单位"
        :edit-render="{}"
      >
        <template v-slot:edit="scope">
          <el-select
            v-model="scope.row.concentrationUnit"
            size="mini"
            @change="$refs.xTable.updateStatus(scope)"
          >
            <el-option
              v-for="item in unitList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-slot="{ row }">
          {{ getSelectLabel(row.concentrationUnit, unitList) }}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="speed"
        title="速度"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-input
            v-model="row.speed"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="speedUnit"
        title="单位"
        :edit-render="{}"
      >
        <template v-slot:edit="scope">
          <el-select
            v-model="scope.row.speedUnit"
            size="mini"
            @change="$refs.xTable.updateStatus(scope)"
          >
            <el-option
              v-for="item in unitList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-slot="{ row }">
          {{ getSelectLabel(row.speedUnit, unitList) }}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="dose"
        title="剂量"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-input
            v-model="row.dose"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="doseUnit"
        title="单位"
        :edit-render="{}"
      >
        <template v-slot:edit="scope">
          <el-select
            v-model="scope.row.doseUnit"
            size="mini"
            @change="$refs.xTable.updateStatus(scope)"
          >
            <el-option
              v-for="item in unitList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-slot="{ row }">
          {{ getSelectLabel(row.doseUnit, unitList) }}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="startTime"
        title="发生时间"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-date-picker
            v-model="row.startTime"
            type="datetime"
            size="mini"
            format="MM-dd HH:mm"
            value-format="MM-dd HH:mm"
          />
        </template>
        <template v-slot="{ row }">
          {{ formatDate(row.startTime, 'MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="continue"
        title="是否持续"
      >
        <template v-slot="{ row }">
          <el-switch v-model="row.continue" />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="continueTime"
        title="持续时间"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-input
            v-model="row.continueTime"
            size="mini"
          />
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="endTime"
        title="结束时间"
        :edit-render="{}"
      >
        <template v-slot:edit="{ row }">
          <el-date-picker
            v-model="row.endTime"
            size="mini"
            type="datetime"
            format="MM-dd HH:mm"
            value-format="MM-dd HH:mm"
          />
        </template>
        <template v-slot="{ row }">
          {{ formatDate(row.endTime, 'MM-DD HH:mm') }}
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
import moment from 'moment'
export default {
  name: 'AnaesTable',
  data () {
    return {
      loading: false,
      tableData: [{
        type: '输液',
        eventName: '0.9%氯化钠',
        method: '吸入',
        concentration: '浓度',
        concentrationUnit: '1',
        speed: '20',
        speedUnit: '2',
        dose: '20',
        doseUnit: '2',
        startTime: '04-21 11:20',
        endTime: '05-22 11:20',
        continue: true,
        continueTime: '持续时间'
      }],
      unitList: [{ label: 'mg/h', value: '1' }, { label: 'mg/m', value: '2' }]
    }
  },
  methods: {
    formatDate (value, format) {
      return moment(value).format(format)
    },
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    }
  }
}
</script>
<style lang="scss" scoped>
  .table{
    width:100%;
    height:100%;
  }
</style>
