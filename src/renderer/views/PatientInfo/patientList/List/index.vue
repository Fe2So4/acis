<template>
  <div class="list">
    <ul>
      <el-scrollbar
        style="height:100%;"
        class="scrollbar"
      >
        <li
          v-for="(item,index) in 15"
          :key="index"
        >
          <div class="list-top">
            <div>
              <i
                class="el-icon-s-home"
                style="color:#144177;"
              />
              <span>手术室 <span>{{ 20 }}</span></span>
            </div>
            <div class="status">
              手术开始
            </div>
          </div>
          <div class="list-content">
            <div class="room">
              02-1
            </div>
            <div class="info">
              <p>患者 <span>路人甲</span> <span>10000000000</span> 住院号 <span>0000204</span></p>
              <p>手术 <span>脑袋向后旋转三周半</span></p>
              <p>时间 <span>2020-05-28 10:55</span></p>
              <p>术者 <span>路人甲</span> 麻醉 <span>土肥原</span></p>
            </div>
          </div>
        </li>
      </el-scrollbar>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'List',
  data () {
    return {
    }
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
