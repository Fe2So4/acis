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
            <p style="color:#606266;margin:0 0 10px 0">
              密码类型
            </p>
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
              v-model="enableInductionRoomManagementProcedure"
            >
              是否诱导室管理程序
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="mergeAllCollectedData"
            >
              合并所有采集数据
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="showDocumentScrollbar"
            >
              是否显示医疗文书滚动条
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="automaticApplicationOfDefaultOperatingRoom"
            >
              自动套用默认手术间
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="updateTheSchedulerStatusField"
            >
              更新排班程序状态字段
            </el-checkbox>
          </el-row>
          <el-row>
            <el-checkbox
              v-model="enablePACUManagementProgram"
            >
              是否PACU管理程序
            </el-checkbox>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-checkbox
          v-model="connectToAnaesthesiaSpecialistConsultationLibrary"
        >
          是否连接麻醉专家咨询库（请确认专家咨询的数据库连接已配置完成）
        </el-checkbox>
      </el-row>
      <el-row>
        <el-form
          label-width="160px"
          size="mini"
        >
          <el-form-item label="专家咨询系统网址">
            <el-input
              v-model="expertConsultationSystemWebsite"
              placeholder="请输入网址"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-checkbox
          v-model="turnOnInstantMessaging"
        >
          是否开启即时通讯（确保服务端已配置完成）
        </el-checkbox>
      </el-row>
      <el-row>
        <el-form
          label-width="160px"
          size="mini"
        >
          <el-form-item label="即时通讯服务端网址">
            <el-input
              v-model="instantMessagingServiceWebsite"
              placeholder="请输入即时通讯服务端网址"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form
          label-width="160px"
          size="mini"
        >
          <el-form-item label="系统自动更新方式">
            <el-select
              v-model="systemAutomaticUpdateMode"
              placeholder="请选择"
            >
              <el-option
                v-for="item in systemAutomaticUpdateModeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-checkbox
          v-model="enableProphet"
        >
          启用预言家
        </el-checkbox>
      </el-row>
      <el-row>
        <el-form
          label-width="160px"
          size="mini"
        >
          <el-form-item label="术中登记体征显示设置">
            <el-select
              v-model="intraoperativeRegisterSignDisplaySetting"
              placeholder="请选择"
            >
              <el-option
                v-for="item in intraoperativeRegisterSignDisplaySettingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              type="primary"
              size="mini"
              @click="onClick"
            >
              术中登记体征项显示配置
            </el-button>
          </el-form-item>
        </el-form>
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
      passwordType: 1,
      writeBackHISOperationStatus: false,
      displayPatientList: false,
      enableRecoveryProcessManagement: false,
      enableSecurityChecks: false,
      enableInductionRoomManagementProcedure: false,
      mergeAllCollectedData: false,
      showDocumentScrollbar: false,
      automaticApplicationOfDefaultOperatingRoom: false,
      updateTheSchedulerStatusField: false,
      enablePACUManagementProgram: false,
      connectToAnaesthesiaSpecialistConsultationLibrary: false,
      expertConsultationSystemWebsite: '',
      turnOnInstantMessaging: false,
      instantMessagingServiceWebsite: '',
      systemAutomaticUpdateMode: null,
      systemAutomaticUpdateModeOptions: [
        {
          label: '方式一',
          value: 1
        },
        {
          label: '方式二',
          value: 2
        }
      ],
      enableProphet: false,
      intraoperativeRegisterSignDisplaySetting: null,
      intraoperativeRegisterSignDisplaySettingOptions: [
        {
          label: '方式一',
          value: 1
        },
        {
          label: '方式二',
          value: 2
        }
      ]
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    onClick () {
      this.$electron.ipcRenderer.send('open-new-window', 'IntraoperativeRegisterSignDisplaySetting', '术中登记体征项显示配置')
    }
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
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
