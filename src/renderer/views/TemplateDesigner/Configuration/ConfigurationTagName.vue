<template>
  <div>
    <el-form-item label="标签名">
      <el-select
        :value="value"
        placeholder="请选择标签名"
        @change="onChange"
        clearable
        filterable
        :filter-method="(val) => filterMethod(val,'filterText')"
      >
        <el-option
          v-for="item in filteredList"
          :key="item.tagName"
          :label="item.tagName"
          :value="item.tagName"
        >
          <span>
            {{ item.tagName }}
            <strong>（{{ item.name }}）</strong>
          </span>
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { getTagNamesList } from '@/api/medicalDocument'
export default {
  name: 'ConfigurationTagName',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      filterText: ''
    }
  },
  computed: {
    filteredList () {
      return this.list.filter(
        item => item.name.indexOf(this.filterText) !== -1
      )
    }
  },
  async created () {
    await this.getTagNamesList()
  },
  methods: {
    onChange (currentValue, oldValue) {
      this.filterText = ''
      this.$emit('change', {
        tagName: currentValue
      })
    },
    getTagNamesList () {
      return request(getTagNamesList)
        .then(res => {
          this.list = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    filterMethod (val, fieldName) {
      this[fieldName] = val
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
