<template>
  <div class="contentConfiguration">
    <el-scrollbar
      style="height:100%"
      :wrap-style="wrapStyle"
    >
      <el-collapse v-model="activeNames">
        <div
          v-for="(group, groupName) of configurationGroups"
          :key="groupName"
        >
          <el-collapse-item
            :title="convertChinese(groupName)"
            :name="groupName"
            v-show="Object.keys(group).length"
          >
            <el-form
              label-width="100px"
              size="small"
            >
              <component
                v-for="(property,key) of group"
                :key="key"
                :is="configurationComponent(key)"
                :value="properties[key]"
                @change="onChange"
              />
            </el-form>
          </el-collapse-item>
        </div>
        <div v-show="paperSettingVisible">
          <el-collapse-item
            title="纸张设置"
            name="paperSetting"
          >
            <el-form
              label-width="100px"
              size="small"
            >
              <configuration-paper
                @change="onChangePaperSetting"
                :value="paperSetting"
              />
            </el-form>
          </el-collapse-item>
        </div>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>
<script>
import { pages } from './getAllConfigurationPage'
import { configurationMap } from './WidgetConfigurationItems'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'PageTemplateDesigner'
)
export default {
  name: 'WidgetConfiguration',
  data () {
    return {
      data: [],
      width: null,
      height: null,
      properties: null,
      id: null,
      name: null,
      configurationItemNames: [],
      activeNames: ['layout', 'position', 'custom', 'data'],
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ]
    }
  },
  components: {
    ...pages
  },
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
  computed: {
    ...mapGetters(['activeWidget']),
    ...mapState(['activeWidgetId', 'paperSettingVisible', 'paperSetting']),
    configurationGroups () {
      const groups = {
        layout: {},
        position: {},
        custom: {},
        data: {}
      }
      // eslint-disable-next-line no-unused-vars
      for (const key in this.properties) {
        if (Object.keys(configurationMap).includes(key)) {
          groups[configurationMap[key].parent][key] = this.properties[key]
        } else {
          groups.custom[key] = this.properties[key]
        }
      }

      return groups
    },
    convertChinese (item) {
      return function (item) {
        let name = ''
        switch (item) {
          case 'layout':
            name = '布局'
            break
          case 'position':
            name = '位置'
            break
          case 'custom':
            name = '自定义'
            break
          case 'data':
            name = '数据源'
            break
        }
        return name
      }
    }
  },
  methods: {
    ...mapActions(['setWidgetMap', 'setPaperSetting']),
    onChangeWidth () {
      this.setDesignerWidth(this.width)
    },
    onChangeHeight () {
      this.setDesignerHeight(this.height)
    },
    onChange (properties) {
      this.setWidgetMap({
        id: this.id,
        ...properties
      })
    },
    configurationComponent (name) {
      return 'Configuration' + name.slice(0, 1).toUpperCase() + name.slice(1)
    },
    onChangePaperSetting (paperSetting) {
      this.setPaperSetting(paperSetting)
    }
  },
  beforeCreate () {},
  created () {
    // console.log(pages, 'create')
  }
}
</script>
<style lang="scss" scoped>
.contentConfiguration {
  height: 100%;
  flex: 0 1 400px;
  background: #364058;
  overflow: auto;
  .el-collapse {
    border: none;
  }
}
.contentConfiguration /deep/ .el-collapse-item__header {
  height: 30px;
  background: #5d709b;
}
</style>
