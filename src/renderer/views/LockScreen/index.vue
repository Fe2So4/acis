<template>
  <div class="lock-screen">
    <el-dialog
      title="锁定系统"
      :visible.sync="lockVisible"
      width="30%"
      :show-close="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        size="mini"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="loginName"
        >
          <el-input
            :disabled="true"
            v-model="ruleForm.loginName"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="pass"
            v-model="ruleForm.pass"
            autocomplete="off"
            @keydown.native="unLock"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            解锁
          </el-button>
          <el-button
            type="primary"
            @click="handleChange"
          >
            切换账号
          </el-button>
          <!-- <el-button @click="resetForm('ruleForm')">
            取消
          </el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { lockSystem } from '@/api/login'
import request from '@/utils/requestForMock'
import { getCurrentAccount } from '@/utils/storage'
export default {
  data () {
    var user = getCurrentAccount()
    return {
      ruleForm: {
        pass: '',
        loginName: user
      },
      rules: {
        pass: [
          { validator: '请输入密码', trigger: 'blur' }
        ]
      },
      dialogVisible: false
    }
  },
  props: {
    lockVisible: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          request({
            url: lockSystem,
            method: 'POST',
            params: {
              password: this.ruleForm.pass,
              loginName: this.ruleForm.loginName
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.$emit('handleLock')
              this.$message({ type: 'success', message: '解锁成功' })
            } else {
              this.$message({ type: 'error', message: res.data.msg })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleChange () {
      this.$emit('handleLock')
      this.$router.push('/login')
    },
    unLock (e) {
      if (e.keyCode === 13) {
        this.submitForm('ruleForm')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .lock-screen{
    .el-form{
      .el-form-item{
        &:last-child{
          /deep/ .el-form-item__content{
            margin-left:0 !important;
            text-align: center;
          }
        }
      }
    }
  }
</style>>
