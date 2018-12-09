import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../shared/Routes';
import { Provider } from 'react-redux';
import { getCLientStore } from '../shared/store';
import { renderRoutes } from 'react-router-config';

const App = () => {
  return (
    <Provider store={getCLientStore()}>
      <BrowserRouter>
        <div>{renderRoutes(routes)}</div>
      </BrowserRouter>
    </Provider>
  );
};

hydrate(<App />, document.getElementById('root'));
