<template>
  <div class="sign-line">
    <div class="list">
      <div
        class="item"
        v-for="i in list"
        :key="i.order"
      >
        <div class="order">
          {{ i.order }}:
        </div>
        <div class="select">
          <span v-if="i._original">{{ i.vitalItemName }}</span>
          <el-select
            v-if="!i._original"
            v-model="i.vitalItemCode"
            size="mini"
            placeholder="请选择名称"
            @change="(code) => onChangeCode(code, i.order)"
            filterable
          >
            <el-option
              v-for="o in optionsName"
              :key="o.vitalItemCode"
              :value="o.vitalItemCode"
              :label="o.vitalItemName"
            />
          </el-select>
        </div>
        <div class="select">
          <el-select
            v-model="i.vitalItemIcon"
            size="mini"
            @change="validateItem(i)"
            placeholder="请选择图形"
          >
            <el-option
              v-for="o in optionsIcon"
              :key="o"
              :value="o"
              :label="o"
            />
          </el-select>
        </div>
        <div class="select">
          <el-input
            size="mini"
            v-model="i.vitalItemUnit"
            @change="validateItem(i)"
            placeholder="请输入单位"
          />
        </div>
        <div class="select">
          <el-select
            v-model="i.vitalItemColor"
            size="mini"
            @change="validateItem(i)"
            placeholder="请选择颜色"
          >
            <el-option
              v-for="o in optionsColor"
              :value="o"
              :label="o"
              :key="o"
            >
              <div
                :style="{
                  background: '#' + o,
                  width: '16px',
                  height: '16px',
                  margin: '9px'
                }"
              />
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <el-select
            v-model="i.vitalItemIndex"
            size="mini"
            @change="validateItem(i)"
            placeholder="请选择Y轴索引"
          >
            <el-option
              v-for="o in 5"
              :key="o"
              :value="o"
              :label="o"
            />
          </el-select>
        </div>
        <div class="icon">
          <div
            class="iconfont icon-jianqu"
            @click="onDelete(i)"
          />
        </div>
      </div>
    </div>
    <div class="buttons">
      <el-button
        @click="onAdd"
        size="mini"
      >
        新增
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import {
  getVitalSignDict,
  updateVitalSignDict,
  getVitalSignDictAll
} from '@/api/superConfig'
import request from '../../utils/requestForMock'

export default {
  name: 'SignLine',
  data () {
    const optionsColor = Object.freeze([
      'FF0000',
      '0048FF',
      '0A9D1C',
      'FF571C',
      'FF29CA',
      'FFC21D',
      '00DEEC',
      '000000'
    ])
    return {
      list: [],
      cacheDelete: [],
      optionsColor,
      optionsIcon: [],
      optionsName: [],
      order: 0
    }
  },
  created () {
    this.getData()
    this.getOptionsName()
  },
  methods: {
    getData () {
      return this.getVitalSignDict().then(
        res => {
          res.forEach((item) => {
            item._original = JSON.stringify(item)
            item.order = ++this.order
          })
          this.list = res
        },
        e => {
          this.$message.error(e.message)
        }
      )
    },
    getOptionsName () {
      this.getVitalSignDictAll().then(
        res => {
          this.optionsName = res
          this.optionsIcon = res.reduce((acc, { vitalItemIcon }) => {
            if (acc.includes(vitalItemIcon)) {
              return acc
            } else {
              return [...acc, vitalItemIcon]
            }
          }, [])
        }
      ).catch(
        e => {
          this.$message.error(e.message)
        }
      )
    },
    onChangeCode (code, order) {
      const item = this.optionsName.find(({ vitalItemCode }) => vitalItemCode === code)
      if (item) {
        const current = this.list.find(i => i.order === order);
        ({
          vitalItemIcon: current.vitalItemIcon,
          vitalItemColor: current.vitalItemColor,
          vitalItemName: current.vitalItemName,
          vitalItemIndex: current.vitalItemIndex,
          vitalItemCode: current.vitalItemCode,
          vitalItemUnit: current.vitalItemUnit
        } = item)
        this.validateItem(current)
      }
    },
    onSave () {
      const addList = this.list.filter(({ _tag }) => _tag === 'add')
        .map(item => ({
          vitalItemName: item.vitalItemName,
          vitalItemCode: item.vitalItemCode,
          vitalItemUnit: item.vitalItemUnit,
          vitalItemColor: item.vitalItemColor,
          vitalItemIcon: item.vitalItemIcon,
          talItemIndex: item.talItemIndex
        }))
      const updateList = this.list.filter(({ _tag }) => _tag === 'modified')
        .map(item => ({
          vitalItemName: item.vitalItemName,
          vitalItemCode: item.vitalItemCode,
          vitalItemUnit: item.vitalItemUnit,
          vitalItemColor: item.vitalItemColor,
          vitalItemIcon: item.vitalItemIcon,
          talItemIndex: item.talItemIndex
        }))
      if (addList.length + updateList.length + this.cacheDelete.length) {
        this.updateVitalSignDict({
          addList,
          updateList,
          deleteList: this.cacheDelete
        }).then(
          () => {
            this.$message.success('保存成功')
            this.cacheDelete = []
            this.order = 0
            return this.getData()
          },
          e => {
            this.$message.error(e.message)
          }
        )
      } else {
        this.$message.info('无修改数据')
      }
      console.log(addList, updateList)
    },
    onAdd () {
      this.list.push({
        vitalItemIcon: '',
        vitalItemColor: '',
        vitalItemName: '',
        vitalItemIndex: '',
        vitalItemCode: '',
        vitalItemUnit: '',
        order: ++this.order,
        _tag: 'add'
      })
    },
    onDelete (item) {
      const index = this.list.indexOf(item)
      const { _original } = item
      if (_original) {
        this.cacheDelete.push({
          vitalItemCode: item.vitalItemCode
        })
      }
      this.list.splice(index, 1)
    },
    validateItem (item) {
      console.log(item)
      let { _original } = item
      if (_original) {
        _original = JSON.parse(_original)
        const flagModified = Object.keys(_original).some(key => _original[key] !== item[key])
        if (flagModified) item._tag = 'modified'
        else delete item._tag
      }
    },
    getVitalSignDict () {
      return request({
        url: getVitalSignDict
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('查询体征项配置信息失败'))
          }
        }
      )
    },
    updateVitalSignDict (data) {
      return request({
        url: updateVitalSignDict,
        method: 'put',
        data
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('编辑体征配置信息失败'))
          }
        }
      )
    },
    getVitalSignDictAll () {
      return request({
        url: getVitalSignDictAll
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('体征字典查询失败'))
          }
        }
      )
    }
  }

}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";

.sign-line {
  .list {
    overflow: auto;
    height: 650px;
    @include theme-property(color, $color-text-regular);

    .item {
      display: flex;
      height: 30px;
      line-height: 30px;
      margin: 10px 0;

      .order {
        flex: 80px 0 0;
        margin-right: 10px;
        text-align: right;
      }

      .select {
        flex: 120px 1 0;
        margin-right: 10px;
      }

      .icon {
        flex: 16px 0 0;
        @include theme-property(color, $color-primary);
      }
    }
  }

  .buttons {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
