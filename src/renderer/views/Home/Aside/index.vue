<template>
    <div class="aside">
        <div class="title" @click="handleCloseMenu">导航栏</div>
        <!-- <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="大事件" name="1">
          </el-collapse-item>
          <el-collapse-item title="系统集成" name="2">
          </el-collapse-item>
          <el-collapse-item title="患者操作" name="3">
          </el-collapse-item>
          <el-collapse-item title="常用功能" name="4">
          </el-collapse-item>
          <el-collapse-item title="其他" name="4">
          </el-collapse-item>
        </el-collapse> -->
    <el-menu
      default-active="2"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>大事件</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统集成</span>
        </template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>患者操作</span>
        </template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>其他</span>
        </template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Aside',
  data () {
    return {
      activesNames: '',
      isCollapse: false
    }
  },
  methods: {
    handleChange () {

    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCloseMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
    .aside{
      .title{
        color:#000;
        line-height:30px;
        text-indent: 10px;
      }
      .el-submenu .el-menu-item{
        line-height:30px;
        height:30px;
        text-indent: 1.5em;
      }
    }
    .aside /deep/ .el-submenu__title{
          line-height:30px;
          height:30px;
      }
</style>
