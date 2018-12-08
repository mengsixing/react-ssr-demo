import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as homeReducer } from '../containers/Home/store';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	home: homeReducer
});
// 每一次调用返回一个新的store，避免服务器端所有人房问都引用的是同一个对象
const getStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default getStore;
