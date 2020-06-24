<template>
  <div class="room-config">
    <el-dialog
      title="手术间配置"
      :visible.sync="roomVisible"
      width="60%"
    >
      <div class="roomConfig">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="手术间号">
            <el-input
              v-model="currentId"
              disabled
            />
          </el-form-item>
          <el-form-item label="最大手术台数">
            <el-input v-model="maxCount" />
          </el-form-item>
          <el-form-item label="科室">
            <el-select
              v-model="dept"
              placeholder="请选择科室"
            >
              <el-option
                v-for="(item,index) in deptList"
                :key="index"
                :value="item.deptCode"
                :label="item.deptName"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitRoomConfig"
            >
              确认
            </el-button>
            <el-button
              type="primary"
              @click="roomVisible==false"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date: ''
      },
      contextMenuData2: {
        menuName: 'demo1',
        axis: {
          x: null,
          y: null
        },
        menulists: [{
          btnName: '清空',
          fnHandler: 'handlerClearList'
        }]
      },
      deptList: [],
      currentId: '',
      maxCount: '',
      dept: ''
    }
  },
  props: {
    roomVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitRoomConfig () {

    }
  }
}
</script>
<style lang="scss" scoped>
  .room-config{

  }
</style>
