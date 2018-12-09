import React from 'react';
import Header from '../components/Header';
import { renderRoutes } from 'react-router-config'
export default (props) => {
  return (
    <div>
      <Header />
      <div>{renderRoutes(props.route.routes)}</div>
    </div>
  );
};
