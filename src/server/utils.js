import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'

import { Provider } from 'react-redux';

export const render = (store, routes, req) => {
  // matchPath只能解决单级路由
  // routes.some(route => {
  // 	const match = matchPath(req.path, route);
  // 	if (match) matchedRoutes.push(route);
  // });

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <div>
          {renderRoutes(routes)}
        </div>
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
        <script>
          window.REDUX_STORE = ${JSON.stringify(store.getState())};
        </script>
        <script src="/client.js" defer></script>
      </body>
    </html>
    `;
  return html;
};
