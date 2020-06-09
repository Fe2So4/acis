<template>
  <div class="template">
    <div class="top">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
        active-text-color="#409EFF"
      >
        <el-menu-item
          v-for="item in menuList"
          :key="item.path"
          :index="item.path"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Template',
  data () {
    return {
      activeIndex: '/template-management/document-template',
      menuList: [
        {
          name: '事件模板',
          path: '/template-management/document-template'
        },
        {
          name: '文书模板',
          path: '/template-management/event-template'
        },
        {
          name: '血气模板',
          path: '/template-management/blood-template'
        },
        {
          name: '手术清点模板',
          path: '/template-management/clear-template'
        }
      ]
    }
  },
  watch: {
    // $router: {
    //   handler (route) {
    //     console.log(route)
    //   }
    // }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
  .template{
    height: 100%;
    .content{
      height:calc(100% - 62px)
    }
  }
</style>
