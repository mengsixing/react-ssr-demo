import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import routes from '../shared/Routes';
import { getCLientStore } from '../shared/store';

const App = () => (
  <Provider store={getCLientStore()}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>
);

// 根据服务器端生成的页面，进行二次渲染（事件绑定等）
hydrate(<App />, document.getElementById('root'));
