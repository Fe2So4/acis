<template>
  <div class="overview">
    <el-scrollbar
      style="height:100%;"
      :wrap-style="wrapStyle"
      ref="scrollbar"
    >
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
        >
          <div class="title">
            <span>手术室 {{ item.roomNo }}</span>
            <span>{{ item.stateName }}</span>
          </div>
          <div class="content">
            <div
              class="room"
              v-if="showRoom"
            >
              <span>{{ item.roomNo }}</span>
            </div>
            <div class="info">
              <p>
                患者
                <span>{{ item.patientName }}</span>
                <span>{{ item.patientId }}</span>
                <span>{{ item.visitId }}</span>
              </p>
              <p>
                手术
                <span>{{ item.opeName }}</span>
              </p>
              <p>
                时间
                <span>{{ item.opeScheduleTime }}</span>
              </p>
              <p>
                术者
                <span>{{ item.surgeon }}</span> 麻醉
                <span>{{ item.anaesDocName }}</span>
              </p>
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
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ]
    }
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    showRoom: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.addScrollListener()
  },
  beforeDestroy () {
    this.removeScrollListener()
  },
  methods: {
    onScroll (e) {
      const el = this.$refs.scrollbar.wrap
      if (el.scrollTop + el.clientHeight + 10 > el.scrollHeight) {
        this.$emit('touch-bottom')
      }
    },
    addScrollListener () {
      const el = this.$refs.scrollbar.wrap
      el.addEventListener('scroll', this.onScroll)
    },
    removeScrollListener () {
      const el = this.$refs.scrollbar.wrap
      el.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>
<style lang="scss" scoped>
.overview {
  height: 100%;
  font-size: 14px;
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, 392px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding: 12px;
    justify-content: center;
    li {
      box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      border-radius: 5px;
      padding: 0 0 14px 0;
      background: #181c27;
      border: 1px solid #181c27;
      // width: 464px;
      height: 164px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;
      .title {
        display: flex;
        justify-content: space-between;
        span {
          // color:#7f85a9;
          color: #ffffff;
          padding: 0 10px;
          line-height: 28px;
          &:last-child {
            color: #0094ff;
          }
        }
      }
      .content {
        flex: 1;
        display: flex;
        overflow: hidden;
        .room {
          width: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          span {
            width: 100%;
            height: 46px;
            display: block;
            line-height: 46px;
            font-size: 32px;
            font-weight: bold;
            color: #fff;
            text-align: center;
          }
        }
        .info {
          margin: 0 30px 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            padding: 0;
            margin: 0;
            color: #9ba3d5;
            span {
              color: #d0dae5;
              line-height: 28px;
            }
          }
        }
        .status {
          width: 74px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
      &:hover {
        // border: 1px solid #0094ff;
        background: #262c3c;
      }
    }
  }
}
</style>
