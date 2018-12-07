import express from 'express';
import { render } from './utils';

const app = express();

app.use(express.static('./dist/public'));

app.get('*', (req, res) => {
  return res.send(render(req));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
