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
#  -Schedule 手术排班
#  -ScheduleReport 手术排班表
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