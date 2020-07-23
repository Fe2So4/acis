<template>
  <div
    class="widgetInput"
    :style="[
      noTableNameStyle,
      dataSourceAlertStyle,
      dictionarySourceAlertStyle
    ]"
  >
    <input
      class="input"
      type="text"
      :style="widgetStyle"
      :placeholder="configuration.placeholder"
      :readonly="configuration.readonly"
      :value="configuration.value"
      @input="onInput"
      @[showSelectEvent]="showSelect"
    >
    <el-select
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
import request from '@/utils/requestForMock'
import {
  validateDataSourceMixin,
  validateDictionarySourceMixin
} from './mixin'
export default {
  name: 'WidgetInput',
  mixins: [
    validateDataSourceMixin,
    validateDictionarySourceMixin
  ],
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
  watch: {
    configuration: {
      deep: true,
      handler: function (val) {
        this.setStyle()
      }
    }
  },
  data () {
    return {
      widgetStyle: {},
      showSelectEvent: 'click',
      selectVisible: false,
      options: []
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
    onSelectChange (val) {
      // 标志已被修改过
      this.configuration.dirty = true
      if (this.configuration.multiSelect) {
        this.configuration.value = val.join(',')
      } else {
        this.configuration.value = val
      }
    },
    onInput (e) {
      // 标志已被修改过
      this.configuration.dirty = true
      this.configuration.value = e.target.value
    }
  }
}
</script>
<style lang="scss" scoped>
.widgetInput {
  width: 100%;
  height: 100%;
  position: relative;
  .input {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
  }
  .select {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .select ::v-deep .el-input {
    height: 100%;
  }
  .select ::v-deep .el-input__inner {
    height: 100%;
    background: transparent;
    opacity: 0;
  }
  .select ::v-deep .el-select__tags,
  .select ::v-deep .el-input__suffix {
    display: none;
  }
}
</style>
