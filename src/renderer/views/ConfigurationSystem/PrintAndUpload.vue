<template>
  <div class="printAndUpload">
    <div class="contentTitle">
      打印后上传设置
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form
          ref="uploadSettingForm"
          label-width="180px"
          size="mini"
        >
          <el-form-item label="PDF上传服务器地址">
            <el-input
              class="input"
              v-model="serverAddress"
            />
          </el-form-item>
          <el-form-item label="PDF本地存储地址">
            <el-input
              class="input"
              v-model="localStorageAddress"
            />
          </el-form-item>

          <div class="contentTitle">
            选择上传文书：
          </div>
          <div class="listContent">
            <el-scrollbar
              style="height:100%"
              :wrap-style="wrapStyle"
            >
              <div
                class="documentList"
                group="status"
              >
                <div
                  class="listItem"
                  v-for="document in documentList"
                  :key="document.acisTemplateCode"
                >
                  <el-checkbox
                    v-model="document.acisUpload"
                    true-label="1"
                    false-label="0"
                  >
                    {{ document.acisTemplateName }}
                  </el-checkbox>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="checkbox">
            <el-checkbox
              v-model="localNotSaved"
              true-label="1"
              false-label="0"
            >
              文书上传后不本地保存
            </el-checkbox>
          </div>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="checkbox">
          <el-checkbox
            v-model="autoArchiving"
            true-label="1"
            false-label="0"
          >
            启用自动归档
          </el-checkbox>
        </div>
        <div
          class="attention"
          v-if="autoArchiving == 1"
        >
          超时自动归档提醒天数：
          <input
            class="attentionInput"
            type="number"
            v-model="timeoutArchiveReminder"
          >
          天后提醒
          <p
            class="attentionText"
          >
            注：启用自动归档后，会根据下方的上传文书列表中的勾选项目进行判断，将超出提醒天数，却仍未上传的相关手术条目进行展示，再由用户选择是否上传
          </p>
        </div>
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
  getFileUpload,
  saveFileUpload,
  getUploadTemplateInfo,
  saveUploadTemplateInfo
} from '@/api/superConfig'
import request from '@/utils/requestForMock'
export default {
  name: 'PrintAndUpload',
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      wrapStyle,
      serverAddress: '',
      localStorageAddress: '',
      autoArchiving: '',
      timeoutArchiveReminder: '',
      documentList: [],
      localNotSaved: ''
    }
  },
  created () {
    this.getFileUpload()
    this.getUploadTemplateInfo()
  },
  methods: {
    onSave () {
      return Promise.all([this.saveFileUpload(), this.saveUploadTemplateInfo()])
        .then((res) => {
          const success = res.every((res) => res.data && res.data.success)
          if (success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },
    getFileUpload () {
      return request({
        method: 'get',
        url: getFileUpload
      })
        .then((res) => {
          if (res.data && res.data.success) {
            ({
              autoArchiving: this.autoArchiving,
              localNotSaved: this.localNotSaved,
              localStorageAddress: this.localStorageAddress,
              serverAddress: this.serverAddress,
              timeoutArchiveReminder: this.timeoutArchiveReminder
            } = res.data.data)
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    saveFileUpload () {
      return request({
        method: 'post',
        url: saveFileUpload,
        data: {
          autoArchiving: this.autoArchiving,
          localNotSaved: this.localNotSaved,
          localStorageAddress: this.localStorageAddress,
          serverAddress: this.serverAddress,
          timeoutArchiveReminder: this.timeoutArchiveReminder
        }
      })
    },
    getUploadTemplateInfo () {
      return request({
        method: 'get',
        url: getUploadTemplateInfo
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.documentList = res.data.data
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    saveUploadTemplateInfo () {
      return request({
        method: 'post',
        url: saveUploadTemplateInfo,
        data: this.documentList
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.printAndUpload {
  overflow: hidden;
  .contentTitle {
    height: 34px;
    line-height: 34px;
    color: #9ba3d5;
  }

  .checkbox {
    margin: 18px 11px;
  }
  .listContent {
    height: 250px;
    overflow: hidden;
    .documentList {
      color: #d0dae5;
      line-height: 30px;
      .listItem {
        height: 30px;
        background: #292f40;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 1px;
        text-indent: 4px;
        &:hover {
          background: #36405c;
        }
      }
    }
  }

  .attention {
    padding-left: 11px;
    font-size: 12px;
    color: #9ba3d5;
    .attentionInput {
      width: 40px;
      outline: none;
    }

    .attentionText {
      color: #9ba3d5;
      line-height: 24px;
    }
  }
  .buttons {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
