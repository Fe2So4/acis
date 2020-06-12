<template>
  <div class="contentConfiguration">
    <el-form
      ref="form"
      :model="properties"
      label-width="80px"
      size="small"
    >
      <!-- <el-form-item label="宽">
        <el-input-number v-model="form.width" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="高">
        <el-input-number v-model="form.height" type="number" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="X轴坐标">
        <el-input-number v-model="form.left" type="number" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="Y轴坐标">
        <el-input-number v-model="form.top" type="number" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="边框" prop="border">
        <el-checkbox-group v-model="form.border">
          <el-checkbox label="上" name="border"></el-checkbox>
          <el-checkbox label="下" name="border"></el-checkbox>
          <el-checkbox label="左" name="border"></el-checkbox>
          <el-checkbox label="右" name="border"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item
        v-for="(property,key) of properties"
        :key="key"
        :label="key"
      >
        <el-input-number
          v-model="properties[key]"
          :min="0"
          controls-position="right"
          @change="onChange"
        />
      </el-form-item>
      <!-- <component v-for="(property,key) of properties" :key="key" :is="'config-' + property" v-model="properties[key]"></component> -->
    </el-form>
    <code>{{ activeWidget }}</code>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState } = createNamespacedHelpers('Designer')
export default {
  name: 'ContentConfiguration',
  watch: {
    activeWidget: {
      handler: function (val, oldVal) {
        if (val) {
          const { id, name, ...properties } = val
          this.id = id
          this.properties = properties
        } else {
          this.properties = null
        }
      },
      deep: true
    }
  },
  data () {
    return {
      properties: null,
      id: null,
      name: null
    }
  },
  computed: {
    ...mapGetters(['activeWidget']),
    ...mapState(['activeWidgetId'])
  },
  methods: {
    ...mapActions(['setWidgetMap']),
    onChange (currentValue, oldValue) {
      this.setWidgetMap({
        id: this.id,
        ...this.properties
      })
    }
  }
}
</script>W
<style lang="scss" scoped>
.contentConfiguration {
  height: 800px;
  flex: 0 1 250px;
  background: blanchedalmond;
  padding: 20px;
}
</style>
