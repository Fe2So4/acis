<template>
  <div class="search">
    <el-row
      type="flex"
      justify="space-around"
    >
      <el-col :span="16">
        <el-radio-group
          v-model="radio"
          style="margin-top:11px;"
        >
          <el-radio :label="1">
            全部
          </el-radio>
          <el-radio :label="2">
            术前
          </el-radio>
          <el-radio :label="3">
            术中
          </el-radio>
          <el-radio :label="4">
            术后
          </el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="8">
        <el-checkbox-group
          v-model="check"
          @change="handleCheckedChange"
        >
          <el-checkbox
            label="急诊"
            key="A"
          >
            急诊
          </el-checkbox>
          <el-checkbox
            label="本人"
            key="B"
          >
            本人
          </el-checkbox>
          <el-checkbox
            label="隔离"
            key="C"
          >
            隔离
          </el-checkbox>
          <el-checkbox
            label="放射"
            key="D"
          >
            放射
          </el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <span>手术间</span>
        <el-select
          v-model="room"
          size="mini"
        >
          <el-option
            value="1"
            label="1"
          />
          <el-option
            value="2"
            label="2"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <span>日期</span>
        <el-date-picker
          v-model="date1"
          type="date"
          placeholder=""
          size="mini"
        />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <span>姓名</span>
        <el-input
          v-model="name"
          size="mini"
        />
      </el-col>
      <el-col :span="12">
        <span>ID</span>
        <el-input
          v-model="id"
          size="mini"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-button size="mini">
        急症登记
      </el-button>
      <el-button size="mini">
        今天列表
      </el-button>
      <el-button size="mini">
        明天列表
      </el-button>
      <el-button size="mini">
        手术排台
      </el-button>
      <el-button size="mini">
        搜索
      </el-button>
      <el-button
        size="mini"
        @click="handleShowMore"
      >
        >>
      </el-button>
    </el-row>
    <div
      :class="{'more':true,'show':showMore == true}"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <span>状态</span>
          <el-select
            v-model="room"
            size="mini"
          >
            <el-option
              value="1"
              label="1"
            />
            <el-option
              value="2"
              label="2"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <span>终止日期</span>
          <el-date-picker
            v-model="date"
            type="date"
            placeholder=""
            size="mini"
          />
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <span>麻醉医生</span>
          <el-select
            v-model="room"
            size="mini"
          >
            <el-option
              value="1"
              label="1"
            />
            <el-option
              value="2"
              label="2"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <span>麻醉方法</span>
          <el-select
            v-model="room"
            size="mini"
          >
            <el-option
              value="1"
              label="1"
            />
            <el-option
              value="2"
              label="2"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="24">
           <el-col :span="12">
        <span>住院科室</span>
        <el-select
          v-model="room"
          size="mini"
        >
          <el-option
            value="1"
            label="1"
          />
          <el-option
            value="2"
            label="2"
          />
        </el-select>
      </el-col>
       <el-col :span="12">
        <span>手术名称</span>
        <el-select
          v-model="room"
          size="mini"
        >
          <el-option
            value="1"
            label="1"
          />
          <el-option
            value="2"
            label="2"
          />
        </el-select>
      </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      radio: '',
      id: '',
      name: '',
      date: '',
      date1: '',
      room: '',
      check: '',
      showMore: false
    }
  },
  methods: {
    handleCheckedChange (value) {
    },
    handleShowMore () {
      this.showMore = !this.showMore
    }
  }
}
</script>
<style lang="scss" scoped>
    .search{
        font-size: 14px;

        .el-button{

        }
        .el-row{
            margin:5px 0 !important;
            padding-left:5px;
            display:flex;
            justify-content: space-around;
            &:first-child{
                display:flex;
                // justify-content: space-between;
                justify-items: center;
            }
            &:last-child{
                // padding-left:0;
                // display:flex;
                // justify-content: space-between;
            }
        .el-col{
            padding:0 !important;
            display: flex;
            justify-content: space-around;
            span{
                // text-align: justify;
                width: 58px;
                line-height:28px;
            }
        }
        .el-input{
            max-width:193px;
        }
        }
        .more{
           transition: all 1s;
            display: none;
            // height:0;
        }
        .more.show{
            display:block;
            // transition: all 3s;
            // height:200px;
            // animation: show 1s
            // background:red;
        }
        @-webkit-keyframes show{
            0% {
                display:none;
            }
            100% {
                display: block;
            }
        }
    }
</style>
