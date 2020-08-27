<template>
  <div class="bedList">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="onBedClick(item)"
        >
          <div class="title">
            <span>{{ item.operationConditionName || '空闲' }}</span>
          </div>
          <div class="content">
            <div class="room">
              <div>{{ item.bedNum }}</div>
            </div>
            <div
              class="info"
              v-show="item.operationConditionName"
            >
              <p>
                患者
                <span>{{ item.patientName }}</span>
                <span>{{ item.patientId }}</span>
                <span>{{ item.hospitalNum }}</span>
              </p>
              <p>
                手术
                <span>{{ item.opeNameAfter }}</span>
              </p>
              <p>
                时间
                <span>{{ item.operStartTime }}</span>
              </p>
              <p>
                术者
                <span>{{ item.surgeon }}</span>
                麻醉
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
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('Base')
export default {
  name: 'BedList',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden'
      }
    ])
    return {
      wrapStyle
    }
  },
  computed: {
    ...mapState(['patientId'])
  },
  methods: {
    onBedClick (item) {
      if (!item.patientId) {
        this.$emit('select-bed', item)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/styles/theme";

  .bedList {
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
        // width: 464px;
        min-height: 164px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        transition: all 0.3s;

        .title {
          display: flex;
          justify-content: space-between;

          span {
            @include theme-property("color", $color-text-secondary);
            padding: 0 10px;
            line-height: 28px;

            &:last-child {
              @include theme-property("color", $color-text-primary);
            }
          }
        }

        .content {
          flex: 1;
          display: flex;

          .room {
            flex: 1 0 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
              width: 100%;
              height: 46px;
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
              @include theme-property("color", $color-text-regular);

              span {
                @include theme-property("color", $color-text-secondary);
                line-height: 28px;
              }
            }
          }
        }

        &.actived {
          @include theme-property("background", $color-background-card-hover);
        }

        &.disabled {
          cursor: not-allowed;
        }

        &:not(.disabled):hover {
          @include theme-property("background", $color-background-card-hover);
        }
      }
    }
  }
</style>
