<template lang="pug">
  .tab-nav
    ul
      li(v-for="item in navList" :key="item.index" @click="handleClick(item)")
        div(:class="{'isActive': item.index === navIndex}") {{item.label}}
</template>
<script>
export default {
  data () {
    return {
      documentList: [
        {
          label: '术中记录单',
          templateId: 1
        }, {
          label: '术后记录单',
          templateId: 2
        }, {
          label: '啥啥啥文书',
          templateId: 3
        }
      ],
      navIndex: 0
    }
  },
  computed: {
    navList () {
      const navs = this.documentList.map((item, index) => {
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
  created () {
    this.handleClick(this.navList[0])
  },
  methods: {
    handleClick (item) {
      this.navIndex = item.index
      this.$router.push(item.path)
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
