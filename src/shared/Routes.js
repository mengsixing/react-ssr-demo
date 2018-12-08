import Home from './containers/Home';
import Login from './containers/Login';

const routes = [
  {
    key: 'home',
    path: '/',
    component: Home,
    exact: true,
    loadData: Home.loadData
  },
  {
    key: 'login',
    path: '/login',
    component: Login,
    exact: true
  }
];

export default routes;
