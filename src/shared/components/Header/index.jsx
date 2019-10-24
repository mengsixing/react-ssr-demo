import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles'
import * as actions from './store/actions';
import styles from './styles.less';
import githubImage from './github.png';

class Header extends React.Component {
  // 类型检查
  static defaultProps = {
    islogin: false,
    staticContext: null,
  };

  static propTypes = {
    islogin: PropTypes.bool,
    isloading: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    staticContext: PropTypes.objectOf(PropTypes.any),
  };

  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.styles.push(styles._getCss());
    }
  }

  render() {
    const {
      islogin, isloading, logout, login,
    } = this.props;
    return (
      <div className={styles.header}>
        <div>
          <Link to="/" className={styles.headerItem}>
            首页
          </Link>
          {islogin ? (
            <>
              <Link to="/member" className={styles.headerItem}>
                内部资料
              </Link>
              <span className={styles.headerItem}>
                {isloading ? '正在退出，请稍等...' : <span onClick={logout}>退出登录</span>}
              </span>
            </>
          ) : (
            <span className={styles.headerItem}>
              {isloading ? '登录中，请稍等...' : <span onClick={login}>登录</span>}
            </span>
          )}
          <a href="https://github.com/lmjben/react-ssr-demo" className={styles.github}>
            <img src={githubImage} alt="github" />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.header,
});

const mapDispatchtoProps = dispatch => ({
  login() {
    dispatch(actions.login());
  },
  logout() {
    dispatch(actions.logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps,
)(withStyles(styles)(Header));
