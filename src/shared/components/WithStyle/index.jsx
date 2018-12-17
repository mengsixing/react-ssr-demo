import React from 'react';
import PropTypes from 'prop-types';

export default (WrapperedComponent, styles) => class WithStyleComponent extends React.Component {
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
        staticContext.styles.push(styles._getCss());
      }
    }

    render() {
      return <WrapperedComponent {...this.props} />;
    }
};
