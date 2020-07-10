<template>
  <div class="overview">
    <el-scrollbar
      style="height:100%;"
      class="scrollbar"
    >
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="handleJump(item)"
        >
          <div class="title">
            <span>手术室 {{ item.room }}</span>
            <span>{{ item.opeStatus }}</span>
          </div>
          <div class="content">
            <div
              class="room"
              v-if="item.opeStatus === '入复苏室'"
            >
              <span>{{ item.room }}</span>
            </div>
            <div class="info">
              <p>患者 <span>{{ item.name }}</span> <span>{{ item.opeId }}</span> <span>{{ item.hospitalNo }}</span></p>
              <p>手术 <span>{{ item.opeName }}</span></p>
              <p>时间 <span>{{ item.time }}</span></p>
              <p>术者 <span>{{ item.doctor }}</span> 麻醉 <span>{{ item.anaesDoctor }}</span></p>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    handleJump (item) {

    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
    .overview{
      height:100%;
      font-size:14px;
        ul{
          display: grid;
          grid-template-columns: repeat(auto-fill, 392px);
          grid-column-gap: 20px;
          grid-row-gap: 20px;
          padding:12px;
          justify-content: center;
          li{
            box-shadow:0px 0px 12px 3px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            border-radius:5px;
            padding:0 0 14px 0;
            background:#181C27;
            border:1px solid #181c27;
            // width: 464px;
            height:164px;
            font-size:14px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s;
            .title{
              display: flex;
              justify-content: space-between;
              span{
                // color:#7f85a9;
                color:#FFFFFF;
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
                  width: 100%;
                  height:46px;
                  display: block;
                  line-height:46px;
                  font-size:32px;
                  font-weight:bold;
                  color: #fff;
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
                width:74px;
                display:flex;
                flex-direction:column;
                justify-content:space-around;
              }
            }
            &:hover{
              border:1px solid #0094ff;
              background:#262c3c;
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
