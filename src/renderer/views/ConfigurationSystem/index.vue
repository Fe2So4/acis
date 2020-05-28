<template>
  <div class="configurationSystem">
    <div class="aside">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="1-1"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location" />
                <span>基础配置</span>
              </template>
              <el-menu-item
                v-for="(item,index) in normalList"
                :key="item.path"
                :index="menuIndex(1, index+1)"
                :route="item.route"
                @click="onMenuItemClick(item.path)"
              >
                {{ item.text }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu" />
              <span slot="title">高级配置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationSystem',
  computed: {},
  data () {
    return {
      normalList: [
        {
          text: '常规',
          path: 'NormalSetting',
          route: {
            name: 'NormalSetting'
          }
        },
        {
          text: '液体属性选项',
          path: 'LiquidProperties',
          route: {
            name: 'LiquidProperties'
          }
        },
        {
          text: '文书正反面打印配置',
          path: 'FrontAndBackPrint',
          route: {
            name: 'FrontAndBackPrint'
          }
        },
        {
          text: '血气分析选项',
          path: 'BloodGasAnalysis',
          route: {
            name: 'BloodGasAnalysis'
          }
        },
        {
          text: '体征报警选项',
          path: 'PhysicalAlarm',
          route: {
            name: 'PhysicalAlarm'
          }
        },
        {
          text: '文书打印及上传设置',
          path: 'PrintAndUpload',
          route: {
            name: 'PrintAndUpload'
          }
        },
        {
          text: '医疗文书完整性检查',
          path: 'DocumentIntegrity',
          route: {
            name: 'DocumentIntegrity'
          }
        }
      ]
    }
  },
  created () {
    this.$router.push({
      name: this.normalList[0].path
    })
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    menuIndex (a, b) {
      return a + '-' + b
    },
    onMenuItemClick (name) {
      this.$router.push({
        name
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.configurationSystem {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .aside {
    flex: 200px 0 0;
  }
  .container {
    flex: auto;
    overflow: auto;
  }
}
</style>
