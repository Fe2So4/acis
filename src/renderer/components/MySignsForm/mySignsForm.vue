<template>
  <div>
    <el-dialog
      append-to-body
      title="个性化体征显示配置"
      :visible.sync="dialogVisible"
      width="80%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-form size="mini">
          <el-row style="display:flex">
            <div style="width:200px">
              曲线名称
            </div>
            <div
              style="width:90px"
              class="maginLeft-10"
            >
              显示类型
            </div>
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              是否显示
            </div>
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              标示类型
            </div>
            <!-- <div
              style="width:120px"
              class="maginLeft-10"
            >
              标示实体
            </div> -->
            <div
              style="width:100px"
              class="maginLeft-10"
            >
              颜色
            </div>
            <!-- <div
              style="width:64px"
              class="maginLeft-10"
            >
              小数位
            </div> -->
            <div
              style="width:120px"
              class="maginLeft-10"
            >
              时间间隔
            </div>
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              是否隐藏
            </div>
            <div
              style="width:160px"
              class="maginLeft-10"
            >
              开始隐藏时间
            </div>
            <div
              style="width:160px"
              class="maginLeft-10"
            >
              结束隐藏时间
            </div>
          </el-row>
          <el-row
            style="display:flex;margin-top:10px"
            v-for="item in table"
            :key="item.id"
          >
            <!-- 曲线名称 -->
            <div style="width:200px">
              <el-input
                size="mini"
                v-model="item.name"
              />
            </div>
            <!-- 显示类型 -->
            <div
              style="width:90px"
              class="maginLeft-10"
            >
              <el-select
                placeholder=""
                size="mini"
                v-model="item.item_type"
              >
                <el-option
                  v-for="item in showTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 是否显示 -->
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              <el-select
                placeholder=""
                size="mini"
                v-model="item.state"
              >
                <el-option
                  v-for="item in isShowBoolean"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 标示类型 -->
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              <el-select
                placeholder=""
                size="mini"
                v-model="item.draw_icon"
              >
                <el-option
                  v-for="item in drawIconList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 标示实体 -->
            <!-- <div
              style="width:120px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                v-model="curveName"
              />
            </div> -->
            <!-- 颜色 -->
            <div
              style="width:100px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                type="color"
                v-model="item.item_color"
              />
            </div>
            <!-- 小数位 -->
            <!-- <div
              style="width:64px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                v-model="curveName"
              />
            </div> -->
            <!-- 时间间隔 -->
            <div
              style="width:120px"
              class="maginLeft-10"
            >
              <el-select
                placeholder=""
                size="mini"
                v-model="item.frequency"
              >
                <el-option
                  v-for="item in timeSplit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 是否隐藏 -->
            <div
              style="width:80px"
              class="maginLeft-10"
            >
              <el-select
                @change="changeIfHide(item)"
                placeholder=""
                size="mini"
                v-model="item.if_hide"
              >
                <el-option
                  v-for="item in ifHideList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 开始隐藏时间 -->
            <div
              style="width:160px"
              class="maginLeft-10"
            >
              <el-date-picker
                size="mini"
                format="MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                style="width:160px"
                v-model="item.hide_start_time"
                type="datetime"
                placeholder="选择日期时间"
              />
            </div>
            <!-- 结束隐藏时间 -->
            <div
              style="width:160px"
              class="maginLeft-10"
            >
              <el-date-picker
                size="mini"
                format="MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                style="width:160px"
                v-model="item.hide_end_time"
                type="datetime"
                placeholder="选择日期时间"
              />
            </div>
          </el-row>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="handleClose"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="saveInfo"
        >更 新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import {
  getIntraoMonitorData,
  updateIntraoMonitorIndividuation
} from '@/api/mySignsForm'
export default {
  name: 'MySignsForm',
  data () {
    return {
      table: [],
      value1: '',
      curveName: '',
      showType: '',
      showTypeList: [
        { label: '曲线', value: '曲线' },
        { label: '数值', value: '数值' }
      ],
      isShowBoolean: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ],
      drawIconList: [
        {
          label: '•',
          value: '•'
        },
        {
          label: '∨',
          value: '∨'
        },
        {
          label: '○',
          value: '○'
        },
        {
          label: '◇',
          value: '◇'
        },
        {
          label: '▽',
          value: '▽'
        },
        {
          label: '△',
          value: '△'
        },
        {
          label: '●',
          value: '●'
        },
        {
          label: '∧',
          value: '∧'
        }
      ],
      timeSplit: [
        { label: '5分钟', value: 5 },
        { label: '10分钟', value: 10 }
      ],
      ifHideList: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ]
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.getIntraoMonitorData()
  },
  methods: {
    changeIfHide (item) {
      if (item.if_hide === '0') {
        item.hide_start_time = ''
        item.hide_end_time = ''
      }
    },
    // 获取表单数据
    getIntraoMonitorData () {
      request({
        method: 'get',
        url: getIntraoMonitorData,
        params: {
          templeteCode: '1'
        }
      }).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              if (item.item_color.includes('#')) {
              } else {
                item.item_color = '#' + item.item_color
              }
            })
          }
          this.table = res.data.data
        }
      })
    },
    // 更新表单数据
    updateIntraoMonitorIndividuation () {
      this.table.forEach(item => {
        if (item.item_color.includes('#')) {
          item.item_color = item.item_color.replace(/#/g, '')
        }
      })
      request({
        method: 'post',
        url: updateIntraoMonitorIndividuation,
        data: this.table
      }).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: 'success', message: '更新成功' })
          this.getIntraoMonitorData()
          this.handleClose()
        } else {
          this.$message({ type: 'error', message: '更新失败' })
          this.getIntraoMonitorData()
          this.handleClose()
        }
      })
    },
    handleClose () {
      this.getIntraoMonitorData()
      this.$emit('closeDio')
    },
    saveInfo () {
      this.updateIntraoMonitorIndividuation()
    }
  }
}
</script>

<style lang="scss" scoped>
.maginLeft-10 {
  margin-left: 20px;
}
</style>
