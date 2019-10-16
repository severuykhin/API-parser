const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base')

const config = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [ webpackNodeExternals() ],
  plugins: [
    new webpack.DefinePlugin({
      BROWSER: JSON.stringify(false)
    })
  ]
}

module.exports = merge(baseConfig, config)
