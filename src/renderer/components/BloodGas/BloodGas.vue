<template>
  <div class="blood-gas">
    <div class="item">
      <div class="name">
        时间:
      </div>
      <el-date-picker
        class="value date-picker"
        v-model="dateTime"
        type="datetime"
        placeholder="选择日期时间"
        :clearable="false"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm:ss"
        popper-class="dateTimePicker"
        size="mini"
      />
    </div>
    <div
      class="item"
      v-for="i of items"
      :key="i.bloodCode"
    >
      <div class="name">
        {{ i.bloodName }}:
      </div>
      <el-input
        class="value"
        size="mini"
        v-model="i.bloodValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BloodGas',
  props: {
    time: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    dateTime: {
      get () {
        return this.time
      },
      set (val) {
        this.$emit('update:time', val)
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme";
.blood-gas {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 250px;
  grid-template-rows: repeat(auto-fill, 30px);
  grid-gap: 20px;
  height: 620px;
  border-radius: 10px;
  padding: 20px;
  line-height: 30px;
  $background: (
    "dark-blue": #1e222e,
    "dark-gray": #363638,
    light-white: #f8f8f8,
  );
  @include theme-property("background", $background);
  .item {
    display: flex;
    .name {
      flex: 80px 0 0;
      text-align: right;
      margin-right: 10px;
      @include theme-property(color, $color-text-regular);
    }
    .value {
      flex: 100px 0 0;
      &.date-picker {
        flex: 170px 0 0;
      }
    }
  }

}
</style>
