<template>
  <div class="printAndUpload">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>文书打印及上传设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <el-row :gutter="20">
        <el-col :span="12">
          <p class="settingTitle">
            打印设置
          </p>
          <el-form
            ref="printSettingForm"
            :model="printSettingForm"
            label-width="180px"
            size="mini"
          >
            <el-form-item label="纸张名称">
              <el-input
                class="input"
                v-model="printSettingForm.paperSize"
              />
            </el-form-item>
            <el-form-item label="纸张尺寸 长（cm）">
              <el-input
                class="input"
                v-model="printSettingForm.paperLength"
              />
            </el-form-item>
            <el-form-item label="宽（cm）">
              <el-input
                class="input"
                v-model="printSettingForm.paperWidth"
              />
            </el-form-item>
            <el-form-item label="打印纸张左侧预留（cm）">
              <el-input
                class="input"
                v-model="printSettingForm.paperMarginLeft"
              />
            </el-form-item>
            <el-form-item label="打印纸张上方预留（cm）">
              <el-input
                class="input"
                v-model="printSettingForm.paperMarginTop"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <p class="settingTitle">
            打印后上传设置
          </p>
          <el-form
            ref="uploadSettingForm"
            :model="uploadSettingForm"
            label-width="180px"
            size="mini"
          >
            <el-form-item label="PDF上传服务器地址">
              <el-input
                class="input"
                v-model="uploadSettingForm.uploadServerAddress"
              />
            </el-form-item>
            <el-form-item label="PDF本地存储地址">
              <el-input
                class="input"
                v-model="uploadSettingForm.localStorageAddress"
              />
            </el-form-item>
            <div class="checkbox">
              <el-checkbox
                v-model="uploadSettingForm.automaticArchiving"
              >
                启用自动归档
              </el-checkbox>
            </div>
            <div
              class="attention"
              v-if="uploadSettingForm.automaticArchiving"
            >
              超时自动归档提醒天数：<input
                class="attentionInput"
                type="number"
                v-model="uploadSettingForm.overtimeReminderDays"
              >
              天后提醒
              <p class="attentionText">
                注：启用自动归档后，会根据下方的上传文书列表中的勾选项目进行判断，将超出提醒天数，却仍未上传的相关手术条目进行展示，再由用户选择是否上传
              </p>
            </div>
            <el-table
              size="mini"
              border
              :data="uploadSettingForm.uploadDocuments"
              :show-header="false"
              max-height="300"
            >
              <el-table-column
                type="selection"
                width="40"
              />
              <el-table-column
                label="文书名称"
                prop="documentName"
              />
            </el-table>
            <div class="checkbox">
              <el-checkbox
                v-model="uploadSettingForm.notSavedLocallyAfterUploading"
              >
                文书上传后不本地保存
              </el-checkbox>
            </div>
          </el-form>
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'PrintAndUpload',
  data () {
    return {
      printSettingForm: {
        paperSize: 'A4',
        paperLength: '29.7',
        paperWidth: '21',
        paperMarginLeft: '5',
        paperMarginTop: '0.4'
      },
      uploadSettingForm: {
        uploadServerAddress: '',
        localStorageAddress: '',
        automaticArchiving: true,
        overtimeReminderDays: 6,
        uploadDocuments: [
          {
            documentName: '文书1'
          },
          {
            documentName: '文书2'
          },
          {
            documentName: '文书3'
          },
          {
            documentName: '文书4'
          },
          {
            documentName: '文书5'
          },
          {
            documentName: '文书6'
          }
        ],
        notSavedLocallyAfterUploading: true
      }
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.printAndUpload {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }
  .mainContent {
    padding: 20px 10px 10px;

    .settingTitle {
      font-size: 20px;
      margin: 0 0 20px;
      color: #606266;
    }

    .checkbox {
      margin: 18px 11px;
    }

    .attention {
        padding-left: 11px;
       font-size: 12px;
      .attentionInput {
        width: 40px;
        outline: none;
      }

      .attentionText {
        color: #606266;

        line-height: 24px;
      }
    }
  }
}
</style>
