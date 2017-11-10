const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const WebpackMonitor = require('webpack-monitor');

const TARGET = process.env.npm_lifecycle_event;
const devServerPort = 9001;

function isExternal(module) {
  const context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1;
}

const commonConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return isExternal(module);
      }
    }),
    new ExtractTextPlugin('styles.css'),
    // new WebpackMonitor({
    //   capture: true,
    //   target: path.resolve(__dirname, '__logs/webpack/stats.json'),
    //   launch: true,
    //   port: 3030,
    // })
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
};

const devConfig = {
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${devServerPort}`,
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
    inline: true,
    port: devServerPort,
    hot: true,
  }
};

const buildConfig = {
  plugins: [
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ],
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
};

switch(TARGET) {
  case 'start':
    console.log('> Dev Task');
    module.exports = merge(commonConfig, devConfig);
    break;
  case 'build':
    console.log('> Build Task');
    module.exports = merge(commonConfig, buildConfig);
    break;
}
