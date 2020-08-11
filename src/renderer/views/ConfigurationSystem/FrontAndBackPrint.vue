<template>
  <div class="frontAndBackPrint">
    <el-breadcrumb
      separator="/"
      class="title"
    >
      <el-breadcrumb-item>基础配置</el-breadcrumb-item>
      <el-breadcrumb-item>文书正反面打印配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mainContent">
      <div class="leftPart">
        <el-table
          size="mini"
          border
          :data="tableData"
          class="table"
        >
          <el-table-column
            prop="front"
            label="正面文书名称"
          />
          <el-table-column
            prop="back"
            label="反面文书名称"
          />
          <el-table-column
            prop="merge"
            label="是否合并为一份PDF"
          >
            <template slot-scope="scope">
              {{ scope.row.merge ? '是':'否' }}
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rightPart">
        <el-form
          ref="form"
          :modal="form"
          label-width="180px"
          size="mini"
          label-position="top"
        >
          <el-form-item label="打印正面文书">
            <el-select
              v-model="form.frontDocument"
              placeholder="请选择"
            >
              <el-option
                v-for="item in printDocumentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="打印反面文书">
            <el-select
              v-model="form.backDocument"
              placeholder="请选择"
            >
              <el-option
                v-for="item in printDocumentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否合并为一份PDF">
            <el-select
              v-model="form.mergeIntoOnePDF"
              placeholder="请选择"
            >
              <el-option
                v-for="item in mergeIntoOnePDFOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <div style="text-align:center">
            <el-button
              type="primary"
              size="small"
            >
              添加打印
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FrontAndBackPrint',
  data () {
    return {
      form: {
        frontDocument: null,
        backDocument: null,
        mergeIntoOnePDF: 0
      },
      printDocumentOptions: [
        {
          label: '文书1',
          value: '1'
        },
        {
          label: '文书2',
          value: '2'
        }
      ],
      mergeIntoOnePDFOptions: [
        {
          label: '否',
          value: 0
        },
        {
          label: '是',
          value: 1
        }
      ],
      tableData: [{
        front: '文书1',
        back: '文书2',
        merge: true
      }]
    }
  },
  methods: {
    handleDelete () {}
  }
}
</script>
<style lang="scss" scoped>
.frontAndBackPrint {
  padding: 10px;
  .title {
    height: 40px;
    line-height: 30px;
    border-bottom: solid 1px #0094ff;
    padding-left: 10px;
  }
  .mainContent {
    padding: 20px 10px 10px;

    display: flex;
    .leftPart {
      flex: 1 1 200px;

      .table {
        width: 100%;
        min-height: 400px;
      }
    }
    .rightPart {
      padding-left: 20px;
      flex: 0 0 210px;
    }
  }
}
</style>
