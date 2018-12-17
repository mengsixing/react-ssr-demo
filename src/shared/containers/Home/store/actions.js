import { HOME_DATA } from './constants';

const actionCreater = (type, payload) => ({
  type,
  payload,
});

/* eslint-disable import/prefer-default-export */
export const getHomeData = () => (dispatch, getState, axios) => axios.get('list').then((res) => {
  dispatch(actionCreater(HOME_DATA, res.data.list));
});
