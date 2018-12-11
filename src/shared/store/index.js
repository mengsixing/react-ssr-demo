import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as homeReducer } from '../containers/Home/store';
import { reducer as headerReducer } from '../components/Header/store';
// 区分环境，注入对应的axios，保持客户端请求node中间层，而node请求真实的接口。
import clientAxios from '../../client/request';
import serverAxios from '../../server/request';

const rootReducer = combineReducers({
  home: homeReducer,
  header: headerReducer
});

// 每一次调用返回一个新的store，避免服务器端所有人都引用的同一个对象
export const getServerStore = (req) =>
  createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(serverAxios(req)))
  );

export const getCLientStore = () => {
  // 如果服务器端已经产生了数据，就作为默认store使用
  const defaultStore = window.REDUX_STORE;
  return createStore(
    rootReducer,
    defaultStore,
    applyMiddleware(thunk.withExtraArgument(clientAxios))
  );
};
