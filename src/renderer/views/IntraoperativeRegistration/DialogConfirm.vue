<template>
  <div>
    <el-dialog
      title="保存模板"
      :visible="visible"
      append-to-body
      :modal="false"
      width="20%"
      @close="onClose"
      destroy-on-close
    >
      <div class="content">
        <el-form
          label-position="left"
          label-width="80px"
          :model="form"
          size="mini"
        >
          <el-form-item label="公有/私有">
            <el-radio-group v-model="form.type">
              <el-radio
                :label="0"
              >
                公有
              </el-radio>
              <el-radio
                :label="1"
              >
                私有
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板组">
            <el-input v-model="form.group" />
          </el-form-item>
          <el-form-item label="模板名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-form>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="onSave"
          size="mini"
        >
          确 定
        </el-button>
        <el-button
          @click="onClose"
          size="mini"
        >
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogConfirm',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      form: {
        type: 0,
        group: '',
        name: ''
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('update:visible', false)
    },
    onSave () {
      if (this.form.name !== '' && this.form.group !== '') {
        this.$emit('save-template', {
          havingWay: this.form.type,
          templateParentName: this.form.group,
          templateName: this.form.name
        })
      }
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
