<template>
  <div class="normalSetting">
    <el-form
      ref="form"
      :model="form"
      label-width="180px"
      size="mini"
      class="form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="默认手术间"
          >
            <el-input
              class="input"
              v-model="form.defaultOperationRoom"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-checkbox
            v-model="form.changeBedNumber"
            style="margin-left:10px;line-height:28px"
          >
            同时修改采集床号配置
          </el-checkbox>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="手术室代码"
          >
            <el-input
              class="input"
              v-model="form.operationRoomCode"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="麻醉科代码"
          >
            <el-input
              class="input"
              v-model="form.operationRoomCode"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="麻醉编号"
          >
            <el-input
              class="input"
              v-model="form.operationRoomCode"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="持续用药显示格式"
          >
            <el-select
              v-model="form.continuousMedicationDisplayFormat"
              placeholder="请选择"
            >
              <el-option
                v-for="item in continuousMedicationDisplayFormatOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="持续用药标题单位"
          >
            <el-select
              v-model="form.continuousMedicationTitleUnit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in continuousMedicationTitleUnitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="单次用药显示格式"
          >
            <el-select
              v-model="form.singleMedicationDisplayFormat"
              placeholder="请选择"
            >
              <el-option
                v-for="item in singleMedicationDisplayFormatOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="单次用药标题单位"
          >
            <el-select
              v-model="form.singleMedicationTitleUnit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in singleMedicationTitleUnitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="同步手术申请信息方式">
            <el-radio-group v-model="form.synchronousSurgeryApplicationInformationMethod">
              <el-radio :label="1">
                按科室
              </el-radio>
              <el-radio :label="2">
                按时间
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="文书刷新间隔时间（秒）"
          >
            <el-input
              class="input"
              v-model="form.documentRefreshInterval"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="同步间隔"
          >
            <el-input-number
              v-model="form.synchronousInterval"
              controls-position="right"
              :min="1"
              :max="10"
            />
            天
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item>
            <el-col :span="12">
              <el-checkbox
                v-model="form.dblClickToDropDownSelection"
              >
                医疗文书双击弹出下拉选择框
              </el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox
                v-model="form.selectDefaultMonitor"
              >
                选择默认监护仪
              </el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox
                v-model="form.promptWwhenExitingProgram"
              >
                退出程序时是否提示
              </el-checkbox>
            </el-col>
            <el-col :span="12">
              <el-checkbox
                v-model="form.markModifiedPhysicalItems"
              >
                标记修改过的体征项
              </el-checkbox>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :span="12"
          style="text-align:right"
        >
          <el-button
            type="primary"
            size="small"
          >
            确定
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button size="small">
            取消
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'NormalSetting',
  data () {
    return {
      form: {
        defaultOperationRoom: '',
        changeBedNumber: false,
        operationRoomCode: 123,
        continuousMedicationDisplayFormat: 1,
        continuousMedicationTitleUnit: 1,
        singleMedicationDisplayFormat: 1,
        singleMedicationTitleUnit: 1,
        synchronousSurgeryApplicationInformationMethod: 1,
        documentRefreshInterval: 20,
        synchronousInterval: 10,
        dblClickToDropDownSelection: false,
        selectDefaultMonitor: true,
        promptWwhenExitingProgram: false,
        markModifiedPhysicalItems: false
      },
      continuousMedicationDisplayFormatOptions: [
        {
          value: 1,
          label: '格式1'
        },
        {
          value: 2,
          label: '格式2'
        }
      ],
      continuousMedicationTitleUnitOptions: [
        {
          value: 1,
          label: '单位1'
        },
        {
          value: 2,
          label: '单位2'
        }
      ],
      singleMedicationDisplayFormatOptions: [
        {
          value: 1,
          label: '格式1'
        },
        {
          value: 2,
          label: '格式2'
        }
      ],
      singleMedicationTitleUnitOptions: [
        {
          value: 1,
          label: '单位1'
        },
        {
          value: 2,
          label: '单位2'
        }
      ]
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.normalSetting {
  padding: 10px;

  .form {
    padding: 20px 10px 10px;
    .input {
      max-width: 193px;
    }
  }
}
</style>
