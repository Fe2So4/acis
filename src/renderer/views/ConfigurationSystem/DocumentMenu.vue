<template>
  <div class="documentMenu">
    <div class="topContent">
      手术状态
      <el-select
        size="mini"
        v-model="state"
        @change="onStateChange"
      >
        <el-option
          v-for="item in stateList"
          :key="item.conCode"
          :label="item.conName"
          :value="item.conCode"
        />
      </el-select>
      <el-checkbox v-model="autoGenerate">
        自动生成各状态文书
      </el-checkbox>
    </div>
    <div class="contentTitle">
      医疗文书
    </div>
    <div class="mainContent">
      <div class="contentItem">
        <h3>系统提供</h3>
        <div class="listContent">
          <el-scrollbar
            style="height:100%"
            :wrap-style="wrapStyle"
          >
            <draggable
              class="statusList"
              group="status"
              :list="noUseList"
            >
              <div
                class="listItem"
                v-for="element in noUseList"
                :key="element.templateCode"
              >
                {{ element.templateName }}
              </div>
            </draggable>
          </el-scrollbar>
        </div>
      </div>
      <div class="contentItem">
        <h3>可见医疗文书</h3>
        <div class="listContent">
          <el-scrollbar
            style="height:100%"
            :wrap-style="wrapStyle"
          >
            <draggable
              class="statusList"
              group="status"
              :list="inUseList"
            >
              <div
                class="listItem"
                v-for="element in inUseList"
                :key="element.templateCode"
              >
                {{ element.templateName }}
              </div>
            </draggable>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="buttons">
      <span class="info">点击单项可以拖拽</span>
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
import request from '@/utils/requestForMock'
import {
  getWritConfig,
  updateWritConfig,
  getOpeStateDict
} from '@/api/superConfig'
import draggable from 'vuedraggable'

export default {
  name: 'DocumentMenu',
  components: {
    draggable
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      wrapStyle,
      stateList: [],
      state: '',
      autoGenerate: false,
      noUseList: [],
      inUseList: []
    }
  },
  async created () {
    await this.getOpeStateDict()
    this.getWritConfig()
  },
  methods: {
    onStateChange () {
      this.getWritConfig()
    },
    onSave () {
      const list = this.inUseList.map(({ templateCode: perCode, templateName: perName, sort }, index) => {
        return {
          perCode,
          perName,
          sort: index + 1,
          procedureState: this.state
        }
      })
      this.updateWritConfig(list)
    },
    // 获取配置
    getWritConfig () {
      return request({
        method: 'get',
        url: `${getWritConfig}/${this.state}`
      })
        .then((res) => {
          if (res.data && res.data.success) {
            const { isUse, notUse } = res.data.data
            this.inUseList = isUse
            this.noUseList = notUse
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
        })
    },
    // 更新文书配置
    updateWritConfig (list) {
      return request({
        method: 'put',
        url: `${updateWritConfig}/${this.state}`,
        data: list
      })
        .then((res) => {
          if (res.data && res.data.success) {
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
    // 获取手术状态字典
    getOpeStateDict () {
      return request({
        method: 'get',
        url: getOpeStateDict
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.stateList = res.data.data
            this.state = this.stateList[0].conCode
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/theme";
  .documentMenu {
    .topContent {
      height: 40px;
      @include theme-property('color', $color-text-regular);

      .el-select {
        margin-left: 20px;
      }
    }

    .contentTitle {
      height: 34px;
      line-height: 34px;
      @include theme-property('color', $color-text-regular);
    }

    .mainContent {
      display: flex;

      .contentItem {
        flex: auto;
        max-width: 50%;
        border: 1px solid;
        @include theme-property('border-color', $dateTimePicker-color-border);
        border-radius: 5px;

        &:first-child {
          margin-right: 12px;
        }

        h3 {
          height: 50px;
          margin: 0;
          @include theme-property('color', $color-text-regular);
          line-height: 50px;
          font-weight: normal;
          text-indent: 20px;
          font-size: 14px;
        }

        .listContent {
          height: 250px;
          overflow: hidden;

          .statusList {
            @include theme-property('color', $color-text-listItem);
            line-height: 30px;

            .listItem {
              height: 30px;
              @include theme-property('background', $color-background-listItem);
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 1px;
              text-indent: 40px;
              cursor: move;

              &:hover {
                @include theme-property('background', $color-background-listItem-hover);
              }
            }
          }
        }
      }
    }

    .buttons {
      margin-top: 20px;
      text-align: right;

      .info {
        @include theme-property('color', $color-text-regular);
        font-size: 14px;
        margin-right: 20px;
      }
    }
  }
</style>
