# react-ssr-demo

实现 react 服务器端渲染所需的最小 demo。

## React 服务器端渲染流程

1、服务器端使用 renderToString 渲染出页面内容。
2、客户端根据渲染出的内容进行二次渲染，做一些绑定事件等操作。

## 开始代码

### 路由问题

使用 react-router 对前后端代码进行同构。

1、客户端

使用 react-router-dom 下的 BrowserRouter 绑定即可。

2、服务器端

使用 react-router-dom 下的 StaticRouter 绑定。
