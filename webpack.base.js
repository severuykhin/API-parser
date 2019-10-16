module.exports = {
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$|\.es6$|\.babel$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [ 'env', { targets: { browsers: [ 'last 2 versions' ] } } ],
            'react',
            'stage-0'
          ],
          plugins: [ 'transform-runtime' ]
        }
      }
    ]
  }
}
