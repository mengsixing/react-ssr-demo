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
      // promise容错处理
      const promise = new Promise(resolve => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    const staticContext = {styles:[]};
    const html = render(store, routes, req, staticContext);

    if (staticContext.action === 'REPLACE') {
      res.redirect(staticContext.url);
    } else {
      res.status(staticContext.statusCode || 200);
    }
    return res.send(html);
  });
});

app.listen(3456, () => console.log('Example app listening on port 3456!'));
