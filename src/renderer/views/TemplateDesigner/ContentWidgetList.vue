<template>
  <div class="widgetList">
    <el-scrollbar
      style="height:100%"
      :wrap-style="wrapStyle"
    >
      <widget-copiable
        v-for="widget of widgetList"
        :key="widget.name"
        :widget="widget"
      />
      <hr>
      <div
        class="button"
        @click="setPaper"
      >
        设置纸张
      </div>
      <hr>
      <div
        class="button"
        @click="saveTemplate"
      >
        保存
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { updateDocument } from '@/api/medicalDocument'
import WidgetCopiable from './WidgetCopiable'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  'PageTemplateDesigner'
)
export default {
  name: 'ContentWidgetList',
  components: {
    WidgetCopiable
  },
  data () {
    return {
      widgetList: [
        {
          label: '输入框',
          name: 'widget-input'
        },
        {
          label: '文本',
          name: 'widget-text'
        },
        {
          label: '线',
          name: 'widget-line'
        },
        {
          label: '多行文本',
          name: 'widget-textarea'
        },
        {
          label: '多选框组',
          name: 'widget-checkbox-group'
        },
        {
          label: '体征曲线',
          name: 'widget-physical-sign'
        },
        {
          label: '备注',
          name: 'widget-news'
        },
        {
          label: '麻醉用药',
          name: 'widget-anaes-drug'
        },
        {
          label: '输液输血',
          name: 'widget-in-out'
        },
        {
          label: '监测表格',
          name: 'widget-anaes-table'
        },
        {
          label: '图片',
          name: 'widget-image'
        }
      ],
      wrapStyle: [
        {
          'overflow-x': 'hidden',
          padding: '10px'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['templateData']),
    ...mapState({
      templateId: state => state.templateId
    })
  },
  methods: {
    ...mapActions(['showPaperSetting']),
    setPaper () {
      this.showPaperSetting()
    },
    // 保存模板
    saveTemplate () {
      this.$emit('show-template-data', JSON.stringify(this.templateData))
      return request({
        method: 'POST',
        url: updateDocument + `?templateCode=${this.templateId}`,
        data: this.templateData
      }).then(
        res => {
          if (res.data.success) {
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetList {
  // flex: 0 1 200px;
  height: 100%;
  background: #364058;
  overflow: auto;

  hr {
    border-color: #5d709b;
  }

  .button {
    cursor: pointer;
    width: 100px;
    height: 30px;
    background: #f8f8f2;
    line-height: 30px;
    margin: 5px 10px;
    text-align: center;
    border-radius: 4px;
    color: #333;
  }
}
</style>
