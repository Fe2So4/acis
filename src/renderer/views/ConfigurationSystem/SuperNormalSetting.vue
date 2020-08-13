<template>
  <div class="superNormalSetting">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('麻醉单显示实时监护数据')"
          v-model="itemValue('麻醉单显示实时监护数据').normalValue"
          false-label="0"
          true-label="1"
        >
          麻醉单显示实时监护数据
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        诱导室名称
        <el-input
          size="mini"
          v-if="itemValue('诱导室名称')"
          v-model="itemValue('诱导室名称').normalValue"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('开放所有权限')"
          v-model="itemValue('开放所有权限').normalValue"
          false-label="0"
          true-label="1"
        >
          开放所有权限
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('同步开启')"
          v-model="itemValue('同步开启').normalValue"
          false-label="0"
          true-label="1"
        >
          同步开启
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('是否诱导室管理程序')"
          v-model="itemValue('是否诱导室管理程序').normalValue"
          true-label="1"
          false-label="0"
        >
          是否诱导室管理程序
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('显示主界面状态栏')"
          v-model="itemValue('显示主界面状态栏').normalValue"
          false-label="0"
          true-label="1"
        >
          显示主界面状态栏
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('合并所有采集数据')"
          v-model="itemValue('合并所有采集数据').normalValue"
          true-label="1"
          false-label="0"
        >
          合并所有采集数据
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('字典录入校验')"
          v-model="itemValue('字典录入校验').normalValue"
          false-label="0"
          true-label="1"
        >
          字典录入校验
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('自动套用默认手术间')"
          v-model="itemValue('自动套用默认手术间').normalValue"
          true-label="1"
          false-label="0"
        >
          自动套用默认手术间
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('更新排班程序状态字段')"
          v-model="itemValue('更新排班程序状态字段').normalValue"
          true-label="1"
          false-label="0"
        >
          更新排班程序状态字段
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('回写HIS手术状态')"
          v-model="itemValue('回写HIS手术状态').normalValue"
          true-label="1"
          false-label="0"
        >
          回写HIS手术状态
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('是否PACU管理程序')"
          v-model="itemValue('是否PACU管理程序').normalValue"
          true-label="1"
          false-label="0"
        >
          是否PACU管理程序
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('是否显示术中患者列表')"
          v-model="itemValue('是否显示术中患者列表').normalValue"
          true-label="1"
          false-label="0"
        >
          是否显示术中患者列表
        </el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('是否启用复苏进程管理')"
          v-model="itemValue('是否启用复苏进程管理').normalValue"
          true-label="1"
          false-label="0"
        >
          是否启用复苏进程管理
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-checkbox
          v-if="itemValue('是否启用安全核查')"
          v-model="itemValue('是否启用安全核查').normalValue"
          true-label="1"
          false-label="0"
        >
          是否启用安全核查
        </el-checkbox>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        术中登记体征显示设置
        <el-select
          v-if="itemValue('术中登记体征显示设置')"
          v-model="itemValue('术中登记体征显示设置').normalValue"
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in settingList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button
          type="primary"
          size="mini"
          @click="onClick"
        >
          术中登记体征项显示配置
        </el-button>
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
import { getNormalConfig, saveNormalConfig } from '@/api/generalConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'SuperNormalSetting',
  data () {
    return {
      settingList: [
        {
          label: '方案一',
          value: '1'
        },
        {
          label: '方案二',
          value: '2'
        }
      ],
      valueList: []
    }
  },
  computed: {
    itemValue () {
      return (label) => {
        return this.valueList.find((item) => item.normalName === label)
      }
    }
  },
  created () {
    this.getNormalConfig()
  },
  methods: {
    onClick () {},
    onSave () {
      this.saveNormalConfig()
    },
    getNormalConfig () {
      return request({
        method: 'get',
        url: `${getNormalConfig}/2`
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
    }
  }
}
</script>
<style lang="scss" scoped>
.superNormalSetting {
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
  }
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
