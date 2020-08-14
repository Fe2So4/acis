<template>
  <div class="ope-room">
    <el-scrollbar
      style="height:100%;"
      class="scrollbar"
    >
      <div class="content">
        <div
          class="allRoom"
          ref="Room"
        >
          <div
            v-for="(item,i) in roomList"
            :key="i"
            :class="{'roomItem':true,'roomActive':roomIndex == i}"
            @click="changeRoom(item,i)"
            @contextmenu.stop="showMenu(i)"
          >
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
                    :percentage="item.process"
                    :show-text="false"
                    color="#0094FF"
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
              @handleChangeRoom="handleChangeRoom('2')"
              @roomConfig="roomConfig"
            />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import request from 'src/common/utils/requestForMock'
import { getRoomList } from '@/api/schedule'
import { mapActions } from 'vuex'
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
      transferIndex: null,
      roomList: []
    }
  },
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  computed: {
    // ...mapGetters('Schedule', ['time'])
  },
  mounted () {
    this.getData()
    this.$eventHub.$on('get-room', () => {
      this.getData()
    })
    // this.changeRoom(this.roomList[0])
  },
  methods: {
    ...mapActions('Schedule', ['setCurrentRoom']),
    getData () {
      request({
        url: getRoomList + '/' + this.time
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.tip = item.number + '/' + item.maxCount
          if (item.number === '0') {
            item.process = 0
          } else {
            item.process = (item.number / item.maxCount) * 100
          }
        })
        this.roomList = data
      })
    },
    async changeRoom (item, i) {
      this.roomIndex = i
      await this.setCurrentRoom({ roomNo: item.roomNo, maxCount: item.maxCount, count: item.number })
      // this.$emit('changeRoom', item)
      setTimeout(() => {
        this.$eventHub.$emit('get-allocated')
      })
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
    },
    handleChangeRoom (param) {
      this.$emit('handleChangeRoom', param)
    }
  }
}
</script>
<style lang="scss" scoped>
.ope-room{
  height:calc(100% - 28px);
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
          border-radius: 6px;
          box-sizing: border-box;
          background:#252C40;
          overflow: hidden;
          position: relative;

          .room-id {
            width: 80px;
            font-size: 30px;
            color: #fff;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            .circle {
              width:80px;
              height:30px;
              background:linear-gradient(120deg,rgba(84,190,234,1),rgba(219,83,160,1));
              border-radius:0px 15px 15px 0px;
              line-height: 30px;
              text-shadow:0px 1px 3px rgba(0, 0, 0, 0.2);
              font-size: 18px;
              font-weight: bold;
            }
          }

          .room-info {
            flex: 1;
            font-size: 12px;
            margin-left:20px;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .room-info-item {
              width: 110px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              color:#9BA3D5;

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
          background: #2C3B66;
          color: #fff;
        }
      }
  }
}
</style>
<style lang="scss">
  .ope-room .scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
  }
</style>
