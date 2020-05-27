<template>
  <div class="header">
    <div class="top">
      <div class="logo">
        <img src="../../../assets/tq_logo.png" alt />
      </div>
      <div class="patient-info">
        <div class="room">09</div>
        <!-- <div class="icon el-icon-user-solid"></div> -->
        <div class="detail">
          <div class="cardId">1000000000000</div>
          <!-- <div class="divide"></div> -->
           <el-divider></el-divider>
          <div class="name">吴山</div>
        </div>
      </div>
      <div class="patient-status">
          <el-steps :active="1" finish-status="success" align-center>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
            <el-step title="入手术室" ></el-step>
        </el-steps>
        <div style="display:flex;">
            <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value3"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value4"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value5"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value6"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value7"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value8"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
            <el-date-picker
                v-model="value9"
                type="datetime"
                placeholder=""
                size="mini"
                >
            </el-date-picker>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="patient-form">
        <ul>
            <li v-for="(item,index) in 5" :key="index" :class="{'active':activeIndex === index}" @click="handleChangeTab(index)">术前访视</li>
        </ul>
        <div class="filter">
            <el-select v-model="formType">
                <el-option label="全部" value="1">全部</el-option>
                <el-option label="当前" value="2">当前</el-option>
            </el-select>
            <el-input-number size="mini" v-model="formPage" controls-position="right" @change="handleChangePage" :min="1" :max="10"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: 0,
      formType: '',
      formPage: null,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: ''
    }
  },
  methods: {
    handleChangeTab (index) {
      this.activeIndex = index
    },
    handleChangePage () {

    }
  }
}
</script>
<style lang="scss" scoped>
.header {
//   height: 100%;
//   display: flex;
  .top {
      border-top:1px solid #144177;
    display: flex;
    height: 90px;
    .logo {
      width: 182px;
      height: 100%;
    }
    .patient-info {
      display: flex;
      padding: 0 14px;
      max-width:242px;
      border-left:1px solid #144177;
      border-right:1px solid #144177;
      .room {
        font: 50px/90px "";
        font-weight: 700;
        color: #cd5c5c;
        padding:0 10px 0 0;
        cursor: pointer;
      }
      .icon {
        background: #5289c8;
        width: 17px;
        height: 20px;
        margin-top:20px;
      }
      .detail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 12px;
        color: blue;
        .divide{
            height:1px;
            background:#000;
            margin:4px 0;
        }
        .cardId{
            color:blue;
            font-size:14px;
        }
        .name{
            font-size:18px;
            color:#0000ff;
        }
        .el-divider{
            margin:4px 0;
        }
      }
    }
    .patient-status {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
  }
  .bottom {
    height:26px;
    background:#144177;
    padding-left:182px;
    .patient-form {
        height:100%;
        display: flex;
        justify-content: space-between;
        border-top:1px solid #144177;
        border-bottom:1px solid #144177;
        box-sizing: border-box;
        ul{
            display: flex;
            box-sizing: border-box;
            li{
                cursor: pointer;
                background:#fff;
                padding:0 16px;
                font-size:12px;
                line-height:24px;
                border-right:1px solid #144177;
                color:#000;
                &:first-child{
                    border-left: 1px solid #144177;
                }
            }
            li.active{
                background:rgba(64,153,240,.7);
                // background:#144177;
                color:#fff;
            }
        }
        .filter{
            // margin-right:20px;
            .el-select{
                width:120px;
            }
            .el-input-number{
                margin-right:10px;
            }
            .el-input-number--mini{
                line-height:24px;
            }
        }
        // background:#fff;
    }
  }
}
.header /deep/ .el-input__inner{
    line-height:24px;
    height:24px;
}
.header /deep/ .el-input__icon{
    line-height:24px;
    // height:24px;
}
.header /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
    flex:1;
    margin:0 10px;
    width:0;
}
</style>
