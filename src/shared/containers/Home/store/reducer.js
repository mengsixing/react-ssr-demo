import { HOME_DATA } from './constants';
const initState = {
	fullname: 'hengli',
	list: []
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case HOME_DATA:
			return {
				...state,
				list: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
