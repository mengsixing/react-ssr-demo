import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './store/actions';
import styles from './styles.css';
import withStyle from '../WithStyle';

class Header extends React.Component {
  componentWillMount() {
    if (this.props.staticContext) {
      this.props.staticContext.styles.push(styles._getCss());
    }
  }
  render() {
    return (
      <div className={styles.header}>
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
)(withStyle(Header, styles));
