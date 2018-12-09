import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './store/actions';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">首页</Link>
          {this.props.islogin ? (
            <>
              |<Link to="/detail">详情页</Link>
              <button onClick={this.props.loginout}>退出登录</button>
            </>
          ) : (
            <button onClick={this.props.login}>登录</button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.header
});

const mapDispatchtoProps = dispatch => ({
  login() {
    dispatch(actions.login());
  },
  loginout() {
    dispatch(actions.loginout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Header);
