import React from 'react'
import Home from './containers/Home';
import Login from './containers/Login';

import { Route } from 'react-router-dom';

const Routes = (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </div>
);

export default Routes;
