# 搭建 React Server Render

接下来我们来一步一步配置服务器端渲染。

## 安装 npm 包

这里只介绍保证最小可运行的包，其他的关于性能提升的包，请参考 package-json 文件。

React 相关：

- react
- react-dom
- react-router
- react-router-config
- redux
- react-redux

服务器端相关：

- express

打包工具相关：

- webpack
- webpack-cli
- webpack-node-externals（node 打包优化，排除 node_modules 包）
- babel-loader
- less-loader
- css-loader
- isomorphic-style-loader（前后端 css 解决方案）
- url-loader（处理图片路径）

其他：

- axios

## 最基础的渲染

1、创建目录

```js
|- build
|- src
  |-- server
  |-- client
  |-- shared // 存放组件，页面，等信息
```

2、前后端共用代码配置

前后端共用的代码都放在了 shared 目录，包括以下几点：

- 共用 react-router 配置。
- 共用 react 组件和页面。
- 共用 redux store 配置。

2、客户端配置

- 使用 react-dom 中的 hydrate 方法进行最终渲染。
- 使用 webpack 打包生成 js 文件。

3、服务器端配置

- 根据 react-router-config 的 matchRoutes 匹配到当前页面对应的路由。
  - 检查是否需要提前获取数据。
- 获取前端渲染传入的 css 代码，并拼接到 head 标签中。
- 使用 react-dom/server 中的 renderToString 方法渲染整个页面，并拼接到 body 标签中。
- 拼接客户端打包后的 js 到 body 中。

这样最基本的服务器端渲染就做好了。

## 为组件添加路由

1、客户端配置

- 使用 react-router-dom 下的 BrowserRouter 包裹组件。

2、服务器端配置

- 使用 react-router-dom 下的 StaticRouter 包裹组件。

```js
<StaticRouter location={ctx.req.url}>
  <App />
</StaticRouter>
```

## 为组件添加状态管理

1、注意服务器端 store 每次都要新生成一个，避免所有用户共享同一个 store 实例。

2、项目中使用分散的 store 管理，最后使用 combineReducer 组合成整个项目的 store。

## 请求数据

客户端如果要请求数据，一般会在 componentDidMount 生命周期中，但是用户会看到页面加载中的样式，就不能做到直出。所以应该在服务器端将数据请求好后，直接渲染到 html 中。这里我们根据路由的不同，服务器端进行请求数据。

1、使用 react-router-config 进行路由改造，通过 js 方式定义路由，我们就可以在路由上定义一个 loadData 方法。这样服务器端就能获取到这个 loadData 方法，

2、服务器端 matchroutes 匹配到请求的路由，然后调用 loadData 方法，请求完成后，**将数据注入到 store 中去**。

3、由于客户端的 store 和服务器端的 store 不一致，这里采用 window.REDUX_STORE 将服务器端的 store 注入到页面中。

4、客户端在创建 store 时，将服务器端的 store 作为初始化，这样就能保持一致数据了。

## 渲染样式

现在的 react 中书写 css 的方案有两种：css in js 或 css modules。

css in js 方案是将 css 代码交给 js 去控制，这样服务器端渲染并不能直接用，所以不能使用这样的方式。我们采用 css modules 方案进行。

客户端配置：

1、客户端使用 isomorphic-style-loader 进行处理 css。

2、使用 isomorphic-style-loader/withStyles 高阶组件绑定组件。

3、在 hybrate 渲染中，注入 isomorphic-style-loader/StyleContext。

服务器端配置：

4、客户端将 css 注入到 context 中后，服务器端就可以通过 isomorphic-style-loader/StyleContext 获取到前端的 css 源码，并注入到 head 标签内部了。

### isomorphic-style-loader 的原理

1、当我们使用模块化引入 css 的时候，暴露一个私有方法\_getcss() 来获取 css 的内容。

2、使用 staticRouter 可以在组件上添加自定义 context，用来同步前后端数据。

3、react 在 componentDidMount 阶段，通过\_getcss 获取当前组件 css，注入到 context 中，这样后盾就可以通过 context 拿到 css 了。

4、后端拿到对应的 css 内容，并直接显示到 head 标签里。
