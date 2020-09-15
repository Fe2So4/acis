<template lang="pug">
  .anaes-event
    .content(class="clearfix")
      .left
        el-scrollbar(style="height:100%;" :wrap-style="wrapStyle")
          el-tree(:data="data"
            node-key="eventCode"
            default-expand-all
            :props="defaultProps"
            @node-click="handleChange"
          )
      .right
        vxe-table(
          border
          auto-resize
          show-header-overflow
          show-overflow
          ref="xTable"
          keep-source
          highlight-hover-row
          highlight-current-row
          align="center"
          height="100%"
          size="mini"
          class="scroll"
          @current-change="currentChangeEvent"
          :data="tableData"
          :checkbox-config="{checkStrictly: true,highlight: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true,activeMethod: activeRowMethod}"
        )
          vxe-table-column(field="detailCode" title="序号" width='60')
          vxe-table-column(field="eventName" title="事件分类" width="120")
          vxe-table-column(field="detailName" title="事件名称" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.detailName" size="mini" @blur="handleBlur")
          vxe-table-column(field="drugSpec" title="药品规格" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.drugSpec" size="mini" @blur="handleBlur")
          vxe-table-column(field="chargeType" title="收费分类" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.chargeType" @change="handleBlur")
                el-option(v-for="item in chargeTypeList" :label="item.detailName" :value="item.detailId" :key="item.detailId")
            template(v-slot="{ row }") {{ getSelectLabel(row.chargeType, chargeTypeList) }}
          vxe-table-column(field="dose" title="剂量" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.dose" size="mini" @blur="handleBlur")
          vxe-table-column(field="doseUnit" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.doseUnit" @change="handleBlur")
                el-option(v-for="item in doseUnitList" :label="item.detail_name" :value="item.detail_code" :key="item.detail_code")
          vxe-table-column(field="concentration" title="浓度" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.concentration" size="mini" @blur="handleBlur")
          vxe-table-column(field="conUnit" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.conUnit" @change="handleBlur")
                el-option(v-for="item in conUnitList" :label="item.detail_name" :value="item.detail_code" :key="item.detail_code")
          vxe-table-column(field="speed" title="速度" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.speed" size="mini" @blur="handleBlur")
          vxe-table-column(field="speedUnit" title="单位" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.speedUnit" @change="handleBlur")
                el-option(v-for="item in speedUnitList" :label="item.detail_name" :value="item.detail_code" :key="item.detail_code")
          vxe-table-column(field="way" title="途径" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.way" @change="handleBlur")
                el-option(v-for="item in channelList" :label="item.detail_name" :value="item.detail_code" :key="item.detail_code")
          vxe-table-column(field="isContinue" title="持续" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.isContinue" @change="handleBlur")
                el-option(label="是" :value="1")
                el-option(label="否" :value="2")
            template(v-slot="{ row }") {{ getSelectLabel(row.isContinue, continueList) }}
          vxe-table-column(field="liquidProperty" title="属性" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.liquidProperty" size="mini" @blur="handleBlur")
          vxe-table-column(field="drugProperty" title="药品属性" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-input(v-model="row.drugProperty" size="mini" @blur="handleBlur")
          vxe-table-column(field="adviceClassify" title="医嘱分类" :edit-render="{}" width="200")
            template(v-slot:edit="{ row }")
              el-select(size="mini" v-model="row.adviceClassify" @change="handleBlur")
                el-option(v-for="item in adviceClassifyList" :label="item.detailName" :value="item.detailCode" :key="item.detailCode")
            template(v-slot="{ row }") {{ getSelectLabel(row.adviceClassify, adviceClassifyList) }}
    .option
      el-button(size="mini" :disabled="addDisabled" @click="insertEvent(-1)") 新增(N)
      el-button(size="mini" :disabled="deleteDisabled" @click="deleteDetail") 删除(D)
      el-button(size="mini" :disabled="saveDisabled" @click="saveEvent") 保存(S)
      el-button(size="mini" :disabled="cancelDisabled" @click="revertEvent") 取消(C)
      el-button(size="mini" :disabled="refreshDisabled" @click="getDetail") 刷新(R)
</template>
<script>
import { commonTermsDetail, anaesEventList, anaesEventDetail, addAnaesEvent, deleteAnaesEvent, updateAnaesEvent } from '@/api/dictionary'
import {
  getDoseUnit, getConUnit, getSpeedUnit, getDrugChannel
} from '@/api/anaesDrug'
import XEUtils from 'xe-utils'
import request from '@/utils/requestForMock'
export default {
  data () {
    return {
      wrapStyle: [
        {
          'overflow-x': 'hidden'
        }
      ],
      tableData: [],
      data: [],
      defaultProps: {
        children: 'eventDetailVoList',
        label: 'eventName'
      },
      currentMenu: {},
      addDisabled: false,
      deleteDisabled: true,
      saveDisabled: true,
      cancelDisabled: true,
      refreshDisabled: false,
      currentRow: {},
      doseUnitList: [],
      speedUnitList: [],
      conUnitList: [],
      channelList: [],
      chargeTypeList: [],
      adviceClassifyList: [],
      continueList: [{ value: '1', label: '是' }, { value: '2', label: '否' }]
    }
  },
  created () {
    this.getDrugChannel()
    this.getDoseUnit()
    this.getSpeedUnit()
    this.getConUnit()
    this.getChargeType()
    this.getAdviceClassify()
  },
  mounted () {
    this.getList()
  },
  methods: {
    getSelectLabel (value, list, valueProp = 'value', labelField = 'label') {
      const item = XEUtils.find(list, item => item[valueProp] === value)
      return item ? item[labelField] : null
    },
    getDoseUnit () {
      request({
        url: getDoseUnit
      }).then(res => {
        this.doseUnitList = res.data.data
      })
    },
    getChargeType () {
      request({
        url: commonTermsDetail + '/D013'
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.value = item.detailId
          item.label = item.detailName
        })
        this.chargeTypeList = data
      })
    },
    getAdviceClassify () {
      request({
        url: commonTermsDetail + '/D016'
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          item.value = item.detailCode
          item.label = item.detailName
        })
        this.adviceClassifyList = data
      })
    },
    getConUnit () {
      request({
        url: getConUnit
      }).then(res => {
        this.conUnitList = res.data.data
      })
    },
    getSpeedUnit () {
      request({
        url: getSpeedUnit
      }).then(res => {
        this.speedUnitList = res.data.data
      })
    },
    getDrugChannel () {
      request({
        url: getDrugChannel
      }).then(res => {
        this.channelList = res.data.data
      })
    },
    activeRowMethod ({ row, rowIndex }) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        if (insertRecords[0].detailCode === row.detailCode) {
          return true
        }
        return false
      } else {
        return true
      }
    },
    handleBlur () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        if (
          insertRecords[0].liquidProperty !== '' ||
            insertRecords[0].addviceClassify !== '' ||
            insertRecords[0].speed !== '' ||
            insertRecords[0].speedUnit !== '' ||
            insertRecords[0].dose !== '' ||
            insertRecords[0].doseUnit !== '' ||
            insertRecords[0].concentration !== '' ||
            insertRecords[0].conUnit !== '' ||
            insertRecords[0].way !== '' ||
            insertRecords[0].chargeType !== '' ||
            insertRecords[0].drugProperty !== '' ||
            insertRecords[0].drugSpec !== '' ||
            insertRecords[0].isContinue !== '' ||
            insertRecords[0].detailName !== ''
        ) {
          this.saveDisabled = false
          this.cancelDisabled = false
        } else {
          this.saveDisabled = true
          this.cancelDisabled = false
        }
      }
      if (updateRecords.length > 0) {
        this.saveDisabled = false
        this.addDisabled = true
        this.cancelDisabled = false
        this.deleteDisabled = true
        this.refreshDisabled = true
      }
    },
    currentChangeEvent ({ row }) {
      const { insertRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length > 0) {
        this.deleteDisabled = true
        this.cancelDisabled = false
        this.refreshDisabled = true
        this.addDisabled = true
      } else {
        this.currentRow = row
        this.deleteDisabled = false
        this.refreshDisabled = false
      }
    },
    getList () {
      request({
        method: 'GET',
        url: anaesEventList
      }).then(res => {
        const data = res.data.data
        this.data = data
      })
    },
    handleChange (val) {
      this.currentMenu = val
      this.addDisabled = false
      this.deleteDisabled = true
      this.saveDisabled = true
      this.refreshDisabled = true
      this.cancelDisabled = true
      this.getDetail()
    },
    getDetail () {
      request({
        method: 'GET',
        url: anaesEventDetail + '/' + this.currentMenu.eventCode
      }).then(res => {
        const data = res.data.data
        data.forEach(item => {
          if (item.chargeType === 0) {
            item.chargeType = ''
          }
          if (item.isContinue === false) {
            item.isContinue = '2'
          } else {
            item.isContinue = '1'
          }
        })
        this.tableData = data
      })
    },
    deleteDetail () {
      if (this.currentRow.detailCode && this.currentRow.detailCode !== '') {
        request({
          method: 'DELETE',
          url: deleteAnaesEvent + `/${this.currentRow.detailCode}/${this.currentMenu.eventCode}`
        }).then(res => {
          this.currentRow = {}
          this.deleteDisabled = true
          this.getDetail()
        })
      }
    },
    async insertEvent (row) {
      if (this.currentMenu.eventCode) {
        this.addDisabled = true
        this.cancelDisabled = false
        this.data.forEach(value => {
          value.disabled = true
        })
        let detailCode = null
        if (this.tableData.length > 0) {
          const length = this.tableData.length - 1
          detailCode = parseInt(this.tableData[length].detailCode) + 1
        } else {
          detailCode = 1
        }
        const record = {
          detailCode: detailCode,
          eventName: this.currentMenu.eventName,
          detailName: '',
          drugSpec: '',
          chargeType: '',
          dose: '',
          doseUnit: '',
          concentration: '',
          conUnit: '',
          speed: '',
          speedUnit: '',
          way: '',
          isContinue: '',
          liquidProperty: '',
          drugProperty: '',
          addviceClassify: ''
        }
        // this.insertData = record
        const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
        console.log(newRow)
      }
    },
    revertEvent () {
      this.$refs.xTable.revertData()
      this.cancelDisabled = true
      this.addDisabled = false
      this.deleteDisabled = true
      this.refreshDisabled = false
      this.saveDisabled = true
    },
    addDetail (param) {
      const obj = {}
      obj.detailCode = param.detailCode
      if (param.isContinue === '1') {
        obj.isContinue = true
      } else {
        obj.isContinue = false
      }
      obj.way = param.way
      obj.speed = param.speed
      obj.speedUnit = param.speedUnit
      obj.dose = param.dose
      obj.doseUnit = param.doseUnit
      obj.concentration = param.concentration
      obj.conUnit = param.conUnit
      obj.liquidProperty = param.liquidProperty
      obj.addviceClassify = param.addviceClassify
      if (param.chargeType === '') {
        obj.chargeType = 0
      } else {
        obj.chargeType = parseInt(param.chargeType)
      }
      obj.detailName = param.detailName
      obj.drugSpec = param.drugSpec
      obj.drugProperty = param.drugProperty
      obj.eventCode = this.currentMenu.eventCode
      request({
        method: 'POST',
        url: addAnaesEvent,
        data: obj
      }).then(res => this.getDetail())
    },
    updateDetail (param) {
      const list = param
      list.forEach(value => {
        value.eventCode = this.currentMenu.eventCode
        if (value.isContinue === 2) {
          value.isContinue = false
        } else {
          value.isContinue = true
        }
        if (value.chargeType === '') {
          value.chargeType = 0
        } else {
          value.chargeType = parseInt(value.chargeType)
        }
        for (var k in value) {
          if (k === 'eventName') {
            delete value[k]
          }
        }
      })
      request({
        method: 'PUT',
        url: updateAnaesEvent,
        data: list
      }).then(res => this.getDetail())
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      console.log(insertRecords, updateRecords)
      if (insertRecords.length > 0) {
        this.addDetail(insertRecords[0])
        console.log('add')
      }
      if (updateRecords.length > 0) {
        this.updateDetail(updateRecords)
        console.log('update')
      }
      this.addDisabled = false
      this.saveDisabled = true
      this.refreshDisabled = false
      this.cancelDisabled = true
      this.deleteDisabled = true
    }
  }
}
</script>
<style lang="scss" scoped>
 @import "@/styles/theme";
.anaes-event{
  height:100%;
  .content{
    height:calc(100% - 40px);
    .left{
      width:20%;
      height:100%;
      float:left;
      // border 1px solid rgba(57, 66, 92, 1)
      @include theme-property("border", $border-event-left);
      border-right: unset !important;
      border-radius: 5px 0px 0px 5px;

    }
    .right{
      height:100%;
      float:right;
      width:80%;
    }
  }
  .option{
    margin-top:10px;
    text-align:right;
    .el-button{
      margin-right:10px;
    }
  }
    }
</style>
