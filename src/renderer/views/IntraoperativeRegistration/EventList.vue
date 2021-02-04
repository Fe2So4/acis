<template>
  <div class="eventList">
    <el-scrollbar
      :wrap-style="wrapStyle"
    >
      <div class="buttons">
        <div
          class="button"
          v-for="button in eventList"
          :key="button.eventId"
        >
          <el-button
            size="mini"
            @click="onClickEventButton(button.eventId)"
          >
            {{ button.eventName }}
          </el-button>
        </div>
      </div>
    </el-scrollbar>
    <div class="detailTable">
      <vxe-table
        show-header-overflow
        show-overflow
        highlight-hover-row
        auto-resize
        @cell-dblclick="onCellDblclick"
        border="inner"
        align="center"
        height="199px"
        size="mini"
        :data="detailData"
      >
        <!-- class="scroll" -->
        <vxe-table-column
          field="eventName"
          title="事件名称"
        />
      </vxe-table>
    </div>
  </div>
</template>

<script>
import request from '@/utils/requestForMock'
import { getEventDetailList } from '@/api/intraoperative'

export default {
  name: 'EventList',
  props: {
    eventList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      detailData: []
    }
  },
  methods: {
    onClickEventButton (eventCode) {
      this.getEventDetailList(eventCode)
    },
    onCellDblclick ({ row }) {
      const {
        eventId,
        eventType,
        detailId,
        eventName,
        dosage,
        dosageUnit,
        concentration,
        concentrationUnit,
        speed,
        speedUnit,
        approach,
        isHolding,
        liquidProperty,
        drugProperty
      } = row
      this.$emit('add-event', {
        eventId,
        eventType,
        detailId,
        eventName,
        dosage,
        dosageUnit,
        concentration,
        concentrationUnit,
        speed,
        speedUnit,
        approach,
        isHolding,
        liquidProperty,
        drugProperty
      })
    },
    getEventDetailList (eventId) {
      return request({
        method: 'post',
        url: getEventDetailList,
        params: {
          eventId
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          this.detailData = res.data.data
        } else {
          this.detailData = []
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  @import "@/styles/theme";

  .eventList {
    border: 1px solid;
    @include theme-property('border-color', $dateTimePicker-color-border);
    border-radius: 5px;
    height: 400px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .buttons {
      flex: 0 0 auto;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px 10px;
      padding: 10px;

      .el-button {
        width: 100%;
        // height: 100%;
      }
    }

    .detailTable {
      flex: auto;
      // height: 199px;
      // width: 100%;
      border: none;

      // & ::v-deep .vxe-table .vxe-table--border-line {
      //   border-top: unset;
      //   border-left: unset;
      //   border-right: unset;
      // }
    }
  }
</style>
