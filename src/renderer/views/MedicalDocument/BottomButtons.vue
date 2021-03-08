<template>
  <div class="bottomButtons">
    <div
      class="buttons leftButtons"
      v-if="hasPagination"
    >
      <div>第{{ +pageIndex + 1 }}页</div>
      <div>共{{ totalPage }}页</div>
      <div
        class="button"
        @click="$emit('change-page', 0)"
      >
        <div class="iconfont icon-shouye" />
        <div class="text">
          首页
        </div>
      </div>
      <div
        class="button"
        @click="pageUp"
      >
        <div class="iconfont icon-shangyiye rotate" />
        <div class="text">
          上一页
        </div>
      </div>
      <div
        class="button"
        @click="pageDown"
      >
        <div class="iconfont icon-xiayiye rotate" />
        <div class="text">
          下一页
        </div>
      </div>
      <div
        class="button"
        @click="$emit('change-page', totalPage - 1)"
      >
        <div class="iconfont icon-last rotate" />
        <div class="text">
          末页
        </div>
      </div>
    </div>
    <div class="buttons rightButtons">
      <!--      <div
        class="button red"
        v-if="hasSwitchRescueModeButton && !isRescueMode"
        @click="$emit('change-rescue-mode', true)"
      >
        抢救模式
      </div>
      <div
        class="button"
        v-if="hasSwitchRescueModeButton && isRescueMode"
        @click="$emit('change-rescue-mode', false)"
      >
        普通模式
      </div>-->
      <!-- <div
        class="button"
        @click="$emit('print-all')"
      >
        集中打印
      </div> -->
      <div
        class="button"
        @click="$emit('print')"
        v-show="displayedButtons.includes('PRINT')"
      >
        打印
      </div>
      <!-- <div
        class="button"
        :class="upLoadButtonName === '上传中' ? 'red' : ''"
        @click="uploadBefore"
        v-show="displayedButtons.includes('UPLOAD')"
      >
        {{ this.upLoadButtonName }}
      </div> -->
      <div
        class="button"
        @click="$emit('refresh')"
      >
        刷新
      </div>
      <div
        class="button"
        @click="$emit('save')"
        v-show="displayedButtons.includes('SAVE')"
      >
        保存
      </div>
      <div
        class="button"
        @click="$emit('configure')"
        v-show="displayedButtons.includes('CONFIG')"
      >
        配置
      </div>
    </div>
  </div>
</template>

<script>
import $bus from '@/utils/bus'
import utilsDebounce from '@/utils/utilsDebounce'
import request from '@/utils/requestForMock'
import { acisUploadWritWright } from '@/api/blood'

export default {
  name: 'BottomButtons',
  props: {
    operationId: {
      type: String,
      default: ''
    },
    rescueMode: {
      type: [String, Number],
      default: ''
    },
    pageInfo: {
      type: [String, Number],
      default: ''
    },
    isRescueMode: {
      type: Boolean,
      default: false
    },
    totalPage: {
      type: [Number, String],
      default: 1
    },
    pageIndex: {
      type: [Number, String],
      default: 0
    },
    displayedButtons: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // upLoadButtonName: '上传'
    }
  },
  computed: {
    // 是否可以开启抢救模式
    hasSwitchRescueModeButton () {
      return !!+this.rescueMode
    },
    hasPagination () {
      return !!+this.pageInfo
    }
  },
  mounted () {
    $bus.$on('changeShuaxin', () => {
      this.$emit('refresh', '1')
    })
    // this.$electron.ipcRenderer.on('upLoadEnd', (event, res) => {
    //   console.log(res)
    //   utilsDebounce(() => {
    //     this.upLoadEndPDF(res)
    //   }, 1000)
    // })
  },

  methods: {
    uploadBefore () {
      // 发送
      let flag
      if (this.displayedButtons.includes('ANES')) {
        flag = '0'
      } else if (this.displayedButtons.includes('ANAB')) {
        flag = '1'
      }
      return request({
        url: acisUploadWritWright + `/${this.operationId}/${flag}`,
        method: 'get'
      }).then(res => {
        console.log(res)
        if (res.data.code === 200 && res.data.data === 1) {
          console.log('判断是否可以上传')
          this.clickUpload()
        } else {
          this.$message.error('当前患者状态不可上传文件')
        }
      })
    },
    clickUpload () {
      // if (this.upLoadButtonName === '上传中') {
      //   this.$message.warning('文件上传中,请等待')
      //   return false
      // } else {
      //   this.upLoadButtonName = '上传中'
      // }
      utilsDebounce(() => {
        this.$emit('upload')
      }, 1000)
    },
    // upLoadEndPDF (res) {
    //   if (res === '1') {
    //     this.$message.success('文件上传成功')
    //   } else {
    //     this.$message.error('文件上传失败')
    //   }
    //   this.upLoadButtonName = '上传'
    // },
    pageUp () {
      const pageIndex = +this.pageIndex
      if (pageIndex > 0) {
        this.$emit('change-page', pageIndex - 1)
      }
    },
    pageDown () {
      const pageIndex = +this.pageIndex
      if (pageIndex < this.totalPage - 1) {
        this.$emit('change-page', pageIndex + 1)
      }
    }
  },
  beforeDestroy () {
    $bus.$off('upLoadEnd')
    $bus.$off('changeShuaxin')
  }
}
</script>
<style lang="scss" scoped>
@import url('./iconfont/iconfont.css');
@import '@/styles/theme';
.red {
  color: red;
  font-weight: 600;
}
$background: (
  dark-blue: #181c28,
  dark-gray: #363638,
  light-white: #f8f8f8
);
.bottomButtons {
  position: absolute;
  bottom: 0;
  left: -20px;
  right: -20px;
  height: 36px;

  padding: 4px 0;
  @include theme-property('background', $background);
  @include theme-property('box-shadow', $box-shadow-card);
  @include theme-property('color', $color-text-regular);
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  vertical-align: baseline;

  .buttons {
    display: flex;
    & > div {
      line-height: 28px;
      padding: 0 20px;
      &.button {
        cursor: pointer;
        &:hover {
          @include theme-property('color', $color-regular-light);
        }
      }
      &.red {
        color: #ff3f5a;
        // &:hover {
        //   color: #ff0000;
        // }
      }
    }
  }

  .leftButtons {
    float: left;
    & > div {
      border-right: 1px solid;
      @include theme-property('border-color', $border-color-basic);
    }
  }
  .rightButtons {
    float: right;
    & > div {
      border-left: 1px solid;
      @include theme-property('border-color', $border-color-basic);
    }
  }
  .iconfont {
    display: inline-block;
    position: relative;
    top: 2px;
    &.rotate {
      transform: rotate(90deg);
    }
  }
  .text {
    display: inline-block;
  }
}
</style>
