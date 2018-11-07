# StreamGetter

[![Build Status](https://travis-ci.org/ssysm/StreamGetterV2.svg?branch=master)](https://travis-ci.org/ssysm/StreamGetterV2)

流媒体链接抓取工具 使用Electron&NodeJS(底层Runtime) + Angular6 (UI)框架

## 支持的流平台

- Bilibili直播
- Line Live
- Niconico 生放送(如何实现？[点击这里](https://blog.theeditorstudio.com/index.php/blog/niconico%E7%94%9F%E6%94%BE%E6%BA%90%E6%8A%93%E6%B5%81%E8%AF%A6%E8%A7%A3))
- Hibiki Radio Station

## 使用展示

- ## Bilibili 直播

  ![storage.theeditorstudio.com/StreamGetter/bilibiliDemo.png](https://s3.eu-central-1.amazonaws.com/storage.theeditorstudio.com/StreamGetter/bilibiliDemo.png)

- ## Line Live

  ![storage.theeditorstudio.com/StreamGetter/linelive.png](https://s3.eu-central-1.amazonaws.com/storage.theeditorstudio.com/StreamGetter/linelive.png)

- ## HiBiKi Radio Station

  ![storage.theeditorstudio.com/StreamGetter/hibiki.png](https://s3.eu-central-1.amazonaws.com/storage.theeditorstudio.com/StreamGetter/hibiki.png)

- ## Niconico生放送

   (为了展示可以进行离开浏览器抓流 特此关闭浏览器)

  ![storage.theeditorstudio.com/StreamGetter/niconico.png](https://s3.eu-central-1.amazonaws.com/storage.theeditorstudio.com/StreamGetter/niconico.png)

## 如何安装

- 从GitHub Release 中下载对应的操作系统压缩包
- 解压 `stream-getter-electron-[操作系统]-[架构].7z/zip`
- 点击 `stream-getter-electron.exe/.app`即可

## 二次开发指南

- `npm install`安装依赖
- `npm run start` 进行Angular前端调试
- `npm run electron`进行Electron调试
- 目录指南
  - `electron-main.js` Electron启动文件
  - `src/app/` Angular 前端TS/HTML/SCSS文件
    - `service/`流获取服务
    - `page/` 页面

## 问题&联系？

- Github Issue
- E-mail: [pr@theeditorstudio.com](mailto:pr@theeditorstudio.com)