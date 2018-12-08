import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as homeReducer } from '../containers/Home/store';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  home: homeReducer
});

// 每一次调用返回一个新的store，避免服务器端所有人房问都引用的是同一个对象
export const getServerStore = () =>
  createStore(rootReducer, applyMiddleware(thunk));

export const getCLientStore = () => {
  // 如果服务器端已经产生了数据，就作为默认store使用
  const defaultStore = window.REDUX_STORE;
  return createStore(rootReducer, defaultStore, applyMiddleware(thunk));
};
