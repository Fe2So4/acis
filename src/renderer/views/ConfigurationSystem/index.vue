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
          background-color="#181c27"
          text-color="#9ba3d5"
          active-text-color="#ffffff"
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
import configurationComponents from './configurationComponent'
export default {
  name: 'ConfigurationSystem',
  components: {
    ...configurationComponents
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
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
      {
        text: '文书正反面打印配置',
        path: 'FrontAndBackPrint'
      },
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
    defaultActivePath () {
      return this.normalList[0].path
    }
  },
  created () {
    // this.$router.push({
    //   name: this.normalList[0].path
    // })
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
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
    background: #1e222e;
    border-radius: 10px;
    flex: auto;
    overflow: auto;
    padding: 0 20px;
    .title {
      height: 54px;
      line-height: 54px;
      color: #9ba3d5;
    }
    .title ::v-deep .el-breadcrumb__separator {
      color: #9ba3d5;
    }
    .main {
      height: calc(100% - 54px);
    }
  }
}
</style>
