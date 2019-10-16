const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')


const config = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new webpack.DefinePlugin({
      BROWSER: JSON.stringify(true)
    })
  ]
}

module.exports = merge(baseConfig, config)
