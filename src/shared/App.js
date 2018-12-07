import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonText: '点击产生随机数',
      randomNumber: '123'
    };
  }
  showConsole() {
    this.setState({
      randomNumber: Math.floor( Math.random()*1000 )
    });
  }
  render() {
    return (
      <div>
        <h1>React 服务端渲染demo</h1>
        <p>
          <button onClick={() => this.showConsole()}>
            {this.state.buttonText}
          </button>
        </p>
        <div>随机数：{this.state.randomNumber}</div>
      </div>
    );
  }
}

export default App;
