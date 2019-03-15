import React from 'react';
import { Helmet } from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { minify } from 'html-minifier';
import StyleContext from 'isomorphic-style-loader/StyleContext';

export default (store, routes, req) => {
  const css = new Set();
  /* eslint-disable no-underscore-dangle */
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  // matchPath只能解决单级路由
  /* eslint-disable react/jsx-filename-extension */
  const content = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <StaticRouter location={req.url}>{renderRoutes(routes)}</StaticRouter>
      </Provider>
    </StyleContext.Provider>,
  );

  const helmet = Helmet.renderStatic();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <style>${[...css].join('')}</style>
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
  const minifyHtml = minify(html, {
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  });
  return minifyHtml;
};
