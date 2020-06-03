<template>
  <div class="contentConfiguration">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
    >
      <el-form-item label="宽">
        <el-input-number
          v-model="form.width"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="高">
        <el-input-number
          v-model="form.height"
          type="number"
          :min="0"
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
    </el-form>
    <code>{{ activeWidget }}</code>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('PageTemplateDesigner')
export default {
  name: 'WidgetInput',
  data () {
    return {
      form: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        border: []
      }
    }
  },
  computed: {
    ...mapState({
      activeWidget: state => state.activeWidget
    })
  },
  methods: {
    ...mapActions([]),
    onClick () {}
  }
}
</script>W
<style lang="scss" scoped>
.contentConfiguration {
  height: 800px;
  flex: 0 1 200px;
  background: blanchedalmond;
  padding: 20px;
}
</style>
