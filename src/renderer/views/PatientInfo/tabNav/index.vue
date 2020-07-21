<template lang="pug">
  .tab-nav
    el-scrollbar(class="rowScrollbar")
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
      documentsList: []
    }
  },
  computed: {
    navIndex () {
      return this.$route.params.templateId || 0
    },
    navList () {
      const navs = this.documentsList.map((item, index) => {
        return {
          index: item.templateId,
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
  },
  methods: {
    handleClick (item) {
      this.$router.push(item.path)
    },
    getDocumentsList () {
      return request({
        method: 'POST',
        url: getDocumentsList
      }).then(
        res => {
          if (res.data.data) {
            this.documentsList = res.data.data.map(item => {
              return {
                label: item.templateName,
                templateId: item.templateCode
              }
            })
          }
        }
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
.tab-nav {
  width 100%
  margin-top: 18px;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  background: #181C27;
  color: #9BA3D5;
  width: 100%;

  ul {
    // width 100%
    display: flex;
    flex-wrap nowrap
    li {
      line-height: 40px;
      cursor: pointer;
      padding: 5px;
      font-size: 14px;
      // float left
      &>div {
        line-height: 30px;
        height: 30px;
        white-space: nowrap;

        &.isActive {
        color: #0094ff;
        border-bottom: 2px solid #0094ff;
      }
      }
    }
  }
}
</style>
