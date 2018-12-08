import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../shared/Routes';
import { Provider } from 'react-redux';
import { getCLientStore } from '../shared/store';

const App = () => {
  return (
    <Provider store={getCLientStore()}>
      <BrowserRouter>
        <div>
          {routes.map(route => (
            <Route {...route} />
          ))}
        </div>
      </BrowserRouter>
    </Provider>
  );
};

hydrate(<App />, document.getElementById('root'));
