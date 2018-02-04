import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.js';
import bodyParser from 'body-parser';

const port = '3001',
      WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err) {
  if (err) {
    return console.log('Error : ', err);
  }
  console.log('Listening at http://localhost:'+port+'/');
});