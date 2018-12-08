import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../shared/Routes';
import { Provider } from 'react-redux';
import getStore from '../shared/store'

export const render = req => {
  const content = renderToString(
    <Provider store={getStore()}>
      <StaticRouter context={{}} location={req.url}>
        {Routes}
      </StaticRouter>
    </Provider>
  );
  var html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>测试</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/client.js" defer></script>
      </body>
    </html>
    `;

  return html;
};