import { CHANGE_LOGIN_STATE } from './constants';

const actionCreater = (type, payload) => {
  return {
    type,
    payload
  };
};

export const islogin = () => {
  return (dispatch, getState, axios) => {
    return axios.get('islogin').then(res => {
      dispatch(actionCreater(CHANGE_LOGIN_STATE, res.data.data.success));
    });
  };
};

export const login = () => {
  return (dispatch, getState, axios) => {
    return axios.get('login').then(res => {
      dispatch(actionCreater(CHANGE_LOGIN_STATE, res.data.data.success));
    });
  };
};

export const logout = () => {
  return (dispatch, getState, axios) => {
    return axios.get('logout').then(res => {
      dispatch(actionCreater(CHANGE_LOGIN_STATE, res.data.data.success));
    });
  };
};
