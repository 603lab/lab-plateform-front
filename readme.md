
<h1 align="center">603 Platform</h1>

## 项目启动

- npm run start


## 项目使用mock

## 项目使用真实服务
- > 打开config.js的`proxy`配置
```
// config.js
proxy: {
  '/api': {
    target: 'http://129.204.109.115:8011',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
},
```
- > 使用npm run start:no-mock 启动服务