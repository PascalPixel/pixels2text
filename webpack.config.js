const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const PATHS = {
  entry: path.resolve(__dirname, 'src'),
  output: __dirname
}

const common = {
  entry: PATHS.entry,
  output: {
    filename: 'bundle.js',
    path: PATHS.output
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.png']
  },
  target: 'web'
}

const development = () => {
  return merge(common, {
    output: {
      publicPath: '/'
    },
    devServer: {
      inline: true,
      historyApiFallback: true,
      contentBase: PATHS.dev
    },
    devtool: 'eval-source-map'
  })
}

const production = () => {
  return merge(common, {
    output: {
      publicPath: '/pixels2text/'
    },
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  })
}

module.exports = (env) => {
  if (env === 'production') {
    console.log('Making production build...')
    return production()
  }

  return development()
}
