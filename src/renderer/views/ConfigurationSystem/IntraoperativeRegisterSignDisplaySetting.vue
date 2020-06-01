<template>
  <div class="intraoperativeRegisterSignDisplaySetting">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>超级配置</el-breadcrumb-item>
      <el-breadcrumb-item>常规</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <el-transfer
        class="transfer"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="signList"
        :titles="['备选', '已选']"
        :props="{
          key: 'code',
          label: 'name'
        }"
        target-order="push"
        @change="onChange"
        @right-check-change="onRightCheckChange"
      >
        <span slot-scope="{ option }">{{ option.name }} - {{ option.code }}</span>
        <el-button
          class="transfer-footer"
          slot="right-footer"
          size="mini"
          @click="moveUp"
        >
          上移
        </el-button>
        <el-button
          class="transfer-footer"
          slot="right-footer"
          size="mini"
          @click="moveDown"
        >
          下移
        </el-button>
      </el-transfer>
      <pre>{{ value }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntraoperativeRegisterSignDisplaySetting',
  data () {
    return {
      value: [],
      filterMethod (query, item) {
        return item.name.indexOf(query) > -1
      },
      signList: [
        {
          name: '体征1',
          code: '1001'
        }, {
          name: '体征2',
          code: '1002'
        }, {
          name: '体征3',
          code: '1003'
        }, {
          name: '体征4',
          code: '1004'
        }
      ],
      rightCheckKeys: []
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  },
  methods: {
    onChange (list) {
      console.log(list)
    },
    onRightCheckChange (keys) {
      this.rightCheckKeys = keys
    },
    moveUp () {
      // if (this.rightCheckKeys.length === 0) {
      //   return
      // }
      // const firstCheckKey = this.rightCheckKeys.slice(0, 1)
      // const firstCheckKeyIndexInOriginal = this.value.indexOf(firstCheckKey)
      // if (firstCheckKeyIndexInOriginal === 0) {
      //   return
      // }
      // const removeItem = this.value[firstCheckKeyIndexInOriginal - 1]
      // this.value.splice(firstCheckKeyIndexInOriginal - 1, this.rightCheckKeys.length, ...this.rightCheckKeys)
    },
    moveDown () {}
  }
}
</script>
<style lang='scss' scoped>
.intraoperativeRegisterSignDisplaySetting {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #e6e6e6;
    padding-left: 10px;
  }

  .mainContent {
    padding: 20px 10px 10px;

    .transfer {
    // height: 400px;
      .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
      }
    }
  }
}
</style>
<style lang="scss">
.intraoperativeRegisterSignDisplaySetting {
  .el-transfer-panel__body {
    height: 400px;
  }

  .el-transfer-panel__list.is-filterable {
    height: calc(100% - 47px);
  }
}
</style>
