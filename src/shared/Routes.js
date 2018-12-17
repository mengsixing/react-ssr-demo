import App from './containers/App';
import Home from './containers/Home';
import Member from './containers/Member';
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
        loadData: Home.loadData,
      },
      {
        key: 'member',
        path: '/member',
        component: Member,
        exact: true,
        loadData: Member.loadData,
      },
      {
        // 配置404页面
        component: NotFound,
      },
    ],
  },
];

export default routes;
