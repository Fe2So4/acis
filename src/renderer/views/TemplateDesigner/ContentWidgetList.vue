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
import { updateDocument, saveTemplateTableInfo } from '@/api/medicalDocument'
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
    const widgetList = Object.freeze([
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
      },
      {
        label: '分页信息',
        name: 'widget-pagination'
      },
      {
        label: '日期时间选择',
        name: 'widget-date-picker'
      },
      {
        label: '表格',
        name: 'widget-table-fj'
      }
    ])
    const wrapStyle = Object.freeze([
      {
        'overflow-x': 'hidden',
        padding: '10px'
      }
    ])
    return {
      widgetList,
      wrapStyle
    }
  },
  computed: {
    ...mapGetters(['templateData']),
    ...mapState({
      templateId: (state) => state.templateId
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

      return Promise.all([this.updateDocument(), this.saveTemplateTableInfo()])
        .then((res) => {
          const success = res.every((res) => res.data && res.data.success)
          if (success) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          } else {
            return Promise.reject(new Error())
          }
        })
        .catch((e) => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },
    updateDocument () {
      return request({
        method: 'post',
        url: updateDocument,
        params: {
          templateCode: this.templateId
        },
        data: this.templateData
      })
    },
    saveTemplateTableInfo () {
      // 过滤出一般控件的表名字段名
      let data = this.templateData.filter(
        (widget) =>
          widget.dataSource &&
          widget.dataSource.tableName &&
          widget.dataSource.className
      )
      data = data.reduce((acc, widget) => {
        if (acc[widget.dataSource.tableName]) {
          acc[widget.dataSource.tableName].add(widget.dataSource.className)
        } else {
          acc[widget.dataSource.tableName] = new Set()
          acc[widget.dataSource.tableName].add(widget.dataSource.className)
        }
        return acc
      }, {})
      // 过滤出表格，将表格中的表名字段名添加到请求集合中
      this.templateData.filter(widget => widget.name === 'widget-table')
        .map(widgetTable => widgetTable.cells)
        .reduce((arr, cells) => {
          return [...arr, ...cells.reduce((acc, cell) => [...acc, ...cell], [])]
        }, [])
        .filter(cell => cell.tableName && cell.className)
        .forEach(cell => {
          if (data[cell.tableName]) {
            data[cell.tableName].add(cell.className)
          } else {
            data[cell.tableName] = new Set()
            data[cell.tableName].add(cell.className)
          }
        })
      Object.keys(data).forEach((key) => {
        data[key] = Array.from(data[key]).join(',')
      })
      return request({
        method: 'post',
        url: saveTemplateTableInfo,
        params: {
          templateCode: this.templateId
        },
        data: data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme";

$background: (
  dark-blue: #364058,
  dark-gray: #353537,
  light-white: #ebecef,
);
.widgetList {
  height: 100%;
  @include theme-property(background, $background);
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
