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
        v-model="signListSelected"
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
      <pre>{{ signListSelected }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntraoperativeRegisterSignDisplaySetting',
  data () {
    return {
      signListSelected: [],
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
        }, {
          name: '体征5',
          code: '1005'
        }, {
          name: '体征6',
          code: '1006'
        }, {
          name: '体征7',
          code: '1007'
        }, {
          name: '体征8',
          code: '1008'
        }, {
          name: '体征9',
          code: '1009'
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
      // console.log(list)
    },
    onRightCheckChange (keys) {
      this.rightCheckKeys = keys
    },
    moveUp () {
      const reverseTwoItem = item => {
        const firstIndex = this.signListSelected.indexOf(item)
        if (firstIndex === 0) {
          return false
        }
        const arr = this.signListSelected.slice(firstIndex - 1, firstIndex + 1)
        arr.reverse()
        this.signListSelected.splice(firstIndex - 1, 2, ...arr)
        return true
      }

      const rightCheckKeys = this.getOrderedRightCheckKeys()
      rightCheckKeys.reduce((flag, item) => flag ? reverseTwoItem(item) : flag, true)
    },
    moveDown () {
      const reverseTwoItem = item => {
        const lastIndex = this.signListSelected.indexOf(item)
        if (lastIndex === this.signListSelected.length - 1) {
          return false
        }
        const arr = this.signListSelected.slice(lastIndex, lastIndex + 2)
        arr.reverse()
        this.signListSelected.splice(lastIndex, 2, ...arr)
        return true
      }
      const reverseRightCheckKeys = [...this.getOrderedRightCheckKeys()].reverse()
      reverseRightCheckKeys.reduce((flag, item) => flag ? reverseTwoItem(item) : flag, true)
    },
    getOrderedRightCheckKeys () {
      const objArr = this.rightCheckKeys.reduce((arr, item) => {
        return arr.concat([{
          item: item,
          index: this.signListSelected.indexOf(item)
        }])
      }, [])
      objArr.sort((a, b) => a.index - b.index)
      return objArr.reduce((arr, item) => arr.concat([item.item]), [])
    }
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
