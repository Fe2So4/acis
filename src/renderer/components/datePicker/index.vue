<template>
  <div>
    <div
      style="position: absolute; width:100%; height:28px; z-index:1001"
      @click="focusPicker(row, 1)"
    />

    <el-date-picker
      readonly
      v-model="time"
      type="datetime"
      popper-class="dateTimePicker"
      size="mini"
      format="MM-dd HH:mm"
      :clearable="false"
      value-format="yyyy-MM-dd HH:mm"
      @change="handleDateChange(row)"
    />
    <div>
      <el-dialog
        append-to-body
        :close-on-click-modal="false"
        title="请选择时间"
        :visible.sync="dialogVisible"
        width="350px"
        :before-close="onCancel"
      >
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker
              style="width:130px"
              size="mini"
              format="MM-dd"
              value-format="yyyy-MM-dd"
              v-model="selectYear"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <div
              class="el-date-editor el-input el-input--mini el-input--prefix el-input--suffix el-date-editor--date"
              style="width:130px"
            >
              <input
                style="width:130px;height:28px;fontSize:14px"
                class="el-input__inner"
                size="mini"
                maxlength="5"
                v-model="selectTime"
                type="time"
              >
            </div>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="onCancel"
          >取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="onSaveTime"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    time: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
