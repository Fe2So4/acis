<template>
  <div class="configurationSystem">
    <div class="aside">
      <el-scrollbar
        style="height: 100%"
        :wrap-style="wrapStyle"
      >
        <el-menu
          :default-active="defaultActivePath"
          @open="handleOpen"
          @close="handleClose"
          @select="onSelectMenu"
          unique-opened
          class="menu"
          :background-color="menuBackground"
          :text-color="menuTextColor"
          :active-text-color="menuActiveTextColor"
        >
          <el-submenu index="basic">
            <template slot="title">
              <i class="el-icon-setting" />
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
          <el-submenu index="super">
            <template slot="title">
              <i class="el-icon-menu" />
              <span>超级配置</span>
            </template>
            <el-menu-item
              v-for="item in superList"
              :key="item.path"
              :index="item.path"
            >
              {{ item.text }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="container">
      <el-breadcrumb
        separator="/"
        class="title"
      >
        <el-breadcrumb-item>{{ breadcrumbs[0] | breadcrumbFilter }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumbs[1] | breadcrumbFilter }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <el-scrollbar
          style="height: 100%"
          :wrap-style="wrapStyle"
        >
          <component :is="componentName" />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import configurationComponents from './configurationComponent'
export default {
  name: 'ConfigurationSystem',
  components: {
    ...configurationComponents
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        width: 'calc(100% + 18px)',
        height: 'calc(100% + 18px)',
        'padding-right': '1px'
      }
    ])
    const normalList = Object.freeze([
      {
        text: '常规',
        path: 'NormalSetting'
      },
      {
        text: '液体属性选项',
        path: 'LiquidProperties'
      },
      // {
      //   text: '文书正反面打印配置',
      //   path: 'FrontAndBackPrint'
      // },
      {
        text: '血气分析选项',
        path: 'BloodGasAnalysis'
      },
      {
        text: '体征报警选项',
        path: 'PhysicalAlarm'
      },
      {
        text: '文书打印及上传设置',
        path: 'PrintAndUpload'
      }
      // {
      //   text: '医疗文书完整性检查',
      //   path: 'DocumentIntegrity'
      // }
    ])
    const superList = Object.freeze([
      {
        text: '常规',
        path: 'SuperNormalSetting'
      },
      {
        text: '手术状态',
        path: 'OperationStatus'
      },
      {
        text: '导航菜单',
        path: 'NavigationMenu'
      },
      {
        text: '文书菜单',
        path: 'DocumentMenu'
      },
      {
        text: '体征折线',
        path: 'SignLine'
      }
    ])
    return {
      wrapStyle,
      normalList,
      superList,
      componentName: 'NormalSetting',
      breadcrumbs: ['basic', 'NormalSetting']
    }
  },
  computed: {
    ...mapState('Base', ['theme']),
    defaultActivePath () {
      return this.normalList[0].path
    },
    menuBackground () {
      switch (this.theme) {
        case 'dark-gray':
          return '#1e2022'
        case 'light-white':
          return '#F0F0F0'
        case 'dark-blue':
        default:
          return '#181c28'
      }
    },
    menuTextColor () {
      switch (this.theme) {
        case 'dark-gray':
          return '#BABABA'
        case 'light-white':
          return '#707C91'
        case 'dark-blue':
        default:
          return '#9BA4D5'
      }
    },
    menuActiveTextColor () {
      switch (this.theme) {
        case 'dark-gray':
          return '#EDF1F9'
        case 'light-white':
          return '#1A1A1A'
        case 'dark-blue':
        default:
          return '#FFFFFF'
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {},
    onSelectMenu (index, path) {
      this.componentName = index
      this.breadcrumbs = path
    }
  },
  filters: {
    breadcrumbFilter (name) {
      switch (name) {
        case 'basic':
          return '基础配置'
        case 'super':
          return '超级配置'
        case 'NormalSetting':
          return '常规'
        case 'LiquidProperties':
          return '液体属性选项'
        case 'FrontAndBackPrint':
          return '文书正反面打印配置'
        case 'BloodGasAnalysis':
          return '血气分析选项'
        case 'PhysicalAlarm':
          return '体征报警选项'
        case 'PrintAndUpload':
          return '文书打印及上传设置'
        case 'DocumentIntegrity':
          return '医疗文书完整性检查'
        case 'SuperNormalSetting':
          return '常规'
        case 'OperationStatus':
          return '手术状态'
        case 'NavigationMenu':
          return '导航菜单'
        case 'DocumentMenu':
          return '文书菜单'
        case 'SignLine':
          return '体征折线'
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";
.configurationSystem {
  width: 70vw;
  height: 75vh;
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  .aside {
    flex: 220px 0 0;
    .menu {
      border-right: none;
    }
  }
  .container {
    @include theme-property("background", $background-dialog-content);
    border-radius: 10px;
    flex: auto;
    overflow: auto;
    padding: 0 20px;
    .title {
      height: 54px;
      line-height: 54px;
    }
    .title ::v-deep .el-breadcrumb__inner {
      @include theme-property("color", $color-text-regular);
    }
    .title ::v-deep .el-breadcrumb__separator {
      @include theme-property("color", $color-text-regular);
    }
    .main {
      height: calc(100% - 54px);
    }
  }
}
</style>
