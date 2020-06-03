<template>
  <div class="configurationSystem">
    <div class="aside">
      <el-scrollbar class="overflowXHidden">
        <el-row>
          <el-col :span="24">
            <el-menu
              :default-active="defaultActivePath"
              @open="handleOpen"
              @close="handleClose"
              class="menu"
              router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location" />
                  <span>基础配置</span>
                </template>
                <el-menu-item
                  v-for="item in normalList"
                  :key="item.path"
                  :index="item.path"
                  :route="item.route"
                >
                  {{ item.text }}
                </el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu" />
                  <span>高级配置</span>
                </template>
                <el-menu-item
                  v-for="item in superList"
                  :key="item.path"
                  :index="item.path"
                  :route="item.route"
                >
                  {{ item.text }}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigurationSystem',
  data () {
    // const basePath = '/configuration-system/'
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
      ],
      superList: [
        {
          text: '常规',
          path: 'SuperNormalSetting',
          route: {
            name: 'SuperNormalSetting'
          }
        },
        {
          text: '手术状态',
          path: 'OperationStatus',
          route: {
            name: 'OperationStatus'
          }
        },
        {
          text: '导航菜单',
          path: 'NavigationMenu',
          route: {
            name: 'NavigationMenu'
          }
        },
        {
          text: '文书菜单',
          path: 'DocumentMenu',
          route: {
            name: 'DocumentMenu'
          }
        }
      ]
    }
  },
  computed: {
    defaultActivePath () {
      return this.normalList[0].path
    }
  },
  created () {
    // this.$router.push({
    //   name: this.normalList[0].path
    // })
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
    border-right: 1px solid #e6e6e6;

    .menu {
      border-right: none;
    }
  }
  .container {
    flex: auto;
    overflow: auto;
  }
}
</style>
<style lang="scss">
.overflowXHidden {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
