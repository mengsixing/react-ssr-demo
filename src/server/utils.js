import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { minify } from 'html-minifier';

export const render = (store, routes, req, staticContext) => {
  // matchPath只能解决单级路由
  // routes.some(route => {
  // 	const match = matchPath(req.path, route);
  // 	if (match) matchedRoutes.push(route);
  // });

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter context={staticContext} location={req.url}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  );

  const styles = staticContext.styles.length
    ? staticContext.styles.join('\n')
    : '';

  const helmet = Helmet.renderStatic();

  var html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <style>
          ${styles}
        </style>
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
  var minifyHtml = minify(html, {
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  });
  return minifyHtml;
};
