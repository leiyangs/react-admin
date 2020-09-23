# 安装 dva-cli

```npm

 npm install dva-cli -g
 dva -v

```

## 创建新应用

dva现在推荐用create-umi生成

```npm

dva new dva_ant
$ cd dva_ant
$ npm start

```

## 使用 antd

- babel-plugin-import 是用来按需加载 antd 的脚本和样式的
- 编辑 .webpackrc，使 babel-plugin-import 插件生效。

```npm

cnpm i antd -S
cnpm i babel-plugin-import -D

```

```js

{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}

```
