import React from 'react';
export default (WrapperedComponent, styles) => {
  return class WithStyleComponent extends React.Component {
    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.styles.push(styles._getCss());
      }
    }
    render() {
      return <WrapperedComponent {...this.props} />;
    }
  };
};
