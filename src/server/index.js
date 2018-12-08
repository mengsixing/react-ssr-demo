import express from 'express';
import { render } from './utils';
import { getServerStore } from '../shared/store';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/Routes';

const app = express();

app.use(express.static('./dist/public'));

app.get('*', (req, res) => {
  const store = getServerStore();
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
