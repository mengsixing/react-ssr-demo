import express from 'express'
import React from 'react';
import { renderToString } from 'react-dom/server'
import App from '../shared/App.js'

const app = express()

app.use(express.static("./dist/public"));


app.get('/', (req, res) => {
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
        <div id="root">${renderToString(<App />)}</div>
        <script src="/client.js" defer></script>
      </body>
    </html>
    `;

    return res.send(html);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))