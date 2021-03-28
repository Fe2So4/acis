<template>
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
            v-model="year"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            style="width:120px"
            size="mini"
            maxlength="5"
            v-model="time"
          />
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
          @click="onCancel"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: '',
      time: ''
    }
  },
  mounted () {},
  watch: {
    selectYear: {
      handler: function (val, old) {
        this.year = this.selectYear
      }
    },
    selectTime: {
      handler: function (val, old) {
        this.time = this.selectTime
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    selectYear: {
      type: String,
      required: true
    },
    selectTime: {
      type: String,
      required: true
    }
  },
  methods: {
    onCancel () {
      this.year = ''
      this.time = ''
      this.$emit('closeDialogVisible')
    }
  }
}
</script>

<style lang="scss" scoped></style>
