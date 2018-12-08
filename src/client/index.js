import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../shared/Routes';
import { Provider } from 'react-redux';
import getStore from '../shared/store';

const App = () => {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>{Routes}</BrowserRouter>
    </Provider>
  );
};

hydrate(<App />, document.getElementById('root'));
