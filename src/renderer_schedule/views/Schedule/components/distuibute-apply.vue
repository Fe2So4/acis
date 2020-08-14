<template>
  <div class="distribute">
    <div class="form-box">
      <div class="form-content">
        <el-form
          ref="form"
          label-width="100px"
          label-position="left"
          :model="form"
        >
          <el-form-item label="手术间">
            <div>{{ distributeDetail.room }}</div>
          </el-form-item>
          <el-form-item label="日期">
            <div>{{ date }}</div>
          </el-form-item>
          <el-form-item
            label="排班时段"
            prop="radio"
          >
            <div class="select-time">
              <div class="select-time-item">
                <el-radio
                  label="am"
                  v-model="form.radio"
                  v-show="distributeDetail.amDoc!=''"
                >
                  上午
                </el-radio>
                <span class="doctor">{{ distributeDetail.amDoc == '' ? '-' : distributeDetail.amDoc }}</span>
                <span>{{ distributeDetail.amSequence }}/{{ distributeDetail.amSequenceTotal }}</span>
              </div>
              <div
                class="select-time-item"
                v-show="distributeDetail.pmDoc!=''"
              >
                <el-radio
                  label="pm"
                  v-model="form.radio"
                >
                  下午
                </el-radio>
                <span class="doctor">{{ distributeDetail.pmDoc==''?'-':distributeDetail.pmDoc }}</span>
                <span>{{ distributeDetail.pmSequence }}/{{ distributeDetail.pmSequenceTotal }}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="手术时间"
            prop="time"
            :rules="[
              { required: true, message: '请选择时间', trigger: 'blur' }
            ]"
          >
            <el-col>
              <el-time-select
                placeholder="选择时间"
                v-model="form.time"
                style="width: 100%;"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:59'
                }"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleSubmitDistribute('form')"
            >
              确定
            </el-button>
            <el-button
              type="primary"
              @click="handleClose"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="cancel">
        <el-button
          icon="el-icon-close"
          circle
          @click="handleClose"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import {distributeApply} from '../../../api/schedule'
export default {
  data () {
    return {
      labelPosition: 'left',
      form: {
        radio: 'am',
        time: ''
      }
    }
  },
  props: {
    distributeDetail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    date: {
      type: String,
      default: function () {
        return ''
      }
    },
    patientDetail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleCloseDistribute')
    },
    handleSubmitDistribute (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$emit('handleSubmitDistribute', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
    .distribute{
        height:100%;
        width:100%;
        // position:relative;
        display: flex;
        justify-content: center;
        align-items: center;
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        background:#000;
        background-color:rgba(0, 0, 0, 0.5);
        z-index:1000;
        .form-box{
            width:400px;
            height:400px;
            padding:20px;
            position: relative;
            background:#fff;
            font-size:14px;
            z-index:1001;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-form{
                padding:0 20px;
                .el-form-item{
                    width: 100%;
                }
            }
            .select-time{
                 .select-time-item{
                    span{
                        display: inline-block;
                        &:nth-child(2){
                            width:42px;
                        }
                    }
                    .doctor{
                        margin-right:20px;

                    }

                 }
            }
            .form-content{
                // margin-top:100px;
                display: flex;
                justify-content: center;
                align-items: center;
                .form-content-content{
                    height:32px;
                    display:flex;
                    justify-content: space-around;
                    align-items: center;
                }
            }
            .cancel{
                position:absolute;
                right:0;
                top:0;
                .el-button{
                    border:0;
                    i.el-icon-close{
                        height:16px;
                        width:16px;
                    }
                }
            }
        }
    }

    .distribute /deep/ .el-form .el-form-item{
        &:last-child{
            position: absolute;
            bottom:0;
            left:0;
            .el-form-item__content{
                margin-left:0 !important;
                text-align: center;
            }
        }
    }
</style>
