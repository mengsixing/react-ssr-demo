import express from 'express';
import { render } from './utils';
import { getServerStore } from '../shared/store';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/Routes';
import proxy from 'express-http-proxy';

const app = express();

app.use(
  '/api',
  proxy('https://www.easy-mock.com', {
    proxyReqPathResolver: function(req) {
      return '/mock/5c0b417d6162b83fe0a50c81/example' + req.url;
    }
  })
);

app.use(express.static('./dist/public'));

app.get('*', (req, res) => {
  // 把req传入，方便请求时带上cookie等信息。
  const store = getServerStore(req);
  const matchedRoutes = matchRoutes(routes, req.path);

  const promises = [];
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store));
    }
  });

  Promise.all(promises).then(() => {
    return res.send(render(store, routes, req));
  });
});

app.listen(3456, () => console.log('Example app listening on port 3456!'));
