<template>
  <div class="operation-overview">
    <Overview :list="overviewList" />
  </div>
</template>
<script>
import Overview from '@/components/OperationOverview/index'
export default {
  data () {
    return {
      overviewList: []
    }
  },
  components: {
    Overview
  },
  methods: {
    getOverviewList () {
      this.$http({
        url: 'http://localhost:3334/mock/overview'
      }).then(res => {
        const data = res.data
        this.overviewList = data.data
      })
    }
  },
  mounted () {
    this.$electron.ipcRenderer.send('show-window')
    this.getOverviewList()
  }
}
</script>
<style lang="scss" scoped>
    .operation-overview{

    }
</style>
