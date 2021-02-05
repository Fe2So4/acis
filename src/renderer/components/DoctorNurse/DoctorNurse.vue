<template>
  <el-select
    :value="value"
    :loading="loading"
    placeholder="请选择"
    clearable
    filterable
    remote
    :remote-method="queryList"
    @change="(val)=> $emit('change', val)"
    ref="select"
    @focus="()=>queryList()"
  >
    <el-option
      v-for="item in list"
      :key="item.userId"
      :label="item.userName"
      :value="item.userId"
      :disabled="disabledList.includes(item.userId)"
    />
  </el-select>
</template>

<script>
import request from '@/utils/requestForMock'
import { getDoctorNurseListPaging } from '@/api/dict'
export default {
  name: 'DoctorNurse',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: [String, Number],
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
      loading: false
    }
  },
  // created () {
  //   this.getData()
  // },
  mounted () {
    const el = this.$refs.select.$refs.scrollbar.wrap
    el.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    const el = this.$refs.select.$refs.scrollbar.wrap
    el.removeEventListener('scroll', this.onScroll)
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
      return this.getDoctorNurseListPaging(this.page, this.query).then(
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
    getDoctorNurseListPaging (start, content) {
      return request({
        url: getDoctorNurseListPaging,
        params: {
          userJob: this.type,
          start,
          size: 20,
          content
        }
      }).then(
        res => {
          if (res.data.success) {
            return res.data.data
          } else {
            return Promise.reject(new Error('获取医护字典失败'))
          }
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
