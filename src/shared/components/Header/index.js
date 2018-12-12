import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './store/actions';
import styles from './styles.less';
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
          <Link to="/" className={styles.headerItem}>
            首页
          </Link>
          {this.props.islogin ? (
            <>
              <Link to="/member" className={styles.headerItem}>
                内部资料
              </Link>
              <a className={styles.headerItem} onClick={this.props.logout}>
                退出登录
              </a>
            </>
          ) : (
            <a className={styles.headerItem} onClick={this.props.login}>
              登录
            </a>
          )}
          <a
            href="https://github.com/yhlben/react-ssr-demo"
            className={styles.github}
          >
            github
          </a>
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
  logout() {
    dispatch(actions.logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyle(Header, styles));
