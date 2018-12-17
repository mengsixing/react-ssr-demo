import { CHANGE_MEMBER_LIST } from './constants';

const actionCreater = (type, payload) => ({
  type,
  payload,
});

/* eslint-disable import/prefer-default-export */
export const getMemberList = () => (dispatch, getState, axios) => axios.get('mock').then((res) => {
  dispatch(actionCreater(CHANGE_MEMBER_LIST, res.data.data));
});
