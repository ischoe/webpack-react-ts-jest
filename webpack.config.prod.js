import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'prod'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new WebpackMd5Hash(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template : 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject : true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {test: /\.png$/,loader: "url-loader?limit=100000"},
      {test: /\.jpg$/,loader: "file-loader"},
      {test: /\.JPG$/,loader: "file-loader"},
      {test: /\.gif$/,loader: "file-loader"},
      {test: /\.mp4$/,loader: "file-loader"},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
}
