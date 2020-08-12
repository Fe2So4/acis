# aims

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

# 页面文件夹结构
# views
#  -Login 登录
#  -Home 首页
#  -PatientList 首页患者列表
#  -PatientInfo 患者信息详情页
#  -ChangePassword 修改密码
#  -ConfigurationSystem 系统配置
#  -DeviceGather 设备采集
#  -Hemodynamics 血流动力学
#  -StateMaintain 状态维护（术后状态维护）
#  -OperationOverview 手术概览
#  -OperationHandover 手术交班
#  -OperationCancel 手术取消
#  -IntraoperativeRegistration 术中登记
#  -IntraoperativePatient 术中患者列表
#  -RealtimeStatus 实时状态
#  -ResuscitationBed 复苏床位
#  -PacuStatus PACU状态
#  -Schedule 手术排班
#  -ScheduleReport 手术排班表
#  -AnaesScore 麻醉评分
#  -AnalgesicScore 镇痛评分
#  -InspectionInformation 检验信息
#  -MedicalOrderInformation 医嘱信息
#  -InspectionResult 检查结果
#  -Dictionary 字典
#  -TemplateDesigner 文书设计
#  -TemplateDisplayer 文书展示
#  -medicalDocument 医疗文书
#  -printDocument 文书打印
#  -TemplateManagement 模板管理
#  -MedicalRecordCourse 病历病程 
#  -EmergencyTreatment 急诊登记 
#  -OperationInfo 手术信息 
#  -RecoveryRegistration 复苏登记 
```

---
This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


# 项目打包方案
electron-packager <sourcedir> <appname> <platform> <architecture> <electron version> <optional options>
参数说明：
sourcedir：项目所在路径
appname：应用名称
platform：确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux）
architecture：决定了使用 x86 还是 x64 还是两个架构都用
electron version：electron 的版本
optional options：可选选项