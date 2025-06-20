const fs = require('fs');
const express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');

const mappconfig = JSON.parse(fs.readFileSync('mapp.json','utf-8'))

const app = express();

for(key in mappconfig.website){
  console.log(key,mappconfig.website[key].port)
  app.use(key, createProxyMiddleware({
    target: 'http://127.0.0.1:' + mappconfig.website[key].port,
    changeOrigin: true
  }));
}

app.listen(8080, () => {
  console.log('Reverse proxy server is running on http://localhost:8080');
});
