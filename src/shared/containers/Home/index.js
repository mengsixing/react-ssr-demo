import React from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import * as actions from './store/actions';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			buttonText: '点击按钮'
		};
	}
	componentDidMount() {
		this.props.getHomeData();
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
			<div>
				<Header />
				{this.renderListData()}
				<p>
					<button onClick={() => this.showConsole()}>
						{this.state.buttonText}
					</button>
				</p>
			</div>
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

export default connect(
	mapStateToProps,
	mapDispatchtoProps
)(Home);
