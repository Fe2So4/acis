<template>
  <div class="icu-common-navs-container">
    <transition
      name="fade"
      mode="out-in"
    >
      <el-menu
        class="icu-navs-list"
        router
        :unique-opened="true"
        :default-active="active"
        :key="$route.meta.parent"
      >
        <el-menu-item
          v-for="(item, i) in navs"
          :key="i"
          :index="item.path"
        >
          <i class="el-icon-caret-right" />
          <span slot="title">{{ item.meta.title }}</span>
          <!-- <span slot="title">{{item.name}}</span> -->
        </el-menu-item>
      </el-menu>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
      // navs: [{ name: '门诊科室工作量统计', path: 'operation-quantity' }, { name: '医护人员工作量统计', path: 'operation-doc' }, { name: '手术取消统计', path: 'operation-cancel' }],
      // navs1: [{ name: '权限管理', path: 'system-authority' }, { name: '计费项目与套餐', path: 'system-price' }, { name: '手术间维护', path: 'system-maintain' }]
    }
  },
  computed: {
    navs () {
      return this.$store.state.navs.items || []
    }
  },
  watch: {
    $route: {
      handler (route) {
        const paths = route.path.split('/')
        this.active = paths[paths.length - 1]
      },
      immediate: true
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.icu-common-navs-container {

  .icu-navs-list {
    border-right: none;
    background: transparent;

    .el-menu-item {
      color: #fff;
      padding: 0 10px!important;

      &.is-active,
      &:focus,
      &:hover {
        background: #3A8EFF;
      }

      i {
        color: #fff;
        width: 16px;
      }
    }
  }
}
</style>
