<template>
  <div class="contentConfiguration">
    <el-form
      ref="form"
      :model="properties"
      label-width="80px"
      size="small"
    >
      <div
        v-for="(group, groupName) of configurationGroups"
        :key="groupName"
      >
        <h1 v-show="Object.keys(group).length">
          {{ groupName }}
        </h1>
        <component
          v-for="(property,key) of group"
          :key="key"
          :is="configurationComponent(key)"
          :value="properties[key]"
          @change="onChange"
        />
      </div>
    </el-form>
    <code>{{ configurationGroups }}</code>
  </div>
</template>
<script>
import ConfigurationWidth from './ConfigurationWidth'
import ConfigurationHeight from './ConfigurationHeight'
import ConfigurationPositionX from './ConfigurationPositionX'
import ConfigurationPositionY from './ConfigurationPositionY'
import { configurationMap } from './WidgetConfigurationItems'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'Designer'
)
export default {
  name: 'ContentConfiguration',
  components: {
    ConfigurationWidth,
    ConfigurationHeight,
    ConfigurationPositionX,
    ConfigurationPositionY
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
  data () {
    return {
      properties: null,
      id: null,
      name: null,
      configurationItemNames: []
    }
  },
  computed: {
    ...mapGetters(['activeWidget']),
    ...mapState(['activeWidgetId']),
    configurationGroups () {
      const groups = {
        layout: {},
        position: {},
        custom: {}
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
    }
  },
  methods: {
    ...mapActions(['setWidgetMap']),
    onChange (properties) {
      this.setWidgetMap({
        id: this.id,
        ...properties
      })
    },
    configurationComponent (name) {
      return 'Configuration' + name.slice(0, 1).toUpperCase() + name.slice(1)
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
