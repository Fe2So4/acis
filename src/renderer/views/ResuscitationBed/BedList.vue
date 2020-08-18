<template>
  <div class="bedList">
    <el-scrollbar
      style="height: 100%"
      :wrap-style="wrapStyle"
    >
      <ul>
        <li
          v-for="item in list"
          :key="item.bedNum"
          @click="onBedClick(item)"
          :class="{disabled: !item.operationConditionName, actived: item.patientId === patientId}"
        >
          <div class="title">
            <span>{{ item.operationConditionName || '空闲' }}</span>
          </div>
          <div
            class="content"
            :class="{empty:!item.operationConditionName}"
          >
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
const { mapState, mapActions } = createNamespacedHelpers('Base')
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
    ...mapActions(['setPatientId']),
    onBedClick (item) {
      if (item.patientId) {
        this.setPatientId(item.patientId)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
      display: flex;
      position: relative;
      box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      border-radius: 5px;
      background: #181c27;
      border: 1px solid #181c27;
      min-height: 164px;
      font-size: 14px;
      transition: all 0.3s;
      .title {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #0093ff;
        font-weight: bold;
        font-size: 14px;
      }
      .content {
        flex: 1;
        display: flex;
        .room {
          display: flex;
          flex-direction: column;
          justify-content: center;
          div {
            height: 46px;
            padding: 0 28px;
            line-height: 46px;
            font-size: 30px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            background: linear-gradient(
              120deg,
              rgba(84, 190, 234, 1),
              rgba(219, 83, 159, 1)
            );
            border-radius: 0 23px 23px 0;
            box-shadow: 0 0 12px 3px #373a44;
          }
        }
        .info {
          padding: 40px 20px 20px 20px;
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
        &.empty {
          justify-content: center;
          .room {
            div {
              border-radius: 23px;
            }
          }
        }
      }
      &.actived {
        border: 1px solid #0094ff;
      }
      &.disabled {
        cursor: not-allowed;
      }
      &:not(.disabled):hover {
        border: 1px solid #0094ff;
        background: #262c3c;
      }
    }
  }
}
</style>
