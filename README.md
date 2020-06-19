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