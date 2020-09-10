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
          <div
            class="content"
            :class="{empty: item.stateName == '空闲'}"
          >
            <div
              class="room"
              :class="{empty: item.stateName == '空闲'}"
            >
              <div>{{ item.roomNo }}</div>
            </div>
            <div
              class="info"
              v-show="item.stateName !== '空闲'"
            >
              <p>
                患者
                <span>{{ item.patientName }}</span>
                <span>{{ item.patientId }}</span>
                <span>{{ item.visitId }}</span>
              </p>
              <p>
                手术
                <span>{{ item.opeNameBefore }}</span>
              </p>
              <p>
                时间
                <span>{{ item.opeScheduleTime }}</span>
              </p>
              <p>
                术者
                <span>{{ item.surgeon }}</span> 麻醉
                <span>{{ item.anesDoc }}</span>
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
  name: 'RoomList',
  data () {
    return {
      wrapStyle: [
        {
          height: 'calc(100% + 18px)',
          width: 'calc(100% + 18px)'
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
@import "@/styles/theme";

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
      @include theme-property("box-shadow", $box-shadow-card);
      cursor: pointer;
      border-radius: 5px;
      padding: 0 0 14px 0;
      @include theme-property("background", $color-background-card);
      min-height: 164px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s;

      .title {
        display: flex;
        justify-content: space-between;

        span {
          // color:#7f85a9;
          @include theme-property("color", $color-text-card-title);
          padding: 0 10px;
          line-height: 28px;

          &:last-child {
            font-weight: bold;
            @include theme-property("color", $color-text-primary);
          }
        }
      }

      .content {
        flex: 1;
        display: flex;
        overflow: hidden;
        &.empty {
          justify-content: center;
        }

        .room {
          flex: 0 0 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          div {
            height: 46px;
            display: block;
            line-height: 46px;
            @include card-room;
            border-radius: 0px 23px 23px 0px;
            font-size: 26px;
            font-weight: bold;
            color: #fff;
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
          &.empty {
            div {
              border-radius: 23px;
            }
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
            @include theme-property("color", $color-text-regular);

            span {
              @include theme-property("color", $color-text-secondary);
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
        @include theme-property("background", $color-background-card-hover);
      }
    }
  }
}
</style>
