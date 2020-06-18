<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="content">
        <div class="left">
          <ul>
            <li
              v-for="(item,index) in basicData"
              :key="index"
              @click="handleChange(item,index)"
            >
              <span>{{ index }}</span>
              <span :class="{'active':activeIndex === index}">{{ itemName(item) }}</span>
            </li>
          </ul>
          <div class="option">
            <el-button
              size="mini"
              @click="handleAdd"
            >
              新增
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete"
            >
              删除
            </el-button>
          </div>
        </div>
        <div class="right">
          <ul v-show="basicData.length > 0">
            <li
              v-for="(item,key) of detailData"
              :key="key"
            >
              <span>{{ key }}</span>
              <el-input
                type="text"
                v-if="key !== 'collection'"
                v-model="detailData[key]"
                size="mini"
              />
              <el-input
                size="mini"
                disabled
                v-if="key === 'collection'"
              >
                <el-button
                  slot="append"
                  icon="el-icon-setting"
                  @click="handleShowCollection(detailData[key])"
                />
              </el-input>
            </li>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="handleClose"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: null
    }
  },
  props: {
    title: {
      type: String
    },
    textList: {
      type: Array
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    basicData: {
      type: Array
    },
    detailData: {
      type: Object
    }
  },
  computed: {
    itemName (param) {
      return function (param) {
        return param[this.textList[0]]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handleAdd () {
      this.$emit('handleAdd')
    },
    handleDelete () {
      this.$emit('handleDelete', this.activeIndex)
      this.activeIndex = this.activeIndex - 1
    },
    handleShowCollection (param) {
      this.$emit('handleShow', param)
    },
    handleChange (item, index) {
      this.activeIndex = index
      this.$emit('handleChange', item)
    },
    handleSubmit () {
      this.$emit('handleSubmit')
    }
  }
}
</script>
<style lang="scss" scoped>
  .content{
    display: flex;
    .left{
      flex: 1;
      height: 400px;
      position:relative;
      border-right: 1px solid #f8f9fa;
      ul{
        li{
          cursor: pointer;
          display: flex;
          line-height: 28px;
          border-bottom:1px solid #f8f9fa;
          span{
            &:first-child{
              background:#f8f9fa;
              width:30px;
              text-align: center;
            }
            &:last-child{
              flex: 1;
            }
          }
          span.active{
            background:#409EFF;
          }
        }
      }
      .option{
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        text-align: center;
      }
    }
    .right{
      flex: 1;
      height: 400px;
      ul{
        li{
          line-height:22px;
        }
      }
    }
  }
</style>
