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
            size="mini"
            popper-class="dateTimePicker"
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
            size="mini"
            popper-class="dateTimePicker"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="onCancel"
          size="mini"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="onConfirm"
          size="mini"
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('Base', [
      'operationId'
    ])
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
            operationId: this.operationId
          }
        ]
      })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
