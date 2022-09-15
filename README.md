# Byte-react-monitor
暂时只实现了在react项目内调用的钩子模式，具备单页面停留时长监控，错误监控，多种性能监控

## 入口文件 index.js

* lib一个钩子两个组件（用法类似于装饰器或者react路由守卫）
  * ErrorMonitor
  * usePerformance
  * PageDuration

* utils工具库

### 使用方法
####  ErrorMonitor PageDuration

* 可以在路由中导入，包裹需要监控的子组件

![](https://github.com/HuahuaWowo/Byte-react-monitor/raw/master/example/import.png)

![](https://github.com/HuahuaWowo/Byte-react-monitor/raw/master/example/routerImport.png)

#### usePerformance 性能监控

![](https://github.com/HuahuaWowo/Byte-react-monitor/raw/master/example/globalMonitor.png)
