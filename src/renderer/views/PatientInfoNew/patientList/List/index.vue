<template>
  <div class="list">
    <ul>
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <li
          v-for="(item,index) in opeList"
          :key="index"
        >
          <div class="list-top">
            <div>
              <i
                class="el-icon-s-home"
                style="color:#144177;"
              />
              <span>手术室 <span>{{ item.opeRoom }}</span></span>
            </div>
            <div class="status">
              手术开始
            </div>
          </div>
          <div class="list-content">
            <div class="room">
              {{ item.room }}
            </div>
            <div class="info">
              <p>患者 <span>{{ item.patientName }}</span> <span>{{ item.cardNo }}</span> 住院号 <span>{{ item.bedNo }}</span></p>
              <p>手术 <span>{{ item.opeName }}</span></p>
              <p>时间 <span>{{ item.datetime }}</span></p>
              <p>术者 <span>{{ item.doctor }}</span> 麻醉 <span>{{ item.anaesName }}</span></p>
            </div>
          </div>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>
<script>
import { opeList } from '@/api/patientInfo'
export default {
  name: 'List',
  data () {
    return { opeList: [] }
  },
  methods: {
    getOpeList () {
      this.$http({
        url: opeList()
      }).then(res => {
        const data = res.data.data
        this.opeList = data
      })
    }
  },
  mounted () {
    this.getOpeList()
  }
}
</script>
<style lang="scss" scoped>
    .list{
        font-size: 14px;
        height: 100%;
        flex:1;
        // padding-bottom:80px;
        ul {
            height: 100%;
            li{
                // margin-bottom:5px;
                .list-top{
                    display: flex;
                    padding-left:5px;
                    justify-content: space-between;
                    line-height: 26px;
                    border-top:1px solid #f8f9fa;
                    border-bottom:1px solid #f8f9fa;
                    span>span{
                        color:#15428b;
                    }
                    .status{
                        margin-right:15px;
                        color:#000;
                        font-weight: 600;
                    }
                }
                .list-content{
                    padding:5px 5px;
                    display: flex;
                    .room{
                        width: 100px;
                        height:80px;
                        // background:rgba(64, 153, 240, 09);
                        // background:#4169e1;
                        background:#409EFF;
                        color:#fff;
                        text-align: center;
                        font-size: 16px;
                        line-height:80px ;
                    }
                    .info{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        p{
                            margin:unset;
                            font-size:14px;
                            padding-left:5px;
                            span{
                                color:#15428b;
                            }
                            &:first-child{
                                // background:#000
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style>
.list .scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
