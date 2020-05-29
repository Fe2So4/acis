<template>
  <div class="overview">
    <ul>
      <li
        v-for="(item,index) in 15"
        :key="index"
      >
        <div class="top">
          <span>11111111000</span>
          <span>黄飞鸿</span>
          <span>入复苏室</span>
        </div>
        <div class="content">
          <div class="room">
            13
          </div>
          <div class="info">
            <p>麻醉：哈哈哈</p>
            <p>医生：张可可</p>
            <p>时间：{{ 2020-5-29 }}</p>
            <p>术名：澳康达较大交大</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
    .overview{
      height:100%;
      font-size:12px;
      // background:#f8f9fa;
      ul{
        height:100%;
        padding:10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        justify-content: space-around;
        li{
          // width: 200px;
          margin-bottom: 10px;
          border-radius:5px;
          background: #f8f9fa;
          box-sizing: border-box;
          box-shadow: 0 0 5px #f8f9fa;
          .top{
            display: flex;
            // background:;
            justify-content: space-between;
            padding:5px 5px;
          }
          .content{
            display: flex;
            background:#fff;
            .room{
              text-align: center;
              font-size: 30px;
              color: #cd5c5c;
              font-weight: 600;
              width: 50px;
              line-height:80px;
              // display: flex;
              // justify-items: center;
            }
            .info{
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              p{
                margin:unset;
              }
            }
          }
        }
      }
    }
</style>
<style>
  .overview .scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
