<template>
  <div class="search-statistics">
    <div class="top">
      <el-form
        size="mini"
        :inline="true"
      >
        <span>
          <el-form-item style="margin-right:21px;margin-left:46px;">
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width:110px;margin-right:4px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-model="value"
              type="date"
              placeholder="选择日期"
              style="width:165px"
            />
          </el-form-item>
          <el-form-item style="margin-right:21px;">
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width:110px;margin-right:4px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-model="value"
              type="date"
              placeholder="选择日期"
              style="width:165px"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="value"
              placeholder="请选择"
              style="width:110px;margin-right:4px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-model="value"
              style="width:165px"
            />
          </el-form-item>
        </span>
        <span>
          <el-form-item>
            <el-button type="primary">
              查询
            </el-button>
            <el-button>导出配置</el-button>
            <el-button>导出</el-button>
          </el-form-item>
        </span>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item label="手术医生">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="麻醉医生">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="护士">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="手术名称">
          <el-input
            v-model="value"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="麻醉方法">
          <el-input
            v-model="value"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="病人去向">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item
          label="病人ID"
          label-width="68px"
        >
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="病人姓名">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item
          label="年龄"
          label-width="68px"
        >
          <el-input
            v-model="value"
            style="width:50px;"
          />
          <span style="margin:0 3px;">至</span>
          <el-input
            v-model="value"
            style="width:50px;"
          />
        </el-form-item>
        <el-form-item
          label="手术体位"
          style="margin-left:71px;"
        >
          <el-input
            v-model="value"
            style="width:200px;"
          />
        </el-form-item>
        <el-form-item label="ASA分级">
          <el-input
            v-model="value"
            style="width:90px;"
          />
        </el-form-item>
      </el-form>
      <el-form
        size="mini"
        :inline="true"
      >
        <el-form-item style="margin-left:68px;">
          <el-checkbox-group v-model="value">
            <el-checkbox
              v-for="item in filterOptions"
              :label="item.value"
              :key="item.name"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="切口等级">
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width:90px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="麻醉效果">
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width:90px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="手术间"
          label-width="68px"
          style="margin-left:112px;"
        >
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width:200px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="value">
            <el-radio
              :label="item.value"
              v-for="item in radioOptions"
              :key="item.value"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <vxe-table
        border
        round
        show-footer
        export-config
        size="mini"
        ref="xTable"
        class="xTable"
        height="100%"
        :data="tableData"
        align="center"
      >
        <vxe-table-column
          field="opeRoom"
          title="术间"
        />
        <vxe-table-column
          field="sequence"
          title="序号"
        />
        <vxe-table-column
          field="ptName"
          title="病人信息"
        />
        <vxe-table-column
          field="inpatientWard"
          title="病区"
        />
        <vxe-table-column
          field="bedId"
          title="床号"
        />
        <vxe-table-column
          field="visitId"
          title="住院号"
        />
        <vxe-table-column
          field="diagnoseBefore"
          title="诊断"
        />
        <vxe-table-column
          field="operationName"
          title="手术名称"
        />
        <vxe-table-column
          field="surgeonName"
          title="手术医师"
        />
        <vxe-table-column
          field="anesMethod"
          title="麻醉方法"
        />
        <vxe-table-column
          field="anesDoc"
          title="麻醉医师"
        />
        <vxe-table-column
          field="opeNurse"
          title="洗手护士"
        />
        <vxe-table-column
          field="supplyNurse"
          title="巡回护士"
        />
        <vxe-table-column
          field="memo"
          title="备注"
        />
      </vxe-table>
      <bottom-buttons />
    </div>
  </div>
</template>

<script>
import BottomButtons from '@/components/StatisticsBottomButtons/BottomButtons'
export default {
  data () {
    return {
      tableData: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      filterOptions: [
        { name: '全部', value: '1' },
        { name: '术前', value: '2' },
        { name: '术中', value: '3' },
        {
          name: '术后',
          value: '4'
        }
      ],
      radioOptions: [
        {
          name: '全部',
          value: '1'
        },
        {
          name: '急诊',
          value: '2'
        },
        {
          name: '择期',
          value: '3'
        },
        {
          name: '未填',
          value: '4'
        }
      ]
    }
  },
  components: {
    BottomButtons
  }
}
</script>

<style lang="scss" scoped>
.search-statistics {
  position: relative;
  color: #9ba3d5;
  font-size: 14px;
  height: 100%;
  .top {
    padding: 20px 0 0 20px;
    .el-form{
      &:first-child{
        display: flex;
        justify-content: space-between;
      }
    }
    .el-checkbox {
      margin-right: 10px;
      /deep/ .el-checkbox__label{
        padding-left: 6px;
      }
    }
    .el-radio{
      margin-right: 10px;
      /deep/ .el-radio__label{
        padding-left:6px;
      }
    }
    height: 220px;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    box-sizing: border-box;
  }
  .table {
    margin-top: 20px;
    padding: 20px 10px 0;
    padding-top: unset;
    background: rgba(24, 28, 39, 1);
    box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    border-radius: 5px;
    height: calc(100% - 240px);
    overflow: hidden;
    .xTable{
      margin-top: 20px;
      height: calc(100% - 76px);
    }
  }
}
</style>
<style>
  .el-picker-panel {
    background: #252c40 !important;
  }
</style>
}
