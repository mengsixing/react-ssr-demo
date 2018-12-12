import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import withStyle from '../../components/WithStyle';
import styles from './styles.less';

class Member extends React.Component {
  constructor() {
    super();
    this.renderDataList = this.renderDataList.bind(this);
  }

  renderDataList() {
    return (
      this.props.list &&
      this.props.list.map(item => {
        return (
          <div key={item.id} className={styles.memberList}>
            <div>姓名：{item.name}</div>
            <div>邮箱：{item.email}</div>
            <div>地址：{item.address}</div>
            <div>评价：{item.star}</div>
          </div>
        );
      })
    );
  }

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getMemberList();
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>React服务器端渲染内部人员列表 - 做最简单的Demo</title>
          <meta
            name="description"
            content="React服务器端渲染内部人员列表 - 做最简单的Demo"
          />
        </Helmet>
        {this.props.islogin ? (
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

const mapStateToProps = state => {
  return {
    islogin: state.header.islogin,
    ...state.member
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMemberList() {
      dispatch(actions.getMemberList());
    }
  };
};

const ExportMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyle(Member, styles));

ExportMember.loadData = function(store) {
  return store.dispatch(actions.getMemberList());
};

export default ExportMember;
