<template>
  <div class="patient-info">
    <div
      class="search"
    >
      <el-scrollbar
        class="rowScrollbar"
      >
        <el-row>
          <el-form
            :inline="true"
            size="mini"
          >
            <el-form-item>
              <el-radio-group
                v-model="tabPosition"
                style="margin-bottom: 30px;"
                size="mini"
              >
                <el-radio-button
                  v-for="item in filterList"
                  :key="item.label"
                  :label="item.value"
                >
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
              <el-checkbox-group
                v-model="operationStatus"
                style="display:inline-block;margin-left:14px;"
                size="mini"
              >
                <el-checkbox
                  v-for="status in statusList"
                  :label="status.label"
                  :key="status.value"
                >
                  {{ status.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="手术间">
              <el-select
                v-model="opeRoom"
                size="mini"
                placeholder=""
                style="width:160px;"
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
              <el-button
                size="mini"
              >
                搜索
              </el-button>
              <el-button
                size="mini"
                @click="hanldeSearchMore"
              >
                <i
                  class="el-icon-d-arrow-right"
                />
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form
            :model="searchForm"
            :inline="true"
            size="mini"
          >
            <el-form-item label="ID">
              <el-input
                v-model="searchForm.id"
                style="width:130px;"
              />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="searchForm.name"
                style="width:130px;"
              />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                style="width:130px"
                v-model="searchForm.date"
                type="date"
                placeholder=""
              />
            </el-form-item>
            <el-form-item>
              <el-button>
                急诊登记
              </el-button>
              <el-button>
                今天列表
              </el-button>
              <el-button>
                明天列表
              </el-button>
              <el-button>
                手术排台
              </el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-scrollbar>
      <div
        class="other-search"
        v-show="showMore"
      >
        <el-row>
          <el-form
            :inline="true"
            :model="searchForm"
            size="mini"
          >
            <el-form-item label="麻醉方法">
              <el-input v-model="searchForm.anaesMethod" />
            </el-form-item>
            <el-form-item label="麻醉医生">
              <el-input v-model="searchForm.anaesDoc" />
            </el-form-item>
            <el-form-item label="终止日期">
              <el-date-picker
                v-model="searchForm.endDate"
                format="MM-dd HH:mm"
                value-format="MM-dd HH:mm"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="searchForm.status" />
            </el-form-item>
          </el-form>
        </el-row>
        <el-row>
          <el-form
            :inline="true"
            :model="searchForm"
            size="mini"
          >
            <el-form-item label="住院科室">
              <el-input v-model="searchForm.dept" />
            </el-form-item>
            <el-form-item label="手术名称">
              <el-input v-model="searchForm.opeName" />
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="patient-card">
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <ul>
          <li
            v-for="(item,index) in 10"
            :key="index"
            @click="handleJump(item)"
          >
            <div class="title">
              <span>手术室 07</span>
              <span>出手术室</span>
            </div>
            <div class="content">
              <div class="room">
                <span>07 - 1</span>
              </div>
              <div class="info">
                <p>患者 <span>钱书明</span> <span>1000189889</span></p>
                <p>住院号 <span>000213</span></p>
                <p>手术 <span>内镜下斜坡病损切除术</span></p>
                <p>时间 <span>2020-04-26 08:00</span></p>
                <p>术者 <span>doctor</span> 麻醉 <span>麻醉</span></p>
              </div>
              <div
                class="status"
              >
                <div
                  v-for="_item in iconList "
                  :key="_item.icon"
                >
                  <div style="display:flex;justify-content:center;">
                    <img
                      style="height:26px;width:26px;"
                      :src="_item.icon"
                      alt=""
                    >
                  </div>
                  <div :style="{color:_item.color,fontSize:'14px',textAlign:'center'}">
                    {{ _item.title }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import icon1 from '@/assets/emergency.png'
import icon2 from '@/assets/quarantine.png'
import icon3 from '@/assets/radiation.png'
export default {
  name: 'PatientInfo',
  data () {
    return {
      searchForm: {
        id: '',
        name: '',
        date: '',
        endDate: '',
        anaesDoc: '',
        anaesMethod: '',
        status: '',
        dept: '',
        opeName: ''
      },
      opeRoom: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      iconList: [{ title: '急诊', icon: icon1, color: 'red' },
        { title: '隔离', icon: icon2, color: 'orange' },
        { title: '放射', icon: icon3, color: 'yellow' }],
      filterList: [{ label: '全部', value: '1' }, { label: '术前', value: '2' }, { label: '术中', value: '3' }, { label: '术后', value: '4' }],
      tabPosition: '1',
      operationStatus: '',
      statusList: [{ label: '急诊', value: '1' }, { label: '本人的', value: '2' }, { label: '隔离', value: '3' }, { label: '放射', value: '4' }],
      showMore: false
    }
  },
  components: {
  },
  methods: {
    handleJump (item) {
      this.$router.push('/home/patientInfo')
    },
    hanldeSearchMore () {
      this.showMore = !this.showMore
    }
  }
}
</script>
<style lang="scss" scoped>
.patient-info {
  height: 100%;
  width: 100%;
  padding:0 0 0 12px;
  // display: flex;
  // flex-direction: column;
  .search{
    // flex: 1;
    height:118px;
    background:rgba(24,28,39,1);
    box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
    border-radius:5px;
    width:100%;
    padding:20px;
    position:relative;
    .other-search{
      position:absolute;
      padding:20px 20px 0 20px;
      width:100%;
      background:#181c27;
      box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
      border-radius:5px;
      top:120px;
      left:0;
      z-index: 1;
    }
  }
  .el-radio-group{
    margin-bottom:0 !important;
  }
  .patient-card{
    // flex: 1;
    // height:calc(100% - 118px);
    height:calc(100% - 121px);
    box-sizing: border-box;
    padding-top:20px;
    ul{
      display: grid;
      // overflow-y:auto;
      grid-template-columns: repeat(auto-fill, 392px);
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      // justify-content: space-around;
      li{
        box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        border-radius:5px;
        padding:0 0 14px 0;
        background:#181C27;
        border:1px solid #181c27;
        width: 392px;
        height:196px;
        font-size:14px;
        display: flex;
        flex-direction: column;
        transition: all 0.5s;
        .title{
          display: flex;
          justify-content: space-between;
          span{
            color:#7f85a9;
            padding:0 10px;
            line-height:28px;
            &:last-child{
              color:#0094ff;
            }
          }
        }
        .content{
          flex: 1;
          display: flex;
          overflow: hidden;
          .room{
            width:100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            span{
              box-shadow:0 0 12px 3px #373a44;
              box-sizing: border-box;
              width: 100%;
              height:46px;
              display: block;
              line-height:46px;
              background:linear-gradient(120deg,rgba(84,190,234,1),rgba(219,83,160,1));
              border-radius:0px 23px 23px 0px;
              font-size:26px;
              font-weight:bold;
              color: #fff;
              text-shadow:0px 1px 3px rgba(0, 0, 0, 0.2);
              text-align: center;
            }
          }
          .info{
            margin:0 30px 0 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p{
              padding:0;
              margin:0;
              color:#9BA3D5;
              span{
                color:#D0DAE5;
                line-height: 28px;
              }
            }
          }
          .status{
            // background: pink;
            width:74px;
            display:flex;
            flex-direction:column;
            justify-content:space-around;
          }
        }
        &:hover{
          border:1px solid #0094ff;
          background:#262c3c;
          // transform:scale(1.1,1.1);
        }
      }
    }
  }
}
</style>
<style>
  .el-picker-panel{
    background:#252c40 !important;
  }
  .scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .rowScrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
</style>
