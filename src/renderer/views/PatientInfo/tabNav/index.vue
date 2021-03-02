<template>
  <div class="tab-nav">
    <el-scrollbar ref="scrollbar">
      <ul>
        <li
          v-for="item in navList"
          :key="item.index"
          @click="handleClick(item)"
        >
          <div :class="{ isActive: item.index === navIndex }">
            {{ item.label }}
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
import request from '@/utils/requestForMock'
import { getDocumentsList } from '@/api/medicalDocument'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('Base')
export default {
  data () {
    return {
      documentsList: []
    }
  },
  computed: {
    ...mapState(['procedureState']),
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
              templateId: item.templateId,
              rescueMode: item.rescueMode,
              pageInfo: item.pageInfo,
              syncHis: item.syncHis,
              opePhase: item.opePhase,
              buttonConfig: item.buttonConfig
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
  watch: {
    procedureState: {
      async handler (val) {
        await this.getDocumentsList()
        this.handleClick(this.navList[0])
      }
    }
  },
  async created () {
    await this.getDocumentsList()
    this.handleClick(this.navList[0])
    this.$refs.scrollbar.update()
  },
  methods: {
    handleClick (item) {
      this.$router.push(item.path)
    },
    getDocumentsList () {
      if (this.procedureState === '') return
      return request({
        method: 'get',
        url: `${getDocumentsList}/${this.procedureState}`
      })
        .then(res => {
          if (res.data && res.data.success) {
            this.documentsList = res.data.data.isUse.map(item => {
              return {
                label: item.templateName,
                templateId: item.templateCode,
                rescueMode: item.rescueMode,
                pageInfo: item.pageInfo,
                syncHis: item.syncHis,
                opePhase: item.opePhase,
                buttonConfig: item.params
              }
            })
          }
        })
        .catch(e => {})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme';
.tab-nav {
  width: 100%;
  margin-top: 18px;
  @include theme-property('box-shadow', $box-shadow-card);
  border-radius: 5px;
  @include theme-property('background', $color-background-navigation);
  @include theme-property('color', $color-text-regular);
  width: 100%;

  ul {
    display: flex;
    flex-wrap: nowrap;

    li {
      line-height: 40px;
      cursor: pointer;
      padding: 5px 15px;
      font-size: 14px;

      & > div {
        line-height: 30px;
        height: 30px;
        white-space: nowrap;
        padding: 0 5px;

        &.isActive {
          @include theme-property('color', $color-text-primary);
          border-bottom: 2px solid;
          @include theme-property('border-color', $color-text-primary);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
