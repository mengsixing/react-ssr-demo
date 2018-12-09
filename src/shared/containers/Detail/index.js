import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Detail extends React.Component {
  render() {
    return (
      <>{this.props.islogin ? <div>Detail page</div> : <Redirect to="/" />}</>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.header
  };
};

export default connect(mapStateToProps)(Detail);
