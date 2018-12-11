import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as actions from './store/actions';
import withStyle from '../../components/WithStyle';
import styles from './styles.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonText: '点击按钮'
    };
  }
  // 在服务器端渲染中不会触发此声明周期
  componentDidMount() {
    // 优化请求：如果服务器端已经请求了数据，则不必二次请求
    if (!this.props.list.length) {
      this.props.getHomeData();
    }
  }
  showConsole() {
    console.log('打印log:', new Date());
  }
  renderListData() {
    return this.props.list.map(item => {
      return <div key={item.id}>标题： {item.title}</div>;
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>React服务器端渲染Demo -做最简单的Demo</title>
          <meta
            name="description"
            content="React服务器端渲染Demo -做最简单的Demo"
          />
        </Helmet>
        <div>
          {this.renderListData()}
          <p className={styles.test}>
            <button onClick={() => this.showConsole()}>
              {this.state.buttonText}
            </button>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home
});

const mapDispatchtoProps = dispatch => ({
  getHomeData() {
    dispatch(actions.getHomeData());
  }
});

const ExportHome = connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyle(Home, styles));

// 组件静态方法会被connect挂载到新的高阶组件上，所以connect后方法任然存在,但我们自定义的withStyle并不会带上。
ExportHome.loadData = store => {
  return store.dispatch(actions.getHomeData());
};

export default ExportHome;
