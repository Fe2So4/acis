<template>
  <div class="patient-list">
    <Search />
    <List />
    <Pagination />
  </div>
</template>
<script>
import List from './List/index'
import Pagination from './Pagination/index'
import Search from './Search/index'
export default {
  name: 'PatientList',
  data () {
    return {
    }
  },
  components: {
    List, Pagination, Search
  }
}
</script>
<style lang="scss" scoped>
    .patient-list{
        height: 100%;
        width:30%;
        border-right: 1px solid #144177;
        box-sizing: border-box;
        position:relative;
        overflow: hidden;
        padding:0 0 106px 0;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        }
</style>
