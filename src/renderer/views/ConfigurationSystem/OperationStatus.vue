<template>
  <div class="operationStatus">
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
              group="status"
              :list="noUseList"
            >
              <div
                class="listItem"
                v-for="element in noUseList"
                :key="element.id"
              >
                {{ element.conName }}
              </div>
            </draggable>
          </el-scrollbar>
        </div>
      </div>
      <div class="contentItem">
        <h3>已选状态</h3>
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
                :key="element.id"
              >
                {{ element.conName }}
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
import { getOpeConConfig, updateOpeConConfig } from '@/api/superConfig'
import draggable from 'vuedraggable'
export default {
  name: 'OperationStatus',
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
      noUseList: [],
      inUseList: []
    }
  },
  created () {
    this.getOpeConConfig()
  },
  methods: {
    onSave () {
      const list = this.inUseList.map(({ sort, state, ...item }, index) => {
        return {
          ...item,
          sort: index + 1,
          state: true
        }
      })
      this.updateOpeConConfig(list)
    },
    getOpeConConfig () {
      return request({
        method: 'get',
        url: getOpeConConfig
      })
        .then((res) => {
          if (res.data && res.data.success) {
            const { isUse, outUse } = res.data.data
            this.inUseList = isUse
            this.noUseList = outUse
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {})
    },
    updateOpeConConfig (list) {
      return request({
        method: 'put',
        url: updateOpeConConfig,
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
    }
  }
}
</script>
<style lang="scss" scoped>
.operationStatus {
  .mainContent {
    display: flex;
    .contentItem {
      flex: auto;
      border: 1px solid #39425c;
      border-radius: 5px;
      &:first-child {
        margin-right: 12px;
      }
      h3 {
        height: 50px;
        margin: 0;
        color: #9ba3d5;
        line-height: 50px;
        font-weight: normal;
        text-indent: 20px;
        font-size: 14px;
      }
      .listContent {
        height: 560px;
        overflow: hidden;
        .statusList {
          color: #d0dae5;
          line-height: 30px;
          .listItem {
            height: 30px;
            background: #292f40;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 1px;
            text-indent: 40px;
            cursor: move;
            &:hover {
              background: #36405c;
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
      color: #9ba3d5;
      font-size: 14px;
      margin-right: 20px;
    }
  }
}
</style>
