import React from 'react';

class NotFound extends React.Component {
  componentWillMount() {
    if (this.props.staticContext) {
      // 给后端传递状态
      this.props.staticContext.statusCode = 404;
    }
  }
  render() {
    return <div>抱歉，页面没有找到！</div>;
  }
}

export default NotFound;
