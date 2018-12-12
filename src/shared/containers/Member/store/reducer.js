import { CHANGE_MEMBER_LIST } from './constants';

const initState = {
  list: []
};

const reducer = (store = initState, action) => {
  switch (action.type) {
    case CHANGE_MEMBER_LIST:
      return { ...store, list: action.payload };
      break;
    default:
      return { ...store };
  }
};

export default reducer;
