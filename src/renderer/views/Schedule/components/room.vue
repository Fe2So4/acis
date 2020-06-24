<template>
  <div class="room">
    <div class="content">
      <div
        class="allRoom"
        ref="Room"
      >
        <div
          v-for="(item,i) in roomList"
          :key="item.roomNo"
          :class="{'roomItem':true,'roomActive':roomIndex == i}"
          @click="changeRoom(item,i)"
          @contextmenu.stop="showMenu(i)"
        >
          <div class="li-left" />
          <div :class="{'room-id':true,'roomIdActive':roomIndex == i}">
            <div class="circle">
              {{ item.roomNo }}
            </div>
          </div>
          <div class="room-info">
            <el-tooltip
              :content="item.number"
              placement="bottom"
              effect="light"
            >
              <div class="room-info-item">
                手术台数：{{ item.number }} 台
              </div>
            </el-tooltip>
            <el-tooltip
              :content="item.surgeon"
              placement="bottom"
              effect="light"
              :open-delay="2000"
            >
              <div class="room-info-item">
                {{ item.surgeon }}
              </div>
            </el-tooltip>
            <el-tooltip
              :content="item.anesthesiaDoctors"
              placement="bottom"
              effect="light"
              :open-delay="2000"
            >
              <div class="room-info-item">
                {{ item.anesthesiaDoctors }}
              </div>
            </el-tooltip>
            <el-tooltip
              :content="item.nurses"
              placement="bottom"
              effect="light"
              :open-delay="2000"
            >
              <div class="room-info-item">
                {{ item.nurses }}
              </div>
            </el-tooltip>
            <div class="room-info-item">
              <el-tooltip
                :content="item.tip"
                placement="bottom"
                effect="light"
                :open-delay="2000"
              >
                <el-progress
                  :percentage="item.percentage"
                  :show-text="false"
                  color="#87CEEB"
                />
              </el-tooltip>
            </div>
          </div>
          <vue-context-menu
            :context-menu-data="contextMenuData1"
            :transfer-index="transferIndex"
            @submitRoomAll="submitRoomAll"
            @handleClear1="handleClear(1)"
            @handleClear2="handleClear(2)"
            @handleClear3="handleClear(3)"
            @handleClear4="handleClear(4)"
            @handleClear5="handleClear(5)"
            @handleClear6="handleClear(6)"
            @handleClear7="handleClear(7)"
            @handleClear8="handleClear(8)"
            @handleClear9="handleClear(9)"
            @handleChangeRoom="handleChangeRoom(2)"
            @roomConfig="roomConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      roomIndex: 0,
      contextMenuData1: {
        menuName: 'demo',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '设置',
          fnHandler: 'roomConfig'
        },
        {
          btnName: '提交',
          fnHandler: 'submitRoomAll'
        },
        {
          btnName: '清空',
          children: [{
            btnName: '清空全部',
            fnHandler: 'handleClear1'
          },
          {
            btnName: '主麻医师',
            fnHandler: 'handleClear2'
          },
          {
            btnName: '副麻医师1',
            fnHandler: 'handleClear3'
          },
          {
            btnName: '副麻医师2',
            fnHandler: 'handleClear4'
          },
          {
            btnName: '副麻医师3',
            fnHandler: 'handleClear5'
          },
          {
            btnName: '洗手护士1',
            fnHandler: 'handleClear6'
          },
          {
            btnName: '洗手护士2',
            fnHandler: 'handleClear7'
          },
          {
            btnName: '巡回护士1',
            fnHandler: 'handleClear8'
          },
          {
            btnName: '巡回护士2',
            fnHandler: 'handleClear9'
          }
          ]
        },
        {
          btnName: '数据交换',
          fnHandler: 'handleChangeRoom'
        }
        ]
      },
      transferIndex: null
    }
  },
  props: {
    roomList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    changeRoom (item, i) {
      this.roomIndex = i
      this.$emit('changeRoom', item)
    },
    showMenu (index) {
      if (this.roomIndex === index) {
        this.transferIndex = index // tranfer index to child component
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        this.contextMenuData1.axis = {
          x,
          y
        }
      }
    },
    submitRoomAll () {
      this.$emit('submitRoomAll')
    },
    handleClear (index) {
      this.$emit('handleClear', index)
    },
    roomConfig () {
      this.$emit('roomConfig')
    }
  }
}
</script>
<style lang="scss" scoped>
.room{
  height:100%;
  width:100%;
  .content {
      height: 100%;
      // position:relative;
      width: 100%;

      .allRoom {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        // flex-wrap: wrap;
        justify-content: space-around;
        // flex-direction: row;
        overflow-y: auto;
        width: 100%;

        padding-bottom: 10px;
        // position: fixed;
        position: relative;

        .roomItem {
          cursor: pointer;
          width: 200px;
          height: 100px;
          margin-top: 10px;
          display: flex;
          border: 1px solid #f3f6f9;
          border-radius: 6px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;

          .li-left {
            height: 100%;
            width: 6px;
            background: #f3f6f9;
          }

          .room-id {
            width: 80px;
            font-size: 30px;
            color: skyblue;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            .circle {
              height: 60px;
              width: 60px;
              border-radius: 50%;
              border: 1px solid #f3f6f9;
              line-height: 60px;
            }
          }

          .room-info {
            flex: 1;
            font-size: 12px;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .room-info-item {
              width: 110px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;

              &:last-child {
                line-height: 18px;
                height: 18px;
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: center;

                .el-progress {
                  width: 80%;
                }
              }
            }
          }

          .roomIdActive {
            color: #fff;
          }
        }

        // .layout {
        //   visibility: hidden;
        // }

        .roomActive {
          background: #1DAEF4;
          color: #fff;
        }
      }
  }
}
</style>
