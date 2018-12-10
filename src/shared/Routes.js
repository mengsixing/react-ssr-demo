import App from '../shared/containers/App';
import Home from './containers/Home';
import Detail from './containers/Detail';
import NotFound from './containers/NotFound';

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
      },
      {
        // 配置404页面
        component: NotFound
      }
    ]
  }
];

export default routes;
