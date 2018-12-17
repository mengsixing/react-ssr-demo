import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import * as actions from '../components/Header/store/actions';

const App = ({ staticContext, route }) => (
  <div>
    <Header staticContext={staticContext} />
    <div>{renderRoutes(route.routes)}</div>
  </div>
);

App.defaultProps = {
  staticContext: null,
};

App.propTypes = {
  staticContext: PropTypes.objectOf(PropTypes.any),
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

App.loadData = store => store.dispatch(actions.islogin());

export default App;
