<template>
  <div>
    <el-form-item label="数据集">
      <el-input
        placeholder="请配置数据"
        v-model="input3"
        class="input-with-select"
        disabled
      >
        <el-button
          slot="append"
          icon="el-icon-setting"
          @click="handleClick"
        />
      </el-input>
    </el-form-item>
    <configuration-collection
      :text-list="textList"
      :title="text1"
      :dialog-visible="dialogVisible"
      :basic-data="basicData"
      :detail-data="detailData"
      @handleClose="handleClose"
      @handleAdd="handleAdd"
      @handleChange="handleChange"
      @handleShow="handleShowCollection"
      @handleDelete="handleDelete"
      @handleSubmit="handleSubmit"
    />
    <!-- <configuration-collection
      :text-list="textList2"
      :title="text2"
      :dialog-visible="showVisible"
      :basic-data="collectionList"
      :detail-data="collectionDetail"
      @handleClose="handleCollectionClose"
      @handleAdd="handleCollectionAdd"
      @handleChange="handleCollectionChange"
    /> -->
  </div>
</template>

<script>
import ConfigurationCollection from '@/components/ConfigurationCollection/index'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      input3: '',
      dialogVisible: false,
      basicData: [],
      detailData: {},
      activeIndex: null,
      showVisible: false,
      collectionList: [],
      collectionDetail: {},
      text1: '配置集合',
      text2: '数据集',
      textList: ['label', 'value'],
      textList2: ['name', 'value'],
      activeIndex2: null
    }
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  watch: {
    value: {
      handler (newVal, old) {
        this.basicData = JSON.parse(JSON.stringify(newVal))
      },
      immediate: true
    }
  },
  components: {
    ConfigurationCollection
  },
  methods: {
    handleCollectionClose (done) {
      this.showVisible = false
    },
    handleShowCollection (param) {
      this.collectionList = param
      this.showVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleClick () {
      this.dialogVisible = true
    },
    handleAdd () {
      const length = this.basicData.length
      const obj = {}
      for (let i = 0; i < this.textList.length; i++) {
        if (this.textList[i] === 'collection') {
          obj[this.textList[i]] = []
        } else {
          obj[this.textList[i]] = `数据项${length + 1}`
        }
      }
      // const obj = { name: `数据项${length + 1}`, value: `数据项${length + 1}`, collection: [] }
      this.basicData.push(obj)
    },
    handleDelete (index) {
      this.basicData.splice(index, 1)
      this.detailData = this.basicData[index - 1]
    },
    handleCollectionAdd () {
      const length = this.collectionList.length
      const obj = {}
      for (let i = 0; i < this.textList2.length; i++) {
        obj[this.textList2[i]] = `数据项${length + 1}`
      }
      // const obj = { name: `数据项${length + 1}`, value: `数据项${length + 1}`, collection: [] }
      this.collectionList.push(obj)
    },
    handleChange (param) {
      this.detailData = param
    },
    handleCollectionChange (param) {
      this.collectionDetail = param
    },
    handleSubmit () {
      this.$emit('change', { collections: this.basicData })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .content{
    display: flex;
    .left{
      flex: 1;
      background: pink;
      height: 400px;
      position:relative;
      ul{
        li{
          cursor: pointer;
          display: flex;
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
      }
    }
    .right{
      flex: 1;
      background: yellowgreen;
      height: 400px;
      ul{
        li{
          line-height:22px;
        }
      }
    }
  }
</style>
