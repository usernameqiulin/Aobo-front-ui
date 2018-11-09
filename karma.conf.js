const webpack = require('webpack');
const getClientEnvironment = require('./test/env');
const env = getClientEnvironment('');

module.exports = function(config) {
    config.set({
      basePath: '',  
      frameworks: ['mocha'],
  
      files: [
        'test/*.js',
        'test/*/*.js',
        'test/*/*/*.js',
        'test/*/*/*/*.js',
      ],
  
      exclude: [
          //配置文件中有jsdom，因此exclude
         'test/mocha.opts.js',
         'test/env.js',
      ],
      
      client: {
        mocha: {
          reporter: 'html'
        }
      },

      preprocessors: {
        'test/*.js': ['webpack'],
        'test/*/*.js': ['webpack'],
        'test/*/*/*.js': ['webpack'],
        'test/*/*/*/*.js': ['webpack'],
      },

      webpack: {
        module: {
          loaders: [
            {
              test: /\.js$/,
              //使用babel-loader进行编译
              exclude:/(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: [ "react", "env", "stage-3" ],
                plugins: [
                  "transform-class-properties",    //类属性
                  [
                    "transform-runtime",  //es7
                    {
                      "helpers": false,
                      "polyfill": false,
                      "regenerator": true,
                      "moduleName": "babel-runtime"
                    }
                  ]
                ],
              }
            },
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
            },
          ],
        },
        plugins: [
          new webpack.DefinePlugin(env.stringified),
        ],
      },

      plugins: [
        'karma-chrome-launcher',
        'karma-mocha',
        'karma-webpack',
      ],
      
      reporters: ['progress'],
  
      port: 9876,
  
      colors: true,
  
      logLevel: config.LOG_INFO,
  
      autoWatch: true,
  
      browsers: ['Chrome'],
  
      singleRun: false,
  
      concurrency: Infinity,

      proxies: {
        '/locales': 'http://localhost:3000/locales'
      }
    })
  }
