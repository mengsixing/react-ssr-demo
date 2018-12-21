import React from 'react';
import PropTypes from 'prop-types';

class NotFound extends React.Component {
  // 类型检查
  static defaultProps = {
    staticContext: null,
  };

  static propTypes = {
    staticContext: PropTypes.objectOf(PropTypes.any),
  };

  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      // 给后端传递状态
      staticContext.statusCode = 404;
    }
  }

  render() {
    return <div>抱歉，页面没有找到！</div>;
  }
}

export default NotFound;
