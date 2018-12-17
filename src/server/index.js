import fs from 'fs';
import https from 'https';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import render from './utils';
import { getServerStore } from '../shared/store';
import routes from '../shared/Routes';

const app = express();

app.use(
  '/api',
  proxy('https://www.easy-mock.com', {
    proxyReqPathResolver(req) {
      return `/mock/5c0b417d6162b83fe0a50c81/example${req.url}`;
    },
  }),
);
app.use(express.static('public'));

app.get('*', (req, res) => {
  // 把req传入，方便请求时带上cookie等信息。
  const store = getServerStore(req);
  const matchedRoutes = matchRoutes(routes, req.path);

  const promises = [];
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      // promise容错处理
      const promise = new Promise((resolve) => {
        item.route
          .loadData(store)
          .then(resolve)
          .catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    const staticContext = { styles: [] };
    const html = render(store, routes, req, staticContext);

    if (staticContext.action === 'REPLACE') {
      res.redirect(staticContext.url);
    } else {
      res.status(staticContext.statusCode || 200);
    }

    return res.send(html);
  });
});

// 开启https服务(使用的自制证书，浏览器会报安全警告)
let serverKey = './server.key';
let serverCert = './server.cert';
if (fs.existsSync('/etc/letsencrypt/live/yinhengli.com/privkey.pem')) {
  serverKey = '/etc/letsencrypt/live/yinhengli.com/privkey.pem';
  serverCert = '/etc/letsencrypt/live/yinhengli.com/fullchain.pem';
}
https
  .createServer(
    {
      key: fs.readFileSync(serverKey),
      cert: fs.readFileSync(serverCert),
    },
    app,
  )
  .listen(8084, () => {
    console.log('https服务已启动： https://localhost:8084!');
  });
