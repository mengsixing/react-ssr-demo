import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../components/Header';
import * as actions from '../components/Header/store/actions';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header staticContext={this.props.staticContext} />
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    );
  }
}

App.loadData = store => {
  return store.dispatch(actions.islogin());
};

export default App;
