import { CHANGE_MEMBER_LIST } from './constants';
const actionCreater = (type, payload) => {
  return {
    type,
    payload
  };
};

export const getMemberList = () => {
  return (dispatch, getState, axios) => {
    return axios.get('mock').then(res => {
      dispatch(actionCreater(CHANGE_MEMBER_LIST, res.data.data));
    });
  };
};
