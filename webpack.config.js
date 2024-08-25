module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass-embedded'),
              sassOptions: {
                fiber: false,
                includePaths: [
                  'src/Sass',
                  'node_modules'
                ]
              }
            }
          }
        ]
      }
    ]
  }
  // ...
};