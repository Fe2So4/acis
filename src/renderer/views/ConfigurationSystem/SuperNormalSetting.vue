<template>
  <div class="superNormalSetting">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>超级配置</el-breadcrumb-item>
      <el-breadcrumb-item>常规</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <el-row type="flex">
        <el-col :span="12">
          <el-row>
            <el-checkbox
              v-model="displayRealTimeData"
            >
              麻醉单显示实时监护数据
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="openAllPermissions"
            >
              开放所有权限
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="openSynchronous"
            >
              同步开启
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="displayStatusBar"
            >
              显示主界面状态栏
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="dictionaryEntryCheck"
            >
              字典录入校验
            </el-checkbox>
          </el-row>
          <el-row>
            <span style="color:#606266;margin-right:10px">密码类型</span>
            <el-radio-group v-model="passwordType">
              <el-radio :label="1">
                转大写
              </el-radio>
              <el-radio :label="2">
                大小写敏感
              </el-radio>
              <el-radio :label="3">
                转小写
              </el-radio>
            </el-radio-group>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="writeBackHISOperationStatus"
            >
              回写HIS手术状态
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="displayPatientList"
            >
              是否显示术中患者列表
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableRecoveryProcessManagement"
            >
              是否启用复苏进程管理
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              是否启用安全核查
            </el-checkbox>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              是否诱导室管理程序
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              合并所有采集数据
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              是否显示医疗文书滚动条
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              自动套用默认手术间
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              更新排班程序状态字段
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enableSecurityChecks"
            >
              是否PACU管理程序
            </el-checkbox>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SuperNormalSetting',
  data () {
    return {
      displayRealTimeData: true,
      openAllPermissions: true,
      openSynchronous: true,
      displayStatusBar: true,
      dictionaryEntryCheck: true,
      passwordType: 1
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.superNormalSetting {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }

  .mainContent {
    padding: 20px 10px 10px;

    .el-row {
      margin-bottom: 18px;
    }
  }
}
</style>
