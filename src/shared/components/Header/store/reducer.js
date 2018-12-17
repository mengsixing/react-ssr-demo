import { CHANGE_LOGIN_STATE, CHANGE_LOADING } from './constants';

const initState = {
  islogin: false,
  isloading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      return {
        ...state,
        islogin: action.payload,
      };
    case CHANGE_LOADING:
      return {
        ...state,
        isloading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
