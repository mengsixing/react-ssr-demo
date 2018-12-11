import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Detail extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>React服务器端渲染详情页面 -做最简单的Demo</title>
          <meta
            name="description"
            content="React服务器端渲染详情页面 -做最简单的Demo"
          />
        </Helmet>
        {this.props.islogin ? <div>Detail page</div> : <Redirect to="/" />}
        <div />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.header
  };
};

export default connect(mapStateToProps)(Detail);
