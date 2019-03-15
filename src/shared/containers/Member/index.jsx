import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import * as actions from './store/actions';
// import withStyle from '../../components/WithStyle';
import styles from './styles.less';

class Member extends React.Component {
  // 类型检查
  static propTypes = {
    islogin: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    getMemberList: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.renderDataList = this.renderDataList.bind(this);
  }

  componentDidMount() {
    const { list, getMemberList } = this.props;
    if (!list.length) {
      getMemberList();
    }
  }

  renderDataList() {
    const { list } = this.props;
    return (
      list
      && list.map(item => (
        <div key={item.id} className={styles.memberList}>
          <div>
            姓名：
            {item.name}
          </div>
          <div>
            邮箱：
            {item.email}
          </div>
          <div>
            地址：
            {item.address}
          </div>
          <div>
            评价：
            {item.star}
          </div>
        </div>
      ))
    );
  }

  render() {
    const { islogin } = this.props;
    return (
      <>
        <Helmet>
          <title>React服务器端渲染内部人员列表 - 做最简单的Demo</title>
          <meta name="description" content="React服务器端渲染内部人员列表 - 做最简单的Demo" />
        </Helmet>
        {islogin ? (
          <div>
            <div className={styles.listTitle}>mock内部人员列表</div>
            {this.renderDataList()}
          </div>
        ) : (
          <Redirect to="/" />
        )}
        <div />
      </>
    );
  }
}

const mapStateToProps = state => ({
  islogin: state.header.islogin,
  ...state.member,
});

const mapDispatchToProps = dispatch => ({
  getMemberList() {
    dispatch(actions.getMemberList());
  },
});

const ExportMember = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Member));

ExportMember.loadData = store => store.dispatch(actions.getMemberList());

export default ExportMember;
