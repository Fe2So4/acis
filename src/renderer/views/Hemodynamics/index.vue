<template>
  <div class="hemodynamics">
    <div class="top">
      血流动力学计算
    </div>
    <el-divider style="margin:10px 0;" />
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
              <span>cm</span>
            </el-form-item>
            <el-form-item label="体重:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>kg</span>
            </el-form-item>
            <el-form-item label="CVPm:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="ABPs:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="ABPd:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="ABPm:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="HR:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>beat/min</span>
            </el-form-item>
            <el-form-item label="C.O.:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>L/min</span>
            </el-form-item>
            <el-form-item label="PAWP:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="PAPs:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="PAPd:">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
            <el-form-item label="PAPm">
              <el-input
                v-model="name"
                size="mini"
              />
              <span>mmHg</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="arow">
          <!-- <i class="el-icon-minus" /> -->
          <!-- <i class="el-icon-arrow-right" /> -->
          <i class="el-icon-right" />
        </div>
        <div class="center">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item
              v-for="(item,index) in resultList"
              :label="item.name"
              :key="index"
            >
              <el-input
                :value="item.value"
                size="mini"
                :disabled="true"
              />
              <span>{{ item.unit }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
          >
            <el-form-item
              v-for="(item,index) in list"
              :label="item.name"
              :key="index"
            >
              <el-input
                :value="item.value"
                size="mini"
                :disabled="true"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="option">
      <el-button
        size="mini"
        type="primary"
      >
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
      labelPosition: 'right',
      resultList: [
        {
          name: 'BSA:',
          unit: 'm&sup2',
          value: ''
        },
        {
          name: 'SV:',
          unit: 'DS.cm&sup2',
          value: ''
        },
        {
          name: 'SVR:',
          unit: 'DS.cm&sup2',
          value: ''
        },
        {
          name: 'PVR:',
          unit: 'DS.cm&sup2',
          value: ''
        },
        {
          name: 'LCW:',
          unit: 'kg.m/min',
          value: ''
        },
        {
          name: 'LVSW:',
          unit: 'g.m',
          value: ''
        },
        {
          name: 'C.I:',
          unit: 'L/(min.m&sup2)',
          value: ''
        },
        {
          name: 'SI:',
          unit: 'ml/(beat.m&sup2)',
          value: ''
        },
        {
          name: 'SVRI:',
          unit: 'DS.m&sup2/cm&sup2',
          value: ''
        },
        {
          name: 'PVRI:',
          unit: 'DS.m&sup2/cm&sup2',
          value: ''
        },
        {
          name: 'LCWI:',
          unit: 'kg.m/(min.m&sup2)',
          value: ''
        },
        {
          name: 'LVSWI:',
          unit: 'g.m/m&sup2',
          value: ''
        }
      ],
      list: [{ name: 'RCW', value: '' }, { name: 'RCWI', value: '' }, { name: 'RVSW', value: '' }, { name: 'RVSWI', value: '' }]
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
  }
}
</script>
<style lang="scss" scoped>
    .hemodynamics{
      height: 80vh;
      width: 80vw;
      display: flex;
      flex-direction: column;
      color:#9BA3D5;
      .el-input{
        max-width: 90px;
      }
      .top{
        font:14px/28px '';
        padding-left: 10px;
      }
      .middle{
        height:calc(100% - 74px);
        .el-radio-group{
          padding:5px 10px 5px 10px;
        }
        .content{
          height: calc(100% - 26px);
          display: flex;
          .el-form{
            .el-form-item{
             margin-bottom:10px;
            }
          }
          .left{
            flex: 1;
          }
          .arow{
            font-size: 38px;
            color:#0094FF;
            line-height: 600px;
          }
          .center{
            flex: 1;
          }
          .right{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
        }
        }
      .option{
        text-align: right;
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
