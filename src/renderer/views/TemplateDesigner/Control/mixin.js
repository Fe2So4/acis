const warningStyle = {
  outline: '2px solid #ff00ac',
  'outline-offset': '0'
}
const errorStyle = {
  outline: '4px solid red',
  'outline-offset': '2px'
}
export const validateDataSourceMixin = {
  computed: {
    noTableNameStyle () {
      let style = {}
      if (this.editMode && this.configuration.dataSource) {
        const { tableName } = this.configuration.dataSource
        if (!tableName) {
          style = warningStyle
        }
      }
      return style
    },
    dataSourceAlertStyle () {
      let style = {}
      if (this.editMode && this.configuration.dataSource) {
        const { tableName, className } = this.configuration.dataSource
        if (!tableName && !className) {
        } else if (tableName && className) {
        } else {
          style = errorStyle
        }
      }
      return style
    }
  }
}

export const validateDictionarySourceMixin = {
  computed: {
    dictionarySourceAlertStyle () {
      let style = {}
      if (this.editMode && this.configuration.dictionarySource) {
        const {
          dictTableName,
          dictClassName,
          dictRelationName
        } = this.configuration.dictionarySource
        if (!dictTableName && !dictClassName && !dictRelationName) {
        } else if (dictTableName && dictClassName && dictRelationName) {
        } else {
          style = errorStyle
        }
      }
      return style
    }
  }
}
