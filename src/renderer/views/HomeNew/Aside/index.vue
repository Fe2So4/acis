<template>
  <div class="aside">
    <div
      class="title"
    >
      Dandelion 麻醉临床信息系统
    </div>
    <div class="img">
      <img
        src="../../../assets/tq.png"
        alt=""
      >
    </div>
    <div class="nav-list">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <el-collapse
          accordion
          :value="activesNames"
          @change="handleChange"
        >
          <el-collapse-item
            v-for="item in navList"
            :key="item.index"
            :name="item.index"
          >
            <template slot="title">
              <i
                class="header-icon"
                :class="item.icon"
              />{{ item.name }}
              <div
                class="active"
                v-show="item.index === activesNames"
              />
            </template>
            <div class="menu">
              <span
                v-for="(_item,index) in item.subNav"
                :key="_item.index"
                :class="{'rightActive':activeIndex === index && oddEven(index),
                         'leftActive':activeIndex===index&&!oddEven(index)}"
                @click="handleChangeButton(index)"
              >{{ _item.name }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
// import Overview from '../../../components/OperationOverview/index'
export default {
  name: 'Aside',
  data () {
    return {
      activesNames: '1',
      isCollapse: false,
      showOverflow: false,
      navList: [
        {
          name: '大事件',
          index: '1',
          subNav: [
            { name: '麻药', index: '1-1', route: 'Event' },
            { name: '用药', index: '1-2', route: 'Event' }
          ],
          icon: 'el-icon-star-on'
        },
        { name: '系统集成', index: '2', subNav: [], icon: 'el-icon-location' },
        {
          name: '患者操作',
          index: '3',
          subNav: [
            { name: '手术概览', index: '3-1', route: 'OperationOverview' }
          ],
          icon: 'el-icon-s-data'
        },
        {
          name: '常用功能',
          index: '4',
          subNav: [
            { name: '血流动力', index: '4-1', route: 'Hemodynamics' },
            { name: '模板管理', index: '4-2', route: 'TemplateManagement' }
          ],
          icon: 'el-icon-monitor'
        },
        {
          name: '其他',
          index: '5',
          subNav: [
            { name: '系统配置', index: '5-1', route: 'ConfigurationSystem' },
            { name: '模板设计器', index: '5-2', route: 'TemplateDesigner' },
            { name: '模板展示', index: '5-3', route: 'TemplateDisplayer' }
          ],
          icon: 'el-icon-s-tools'
        }
      ],
      overviewList: [],
      activeIndex: null
    }
  },
  components: {
    // Overview
  },
  computed: {
    oddEven (index) {
      return function (index) {
        if ((index + 1) % 2 === 0) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    handleChangeButton (index) {
      this.activeIndex = index
    },
    handleShowOverview () {
      if (this.isCollapse === true) {
        this.showOverflow = !this.showOverflow
      }
    },
    handleChange (active) {
      this.activeIndex = null
      this.activesNames = active
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCloseMenu () {
      if (this.showOverflow === false) {
        this.isCollapse = !this.isCollapse
      }
    },
    openConfiguration (route, name) {
      this.$electron.ipcRenderer.send('open-new-window', route, name)
    },
    getOverviewList () {
      this.$http({
        url: 'http://localhost:3334/mock/overview'
      }).then(res => {
        const data = res.data
        this.overviewList = data.data
      })
    }
  },
  mounted () {
    this.getOverviewList()
  }
}
</script>
<style lang="scss" scoped>
.aside {
  height: 100%;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  // position: relative;
  .title {
    color: #0094ff;
    line-height: 30px;
    // background: #f8f9fa;
    text-indent: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .img {
    height:34px;
    margin-bottom:14px;
    // background:#fff;
    img{
      // width:100%;
      margin-left:20px;
      height:100%;
    }
  }
  .menu{
    display: grid;
    grid-template-columns: repeat(2, 50%);
    span{
      text-align: center;
      line-height: 30px;
      color:#9BA3D5;
      font-size: 14px;
      cursor: pointer;
      &:hover{
        color:#e3e7fc;
      }
    }
    span.rightActive{
      background:linear-gradient(90deg,rgba(89,247,199,1),rgba(42,131,247,1));
      border-radius:15px 0px 0px 15px;
      color:#EDF1F9;
    }
    span.leftActive{
      background:linear-gradient(90deg,rgba(42,131,247,1),rgba(89,247,199,1));
      border-radius:0 15px 15px 0;
      color:#EDF1F9;
    }
  }
  .nav-list {
    height: calc(100% - 30px);
  }
  .el-collapse{
    border:unset;
    background:#121421;
  }
  .active{
    width:2px;
    height:40px;
    position:absolute;
    right:0;
    top:0;
    background:linear-gradient(0deg,rgba(236,33,88,1),rgba(12,133,226,1));
  }
}
  .aside /deep/ .el-collapse-item__header{
    height: 40px;
    border: unset;
    background:#121421;
    color: #9BA3D5;
    font-size:14px;
    padding-left: 20px;
    position: relative;
    .header-icon{
      font-size:20px;
      margin-right:16px;
    }
  }
  .aside /deep/ .el-collapse-item__wrap{
    background:#121421;
    border: unset;
  }
  .aside /deep/ .el-collapse-item__content{
    background:#121421;
    border: unset;
    padding:30px 0;
  }
  .aside /deep/ .el-collapse-item__header.is-active{
    background:rgba(28,31,50,1);
    box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.05);
    color:#EDF1F9;
    font-size: 16px;
  }
</style>
<style>
.aside .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
