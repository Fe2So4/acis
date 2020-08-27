<template>
  <div class="scoreSelect">
    <div class="label">
      {{ label }}
    </div>
    <el-select
      size="mini"
      v-model="select"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ScoreSelect',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    label: {
      required: true,
      type: String
    },
    options: {
      required: true,
      type: Array
    }
  },
  computed: {
    select: {
      set (val) {
        this.$emit('change', val)
      },
      get () {
        return this.value
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  @import "@/styles/theme";

  .scoreSelect {
    display: flex;
    line-height: 28px;

    .label {
      @include theme-property('color', $color-text-regular);
      flex: 0 0 130px;
      padding-right: 10px;
      text-align: right;
    }
  }
</style>
