<template>
  <div class="navigationMenu">
    <div class="topContent">
      <div>
        程序状态
        <el-radio-group
          v-model="state"
          @change="onStateChange"
        >
          <el-radio
            v-for="item in stateList"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </div>
      <div>
        选择导航分组菜单
        <el-select
          size="mini"
          v-model="menuType"
        >
          <el-option
            v-for="item in menuTypes"
            :key="item.moduleCode"
            :value="item.moduleCode"
            :label="item.moduleName"
          />
        </el-select>
      </div>
    </div>
    <div class="mainContent">
      <div class="contentItem">
        <h3>备选状态</h3>
        <div class="listContent">
          <el-scrollbar
            style="height:100%"
            :wrap-style="wrapStyle"
          >
            <draggable
              class="statusList"
              group="menu"
              :list="noUseList"
            >
              <div
                class="listItem"
                v-for="element in noUseList"
                :key="element.id"
              >
                {{ element.perName }}
              </div>
            </draggable>
          </el-scrollbar>
        </div>
      </div>
      <div class="contentItem">
        <h3>当前分组菜单</h3>
        <div class="listContent">
          <el-scrollbar
            style="height:100%"
            :wrap-style="wrapStyle"
          >
            <draggable
              class="statusList"
              group="menu"
              :list="inUseList"
            >
              <div
                class="listItem"
                v-for="element in inUseList"
                :key="element.id"
              >
                {{ element.perName }}
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
  getOpeModuleConfig,
  updateOpeModuleConfig,
  getModule
} from '@/api/superConfig'
import draggable from 'vuedraggable'

export default {
  name: 'NavigationMenu',
  components: {
    draggable
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    const stateList = Object.freeze([
      {
        label: '默认',
        value: 1
      },
      {
        label: '某患者',
        value: 2
      },
      {
        label: '麻醉单',
        value: 3
      },
      {
        label: '复苏单',
        value: 4
      }
    ])
    return {
      wrapStyle,
      stateList,
      state: 1,
      noUseList: [],
      inUseMap: {},
      menuTypes: [],
      menuType: ''
    }
  },
  computed: {
    inUseList () {
      return this.inUseMap[this.menuType] || []
    }
  },
  created () {
    this.getOpeModuleConfig()
    this.getModule()
  },
  methods: {
    onStateChange () {
      this.getOpeModuleConfig()
    },
    onSave () {
      const data = this.menuTypes.reduce((obj, { moduleCode, moduleName }) => {
        obj[moduleCode] = this.inUseMap[moduleCode].map(
          ({ sort, ...item }, index) => {
            return {
              ...item,
              moduleCode,
              moduleName,
              sort: index + 1
            }
          }
        )
        return obj
      }, {})
      const list = Object.values(data).reduce((acc, arr) => {
        return [...acc, ...arr]
      }, [])
      this.updateOpeModuleConfig(list)
    },
    getOpeModuleConfig () {
      return request({
        method: 'get',
        url: `${getOpeModuleConfig}/${this.state}`
      })
        .then((res) => {
          if (res.data && res.data.success) {
            const { notUse, ...inUse } = res.data.data
            this.inUseMap = inUse
            this.noUseList = notUse
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
        })
    },
    updateOpeModuleConfig (list) {
      return request({
        method: 'put',
        url: updateOpeModuleConfig,
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
    getModule () {
      return request({
        method: 'get',
        url: getModule
      })
        .then((res) => {
          if (res.data && res.data.success) {
            this.menuTypes = res.data.data
            this.menuType = this.menuTypes[0].moduleCode
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

  .navigationMenu {
    .topContent {
      display: flex;
      height: 40px;
      justify-content: space-between;
      @include theme-property('color', $color-text-regular);

      .el-radio-group,
      .el-select {
        margin-left: 20px;
      }

      .el-radio {
        margin-right: 10px;
      }
    }

    .mainContent {
      display: flex;

      .contentItem {
        flex: auto;
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
          height: 520px;
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
