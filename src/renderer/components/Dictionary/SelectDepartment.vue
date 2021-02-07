<template>
  <el-select
    :value="value"
    :loading="loading"
    placeholder="请选择科室"
    clearable
    filterable
    remote
    :remote-method="queryList"
    @change="(val)=> $emit('change', val)"
    ref="select"
    @focus="onFocus"
  >
    <el-option
      v-for="item in list"
      :key="item.deptCode"
      :label="item.deptName"
      :value="item.deptCode"
      :disabled="disabledList.includes(item.deptCode)"
    />
  </el-select>
</template>

<script>
import request from '@/utils/requestForMock'
import { getDeptList, getDeptList1 } from '@/api/dict'
export default {
  name: 'SelectDepartment',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    disabledList: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      list: [],
      page: 1,
      totalPage: 1,
      query: '',
      loading: false,
      getDefaultData: null,
      onFocus: null
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        if (!oldVal && val) {
          this.getDefaultData(val)
        }
      }
    }
  },
  created () {
    this.getDefaultData = this.createInitialList()
    this.onFocus = this.createFocusHandler()
  },
  mounted () {
    const el = this.$refs.select.$refs.scrollbar.wrap
    el.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    const el = this.$refs.select.$refs.scrollbar.wrap
    el.removeEventListener('scroll', this.onScroll)
    this.getDefaultData = null
    this.onFocus = null
  },
  methods: {
    onScroll (e) {
      const el = this.$refs.select.$refs.scrollbar.wrap
      if (el.scrollTop + el.clientHeight + 10 > el.scrollHeight) {
        if (this.page < this.totalPage) {
          this.page++
          this.getData()
        }
      }
    },
    queryList (query = '') {
      this.query = query
      this.loading = true
      this.page = 1
      this.getData()
    },
    getData () {
      return this.getDeptList(this.page, this.query).then(
        ({ list, isFirstPage, pages }) => {
          if (pages === 0) {
            this.list = []
            this.totalPage = 1
          } else {
            this.totalPage = pages
            if (isFirstPage) {
              this.list = list
            } else {
              this.list = [...this.list, ...list]
            }
          }
        },
        e => {
          this.$message.error(e.message)
        }
      ).finally(
        () => {
          this.loading = false
        }
      )
    },
    // 只对第一次聚焦进行空值搜索-目的是降低初始化查询的次数
    createFocusHandler () {
      let isInitial = true
      return (e) => {
        if (isInitial) {
          isInitial = false
          this.queryList()
        }
      }
    },
    // 只对第一次赋值进行查询-目的是回显选中数据
    createInitialList () {
      let isInitial = true
      return (code) => {
        if (isInitial) {
          return this.getDeptListNoPagination(code).then(
            res => {
              isInitial = false
              this.list = res
            },
            e => {
              this.$message.error(e.message)
            }
          )
        }
      }
    },
    // request
    getDeptList (start, name) {
      return request({
        url: getDeptList1,
        params: {
          start,
          size: 20,
          name
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('获取科室字典失败'))
          }
        }
      )
    },
    getDeptListNoPagination (name) {
      return request({
        url: getDeptList,
        params: {
          name
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('科室字典查询失败'))
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
