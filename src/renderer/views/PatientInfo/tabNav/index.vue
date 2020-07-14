<template lang="pug">
  .tab-nav
    ul
      li(v-for="item in navList" :key="item.index" @click="handleClick(item)")
        div(:class="{'isActive': item.index === navIndex}") {{item.label}}
</template>
<script>
import request from '@/utils/requestForMock'
import { getDocumentsList } from '@/api/medicalDocument'
export default {
  data () {
    return {
      documentsList: [],
      navIndex: 0
    }
  },
  computed: {
    navList () {
      const navs = this.documentsList.map((item, index) => {
        return {
          index: index + 1,
          label: item.label,
          path: {
            name: 'MedicalDocument',
            params: {
              templateId: item.templateId
            }
          }
        }
      })
      navs.unshift({
        index: 0,
        label: '患者详情',
        path: {
          name: 'PatientDetail'
        }
      })
      return navs
    }
  },
  async created () {
    await this.getDocumentsList()
    this.handleClick(this.navList[0])
    // this.getTestData()
  },
  methods: {
    handleClick (item) {
      this.navIndex = item.index
      this.$router.push(item.path)
      this.$emit('changeRoute')
    },
    getDocumentsList () {
      return request({
        method: 'POST',
        url: getDocumentsList
      }).then(
        res => {
          this.documentsList = res.data.data.map(item => {
            return {
              label: item.templateName,
              templateId: item.templateCode
            }
          })
        }
      )
    },
    getTestData () {
      return request({
        method: 'GET',
        url: 'http://192.168.1.196:8090/acis/intraoperative/info/getAcisIntraoBloodDataInfo',
        params: {
          operationId: 'b0f9d8bda9244397a44cb8ff278937d9',
          startTime: '2020-04-10 09:30:00',
          endTime: '2020-04-10 13:40:00'
        }
      }).then(
        res => { console.log(res) }
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-nav {
  margin-top: 18px;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  background: #181C27;
  color: #9BA3D5;

  ul {
    display: flex;

    li {
      line-height: 40px;
      cursor: pointer;
      padding: 5px;
      font-size: 14px;

      &>div {
        line-height: 30px;
        height: 30px;

        &.isActive {
        color: #0094ff;
        border-bottom: 2px solid #0094ff;
      }
      }
    }
  }
}
</style>
