<template>
  <div
    class="widgetTextArea"
    :style="[noTableNameStyle, dataSourceAlertStyle]"
  >
    <textarea
      class="textarea"
      :style="widgetStyle"
      :value="configuration.value"
      :placeholder="configuration.placeholder"
      :readonly="configuration.readonly"
      @input="onInut"
      @[showSelectEvent]="showSelect"
    />
    <el-select
      popper-class="selectOption"
      v-if="selectVisible"
      ref="select"
      class="select"
      :value="selectValue"
      @change="onSelectChange"
      size="mini"
      filterable
      collapse-tags
      :placeholder="configuration.placeholder"
      @visible-change="onOptionVisibleChange"
      :multiple="configuration.multiSelect"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>
<script>
import { getDictionaryData } from '@/api/medicalDocument'
import { validateDataSourceMixin } from './mixin'
import request from '@/utils/requestForMock'
export default {
  name: 'WidgetTextarea',
  mixins: [validateDataSourceMixin],
  props: {
    configuration: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectValue () {
      if (this.configuration.multiSelect) {
        if (this.configuration.value === '') {
          return []
        }
        return this.configuration.value.split(',')
      } else {
        return this.configuration.value
      }
    }
  },
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    }
    // selectValue: {
    //   handler: function (val) {
    //     this.selectVisible = false
    //   }
    // }
  },
  data () {
    return {
      selectVisible: false,
      showSelectEvent: 'dblclick',
      widgetStyle: {}
    }
  },
  created () {
    this.setStyle()
  },
  methods: {
    setStyle () {
      const { font, border } = this.configuration
      let styleObj = {
        fontSize: font.size + 'pt',
        fontWeight: font.weight,
        lineHeight: font.lineHeight + 'px',
        color: font.color,
        textAlign: font.textAlign,
        textIndent: font.textIndent + 'pt'
      }
      const borderObj = border.position.reduce((obj, item) => {
        obj['border-' + item] = border.width + 'px solid ' + border.color
        return obj
      }, {})

      styleObj = { ...styleObj, ...borderObj }
      this.widgetStyle = styleObj
    },
    async showSelect (e) {
      if (this.editMode) {
        return
      }
      const {
        dictTableName,
        dictClassName,
        dictRelationName,
        conditionClassNameId
      } = this.configuration.dictionarySource
      if (
        dictTableName &&
        dictClassName &&
        dictRelationName &&
        conditionClassNameId
      ) {
        await this.getDictionaryData(
          dictTableName,
          dictClassName,
          dictRelationName,
          conditionClassNameId
        )
        this.selectVisible = true
        setTimeout(() => {
          this.$refs.select.focus()
        })
      }
    },
    onSelectChange (val) {
      this.selectVisible = false
      // 标志已被修改过
      this.configuration.dirty = true
      if (this.configuration.multiSelect) {
        this.configuration.value = val.join(',')
      } else {
        this.configuration.value = val
      }
    },

    onOptionVisibleChange (visible) {
      if (!visible) {
        this.selectVisible = false
      }
    },
    getDictionaryData (
      dictTableName,
      dictClassName,
      dictRelationName,
      conditionClassNameId
    ) {
      return request({
        method: 'POST',
        url: getDictionaryData,
        params: {
          tableName: dictTableName,
          className: dictClassName,
          showContent: conditionClassNameId,
          detailId: dictRelationName
        }
      }).then(res => {
        this.options = res.data.data
      })
    },
    onInut (e) {
      this.configuration.dirty = true
      this.configuration.value = e.target.value
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetTextArea {
  width: 100%;
  height: 100%;
  .textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
    resize: none;
  }
  .el-select {
    opacity: 0;
  }
}
</style>
<style>
.selectOption {
  max-width: 400px !important;
}
</style>
