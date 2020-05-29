<template>
  <div class="documentIntegrity">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>医疗文书完整性检查</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <el-row
        type="flex"
        :gutter="20"
      >
        <el-col>
          <p class="settingTitle">
            系统将会检查下列被打钩的医疗文书是否已完成
            <br>请选择需要检查的文书：
          </p>
          <el-table
            size="mini"
            border
            :data="tableData"
            max-height="300"
          >
            <el-table-column
              type="selection"
              width="40"
            />
            <el-table-column
              label="文书名称"
              prop="documentName"
            />
          </el-table>
        </el-col>
        <el-col class="rightCol">
          <div class="buttonCotent">
            <el-button
              type="primary"
              size="small"
            >
              确定
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DocumentIntegrity',
  data () {
    return {
      tableData: [
        {
          documentName: '文书1'
        },
        {
          documentName: '文书2'
        },
        {
          documentName: '文书3'
        },
        {
          documentName: '文书4'
        },
        {
          documentName: '文书5'
        },
        {
          documentName: '文书6'
        }
      ]
    }
  },
  mounted () {
    // this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
.documentIntegrity {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }

  .mainContent {
    padding: 20px 10px 10px;

    .settingTitle {
      font-size: 14px;
      line-height: 28px;
      margin: 0 0 20px;
      color: #606266;
    }

    .rightCol {
      max-width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .buttonCotent {
        text-align: center;
      }
    }
  }
}
</style>
