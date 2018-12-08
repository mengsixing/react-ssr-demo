import { HOME_DATA } from './constants';
import axios from 'axios';

const actionCreater = (type, payload) => {
  return {
    type,
    payload
  };
};

export const getHomeData = () => {
  return dispatch => {
    return axios
      .get('https://www.easy-mock.com/mock/5c0b417d6162b83fe0a50c81/list')
      .then(res => {
        dispatch(actionCreater(HOME_DATA, res.data.list));
      });
  };
};
