import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../shared/Routes';

const App = () => {
  return <BrowserRouter>{Routes}</BrowserRouter>;
};

hydrate(<App />, document.getElementById('root'));
