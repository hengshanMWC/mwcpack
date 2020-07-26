const path = require('path')
module.exports = {
  entry: {
    jsName: './src/index.js',
    htmlName: './index.html'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    js: 'index.js',
    html: 'index.html'
  }
}