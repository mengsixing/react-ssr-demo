import App from '../shared/containers/App';
import Home from './containers/Home';
import Detail from './containers/Detail';

const routes = [
  {
    key: 'app',
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        key: 'home',
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData
      },
      {
        key: 'detail',
        path: '/detail',
        component: Detail,
        exact: true
      }
    ]
  }
];

export default routes;
