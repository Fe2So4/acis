<template>
  <div class="signs-data">
    <div class="title">
      体征数据
    </div>
    <ul>
      <li
        v-for="(item,index) in signsList"
        :key="index"
      >
        <p :style="{color:item.color}">
          {{ item.name }}
        </p>
        <p :style="{color:item.color}">
          {{ item.value }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      signsList: []
    }
  },

  methods: {

  },
  mounted () {
    axios({
      url: 'http://localhost:3334/mock/signs'
    }).then(res => {
      const data = res.data
      this.signsList = data.data
    //   console.log(res.data.data)
    })
  }
}
</script>
<style lang="scss" scoped>
    .signs-data{
        width: 100%;
        height: 100%;
        .title{
            font-size: 14px;
            line-height: 26px;
            padding-left: 5px;
            background: #f8f9fa;
        }
        ul {
            background:#000;
            height: calc(100% - 26px);
            padding-top: 10px;
            li{
                p{
                    font-size: 16px;
                    font-weight: 600;
                    margin:0;
                    line-height: 26px;
                    padding:0 10px;
                    &:first-child{
                        text-align: left;
                    }
                    &:last-child{
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
