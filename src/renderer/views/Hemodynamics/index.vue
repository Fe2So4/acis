<template>
  <div class="hemodynamics">
    <div class="top">
      血流动力学计算
    </div>
    <div class="middle">
      <el-radio-group v-model="radio">
        <el-radio :label="3">
          男
        </el-radio>
        <el-radio :label="6">
          女
        </el-radio>
        <el-radio :label="9">
          儿童
        </el-radio>
      </el-radio-group>
      <div class="content">
        <div class="left">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item label="身高:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="体重:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="CVPm:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="ABPs:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="ABPd:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="ABPm:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="HR:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="C.O.:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="PAWP:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="PAPs:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="PAPd:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
            <el-form-item label="PAPm">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="center">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item
              label="BSA:"
              v-for="(item,index) in 12"
              :key="index"
            >
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item
              label="BSA:"
              v-for="(item,index) in 12"
              :key="index"
            >
              <el-input
                v-model="name"
                size="mini"
              />
              <span>g.m</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="option">
      <el-button size="mini">
        计算结果（R）
      </el-button>
      <el-button size="mini">
        关闭（C）
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Hemodynamics',
  data () {
    return {
      radio: '3',
      name: '',
      labelPosition: 'right'
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
    .hemodynamics{
      height: 100%;
      width: 1082px;
      display: flex;
      flex-direction: column;
      .el-input{
        max-width: 217px;
      }
      .top{
        font:16px/26px '';
        background: #f8f9fa;
        padding-left: 10px;
      }
      .middle{
        height:calc(100% - 74px);
        .el-radio-group{
          padding:5px 10px 5px 10px;
          background: wheat;
        }
        .content{
          height: calc(100% - 26px);
          display: flex;
          // justify-content: ;
          .el-form{
            .el-form-item{
             margin-bottom:10px;
            }
          }
          .left{
            flex: 1;
          }
          .center{
            flex: 1;
          }
          .right{
            flex: 1
          }
        }
        }
      .option{
        background: #f8f9fa;
        text-align: right;
        // padding:10px 0;
        padding:10px 10px 10px 0;
        z-index: 9999;
      }
    }
    .hemodynamics /deep/ .el-form-item__content{
        display: flex;
        span{
          &:last-child{
            // font-size:;
            margin-left: 10px;
            padding-right: 10px;
          }
        }
    }
</style>
