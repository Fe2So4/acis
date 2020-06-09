<template>
  <div class="contentConfiguration">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="布局"
        name="1"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="宽">
            <el-input-number
              v-model="form.width"
              :min="0"
              controls-position="right"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="高">
            <el-input-number
              v-model="form.height"
              type="number"
              :min="0"
              @change="handleChange"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="X轴坐标">
            <el-input-number
              v-model="form.left"
              type="number"
              :min="0"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item label="Y轴坐标">
            <el-input-number
              v-model="form.top"
              type="number"
              :min="0"
              controls-position="right"
            />
          </el-form-item>
          <el-form-item
            label="边框"
            prop="border"
          >
            <el-checkbox-group v-model="form.border">
              <el-checkbox
                label="上"
                name="border"
              />
              <el-checkbox
                label="下"
                name="border"
              />
              <el-checkbox
                label="左"
                name="border"
              />
              <el-checkbox
                label="右"
                name="border"
              />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="方向">
            <el-select
              v-model="direction"
              @change="handleChangeDirection"
            >
              <el-option
                value="1"
                label="横向"
              />
              <el-option
                value="2"
                label="纵向"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item
        title="事件"
        name="2"
      />
      <el-collapse-item
        title="数据"
        name="3"
      >
        <el-form
          ref="form"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="表名">
            <el-select v-model="sheetName">
              <el-option
                value="user"
                label="用户表"
              />
              <el-option
                value="student"
                label="学生表"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="字段名">
            <el-select v-model="fieldName">
              <el-option
                value="id"
                label="编号"
              />
              <el-option
                value="name"
                label="姓名"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item
        title="行为"
        name="4"
      />
    </el-collapse>
    <code>{{ activeWidget }}</code>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('PageTemplateDesigner')
export default {
  name: 'WidgetConfiguration',
  data () {
    return {
      form: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        border: []
      },
      activeNames: ['1', '2', '3', '4'],
      sheetName: '',
      fieldName: '',
      direction: '1'
    }
  },
  computed: {
    ...mapState({
      activeWidget: state => state.activeWidget,
      width: state => state.width,
      height: state => state.height
      // direction: state => state.direction
    })
  },
  watch: {
    width: {
      handler (newVal, old) {
        this.form.width = newVal
      },
      immediate: true
    },
    height: {
      handler (newVal, old) {
        this.form.height = newVal
      },
      immediate: true
    },
    activeWidget: {
      handler (newVal, old) {
        console.log(newVal.actual)
        this.form.width = newVal.actual.width
        this.form.height = newVal.actual.height
        this.form.top = newVal.actual.positionY
        this.form.left = newVal.actual.positionX
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['setActiveWidget', 'setWidthHeight', 'setDirection']),
    onClick () {

    },
    handleChange () {
      const obj = {}
      obj.actual = { height: this.form.height, positionX: this.form.left, positionY: this.form.top, width: this.form.width }
      this.setActiveWidget(obj)
    },
    handleChangeDirection (val) {
      this.setDirection(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.contentConfiguration {
  height: 100%;
  flex: 0 1 400px;
  background: blanchedalmond;
  padding: 20px;
  overflow: auto;
}
</style>
