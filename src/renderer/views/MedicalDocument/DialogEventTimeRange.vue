<template>
  <div>
    <el-dialog
      :title="eventData.detailName"
      :visible="visible"
      @close="onCancel"
    >
      <el-form>
        <el-form-item
          label="开始时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item
          label="结束时间"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onCancel">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="onConfirm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addNewEvent } from '@/api/medicalDocument'
import request from '@/utils/requestForMock'
export default {
  name: 'DialogEventTimeRange',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    eventData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      formLabelWidth: '120px'
    }
  },
  methods: {
    onCancel () {
      this.$emit('update:visible', false)
    },
    async onConfirm () {
      const res = await this.addEvent()
      if (res.data.code === 200) {
        this.$emit('update:visible', false)
        this.$emit('event-added-successfully')
      } else {

      }
    },
    addEvent () {
      const {
        eventCode,
        detailCode,
        detailName,
        drawIcon,
        iconColor,
        eventType
      } = this.eventData
      return request({
        method: 'POST',
        url: addNewEvent,
        data: [
          {
            detailCode,
            detailName,
            drawIcon,
            eventCode,
            eventStartTime: this.startTime,
            eventEndTime: this.endTime,
            eventType,
            iconColor,
            operationId: 'b0f9d8bda9244397a44cb8ff278937d9'
          }
        ]
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
