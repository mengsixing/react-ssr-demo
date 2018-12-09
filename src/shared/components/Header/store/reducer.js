import { CHANGE_LOGIN_STATE } from './constants';
const initState = {
	islogin: false
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case CHANGE_LOGIN_STATE:
			return {
				...state,
				islogin: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
