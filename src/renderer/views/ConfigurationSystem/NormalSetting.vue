<template>
  <div class="normalSetting">
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        默认手术间
      </el-col>
      <el-col :span="6">
        <el-input
          v-if="itemValue('默认手术间')"
          v-model="itemValue('默认手术间').normalValue"
          size="mini"
        />
      </el-col>
      <el-col :span="12">
        <el-checkbox
          size="mini"
          v-if="itemValue('同时修改采集床号配置')"
          v-model="itemValue('同时修改采集床号配置').normalValue"
          true-label="1"
          false-label="0"
        >
          同时修改采集床号配置
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        手术室代码
      </el-col>
      <el-col :span="6">
        <el-input
          size="mini"
          v-if="itemValue('手术室代码')"
          v-model="itemValue('手术室代码').normalValue"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        麻醉科代码
      </el-col>
      <el-col :span="6">
        <el-input
          size="mini"
          v-if="itemValue('麻醉科代码')"
          v-model="itemValue('麻醉科代码').normalValue"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        麻醉编号
      </el-col>
      <el-col :span="6">
        <el-input
          size="mini"
          v-if="itemValue('麻醉编号')"
          v-model="itemValue('麻醉编号').normalValue"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        持续用药显示格式
      </el-col>
      <el-col :span="6">
        <el-select
          size="mini"
          v-if="itemValue('持续用药显示格式')"
          v-model="itemValue('持续用药显示格式').normalValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in continuousDrugTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col
        :span="6"
        class="text"
      >
        持续用药标题单位
      </el-col>
      <el-col :span="6">
        <el-select
          size="mini"
          v-if="itemValue('持续用药标题单位')"
          v-model="itemValue('持续用药标题单位').normalValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in continuousDrugTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        单次用药显示格式
      </el-col>
      <el-col :span="6">
        <el-select
          size="mini"
          v-if="itemValue('单次用药显示格式')"
          v-model="itemValue('单次用药显示格式').normalValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in singleDrugTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-col>
      <el-col
        :span="6"
        class="text"
      >
        单次用药标题单位
      </el-col>
      <el-col :span="6">
        <el-select
          size="mini"
          v-if="itemValue('单次用药标题单位')"
          v-model="itemValue('单次用药标题单位').normalValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in singleDrugTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="6"
        class="text"
      >
        同步手术申请信息方式
      </el-col>
      <el-col :span="6">
        <el-radio-group
          size="mini"
          v-if="itemValue('同步手术申请信息方式')"
          v-model="itemValue('同步手术申请信息方式').normalValue"
        >
          <el-radio label="按科室" />
          <el-radio label="按时间" />
        </el-radio-group>
      </el-col>
      <el-col
        :span="6"
        class="text"
      >
        文书刷新间隔时间（秒）
      </el-col>
      <el-col :span="6">
        <el-input
          size="mini"
          v-if="itemValue('文书刷新间隔时间（秒）')"
          v-model="itemValue('文书刷新间隔时间（秒）').normalValue"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        class="text"
        :span="6"
      >
        同步间隔
      </el-col>
      <el-col :span="6">
        <el-input-number
          size="mini"
          v-if="itemValue('同步间隔')"
          v-model="itemValue('同步间隔').normalValue"
          controls-position="right"
          :min="1"
          :max="10"
        />天
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-checkbox
          size="mini"
          v-if="itemValue('医疗文书双击弹出下拉框选择')"
          v-model="itemValue('医疗文书双击弹出下拉框选择').normalValue"
          true-label="1"
          false-label="0"
        >
          医疗文书双击弹出下拉框选择
        </el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox
          size="mini"
          v-model="selectDefaultMonitor"
        >
          选择默认监护仪
        </el-checkbox>
        <el-select
          size="mini"
          v-show="selectDefaultMonitor"
          v-if="itemValue('选择默认监护仪')"
          v-model="itemValue('选择默认监护仪').normalValue"
          placeholder="请选择"
        >
          <el-option
            v-for="item in monitorList"
            :key="item.instrumentCode"
            :label="item.label"
            :value="item.instrumentCode"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-checkbox
          size="mini"
          v-if="itemValue('退出程序时是否提示')"
          v-model="itemValue('退出程序时是否提示').normalValue"
          true-label="1"
          false-label="0"
        >
          退出程序时是否提示
        </el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox
          size="mini"
          v-if="itemValue('标记修改过的体征项')"
          v-model="itemValue('标记修改过的体征项').normalValue"
          true-label="1"
          false-label="0"
        >
          标记修改过的体征项
        </el-checkbox>
      </el-col>
    </el-row>
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
import {
  getNormalConfig,
  saveNormalConfig,
  getMonitorList,
  getDrugShowType
} from '@/api/generalConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'NormalSetting',
  data () {
    return {
      continuousDrugTypeList: [
        {
          name: '默认',
          code: ''
        }
      ],
      singleDrugTypeList: [
        {
          name: '默认',
          code: ''
        }
      ],
      monitorList: [],
      valueList: []
    }
  },
  computed: {
    itemValue () {
      return (label) => {
        return this.valueList.find((item) => item.normalName === label)
      }
    },
    selectDefaultMonitor: {
      get () {
        return (
          this.itemValue('选择默认监护仪') &&
          this.itemValue('选择默认监护仪').normalValue !== ''
        )
      },
      set (val) {
        if (val) {
          if (this.monitorList.length) {
            this.itemValue(
              '选择默认监护仪'
            ).normalValue = this.monitorList[0].instrumentCode
          }
        } else {
          this.itemValue('选择默认监护仪').normalValue = ''
        }
      }
    }
  },
  created () {
    this.getNormalConfig()
    this.getMonitorList()
    this.getContinuousDrugShowType()
    this.getSingleDrugShowType()
  },
  methods: {
    onSave () {
      this.saveNormalConfig()
    },
    getNormalConfig () {
      return request({
        method: 'get',
        url: `${getNormalConfig}/1`
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.valueList = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    saveNormalConfig () {
      return request({
        method: 'put',
        url: saveNormalConfig,
        data: this.valueList
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
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
    },
    getMonitorList () {
      return request({
        method: 'get',
        url: getMonitorList,
        params: {
          type: 0 // 0-监护仪 1-呼吸机
        }
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.monitorList = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    getContinuousDrugShowType () {
      return request({
        method: 'get',
        url: `${getDrugShowType}/1`
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.continuousDrugTypeList.push(...res.data.data)
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    getSingleDrugShowType () {
      return request({
        method: 'get',
        url: `${getDrugShowType}/2`
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.singleDrugTypeList.push(...res.data.data)
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.normalSetting {
  color: #9aa3d4;
  overflow: hidden;
  .el-row {
    margin-bottom: 20px;
    line-height: 28px;
    .text {
      text-align: right;
    }
    .el-input,
    .el-select {
      width: 150px;
    }
    .el-input-number ::v-deep .el-input-number__decrease,
    .el-input-number ::v-deep .el-input-number__increase {
      background: #1a2134;
    }
  }
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
