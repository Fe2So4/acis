<template>
  <div>
    <el-dialog
      append-to-body
      title="个性化体征显示配置"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div>
        <el-form size="mini">
          <el-row style="display:flex">
            <div style="width:160px">
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
            <div
              style="width:120px"
              class="maginLeft-10"
            >
              标示实体
            </div>
            <div
              style="width:100px"
              class="maginLeft-10"
            >
              颜色
            </div>
            <div
              style="width:64px"
              class="maginLeft-10"
            >
              小数位
            </div>
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
            v-for="item in 5"
            :key="item"
          >
            <!-- 曲线名称 -->
            <div style="width:160px">
              <el-input
                size="mini"
                v-model="curveName"
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
                v-model="showType"
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
                v-model="isShow"
              >
                <el-option
                  v-for="item in showTypeList"
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
                v-model="isShow"
              >
                <el-option
                  v-for="item in showTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <!-- 标示实体 -->
            <div
              style="width:120px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                v-model="curveName"
              />
            </div>
            <!-- 颜色 -->
            <div
              style="width:100px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                type="color"
                v-model="curveName"
              />
            </div>
            <!-- 小数位 -->
            <div
              style="width:64px"
              class="maginLeft-10"
            >
              <el-input
                size="mini"
                v-model="curveName"
              />
            </div>
            <!-- 时间间隔 -->
            <div
              style="width:120px"
              class="maginLeft-10"
            >
              <el-select
                placeholder=""
                size="mini"
                v-model="isShow"
              >
                <el-option
                  v-for="item in showTypeList"
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
                placeholder=""
                size="mini"
                v-model="isShow"
              >
                <el-option
                  v-for="item in showTypeList"
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
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:160px"
                v-model="value1"
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
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:160px"
                v-model="value1"
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
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MySignsForm',
  data () {
    return {
      value1: '',
      curveName: '',
      showType: '',
      showTypeList: [{ label: '折线', value: '1' }],
      isShow: ''
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeDio')
    },
    saveInfo () {

    }
  }
}
</script>

<style lang="scss" scoped>
.maginLeft-10 {
  margin-left: 10px;
}
</style>
